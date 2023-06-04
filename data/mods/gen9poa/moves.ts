export const Moves: {[k: string]: ModdedMoveData} = {
	moonlight: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Darkness, and 1/4 of its maximum HP if the weather is Desolate Land, Sunny Day, Primordial Sea, Rain Dance, Sandstorm, or Snow, all rounded half down.",
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'newmoon':
				factor = 0.667;
				break;
			case 'sunnyday':
			case 'desolateland':
				factor = 0.333;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'acidrain':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	powershift: {
		inherit: true,
		isNonstandard: null,
	},
	chloroblast: {
		inherit: true,
		isNonstandard: null,
	},
	ragingfury: {
		inherit: true,
		isNonstandard: null,
	},
	bleakwindstorm: {
		inherit: true,
		isNonstandard: null,
	},
	wildboltstorm: {
		inherit: true,
		isNonstandard: null,
	},
	sandsearstorm: {
		inherit: true,
		isNonstandard: null,
	},
	springtidestorm: {
		inherit: true,
		isNonstandard: null,
	},
	mountaingale: {
		inherit: true,
		isNonstandard: null,
	},
	mysticalpower: {
		inherit: true,
		isNonstandard: null,
	},
	psyshieldbash: {
		inherit: true,
		isNonstandard: null,
	},
	ceaselessedge: {
		inherit: true,
		isNonstandard: null,
	},
	stoneaxe: {
		inherit: true,
		isNonstandard: null,
	},
	direclaw: {
		inherit: true,
		isNonstandard: null,
	},
	infernalparade: {
		inherit: true,
		isNonstandard: null,
	},
	barbbarrage: {
		inherit: true,
		isNonstandard: null,
	},
	esperwing: {
		inherit: true,
		isNonstandard: null,
	},
	takeheart: {
		inherit: true,
		isNonstandard: null,
	},
	triplearrows: {
		inherit: true,
		isNonstandard: null,
	},
	shelter: {
		inherit: true,
		isNonstandard: null,
	},
	victorydance: {
		inherit: true,
		isNonstandard: null,
	},
	lunarblessing: {
		inherit: true,
		isNonstandard: null,
	},
};