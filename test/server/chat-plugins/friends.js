/**
* Tests for the friends list chat plugin. By Mia
* @author mia-pi-git
*/
'use strict';

const {FriendsDatabase} = require('../../../.server-dist/friends');
const {Config} = require('../../../.server-dist/config-loader');
const assert = require('../../assert');

const test = (Config.usesqlite ? it : it.skip);

describe("Friends lists", () => {
	test("Should properly setup database", () => {
		assert.doesNotThrow(() => new FriendsDatabase(':memory:'));
	});
});
