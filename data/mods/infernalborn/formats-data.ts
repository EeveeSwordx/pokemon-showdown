'use strict';

/** @type {{[k: string]: ModdedSpeciesData}} */
export const FormatsData: {[k: string]: ModdedSpeciesData} = {
    ankyladus: {
        // General species information
        num: 9001, // Unique species number for Ankyladus (make sure it's not taken)
        name: "Ankyladus",
        types: ["Rock", "Steel"], // Example typing for Ankyladus
        baseStats: {
            hp: 90,
            atk: 120,
            def: 160,
            spa: 50,
            spd: 70,
            spe: 40,
        },
        abilities: {
            0: "Solid Rock",  // Example ability: reduces damage from super-effective moves by 50%
            1: "Sturdy", // Example ability: prevents from being knocked out in one hit if HP is full
        },
        heightm: 2, // Example height (in meters)
        weightkg: 250, // Example weight (in kilograms)
        color: "Gray", // Example color for Ankyladus
        // Additional mechanics, such as signature moves or custom interactions, can be defined here.
        genderRatio: {M: 0.5, F: 0.5}, // Gender ratio (adjust as needed)
        eggGroups: ["Monster", "Field"], // Example egg groups

        // Custom moves or special features
        learnset: {
            // Define special moves Ankyladus can learn
            rockslide: ["5L1"], // Example: Rock Slide at level 1
            ironhead: ["5L1"],  // Example: Iron Head at level 1
            bodypress: ["5L1"], // Example: Body Press at level 1 (for physical defense)
            // Add any special moves or adjustments here
        },
        
        // Custom forms or other formats
        // This section allows Ankyladus to have different forms for different scenarios
        forme: "Ankyladus",  // Regular form; adjust if there are multiple forms
        formeOrder: ["Ankyladus"], // Example: if Ankyladus has multiple forms like Mega or Gmax

        // Custom battle mechanics (if any)
        isNonstandard: "Custom", // Specify if the Pokémon is part of a custom format
    },
};
