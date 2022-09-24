export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init() {
		this.modData('Abilities', 'noability').isNonstandard = null;
		for (const i in this.data.Pokedex) {
			this.modData('Pokedex', i).abilities = {0: 'No Ability'};
		}
	},
	/**
	 * Given a table of base stats and a pokemon set, return the actual stats.
	 */
	spreadModify(baseStats, set) {
		const modStats: StatsTable = {hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
		let statName: StatID;
		for (statName in modStats) {
			const stat = baseStats[statName];
			modStats[statName] = Math.floor((Math.floor(2 * stat + set.ivs[statName]) * set.level / 100 + 5));
		}
		if ('hp' in baseStats) {
			const stat = baseStats['hp'];
			modStats['hp'] = Math.floor(Math.floor(2 * stat + set.ivs['hp'] + 100) * set.level / 100 + 10);
		}
		return this.natureModify(modStats, set);
	},

	/**
	 * @param {StatsTable} stats
	 * @param {PokemonSet} set
	 * @return {StatsTable}
	 */
	natureModify(stats, set) {
		const nature = this.dex.natures.get(set.nature);
		if (nature.plus) stats[nature.plus] = Math.floor(stats[nature.plus] * 1.1);
		if (nature.minus) stats[nature.minus] = Math.floor(stats[nature.minus] * 0.9);
		set.happiness = 70;
		const friendshipValue = Math.floor((set.happiness / 255 / 10 + 1) * 100);
		let stat: StatID;
		for (stat in stats) {
			if (stat !== 'hp') {
				stats[stat] = Math.floor(stats[stat] * friendshipValue / 100);
			}
			stats[stat] += set.evs[stat];
		}
		return stats;
	},

	actions: {
		// mega evolution in LGPE does not require anything to be held
		canMegaEvo(pokemon) {
			const species = pokemon.baseSpecies;
			for (const forme of species.otherFormes) {
				if (forme.includes("-Mega") && forme !== pokemon.name) {
					return forme;
				}
			}
			return null;
		},

		// lets player select either Charizard or Mewtwo mega evolution during battle
		canMegaEvoY(pokemon) {
			const species = pokemon.baseSpecies;
			for (const forme of species.otherFormes) {
				if (forme.includes("-Mega-Y") && forme !== pokemon.name) {
					return forme;
				}
			}
			return null;
		},

		runMegaEvoY(pokemon) {
			const speciesid = this.canMegaEvoY(pokemon);
			if (!speciesid) return false;

			pokemon.formeChange(speciesid, pokemon.getItem(), true);

			// Limit one mega evolution
			const wasMega = pokemon.canMegaEvo;
			for (const ally of pokemon.side.pokemon) {
				if (wasMega) {
					ally.canMegaEvo = null;
				} else {
					ally.canUltraBurst = null;
				}
			}

			this.battle.runEvent('AfterMega', pokemon);
			return true;
		},
	},
};
