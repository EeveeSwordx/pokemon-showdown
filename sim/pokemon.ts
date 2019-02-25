/**
 * Simulator Pokemon
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * @license MIT license
 */

 /** A Pokemon's move slot. */
type MoveSlot = {
	id: string;
	move: string;
	pp: number;
	maxpp: number;
	target?: string;
	disabled: boolean | string;
	disabledSource?: string;
	used: boolean;
	virtual?: boolean;
}

export class Pokemon {
	side: Side;
	battle: Battle;
	set: PokemonSet;
	getHealth: (side: Side) => string;
	getDetails: (side: Side) => string;
	baseTemplate: Template;
	species: string;
	name: string;
	speciesid: string;
	template: Template;
	moveSlots: MoveSlot[];
	baseMoveSlots: MoveSlot[];
	baseStats: StatsTable;
	trapped: boolean | "hidden"
	maybeTrapped: boolean
	maybeDisabled: boolean;
	illusion: Pokemon | null;
	fainted: boolean;
	faintQueued:boolean;
	lastItem: string;
	ateBerry: boolean;
	status: string;
	position: number;
	/**
	 * If the switch is called by an effect with a special switch
	 * message, like U-turn or Baton Pass, this will be the fullname of
	 * the calling effect.
	 */
	switchFlag: boolean | string;
	forceSwitchFlag: boolean;
	switchCopyFlag: boolean;
	draggedIn: number | null;
	lastMove: Move | null;
	moveThisTurn: string | boolean;
	/**
	 * The result of the last move used on the previous turn by this
	 * Pokemon. Stomping Tantrum checks this property for a value of false
	 * when determine whether to double its power, but it has four
	 * possible values:
	 *
	 * undefined indicates this Pokemon was not active last turn. It should
	 * not be used to indicate that a move was attempted and failed, either
	 * in a way that boosts Stomping Tantrum or not.
	 *
	 * null indicates that the Pokemon's move was skipped in such a way
	 * that does not boost Stomping Tantrum, either from having to recharge
	 * or spending a turn trapped by another Pokemon's Sky Drop.
	 *
	 * false indicates that the move completely failed to execute for any
	 * reason not mentioned above, including missing, the target being
	 * immune, the user being immobilized by an effect such as paralysis, etc.
	 *
	 * true indicates that the move successfully executed one or more of
	 * its effects on one or more targets, including hitting with an attack
	 * but dealing 0 damage to the target in cases such as Disguise, or that
	 * the move was blocked by one or more moves such as Protect.
	 */
	moveLastTurnResult: boolean | null | undefined;
	/**
	 * The result of the most recent move used this turn by this Pokemon.
	 * At the start of each turn, the value stored here is moved to its
	 * counterpart, moveLastTurnResult, and this property is reinitialized
	 * to undefined. This property can have one of four possible values:
	 *
	 * undefined indicates that this Pokemon has not yet finished an
	 * attempt to use a move this turn. As this value is only overwritten
	 * after a move finishes execution, it is not sufficient for an event
	 * to examine only this property when checking if a Pokemon has not
	 * moved yet this turn if the event could take place during that
	 * Pokemon's move.
	 *
	 * null indicates that the Pokemon's move was skipped in such a way
	 * that does not boost Stomping Tantrum, either from having to recharge
	 * or spending a turn trapped by another Pokemon's Sky Drop.
	 *
	 * false indicates that the move completely failed to execute for any
	 * reason not mentioned above, including missing, the target being
	 * immune, the user being immobilized by an effect such as paralysis, etc.
	 *
	 * true indicates that the move successfully executed one or more of
	 * its effects on one or more targets, including hitting with an attack
	 * but dealing 0 damage to the target in cases such as Disguise. It can
	 * also mean that the move was blocked by one or more moves such as
	 * Protect. Uniquely, this value can also be true if this Pokemon mega
	 * evolved or ultra bursted this turn, but in that case the value should
	 * always be overwritten by a move action before the end of that turn.
	 */
	moveThisTurnResult: boolean | null | undefined;
	/** used for Assurance check */
	hurtThisTurn: boolean;
	lastDamage: number;
	attackedBy: {source: Pokemon, damage: number, thisTurn: boolean, move?: string}[];
	usedItemThisTurn: boolean;
	newlySwitched: boolean;
	beingCalledBack: boolean;
	isActive: boolean;
	activeTurns: number;
	/** Have this pokemon's Start events run yet? */
	isStarted: boolean;
	transformed: boolean;
	duringMove: boolean;
	speed: number;
	abilityOrder: number;
	level: number;
	gender: GenderName;
	happiness: number;
	pokeball: string;
	fullname: string;
	details: string;
	id: string; // shouldn't really be used anywhere
	statusData: AnyObject;
	volatiles: AnyObject;
	heightm: number;
	weightkg: number;
	baseAbility: string;
	ability: string;
	item: string;
	abilityData: {[k: string]: string | Pokemon};
	itemData: {[k: string]: string | Pokemon};
	speciesData: AnyObject;
	types: string[];
	addedType: string;
	knownType: boolean;
	canMegaEvo: string | null | undefined;
	canUltraBurst: string | null | undefined;
	hpType: string;
	hpPower: number;
	boosts: BoostsTable;
	stats: {[k: string]: number};
	modifiedStats?: {[k: string]: number};
	subFainted: boolean | null;
	isStale: number;
	isStaleCon: number;
	isStaleHP: number;
	isStalePPTurns: number;
	baseIvs: StatsTable;
	baseHpType: string;
	baseHpPower: number;
	/**
	 * Keeps track of what type the client sees for this Pokemon
	 */
	apparentType: string;
	maxhp: number;
	hp: number;
	staleWarned: boolean;
	showCure: boolean;
	isStaleSource?: string;
	innate?: string;
	innates?: string[];
	originalSpecies?: string;
	gluttonyFlag: boolean | null;
	lastMoveTargetLoc?: number;

