"use strict";

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
    ankylite: {
        num: 2001,  // Unique positive number
        name: "Ankylite",
        types: ["Rock", "Fighting"],
        baseStats: {hp: 60, atk: 100, def: 80, spa: 30, spd: 50, spe: 20},
        abilities: {0: "Battle Armor", 1: "Defiant", H: "Rock Head"},
        heightm: 1.2,
        weightkg: 2254.3,
        evo: "Ankyladus",  // Corrected to 'evo'
        eggGroups: ["Monster"],
    },
    ankyladus: {
        num: 2002,  // Unique positive number
        name: "Ankyladus",
        types: ["Rock", "Fighting"],
        baseStats: {hp: 80, atk: 150, def: 120, spa: 50, spd: 70, spe: 30},
        abilities: {0: "Battle Armor", 1: "Defiant", H: "Rock Head"},
        heightm: 2.5,
        weightkg: 4535.9,
        prevo: "Ankylite",  // Correctly set prevo
        evoLevel: 45,       // Evolution level
        eggGroups: ["Monster"],
    },
};
