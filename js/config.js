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
GAME.Lang['pl'] = { /* later */ };
GAME.Lang['en'] = {
	pausedTitle: "PAUSED",
	pausedText: "Press <strong>spacebar</strong> again to get back to the game.<br />You can also return to the <a href=''>main menu</a>.",
	nextLevelTitle: "NEXT LEVEL",
	nextLevelText: "Congratulations, You've killed all of the aliens!<br />Press <strong>spacebar</strong> to continue!",
	repeatLevelTitle: "Oh noes!",
	repeatLevelText: "You were killed by the al_IE_ns!Press spacebar to continue!",
	congratulations: "Congratulations, you've got <span>#</span> points!",
	tryAgain: "<a href=''>Try again?</a>",
	killedTitle: "Player KILLED! ;(",
	killedText: "Player KILLED! ;(",
	unlocked: "You've reached level 5 and unlocked new rocket!",
	winTitle: "We have a winner!",
	winText: "You've reached level 10 and won the game! Who's awesome? You're awesome!"
};