	constructor(set: string | AnyObject, side: Side) {
		this.side = side;
		this.battle = side.battle;

		let pokemonScripts = this.battle.data.Scripts.pokemon;
		if (pokemonScripts) Object.assign(this, pokemonScripts);

		if (typeof set === 'string') set = {name: set};

		// "pre-bound" functions for nicer syntax
		// allows them to be passed directly to Battle#add
		this.getHealth = (side: Side) => this.getHealthInner(side);
		this.getDetails = (side: Side) => this.getDetailsInner(side);

		this.set = set as PokemonSet;

		this.baseTemplate = this.battle.getTemplate(set.species || set.name);
		if (!this.baseTemplate.exists) {
			throw new Error(`Unidentified species: ${this.baseTemplate.name}`);
		}
		this.species = this.battle.getSpecies(set.species);
		if (set.name === set.species || !set.name) {
			set.name = this.baseTemplate.baseSpecies;
		}
		this.name = set.name.substr(0, 20);
		this.speciesid = toId(this.species);
		this.template = this.baseTemplate;
		this.moveSlots = [];
		this.baseMoveSlots = [];
		// @ts-ignore - null used for this.formeChange(this.baseTemplate)
		this.baseStats = null;
		this.trapped = false;
		this.maybeTrapped = false;
		this.maybeDisabled = false;
		this.illusion = null;
		this.fainted = false;
		this.faintQueued = false;
		this.lastItem = '';
		this.ateBerry = false;
		this.status = '';
		this.position = 0;
		this.switchFlag = false;
		this.forceSwitchFlag = false;
		this.switchCopyFlag = false;
		this.draggedIn = null;
		this.lastMove = null;
		this.moveThisTurn = '';
		this.hurtThisTurn = false;
		this.lastDamage = 0;
		this.attackedBy = [];
		this.usedItemThisTurn = false;
		this.newlySwitched = false;
		this.beingCalledBack = false;
		this.isActive = false;
		this.activeTurns = 0;
		this.isStarted = false;
		this.transformed = false;
		this.duringMove = false;
		this.speed = 0;
		this.abilityOrder = 0;

		set.level = this.battle.clampIntRange(set.forcedLevel || set.level || 100, 1, 9999);
		this.level = set.level;

		let genders = {M: 'M', F: 'F', N: 'N'};
		// @ts-ignore
		this.gender = genders[set.gender] || this.template.gender || (this.battle.random() * 2 < 1 ? 'M' : 'F');
		if (this.gender === 'N') this.gender = '';
		this.happiness = typeof set.happiness === 'number' ? this.battle.clampIntRange(set.happiness, 0, 255) : 255;
		this.pokeball = this.set.pokeball || 'pokeball';

		this.fullname = this.side.id + ': ' + this.name;
		this.details = this.species + (this.level === 100 ? '' : ', L' + this.level) + (this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');

		this.id = this.fullname; // shouldn't really be used anywhere

		this.statusData = {};
		this.volatiles = {};

		this.heightm = this.template.heightm;
		this.weightkg = this.template.weightkg;

		this.baseAbility = toId(set.ability);
		this.ability = this.baseAbility;
		this.item = toId(set.item);
		this.abilityData = {id: this.ability};
		this.itemData = {id: this.item};
		this.speciesData = {id: this.speciesid};

		this.types = this.baseTemplate.types;
		this.addedType = '';
		this.knownType = true;

		if (this.set.moves) {
			for (const moveid of this.set.moves) {
				let move = this.battle.getMove(moveid);
				if (!move.id) continue;
				if (move.id === 'hiddenpower' && move.type !== 'Normal') {
					if (!set.hpType) set.hpType = move.type;
					move = this.battle.getMove('hiddenpower');
				}
				this.baseMoveSlots.push({
					move: move.name,
					id: move.id,
					pp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
			}
		}

		this.canMegaEvo = this.battle.canMegaEvo(this);
		this.canUltraBurst = this.battle.canUltraBurst(this);

		if (!this.set.evs) {
			this.set.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
		}
		if (!this.set.ivs) {
			this.set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
		}
		let stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
		for (let i in stats) {
			// @ts-ignore
			if (!this.set.evs[i]) this.set.evs[i] = 0;
			// @ts-ignore
			if (!this.set.ivs[i] && this.set.ivs[i] !== 0) this.set.ivs[i] = 31;
		}
		for (let i in this.set.evs) {
			// @ts-ignore
			this.set.evs[i] = this.battle.clampIntRange(this.set.evs[i], 0, 255);
		}
		for (let i in this.set.ivs) {
			// @ts-ignore
			this.set.ivs[i] = this.battle.clampIntRange(this.set.ivs[i], 0, 31);
		}
		if (this.battle.gen && this.battle.gen <= 2) {
			// We represent DVs using even IVs. Ensure they are in fact even.
			for (let i in this.set.ivs) {
				// @ts-ignore Typescript bug: [js] Object is possibly 'undefined'. (It's not, we just set them all in the last loop.)
				this.set.ivs[i] &= 30;
			}
		}

		let hpData = this.battle.getHiddenPower(this.set.ivs);
		/**@type {string} */
		this.hpType = set.hpType || hpData.type;
		/**@type {number} */
		this.hpPower = hpData.power;

		/**@type {BoostsTable} */
		this.boosts = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0};
		/**@type {{[k: string]: number}} */
		this.stats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};

		// This is used in gen 1 only, here to avoid code repetition.
		// Only declared if gen 1 to avoid declaring an object we aren't going to need.
		if (this.battle.gen === 1) this.modifiedStats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
		/**@type {?boolean} */
		this.subFainted = null;

		// Transform copies IVs in gen 4 and earlier, so we track the base IVs/HP-type/power
		this.baseIvs = this.set.ivs;
		this.baseHpType = this.hpType;
		this.baseHpPower = this.hpPower;

		this.clearVolatile();

		/**
		 * Keeps track of what type the client sees for this Pokemon
		 * @type {string}
		 */
		this.apparentType = this.baseTemplate.types.join('/');

		this.maxhp = this.template.maxHP || this.baseStats.hp;
		this.hp = this.maxhp;

		this.isStale = 0;
		this.isStaleCon = 0;
		this.isStaleHP = this.maxhp;
		this.isStalePPTurns = 0;

		this.staleWarned = false;
		this.showCure = false;

		// OMs

		this.innate = undefined;
		this.innates = undefined;
		this.originalSpecies = undefined;
		this.gluttonyFlag = null;
	}
	get moves() {
		return this.moveSlots.map(moveSlot => moveSlot.id);
	}
	get baseMoves() {
		return this.baseMoveSlots.map(moveSlot => moveSlot.id);
	}

	toString() {
		let fullname = this.fullname;
		if (this.illusion) fullname = this.illusion.fullname;

		let positionList = 'abcdef';
		if (this.isActive) return fullname.substr(0, 2) + positionList[this.position] + fullname.substr(2);
		return fullname;
	}

	getDetailsInner(side: Side) {
		if (this.illusion) {
			let illusionDetails = this.illusion.template.species + (this.level === 100 ? '' : ', L' + this.level) + (this.illusion.gender === '' ? '' : ', ' + this.illusion.gender) + (this.illusion.set.shiny ? ', shiny' : '');
			return illusionDetails + '|' + this.getHealthInner(side);
		}
		return this.details + '|' + this.getHealthInner(side);
	}

	updateSpeed() {
		this.speed = this.getActionSpeed();
	}

	calculateStat(statName: string, boost: number, modifier?: number) {
		statName = toId(statName);

		if (statName === 'hp') return this.maxhp; // please just read .maxhp directly

		// base stat
		let stat = this.stats[statName];

		// Wonder Room swaps defenses before calculating anything else
		if ('wonderroom' in this.battle.pseudoWeather) {
			if (statName === 'def') {
				stat = this.stats['spd'];
			} else if (statName === 'spd') {
				stat = this.stats['def'];
			}
		}

		// stat boosts
		// boost = this.boosts[statName];
		let boosts = {};
		// @ts-ignore
		boosts[statName] = boost;
		boosts = this.battle.runEvent('ModifyBoost', this, null, null, boosts);
		// @ts-ignore
		boost = boosts[statName];
		let boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
		if (boost > 6) boost = 6;
		if (boost < -6) boost = -6;
		if (boost >= 0) {
			stat = Math.floor(stat * boostTable[boost]);
		} else {
			stat = Math.floor(stat / boostTable[-boost]);
		}

		// stat modifier
		stat = this.battle.modify(stat, (modifier || 1));

		// @ts-ignore
		if (this.battle.getStatCallback) {
			// @ts-ignore
			stat = this.battle.getStatCallback(stat, statName, this);
		}

		return stat;
	}

	getStat(statName: string, unboosted?: boolean, unmodified?: boolean) {
		statName = toId(statName);

		if (statName === 'hp') return this.maxhp; // please just read .maxhp directly

		// base stat
		let stat = this.stats[statName];

		// Download ignores Wonder Room's effect, but this results in
		// stat stages being calculated on the opposite defensive stat
		if (unmodified && 'wonderroom' in this.battle.pseudoWeather) {
			if (statName === 'def') {
				statName = 'spd';
			} else if (statName === 'spd') {
				statName = 'def';
			}
		}

		// stat boosts
		if (!unboosted) {
			let boosts = this.battle.runEvent('ModifyBoost', this, null, null, Object.assign({}, this.boosts));
			let boost = boosts[statName];
			let boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
			if (boost > 6) boost = 6;
			if (boost < -6) boost = -6;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}
		}

		// stat modifier effects
		if (!unmodified) {
			let statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
			// @ts-ignore
			stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
		}

		// @ts-ignore
		if (this.battle.getStatCallback) {
			// @ts-ignore
			stat = this.battle.getStatCallback(stat, statName, this, unboosted);
		}
		if (statName === 'spe' && stat > 10000) stat = 10000;
		return stat;
	}

