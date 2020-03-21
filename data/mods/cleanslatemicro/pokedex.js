'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	typenull: {
		num: 772,
		name: "Type: Null",
		types: ["Normal", "Steel"],
		baseStats: {hp: 70, atk: 120, def: 80, spa: 70, spd: 60, spe: 85},
		abilities: {0: "Battle Armor", 1: "Tinted Lens"},
		heightm: 1.9,
		weightkg: 120.5,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	crobat: {
		num: 169,
		name: "Crobat",
		types: ["Poison", "Fighting"],
		baseStats: {hp: 110, atk: 70, def: 100, spa: 60, spd: 65, spe: 80},
		abilities: {0: "Big Pecks", 1: "Scrappy", H: "Magic Guard"},
		heightm: 1.8,
		weightkg: 75,
		color: "Purple",
		eggGroups: ["Flying"],
	},
	galvantula: {
		num: 596,
		name: "Galvantula",
		types: ["Bug", "Electric"],
		baseStats: {hp: 60, atk: 50, def: 65, spa: 104, spd: 79, spe: 107},
		abilities: {0: "Static", 1: "Quick Feet", H: "Fluffy"},
		heightm: 0.8,
		weightkg: 14.3,
		color: "Yellow",
		eggGroups: ["Bug"],
	},
	dugtrioalola: {
		num: 51,
		name: "Dugtrio-Alola",
		types: ["Ground", "Steel"],
		baseStats: {hp: 55, atk: 90, def: 95, spa: 38, spd: 61, spe: 126},
		abilities: {0: "Sand Force", H: "Intimidate"},
		heightm: 0.7,
		weightkg: 66.6,
		color: "Brown",
		eggGroups: ["Field"],
	},
	rotom: {
		num: 479,
		name: "Rotom",
		types: ["Electric", "Ghost"],
		gender: "N",
		baseStats: {hp: 50, atk: 50, def: 77, spa: 95, spd: 77, spe: 91},
		abilities: {0: "Prankster", 1: "Levitate", H: "Speed Boost"},
		heightm: 0.3,
		weightkg: 0.3,
		color: "Red",
		evos: ["typenull", "galvantula", "crobat", "dugtrioalola", "ludicolo", "torterra", "dragalge", "ninetales", "pupitar", "farfetchd", "purugly", "kyurem", "rotomwash", "umbreon", "heracross", "magearna"],
		eggGroups: ["Amorphous"],
	},
	torterra: {
		num: 389,
		name: "Torterra",
		types: ["Grass", "Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 95, atk: 87, def: 125, spa: 78, spd: 50, spe: 45},
		abilities: {0: "Rock Head", H: "Drought"},
		heightm: 2.2,
		weightkg: 310,
		color: "Green",
		eggGroups: ["Monster", "Grass"],
	},
	dragalge: {
		num: 691,
		name: "Dragalge",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 71, atk: 85, def: 90, spa: 87, spd: 123, spe: 44},
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Hydration"},
		heightm: 1.8,
		weightkg: 81.5,
		color: "Brown",
		eggGroups: ["Water 1", "Dragon"],
	},
	ninetales: {
		num: 38,
		name: "Ninetales",
		types: ["Fire", "Fairy"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 80, atk: 75, def: 65, spa: 100, spd: 85, spe: 100},
		abilities: {0: "Flash Fire", 1: "Limber", H: "Flower Gift"},
		heightm: 1.1,
		weightkg: 19.9,
		color: "Yellow",
		eggGroups: ["Field"],
	},
	pupitar: {
		num: 247,
		name: "Pupitar",
		types: ["Rock", "Ground"],
		baseStats: {hp: 90, atk: 110, def: 100, spa: 50, spd: 60, spe: 60},
		abilities: {0: "Shed Skin", H: "Battle Armor"},
		heightm: 1.2,
		weightkg: 152,
		color: "Gray",
		evos: ["tyranitar"],
		eggGroups: ["Monster"],
	},
	farfetchd: {
		num: 83,
		name: "Farfetch'd",
		types: ["Fighting", "Flying"],
		baseStats: {hp: 75, atk: 115, def: 85, spa: 45, spd: 55, spe: 95},
		abilities: {0: "Defiant", 1: "Big Pecks", H: "Sap Sipper"},
		heightm: 0.8,
		weightkg: 15,
		color: "Brown",
		eggGroups: ["Flying", "Field"],
	},
	purugly: {
		num: 432,
		name: "Purugly",
		types: ["Dark", "Fairy"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 74, atk: 80, def: 84, spa: 59, spd: 84, spe: 119},
		abilities: {0: "Cute Charm", H: "Regenerator"},
		heightm: 1,
		weightkg: 43.8,
		color: "Gray",
		eggGroups: ["Field"],
	},
	kyurem: {
		num: 646,
		name: "Kyurem",
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 95, atk: 80, def: 90, spa: 110, spd: 90, spe: 85},
		abilities: {0: "Pressure"},
		heightm: 3,
		weightkg: 325,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	rotomwash: {
		num: 479,
		name: "Rotom-Wash",
		types: ["Water", "Ghost"],
		gender: "N",
		baseStats: {hp: 50, atk: 50, def: 127, spa: 105, spd: 97, spe: 76},
		abilities: {0: "Water Absorb", 1: "Rain Dish", H: "Cursed Body"},
		heightm: 0.3,
		weightkg: 0.3,
		color: "Red",
		eggGroups: ["Amorphous"],
	},
	umbreon: {
		num: 197,
		name: "Umbreon",
		types: ["Dark", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 65, def: 75, spa: 75, spd: 115, spe: 65},
		abilities: {0: "Infiltrator", 1: "Poison Touch", H: "Merciless"},
		heightm: 1,
		weightkg: 27,
		color: "Black",
		eggGroups: ["Field"],
	},
	heracross: {
		num: 214,
		name: "Heracross",
		types: ["Bug", "Ghost"],
		baseStats: {hp: 75, atk: 95, def: 105, spa: 44, spd: 73, spe: 75},
		abilities: {0: "Poison Heal", 1: "Cursed Body"},
		heightm: 1.5,
		weightkg: 54,
		color: "Blue",
		eggGroups: ["Bug"],
	},
	magearna: {
		num: 801,
		name: "Magearna",
		types: ["Steel", "Fairy"],
		gender: "N",
		baseStats: {hp: 80, atk: 60, def: 90, spa: 85, spd: 100, spe: 50},
		abilities: {0: "Clear Body", 1: "Triage", H: "Pure Power"},
		heightm: 1,
		weightkg: 80.5,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	rotommow: {
		num: 479,
		name: "Rotom-Mow",
		types: ["Grass", "Psychic"],
		gender: "N",
		baseStats: {hp: 50, atk: 105, def: 107, spa: 50, spd: 107, spe: 86},
		abilities: {0: "Rough Skin", 1: "Chlorophyll", H: "Steelworker"},
		heightm: 0.3,
		weightkg: 0.3,
		color: "Red",
		eggGroups: ["Amorphous"],
	},
	malamar: {
		num: 687,
		name: "Malamar",
		types: ["Steel", "Psychic"],
		baseStats: {hp: 86, atk: 60, def: 78, spa: 100, spd: 75, spe: 73},
		abilities: {0: "Contrary", 1: "Suction Cups", H: "Analytic"},
		heightm: 1.5,
		weightkg: 47,
		color: "Blue",
		eggGroups: ["Water 1", "Water 2"],
	},
	wailord: {
		num: 321,
		name: "Wailord",
		types: ["Water", "Flying"],
		abilities: {0: "Oblivious", 1: "Pressure"},
		baseStats: {hp: 140, atk: 65, def: 70, spa: 88, spd: 82, spe: 55},
		heightm: 14.5,
		weightkg: 398,
		color: "Blue",
		eggGroups: ["Field", "Water 2"],
	},
	ludicolo: {
		num: 272,
		name: "Ludicolo",
		types: ["Water", "Grass"],
		baseStats: {hp: 80, atk: 60, def: 70, spa: 100, spd: 100, spe: 75},
		abilities: {0: "Swift Swim", 1: "Rain Dish", H: "Thick Fat"},
		heightm: 1.5,
		weightkg: 55,
		color: "Green",
		eggGroups: ["Water 1", "Grass"],
	},
	rotomheat: {
		num: 479,
		name: "Rotom-Heat",
		types: ["Fire", "Rock"],
		gender: "N",
		baseStats: {hp: 50, atk: 50, def: 97, spa: 105, spd: 127, spe: 76},
		abilities: {0: "Levitate", 1: "Flame Body", H: "Sand Stream"},
		heightm: 0.3,
		weightkg: 0.3,
		color: "Red",
		eggGroups: ["Amorphous"],
	},
};

exports.BattlePokedex = BattlePokedex;
