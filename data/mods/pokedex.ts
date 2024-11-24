export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
    grillunt: {
        num: -1001,
        name: "Grillunt",
        types: ["Normal", "Fighting"],
        baseStats: {hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50}, // Placeholder stats
        abilities: {0: "Moxie", 1: "Guts", H: "Reckless"},
        heightm: 0.6,
        weightkg: 12.5,
        evos: ["Bauxbun"],
    },
    bauxbun: {
        num: -1002,
        name: "Bauxbun",
        types: ["Normal", "Fighting"],
        baseStats: {hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70}, // Placeholder stats
        abilities: {0: "Moxie", 1: "Guts", H: "Reckless"},
        heightm: 1.0,
        weightkg: 35.0,
        prevo: "Grillunt",
        evos: ["Stackaroo"],
        evoLevel: 20,
    },
    stackaroo: {
        num: -1003,
        name: "Stackaroo",
        types: ["Normal", "Fighting"],
        baseStats: {hp: 90, atk: 120, def: 90, spa: 60, spd: 80, spe: 80}, // Placeholder stats
        abilities: {0: "Moxie", 1: "Guts", H: "Reckless"},
        heightm: 1.8,
        weightkg: 95.0,
        prevo: "Bauxbun",
        evoLevel: 36,
    },
    oppohide: {
        num: -1004,
        name: "Oppohide",
        types: ["Normal"],
        baseStats: {hp: 55, atk: 55, def: 50, spa: 40, spd: 50, spe: 60}, // Placeholder stats
        abilities: {0: "Contrary", 1: "Guts"},
        heightm: 0.9,
        weightkg: 20.0,
        evos: ["Oppapunch"],
    },
    oppapunch: {
        num: -1005,
        name: "Oppapunch",
        types: ["Normal", "Fighting"], // Changes based on gender
        baseStats: {hp: 85, atk: 105, def: 80, spa: 50, spd: 80, spe: 85}, // Placeholder stats
        abilities: {0: "Contrary", 1: "Guts"},
        heightm: 1.4,
        weightkg: 48.0,
        prevo: "Oppohide",
        evoLevel: 30,
    },
    rhampino: {
        num: -1006,
        name: "Rhampino",
        types: ["Rock", "Dragon"],
        baseStats: {hp: 85, atk: 130, def: 100, spa: 60, spd: 70, spe: 85}, // Placeholder stats
        abilities: {0: "Rampant"}, // New ability
        heightm: 2.0,
        weightkg: 180.0,
    },
    pyufyn: {
        num: -1007,
        name: "Pyufyn",
        types: ["Poison"],
        baseStats: {hp: 70, atk: 50, def: 60, spa: 95, spd: 80, spe: 75}, // Placeholder stats
        abilities: {0: "Berserk", 1: "Thick Fat", H: "Merciless"},
        heightm: 0.7,
        weightkg: 22.0,
    },
    chillup: {
        num: -1008,
        name: "Chillup",
        types: ["Ice"],
        baseStats: {hp: 50, atk: 65, def: 50, spa: 50, spd: 55, spe: 75}, // Placeholder stats
        abilities: {0: "Thick Fat", H: "Packmate"},
        heightm: 0.8,
        weightkg: 16.0,
        evos: ["Fenrusk"],
    },
    fenrusk: {
        num: -1009,
        name: "Fenrusk",
        types: ["Dark", "Ice"],
        baseStats: {hp: 80, atk: 110, def: 70, spa: 75, spd: 70, spe: 105}, // Placeholder stats
        abilities: {0: "Thick Fat", H: "Packmate"}, // New ability
        heightm: 1.5,
        weightkg: 40.0,
        prevo: "Chillup",
        evoLevel: 35,
    },
    hurtia: {
        num: -1010,
        name: "Hurtia",
        types: ["Water", "Bug"],
        baseStats: {hp: 70, atk: 95, def: 60, spa: 55, spd: 70, spe: 105}, // Placeholder stats
        abilities: {0: "Compound Eyes", 1: "Anger Shell", H: "Swift Swim"},
        heightm: 1.0,
        weightkg: 28.0,
    },
};