	getActionSpeed() {
		let speed = this.getStat('spe', false, false);
		if (this.battle.getPseudoWeather('trickroom')) {
			speed = 0x2710 - speed;
		}
		return this.battle.trunc(speed, 13);
	}

	/**
	 * Commented out for now until a use for Combat Power is found in Let's Go
	 *
	getCombatPower() {
		let statSum = 0;
		let awakeningSum = 0;
		for (let stat in this.stats) {
			// @ts-ignore
			statSum += this.calculateStat(stat, this.boosts[stat]);
			// @ts-ignore
			awakeningSum += this.calculateStat(stat, this.boosts[stat]) + this.dex.getAwakeningValues(this.set, stat);
		}
		let combatPower = Math.floor(Math.floor(statSum * this.level * 6 / 100) + (Math.floor(awakeningSum) * Math.floor((this.level * 4) / 100 + 2)));
		return this.battle.clampIntRange(combatPower, 0, 10000);
	}
	 */

	getWeight() {
		let weight = this.template.weightkg;
		weight = this.battle.runEvent('ModifyWeight', this, null, null, weight);
		if (weight < 0.1) weight = 0.1;
		return weight;
	}

	getMoveData(move: string | Move) {
		move = this.battle.getMove(move) as Move;
		for (const moveSlot of this.moveSlots) {
			if (moveSlot.id === move.id) {
				return moveSlot;
			}
		}
		return null;
	}

	getMoveTargets(move: Move, target: Pokemon): Pokemon[] {
		let targets = [];
		switch (move.target) {
		case 'all':
		case 'foeSide':
		case 'allySide':
		case 'allyTeam':
			if (!move.target.startsWith('foe')) {
				for (const allyActive of this.side.active) {
					if (!allyActive.fainted) {
						targets.push(allyActive);
					}
				}
			}
			if (!move.target.startsWith('ally')) {
				for (const foeActive of this.side.foe.active) {
					if (!foeActive.fainted) {
						targets.push(foeActive);
					}
				}
			}
			if (targets.length && !targets.includes(target)) {
				this.battle.retargetLastMove(targets[targets.length - 1]);
			}
			break;
		case 'allAdjacent':
		case 'allAdjacentFoes':
			if (move.target === 'allAdjacent') {
				for (const allyActive of this.side.active) {
					if (this.battle.isAdjacent(this, allyActive)) {
						targets.push(allyActive);
					}
				}
			}
			for (const foeActive of this.side.foe.active) {
				if (this.battle.isAdjacent(this, foeActive)) {
					targets.push(foeActive);
				}
			}
			if (targets.length && !targets.includes(target)) {
				this.battle.retargetLastMove(targets[targets.length - 1]);
			}
			break;
		default:
			let selectedTarget = target;
			if (!target || (target.fainted && target.side !== this.side)) {
				// If a targeted foe faints, the move is retargeted
				const possibleTarget = this.battle.resolveTarget(this, move);
				if (!possibleTarget) return [];
				target = possibleTarget;
			}
			if (target.side.active.length > 1) {
				if (!move.flags['charge'] || this.volatiles['twoturnmove'] ||
						(move.id.startsWith('solarb') && this.battle.isWeather(['sunnyday', 'desolateland'])) ||
						(this.hasItem('powerherb') && move.id !== 'skydrop')) {
					target = this.battle.priorityEvent('RedirectTarget', this, this, this.battle.getActiveMove(move), target);
				}
			}
			if (selectedTarget !== target) {
				this.battle.retargetLastMove(target);
			}
			targets = [target];

			// Resolve apparent targets for Pressure.
			if (move.pressureTarget) {
				// At the moment, this is the only supported target.
				if (move.pressureTarget === 'foeSide') {
					for (const foeActive of this.side.foe.active) {
						if (foeActive && !foeActive.fainted) {
							targets.push(foeActive);
						}
					}
				}
			}
		}
		return targets;
	}

