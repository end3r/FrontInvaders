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
	//bulletLag: 5,
	enemyWidth: 12,
	enemyHeight: 5,
	pointsDiff: 100,
	
	msg: {
		pausedTitle: "<h2>PAUSED</h2>",
		pausedText: "<p>Press spacebar again to get back to the game.</p><p>Or go to the <a href=''>main menu</a>?</p>",
		nextLevelTitle: "<h2>Next level!</h2>",
		nextLevelText: "<p>Congratulations, You killed all of the al_IE_ns and reached next level!</p><p>Press spacebar to continue!</p>",
		congratulations: "<p>Congratulations, you've reached <span>#</span> metres!</p>",
		gameOver: "<h1>GAME OVER!</h1>",
		tryAgain: "<p><a href=''>Try again?</a></p>"
	}
};