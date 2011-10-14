GAME.Config = {
	input: {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SHOOT: 90, /* Z */
		PAUSE: 32, /* spacebar */
		START: 13, /* enter */
		CHANGE: 67 /* C */
	},

	active: false,
	level: 0,
	moveInterval: 3,
	bulletSpeed: 4,
	bulletLimit: 5,
	enemyWidth: 12,
	enemyHeight: 5,
	pointsDiff: 100
};

GAME.Lang = [];
GAME.Lang['pl'] = { /* maybe later */ };
GAME.Lang['en'] = {
	pausedTitle: "PAUSED",
	pausedText: "Press <strong>spacebar</strong> again to get back to the game!<br />You can also return to the <a href=''>main menu</a>.",
	nextLevelTitle: "NEXT LEVEL",
	nextLevelText: "Congratulations, You've killed all of the aliens!<br />Press <strong>spacebar</strong> to continue!",
	killedTitle: "PLAYER KILLED",
	killedText: "You were killed by the aliens! Press <strong>spacebar</strong> to repeat the level!",
	unlockedTitle: "NEW ROCKET",
	unlockedText: "You've reached level X and unlocked new rocket!<br />Press <strong>spacebar</strong> to continue!",
	endTitle: "CONGRATULATIONS",
	endText: "You've scored X points! Who's awesome? You're awesome!"
};