	ignoringAbility() {
		return !!((this.battle.gen >= 5 && !this.isActive) || (this.volatiles['gastroacid'] && !['battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(this.ability)));
	}

	ignoringItem() {
		// @ts-ignore
		return !!((this.battle.gen >= 5 && !this.isActive) || (this.hasAbility('klutz') && !this.getItem().ignoreKlutz) || this.volatiles['embargo'] || this.battle.pseudoWeather['magicroom']);
	}

	deductPP(move: string | Move, amount?: number | null, target?: Pokemon | null | false) {
		let gen = this.battle.gen;
		move = this.battle.getMove(move) as Move;
		let ppData = this.getMoveData(move);
		if (!ppData) return 0;
		ppData.used = true;
		if (!ppData.pp && gen > 1) return 0;

		if (!amount) amount = 1;
		ppData.pp -= amount;
		if (ppData.pp < 0 && gen > 1) {
			amount += ppData.pp;
			ppData.pp = 0;
		}
		if (ppData.virtual) {
			for (const foeActive of this.side.foe.active) {
				if (foeActive.isStale >= 2) {
					if (move.selfSwitch) this.isStalePPTurns++;
					return amount;
				}
			}
		}
		this.isStalePPTurns = 0;
		return amount;
	}

	moveUsed(move: Move, targetLoc?: number) {
		this.lastMove = move;
		this.lastMoveTargetLoc = targetLoc;
		this.moveThisTurn = move.id;
	}

	gotAttacked(move: string | Move, damage: number | false | undefined, source: Pokemon) {
		if (!damage) damage = 0;
		move = this.battle.getMove(move) as Move;
		let lastAttackedBy = {
			source: source,
			damage: damage,
			move: move.id,
			thisTurn: true,
		};
		this.attackedBy.push(lastAttackedBy);
	}

	getLastAttackedBy() {
		if (this.attackedBy.length === 0) return undefined;
		return this.attackedBy[this.attackedBy.length - 1];
	}

	getLockedMove(): string | null {
		let lockedMove = this.battle.runEvent('LockMove', this);
		if (lockedMove === true) lockedMove = null;
		return lockedMove;
	}

	getMoves(lockedMove?: string | null, restrictData?: boolean) {
		if (lockedMove) {
			lockedMove = toId(lockedMove);
			this.trapped = true;
			if (lockedMove === 'recharge') {
				return [{
					move: 'Recharge',
					id: 'recharge',
				}];
			}
			for (const moveSlot of this.moveSlots) {
				if (moveSlot.id !== lockedMove) continue;
				return [{
					move: moveSlot.move,
					id: moveSlot.id,
				}];
			}
			// does this happen?
			return [{
				move: this.battle.getMove(lockedMove).name,
				id: lockedMove,
			}];
		}
		let moves = [];
		let hasValidMove = false;
		for (const moveSlot of this.moveSlots) {
			let moveName = moveSlot.move;
			if (moveSlot.id === 'hiddenpower') {
				moveName = 'Hidden Power ' + this.hpType;
				if (this.battle.gen < 6) moveName += ' ' + this.hpPower;
			} else if (moveSlot.id === 'return') {
				// @ts-ignore
				moveName = 'Return ' + this.battle.getMove('return').basePowerCallback(this);
			} else if (moveSlot.id === 'frustration') {
				// @ts-ignore
				moveName = 'Frustration ' + this.battle.getMove('frustration').basePowerCallback(this);
			}
			let target = moveSlot.target;
			if (moveSlot.id === 'curse') {
				if (!this.hasType('Ghost')) {
					target = this.battle.getMove('curse').nonGhostTarget || moveSlot.target;
				}
			}
			let disabled = moveSlot.disabled;
			// @ts-ignore
			if ((moveSlot.pp <= 0 && !this.volatiles['partialtrappinglock']) || disabled && this.side.active.length >= 2 && this.battle.targetTypeChoices(target)) {
				disabled = true;
			} else if (disabled === 'hidden' && restrictData) {
				disabled = false;
			}
			if (!disabled) {
				hasValidMove = true;
			}
			moves.push({
				move: moveName,
				id: moveSlot.id,
				pp: moveSlot.pp,
				maxpp: moveSlot.maxpp,
				target: target,
				disabled: disabled,
			});
		}
		if (hasValidMove) return moves;

		return [];
	}

	getRequestData() {
		let lockedMove = this.getLockedMove();

		// Information should be restricted for the last active Pokémon
		let isLastActive = this.isLastActive();
		let canSwitchIn = this.battle.canSwitch(this.side) > 0;
		let moves = this.getMoves(lockedMove, isLastActive);
		let data: {moves: {move: string, id: string, target?: string, disabled?: boolean}[], maybeDisabled?: boolean, trapped?: boolean, maybeTrapped?: boolean, canMegaEvo?: boolean, canUltraBurst?: boolean, canZMove?: AnyObject | null} = {moves: moves.length ? moves : [{move: 'Struggle', id: 'struggle', target: 'randomNormal', disabled: false}]};

		if (isLastActive) {
			if (this.maybeDisabled) {
				data.maybeDisabled = true;
			}
			if (canSwitchIn) {
				if (this.trapped === true) {
					data.trapped = true;
				} else if (this.maybeTrapped) {
					data.maybeTrapped = true;
				}
			}
		} else if (canSwitchIn) {
			// Discovered by selecting a valid Pokémon as a switch target and cancelling.
			if (this.trapped) data.trapped = true;
		}

		if (!lockedMove) {
			if (this.canMegaEvo) data.canMegaEvo = true;
			if (this.canUltraBurst) data.canUltraBurst = true;
			let canZMove = this.battle.canZMove(this);
			if (canZMove) data.canZMove = canZMove;
		}

		return data;
	}

	isLastActive() {
		if (!this.isActive) return false;

		let allyActive = this.side.active;
		for (let i = this.position + 1; i < allyActive.length; i++) {
			if (allyActive[i] && !allyActive[i].fainted) return false;
		}
		return true;
	}

	positiveBoosts() {
		let boosts = 0;
		for (let i in this.boosts) {
			// @ts-ignore
			if (this.boosts[i] > 0) boosts += this.boosts[i];
		}
		return boosts;
	}

	boostBy(boost: SparseBoostsTable) {
		let delta = 0;
		for (let i in boost) {
			// @ts-ignore
			delta = boost[i];
			// @ts-ignore
			this.boosts[i] += delta;
			// @ts-ignore
			if (this.boosts[i] > 6) {
				// @ts-ignore
				delta -= this.boosts[i] - 6;
				// @ts-ignore
				this.boosts[i] = 6;
			}
			// @ts-ignore
			if (this.boosts[i] < -6) {
				// @ts-ignore
				delta -= this.boosts[i] - (-6);
				// @ts-ignore
				this.boosts[i] = -6;
			}
		}
		return delta;
	}

	clearBoosts() {
		for (let i in this.boosts) {
			// @ts-ignore
			this.boosts[i] = 0;
		}
	}

	setBoost(boost: SparseBoostsTable) {
		for (let i in boost) {
			// @ts-ignore
			this.boosts[i] = boost[i];
		}
	}

	copyVolatileFrom(pokemon: Pokemon) {
		this.clearVolatile();
		this.boosts = pokemon.boosts;
		for (let i in pokemon.volatiles) {
			if (this.battle.getEffect(i).noCopy) continue;
			// shallow clones
			this.volatiles[i] = Object.assign({}, pokemon.volatiles[i]);
			if (this.volatiles[i].linkedPokemon) {
				delete pokemon.volatiles[i].linkedPokemon;
				delete pokemon.volatiles[i].linkedStatus;
				for (const linkedPoke of this.volatiles[i].linkedPokemon) {
					let linkedPokeLinks = linkedPoke.volatiles[this.volatiles[i].linkedStatus].linkedPokemon;
					linkedPokeLinks[linkedPokeLinks.indexOf(pokemon)] = this;
				}
			}
		}
		pokemon.clearVolatile();
		for (let i in this.volatiles) {
			const volatile = this.getVolatile(i) as PureEffect;
			this.battle.singleEvent('Copy', volatile, this.volatiles[i], this);
		}
	}

	transformInto(pokemon: Pokemon, effect: Effect | null = null) {
		let template = pokemon.template;
		if (pokemon.fainted || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5)) {
			return false;
		}
		if ((pokemon.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5)) {
			return false;
		}
		if (!this.setTemplate(template)) {
			return false;
		}
		this.transformed = true;

		let types = pokemon.getTypes(true);
		this.setType(pokemon.volatiles.roost ? pokemon.volatiles.roost.typeWas : types, true);
		this.addedType = pokemon.addedType;
		this.knownType = this.side === pokemon.side && pokemon.knownType;
		this.apparentType = pokemon.apparentType;

		for (let statName in this.stats) {
			this.stats[statName] = pokemon.stats[statName];
		}
		this.moveSlots = [];
		this.set.ivs = (this.battle.gen >= 5 ? this.set.ivs : pokemon.set.ivs);
		this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
		this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
		for (const moveSlot of pokemon.moveSlots) {
			let moveName = moveSlot.move;
			if (moveSlot.id === 'hiddenpower') {
				moveName = 'Hidden Power ' + this.hpType;
			}
			this.moveSlots.push({
				move: moveName,
				id: moveSlot.id,
				pp: moveSlot.maxpp === 1 ? 1 : 5,
				maxpp: this.battle.gen >= 5 ? (moveSlot.maxpp === 1 ? 1 : 5) : moveSlot.maxpp,
				target: moveSlot.target,
				disabled: false,
				used: false,
				virtual: true,
			});
			this.moves.push(toId(moveName));
		}
		for (let j in pokemon.boosts) {
			// @ts-ignore
			this.boosts[j] = pokemon.boosts[j];
		}
		if (this.battle.gen >= 6 && pokemon.volatiles['focusenergy']) this.addVolatile('focusenergy');
		if (effect) {
			this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
		} else {
			this.battle.add('-transform', this, pokemon);
		}
		this.setAbility(pokemon.ability, this, true);

		// Change formes based on held items (for Transform)
		// Only ever relevant in Generation 4 since Generation 3 didn't have item-based forme changes
		if (this.battle.gen === 4) {
			if (this.template.num === 487) {
				// Giratina formes
				if (this.template.species === 'Giratina' && this.item === 'griseousorb') {
					this.formeChange('Giratina-Origin');
				} else if (this.template.species === 'Giratina-Origin' && this.item !== 'griseousorb') {
					this.formeChange('Giratina');
				}
			}
			if (this.template.num === 493) {
				// Arceus formes
				let item = this.getItem();
				let targetForme = (item && item.onPlate ? 'Arceus-' + item.onPlate : 'Arceus');
				if (this.template.species !== targetForme) {
					this.formeChange(targetForme);
				}
			}
		}

		return true;
	}

	/**
	 * Changes this Pokemon's template to the given templateId (or template).
	 * This function only handles changes to stats and type.
	 * Use formChange to handle changes to ability and sending client messages.
	 */
	setTemplate(rawTemplate: Template, source: Effect | null = this.battle.effect) {
		let template = this.battle.singleEvent('ModifyTemplate', this.battle.getFormat(), null, this, source, null, rawTemplate);

		if (!template) return null;

		this.template = template;

		this.setType(template.types, true);
		this.apparentType = rawTemplate.types.join('/');
		this.addedType = template.addedType || '';
		this.knownType = true;
		if (this.battle.gen >= 7) this.removeVolatile('autotomize');

		let stats = this.battle.spreadModify(this.template.baseStats, this.set);
		if (!this.baseStats) this.baseStats = stats;
		for (let statName in this.stats) {
			// @ts-ignore
			this.stats[statName] = stats[statName];
			// @ts-ignore
			this.baseStats[statName] = stats[statName];
			// @ts-ignore
			if (this.modifiedStats) this.modifiedStats[statName] = stats[statName]; // Gen 1: Reset modified stats.
		}
		if (this.battle.gen <= 1) {
			// Gen 1: Re-Apply burn and para drops.
			// FIXME: modifyStat() is only defined for the Gen 1 mod...
			// @ts-ignore
			if (this.status === 'par') this.modifyStat('spe', 0.25);
			// @ts-ignore
			if (this.status === 'brn') this.modifyStat('atk', 0.5);
		}
		this.speed = this.stats.spe;
		return template;
	}

	/**
	 * Changes this Pokemon's forme to match the given templateId (or template).
	 * This function handles all changes to stats, ability, type, template, etc.
	 * as well as sending all relevant messages sent to the client.
	 */
	formeChange(templateId: string | Template, source: Effect = this.battle.effect, isPermanent?: boolean, message?: string, abilitySlot: '0' | '1' | 'H' | 'S' = '0') {
		let rawTemplate = this.battle.getTemplate(templateId);

		let template = this.setTemplate(rawTemplate, source);
		if (!template) return false;

		if (this.battle.gen <= 2) return true;

		let apparentSpecies = this.illusion ? this.illusion.template.species : template.baseSpecies; // The species the opponent sees
		if (isPermanent) {
			this.baseTemplate = rawTemplate;
			this.details = template.species + (this.level === 100 ? '' : ', L' + this.level) + (this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
			this.battle.add('detailschange', this, (this.illusion || this).details);
			if (source.effectType === 'Item') {
				// @ts-ignore
				if (source.zMove) {
					this.battle.add('-burst', this, apparentSpecies, template.requiredItem);
					this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
				} else if (source.onPrimal) {
					if (this.illusion) {
						this.ability = '';
						this.battle.add('-primal', this.illusion);
					} else {
						this.battle.add('-primal', this);
					}
				} else {
					this.battle.add('-mega', this, apparentSpecies, template.requiredItem);
					this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
				}
			} else if (source.effectType === 'Status') {
				// Shaymin-Sky -> Shaymin
				this.battle.add('-formechange', this, template.species, message);
			}
		} else {
			if (source.effectType === 'Ability') {
				this.battle.add('-formechange', this, template.species, message, `[from] ability: ${source.name}`);
			} else {
				this.battle.add('-formechange', this, this.illusion ? this.illusion.template.species : template.species, message);
			}
		}
		if (source.effectType !== 'Ability' && source.id !== 'relicsong' && source.id !== 'zenmode') {
			if (this.illusion) {
				this.ability = ''; // Don't allow Illusion to wear off
			}
			this.setAbility(template.abilities[abilitySlot], null, true);
			if (isPermanent) this.baseAbility = this.ability;
		}
		return true;
	}

	clearVolatile(includeSwitchFlags = true) {
		this.boosts = {
			atk: 0,
			def: 0,
			spa: 0,
			spd: 0,
			spe: 0,
			accuracy: 0,
			evasion: 0,
		};

		if (this.battle.gen === 1 && this.baseMoves.includes('mimic') && !this.transformed) {
			let moveslot = this.baseMoves.indexOf('mimic');
			let mimicPP = this.moveSlots[moveslot] ? this.moveSlots[moveslot].pp : 16;
			this.moveSlots = this.baseMoveSlots.slice();
			this.moveSlots[moveslot].pp = mimicPP;
		} else {
			this.moveSlots = this.baseMoveSlots.slice();
		}

		this.transformed = false;
		this.ability = this.baseAbility;
		this.set.ivs = this.baseIvs;
		this.hpType = this.baseHpType;
		this.hpPower = this.baseHpPower;
		for (let i in this.volatiles) {
			if (this.volatiles[i].linkedStatus) {
				this.removeLinkedVolatiles(this.volatiles[i].linkedStatus, this.volatiles[i].linkedPokemon);
			}
		}
		this.volatiles = {};
		if (includeSwitchFlags) {
			this.switchFlag = false;
			this.forceSwitchFlag = false;
		}

		this.lastMove = null;
		this.moveThisTurn = '';

		this.lastDamage = 0;
		this.attackedBy = [];
		this.hurtThisTurn = false;
		this.newlySwitched = true;
		this.beingCalledBack = false;

		this.setTemplate(this.baseTemplate);
	}

	hasType(type: string | string[]) {
		if (!type) return false;
		if (Array.isArray(type)) {
			for (const typeid of type) {
				if (this.hasType(typeid)) return true;
			}
		} else {
			if (this.getTypes().includes(type)) return true;
		}
		return false;
	}

	/**
	 * This function only puts the pokemon in the faint queue;
	 * actually setting of this.fainted comes later when the
	 * faint queue is resolved.
	 *
	 * Returns the amount of damage actually dealt
	 */
	faint(source: Pokemon | null = null, effect: Effect | null = null) {
		if (this.fainted || this.faintQueued) return 0;
		let d = this.hp;
		this.hp = 0;
		this.switchFlag = false;
		this.faintQueued = true;
		this.battle.faintQueue.push({
			target: this,
			source: source,
			effect: effect,
		});
		return d;
	}

	damage(d: number, source: Pokemon | null = null, effect: Effect | null = null) {
		if (!this.hp || isNaN(d) || d <= 0) return 0;
		if (d < 1 && d > 0) d = 1;
		d = this.battle.trunc(d);
		this.hp -= d;
		if (this.hp <= 0) {
			d += this.hp;
			this.faint(source, effect);
		}
		return d;
	}

	tryTrap(isHidden: boolean = false) {
		if (this.runStatusImmunity('trapped')) {
			if (this.trapped && isHidden) return true;
			this.trapped = isHidden ? 'hidden' : true;
			return true;
		}
		return false;
	}

	hasMove(moveid: string) {
		moveid = toId(moveid);
		if (moveid.substr(0, 11) === 'hiddenpower') moveid = 'hiddenpower';
		for (const moveSlot of this.moveSlots) {
			if (moveid === moveSlot.id) {
				return moveid;
			}
		}
		return false;
	}

	disableMove(moveid: string, isHidden?: boolean | string, sourceEffect?: Effect) {
		if (!sourceEffect && this.battle.event) {
			sourceEffect = this.battle.effect;
		}
		moveid = toId(moveid);

		for (const moveSlot of this.moveSlots) {
			if (moveSlot.id === moveid && moveSlot.disabled !== true) {
				moveSlot.disabled = (isHidden || true);
				moveSlot.disabledSource = (sourceEffect ? sourceEffect.fullname : '');
			}
		}
	}

	/** Returns the amount of damage actually healed */
	heal(d: number, source: Pokemon | null = null, effect: Effect | null = null) {
		if (!this.hp) return false;
		d = this.battle.trunc(d);
		if (isNaN(d)) return false;
		if (d <= 0) return false;
		if (this.hp >= this.maxhp) return false;
		this.hp += d;
		if (this.hp > this.maxhp) {
			d -= this.hp - this.maxhp;
			this.hp = this.maxhp;
		}
		return d;
	}

	/** Sets HP, returns delta */
	sethp(d: number) {
		if (!this.hp) return 0;
		d = this.battle.trunc(d);
		if (isNaN(d)) return;
		if (d < 1) d = 1;
		d = d - this.hp;
		this.hp += d;
		if (this.hp > this.maxhp) {
			d -= this.hp - this.maxhp;
			this.hp = this.maxhp;
		}
		return d;
	}

	trySetStatus(status: string | Effect, source: Pokemon | null = null, sourceEffect: Effect | null = null) {
		return this.setStatus(this.status || status, source, sourceEffect);
	}

	/**
	 * Unlike clearStatus, gives cure message
	 * @param {boolean} [silent]
	 */
	cureStatus(silent = false) {
		if (!this.hp || !this.status) return false;
		this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
		if (this.status === 'slp' && !this.hasAbility('comatose') && this.removeVolatile('nightmare')) {
			this.battle.add('-end', this, 'Nightmare', '[silent]');
		}
		this.setStatus('');
		return true;
	}

	setStatus(status: string | Effect, source: Pokemon | null = null, sourceEffect: Effect | null = null, ignoreImmunities: boolean = false) {
		if (!this.hp) return false;
		status = this.battle.getEffect(status) as Effect;
		if (this.battle.event) {
			if (!source) source = this.battle.event.source;
			if (!sourceEffect) sourceEffect = this.battle.effect;
		}
		if (!source) source = this;

		if (this.status === status.id) {
			if (sourceEffect && sourceEffect.status === this.status) {
				this.battle.add('-fail', this, this.status);
			} else if (sourceEffect && sourceEffect.status) {
				this.battle.add('-fail', source);
				this.battle.attrLastMove('[still]');
			}
			return false;
		}

		if (!ignoreImmunities && status.id && !(source && source.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id))) {
			// the game currently never ignores immunities
			if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
				this.battle.debug('immune to status');
				if (sourceEffect && sourceEffect.status) this.battle.add('-immune', this);
				return false;
			}
		}
		let prevStatus = this.status;
		let prevStatusData = this.statusData;
		if (status.id) {
			/** @type {boolean} */
			let result = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
			if (!result) {
				this.battle.debug('set status [' + status.id + '] interrupted');
				return result;
			}
		}

		this.status = status.id;
		this.statusData = {id: status.id, target: this};
		if (source) this.statusData.source = source;
		if (status.duration) {
			this.statusData.duration = status.duration;
		}
		if (status.durationCallback) {
			this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
		}

		if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
			this.battle.debug('status start [' + status.id + '] interrupted');
			// cancel the setstatus
			this.status = prevStatus;
			this.statusData = prevStatusData;
			return false;
		}
		if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
			return false;
		}
		return true;
	}

	/**
	 * Unlike cureStatus, does not give cure message
	 */
	clearStatus() {
		return this.setStatus('');
	}

	getStatus() {
		return this.battle.getEffect(this.status);
	}

	eatItem(source?: Pokemon, sourceEffect?: Effect) {
		if (!this.hp || !this.isActive) return false;
		if (!this.item) return false;

		if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		let item = this.getItem();
		if (this.battle.runEvent('UseItem', this, null, null, item) && this.battle.runEvent('TryEatItem', this, null, null, item)) {
			this.battle.add('-enditem', this, item, '[eat]');

			this.battle.singleEvent('Eat', item, this.itemData, this, source, sourceEffect);
			this.battle.runEvent('EatItem', this, null, null, item);

			this.lastItem = this.item;
			this.item = '';
			this.itemData = {id: '', target: this};
			this.usedItemThisTurn = true;
			this.ateBerry = true;
			this.battle.runEvent('AfterUseItem', this, null, null, item);
			return true;
		}
		return false;
	}

	useItem(source?: Pokemon, sourceEffect?: Effect) {
		if ((!this.hp && !this.getItem().isGem) || !this.isActive) return false;
		if (!this.item) return false;

		if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
		if (!source && this.battle.event && this.battle.event.target) source = this.battle.event.target;
		let item = this.getItem();
		if (this.battle.runEvent('UseItem', this, null, null, item)) {
			switch (item.id) {
			case 'redcard':
				this.battle.add('-enditem', this, item, '[of] ' + source);
				break;
			default:
				if (!item.isGem) {
					this.battle.add('-enditem', this, item);
				}
				break;
			}

			this.battle.singleEvent('Use', item, this.itemData, this, source, sourceEffect);

			this.lastItem = this.item;
			this.item = '';
			this.itemData = {id: '', target: this};
			this.usedItemThisTurn = true;
			this.battle.runEvent('AfterUseItem', this, null, null, item);
			return true;
		}
		return false;
	}

	takeItem(source?: Pokemon) {
		if (!this.isActive) return false;
		if (!this.item) return false;
		if (!source) source = this;
		if (this.battle.gen === 4) {
			if (toId(this.ability) === 'multitype') return false;
			if (source && toId(source.ability) === 'multitype') return false;
		}
		let item = this.getItem();
		if (this.battle.runEvent('TakeItem', this, source, null, item)) {
			this.item = '';
			this.itemData = {id: '', target: this};
			return item;
		}
		return false;
	}

	setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
		if (!this.hp || !this.isActive) return false;
		if (typeof item === 'string') item = this.battle.getItem(item) as Item;

		let effectid;
		if (this.battle.effect) effectid = this.battle.effect.id;
		if (item.id === 'leppaberry' && effectid !== 'trick' && effectid !== 'switcheroo') {
			this.isStale = 2;
			this.isStaleSource = 'getleppa';
		}
		this.item = item.id;
		this.itemData = {id: item.id, target: this};
		if (item.id) {
			this.battle.singleEvent('Start', item, this.itemData, this, source, effect);
		}
		return true;
	}

	getItem() {
		return this.battle.getItem(this.item);
	}

	hasItem(item: string | string[]) {
		if (this.ignoringItem()) return false;
		let ownItem = this.item;
		if (!Array.isArray(item)) {
			return ownItem === toId(item);
		}
		return item.map(toId).includes(ownItem);
	}

	clearItem() {
		return this.setItem('');
	}

	setAbility(ability: string | Ability, source?: Pokemon | null, isFromFormeChange?: boolean) {
		if (!this.hp) return false;
		if (typeof ability === 'string') ability = this.battle.getAbility(ability) as Ability;
		let oldAbility = this.ability;
		if (!isFromFormeChange) {
			if (['illusion', 'battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(ability.id)) return false;
			if (['battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(oldAbility)) return false;
			if (this.battle.gen >= 7 && (ability.id === 'zenmode' || oldAbility === 'zenmode')) return false;
		}
		if (!this.battle.runEvent('SetAbility', this, source, this.battle.effect, ability)) return false;
		this.battle.singleEvent('End', this.battle.getAbility(oldAbility), this.abilityData, this, source);
		if (this.battle.effect && this.battle.effect.effectType === 'Move') {
			this.battle.add('-endability', this, this.battle.getAbility(oldAbility), '[from] move: ' + this.battle.getMove(this.battle.effect.id));
		}
		this.ability = ability.id;
		this.abilityData = {id: ability.id, target: this};
		if (ability.id && this.battle.gen > 3) {
			this.battle.singleEvent('Start', ability, this.abilityData, this, source);
		}
		this.abilityOrder = this.battle.abilityOrder++;
		return oldAbility;
	}

	getAbility() {
		return this.battle.getAbility(this.ability);
	}

	hasAbility(ability: string | string[]) {
		if (this.ignoringAbility()) return false;
		let ownAbility = this.ability;
		if (!Array.isArray(ability)) {
			return ownAbility === toId(ability);
		}
		return ability.map(toId).includes(ownAbility);
	}

	clearAbility() {
		return this.setAbility('');
	}

	getNature() {
		return this.battle.getNature(this.set.nature);
	}

	addVolatile(status: string | PureEffect, source: Pokemon | null = null, sourceEffect: Effect | null = null, linkedStatus: string | PureEffect | null = null): boolean | any {
		let result;
		status = this.battle.getEffect(status) as PureEffect;
		if (!this.hp && !status.affectsFainted) return false;
		if (linkedStatus && source && !source.hp) return false;
		if (this.battle.event) {
			if (!source) source = this.battle.event.source;
			if (!sourceEffect) sourceEffect = this.battle.effect;
		}
		if (!source) source = this;

		if (this.volatiles[status.id]) {
			if (!status.onRestart) return false;
			return this.battle.singleEvent('Restart', status, this.volatiles[status.id], this, source, sourceEffect);
		}
		if (!this.runStatusImmunity(status.id)) {
			this.battle.debug('immune to volatile status');
			if (sourceEffect && sourceEffect.status) this.battle.add('-immune', this);
			return false;
		}
		result = this.battle.runEvent('TryAddVolatile', this, source, sourceEffect, status);
		if (!result) {
			this.battle.debug('add volatile [' + status.id + '] interrupted');
			return result;
		}
		this.volatiles[status.id] = {id: status.id};
		this.volatiles[status.id].target = this;
		if (source) {
			this.volatiles[status.id].source = source;
			this.volatiles[status.id].sourcePosition = source.position;
		}
		if (sourceEffect) {
			this.volatiles[status.id].sourceEffect = sourceEffect;
		}
		if (status.duration) {
			this.volatiles[status.id].duration = status.duration;
		}
		if (status.durationCallback) {
			this.volatiles[status.id].duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
		}
		result = this.battle.singleEvent('Start', status, this.volatiles[status.id], this, source, sourceEffect);
		if (!result) {
			// cancel
			delete this.volatiles[status.id];
			return result;
		}
		if (linkedStatus && source) {
			if (!source.volatiles[linkedStatus.toString()]) {
				source.addVolatile(linkedStatus, this, sourceEffect);
				source.volatiles[linkedStatus.toString()].linkedPokemon = [this];
				source.volatiles[linkedStatus.toString()].linkedStatus = status;
			} else {
				source.volatiles[linkedStatus.toString()].linkedPokemon.push(this);
			}
			this.volatiles[status.toString()].linkedPokemon = [source];
			this.volatiles[status.toString()].linkedStatus = linkedStatus;
		}
		return true;
	}

	getVolatile(status: string | Effect) {
		status = this.battle.getEffect(status) as Effect;
		if (!this.volatiles[status.id]) return null;
		return status;
	}

	removeVolatile(status: string | Effect) {
		if (!this.hp) return false;
		status = this.battle.getEffect(status) as Effect;
		if (!this.volatiles[status.id]) return false;
		this.battle.singleEvent('End', status, this.volatiles[status.id], this);
		let linkedPokemon = this.volatiles[status.id].linkedPokemon;
		let linkedStatus = this.volatiles[status.id].linkedStatus;
		delete this.volatiles[status.id];
		if (linkedPokemon) {
			this.removeLinkedVolatiles(linkedStatus, linkedPokemon);
		}
		return true;
	}

	removeLinkedVolatiles(linkedStatus: string | Effect, linkedPokemon: Pokemon[]) {
		linkedStatus = linkedStatus.toString();
		for (const linkedPoke of linkedPokemon) {
			if (linkedPoke.volatiles[linkedStatus]) {
				linkedPoke.volatiles[linkedStatus].linkedPokemon.splice(linkedPoke.volatiles[linkedStatus].linkedPokemon.indexOf(this), 1);
				if (linkedPoke.volatiles[linkedStatus].linkedPokemon.length === 0) {
					linkedPoke.removeVolatile(linkedStatus);
				}
			}
		}
	}

	getHealthInner(side: Side | boolean) {
		if (!this.hp) return '0 fnt';
		let hpstring;
		// side === true in replays
		if (side === this.side || side === true) {
			hpstring = '' + this.hp + '/' + this.maxhp;
		} else {
			let ratio = this.hp / this.maxhp;
			if (this.battle.reportPercentages) {
				// HP Percentage Mod mechanics
				let percentage = Math.ceil(ratio * 100);
				if ((percentage === 100) && (ratio < 1.0)) {
					percentage = 99;
				}
				hpstring = '' + percentage + '/100';
			} else {
				// In-game accurate pixel health mechanics
				let pixels = Math.floor(ratio * 48) || 1;
				hpstring = '' + pixels + '/48';
				if ((pixels === 9) && (ratio > 0.2)) {
					hpstring += 'y'; // force yellow HP bar
				} else if ((pixels === 24) && (ratio > 0.5)) {
					hpstring += 'g'; // force green HP bar
				}
			}
		}
		if (this.status) hpstring += ' ' + this.status;
		return hpstring;
	}

	/**
	 * Sets a type (except on Arceus, who resists type changes)
	 * newType can be an array, but this is for OMs only. The game in
	 * reality doesn't support setting a type to more than one type.
	 */
	setType(newType: string | string[], enforce: boolean = false) {
		// First type of Arceus, Silvally cannot be normally changed
		if (!enforce && (this.template.num === 493 || this.template.num === 773)) return false;

		if (!newType) throw new Error("Must pass type to setType");
		this.types = (typeof newType === 'string' ? [newType] : newType);
		this.addedType = '';
		this.knownType = true;
		this.apparentType = this.types.join('/');

		return true;
	}

	/** Removes any types added previously and adds another one. */
	addType(newType: string) {
		this.addedType = newType;

		return true;
	}

	getTypes(excludeAdded?: boolean) {
		let types = this.types;
		types = this.battle.runEvent('Type', this, null, null, types);
		if (!excludeAdded && this.addedType) {
			types = types.concat(this.addedType);
		}
		if (types.length) return types;
		return [this.battle.gen >= 5 ? 'Normal' : '???'];
	}

	isGrounded(negateImmunity: boolean = false) {
		if ('gravity' in this.battle.pseudoWeather) return true;
		if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		if ('smackdown' in this.volatiles) return true;
		let item = (this.ignoringItem() ? '' : this.item);
		if (item === 'ironball') return true;
		// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
		if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
		if ('magnetrise' in this.volatiles) return false;
		if ('telekinesis' in this.volatiles) return false;
		return item !== 'airballoon';
	}

	isSemiInvulnerable() {
		if (this.volatiles['fly'] || this.volatiles['bounce'] || this.volatiles['dive'] || this.volatiles['dig'] || this.volatiles['phantomforce'] || this.volatiles['shadowforce'] || this.isSkyDropped()) {
			return true;
		}
		return false;
	}

	isSkyDropped() {
		if (this.volatiles['skydrop']) return true;
		for (const foeActive of this.side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === this) {
				return true;
			}
		}
		return false;
	}

	runEffectiveness(moveOrType: ActiveMove | string) {
		let totalTypeMod = 0;
		let move = (typeof moveOrType !== 'string' ? moveOrType : null);
		for (const type of this.getTypes()) {
			let typeMod = this.battle.getEffectiveness(moveOrType, type);
			if (move) {
				typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
				totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
			} else {
				totalTypeMod += typeMod;
			}
		}
		return totalTypeMod;
	}

	runImmunity(type: string, message?: string | boolean) {
		if (!type || type === '???') {
			return true;
		}
		if (!(type in this.battle.data.TypeChart)) {
			if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
			throw new Error("Use runStatusImmunity for " + type);
		}
		if (this.fainted) {
			return false;
		}
		let isGrounded;
		let negateResult = this.battle.runEvent('NegateImmunity', this, type);
		if (type === 'Ground') {
			isGrounded = this.isGrounded(!negateResult);
			if (isGrounded === null) {
				if (message) {
					this.battle.add('-immune', this, '[from] ability: Levitate');
				}
				return false;
			}
		}
		if (!negateResult) return true;
		if ((isGrounded === undefined && !this.battle.getImmunity(type, this)) || isGrounded === false) {
			if (message) {
				this.battle.add('-immune', this);
			}
			return false;
		}
		return true;
	}

	runStatusImmunity(type: string, message?: string) {
		if (this.fainted) {
			return false;
		}
		if (!type) {
			return true;
		}
		if (!this.battle.getImmunity(type, this)) {
			this.battle.debug('natural status immunity');
			if (message) {
				this.battle.add('-immune', this);
			}
			return false;
		}
		let immunity = this.battle.runEvent('Immunity', this, null, null, type);
		if (!immunity) {
			this.battle.debug('artificial status immunity');
			if (message && immunity !== null) {
				this.battle.add('-immune', this);
			}
			return false;
		}
		return true;
	}

	destroy() {
		// deallocate ourself
		// get rid of some possibly-circular references
		// @ts-ignore - prevent type | null
		this.battle = null;
		// @ts-ignore - prevent type | null
		this.side = null;
	}
}
