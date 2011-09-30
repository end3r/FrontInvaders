GAME.Config = {
	input: {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SHOOT: 90,
		PAUSE: 32,
		START: 13
	},

	active: false,
	level: 0,
	moveInterval: 3,
	bulletSpeed: 3,
	bulletLimit: 5,
	enemyWidth: 10,
	enemyHeight: 3,
	uniqueID: 0,
	
	msg: {
		pausedTitle: "<h2>PAUSED</h2>",
		pausedText: "<p>Press spacebar again to get back to the game.</p><p>Or go to the <a href=''>main menu</a>?</p>",
		congratulations: "<p>Congratulations, you've reached <span>#</span> metres!</p>",
		gameOver: "<h1>GAME OVER!</h1>",
		tryAgain: "<p><a href=''>Try again?</a></p>"
	}
};