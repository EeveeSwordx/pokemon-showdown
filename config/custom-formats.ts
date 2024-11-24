use strict';

exports.Formats = [
  // First custom mod
  {
    name: "[Gen 9] Infernal Fakemon",
    desc: "Custom Fakemon from Infernal.",
    mod: 'infernalborn', // Folder name in `mods/` directory for this mod
    ruleset: ['Standard'], // Optional: Define rules like 'Standard', 'Dynamax Clause', etc.
    banlist: ['Uber', 'Moody', 'Power Construct', 'Arena Trap'], // Optional: Specify banned elements
  },
  
  // Second custom mod
  {
    name: "[Gen 9] Is this showing up",
    desc: "Another custom Pokémon mod with unique Pokémon.",
    mod: 'gen1rbycap', // Folder name in `mods/` directory for this mod
    ruleset: ['Standard', 'Dynamax Clause'], // Optional: Define rules
    banlist: ['Shadow Tag', 'Baton Pass'], // Optional: Specify banned elements
  },
];
