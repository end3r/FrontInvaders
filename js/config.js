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
	pointsDiff: 100
};

GAME.Lang = [];
GAME.Lang['pl'] = {
		pausedTitle: "<h2>PAUZA</h2>",
		pausedText: "<p>Naciśnij spację ponownie, by wrócić do gry.</p><p>Lub wróć do <a href=''>menu głównego</a>?</p>",
		nextLevelTitle: "<h2>Następny poziom!</h2>",
		nextLevelText: "<p>Gratulacje, zabiłeś wszystkie badzIEwia i przeszedłeś na kolejny poziom!</p><p>Naciśnij spację, by kontynuować!</p>",
		repeatLevelTitle: "<h2>O nie!</h2>",
		repeatLevelText: "<p>Zostałeś zabity przez badzIEwia!</p><p>Naciśnij spację, by kontynuować!</p>",
		congratulations: "<p>Gratulacje, zdobyłeś # punktów!</p>",
		gameOver: "<h1>KONIEC GRY!</h1>",
		tryAgain: "<p><a href=''>Jeszcze raz?</a></p>",
		killedTitle: "Troop! ;(",
		killedText: "Troop! ;(",
		unlocked: "Osiągnąłeś poziom 5, otrzymujesz nową rakietę!",
		winTitle: "<h2>We have a winner!</h2>",
		winText: "<p>You've reached level 10 and won the game! Who's awesome? You're awesome!</p>"
};
GAME.Lang['en'] = {
		pausedTitle: "<h2>PAUSED</h2>",
		pausedText: "<p>Press spacebar again to get back to the game.</p><p>Or go to the <a href=''>main menu</a>?</p>",
		nextLevelTitle: "<h2>Next level!</h2>",
		nextLevelText: "<p>Congratulations, You killed all of the al_IE_ns and reached next level!</p><p>Press spacebar to continue!</p>",
		repeatLevelTitle: "<h2>Oh noes!</h2>",
		repeatLevelText: "<p>You were killed by the al_IE_ns!</p><p>Press spacebar to continue!</p>",
		congratulations: "<p>Congratulations, you've got <span>#</span> points!</p>",
		gameOver: "<h1>GAME OVER!</h1>",
		tryAgain: "<p><a href=''>Try again?</a></p>",
		killedTitle: "Player KILLED! ;(",
		killedText: "Player KILLED! ;(",
		unlocked: "You've reached level 5 and unlocked new rocket!",
		winTitle: "<h2>We have a winner!</h2>",
		winText: "<p>You've reached level 10 and won the game! Who's awesome? You're awesome!</p>"
};