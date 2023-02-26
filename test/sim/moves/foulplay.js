'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;
describe('Foul Play', function () {
	afterEach(function () {
		battle.destroy();
	});
    it(`should use target's Attack stat`, function () {
		battle = common.createBattle([[
			{species: "Chansey", moves: ['foulplay']},
		], [
			{species: "Deoxys-Attack", moves: ['splash']},
		]]);
		battle.makeChoices('move 1', 'move 1');
        assert.fainted(battle.p2.active[0]);
	});
    it(`should use target's Attack stat changes`, function () {
		battle = common.createBattle([[
			{species: "Chansey", moves: ['splash', 'foulplay']},
		], [
			{species: "Deoxys-Defense", moves: ['swordsdance']},
		]]);
		battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 2', 'move 1');
        assert.fainted(battle.p2.active[0]);
	});
    it(`should not use user's Attack stat changes`, function () {
		battle = common.createBattle([[
			{species: "Chansey", moves: ['swordsdance', 'foulplay']},
		], [
			{species: "Deoxys-Defense", moves: ['splash']},
		]]);
		battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 2', 'move 1');
        assert.false.fainted(battle.p2.active[0]);
	});
    it(`should not use Unaware target's Attack stat changes`, function () {
		battle = common.createBattle([[
			{species: "Chansey", moves: ['splash', 'foulplay']},
		], [
			{species: "Deoxys-Defense", moves: ['swordsdance'], ability: 'unaware'},
		]]);
		battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 1', 'move 1');
        battle.makeChoices('move 2', 'move 1');
        assert.false.fainted(battle.p2.active[0]);
	});
});
