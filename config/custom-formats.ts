exports.Formats = [

	
  {
	 section: "Sworddown Formats",
  },
  {
    name: "Roleplay Standard",
    desc: "Custom Fakemon from Infernal.",
    mod: 'infernalborn', // Folder name in `mods/` directory for this mod
    ruleset: ['Standard'], // Optional: Define rules like 'Standard', 'Dynamax Clause', etc.
    banlist: ['Uber'], // Optional: Specify banned elements
  },
  {
    name: "Monotype",
    desc: "Only one type allowed",
    mod: 'infernalborn', // Folder name in `mods/` directory for this mod
    ruleset: ['Standard', 'Dynamax Clause'], // Optional: Define rules
    banlist: ['Shadow Tag', 'Baton Pass'], // Optional: Specify banned elements
  },
  {
    name: "Random Battle",
    desc: "Randomized Teams",
    mod: 'infernalborn', // Folder name in `mods/` directory for this mod
   team: 'random',
    ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod'], // Optional: Define rules
    banlist: ['Shadow Tag', 'Baton Pass'], // Optional: Specify banned elements
  },
  {
    name: "Anything Goes",
    desc: "Basically no rules",
    mod: 'infernalborn', // Folder name in `mods/` directory for this mod
  },
];
