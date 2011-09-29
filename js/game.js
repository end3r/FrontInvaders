"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.init().hitsOn();
	var preload = {};
	preload.player = new Mibbu.spr('img/player.png', 20, 20, 0, 0),
	preload.enemies = new Mibbu.spr('img/enemies.png', 20, 20, 1, 2),
	//preload.bullet = new Mibbu.spr('img/bullet.png', 2, 4, 1, 0),
	preload.background = new Mibbu.bg('img/bg.jpg', 6, 90, {x:0,y:0});

	GAME.keyboard = new GAME.Input();
	var menu = GAME._id('menu');
	GAME._tag('h1', menu).onclick = function() { GAME.Menu('game', preload); };
	GAME._tag('h2', menu).onclick = function() { GAME.Menu('instructions'); };
	GAME._tag('h3', menu).onclick = function() { GAME.Menu('about'); };
	GAME.Utils.LinkBackToMenu('howTo');
	GAME.Utils.LinkBackToMenu('about');
	
	GAME._id('container').style.width = GAME_WIDTH;
	GAME._id('container').style.height = GAME_HEIGHT;
};

GAME.Menu = function(id, preload) {
	switch(id) {
		case 'game': {
			GAME._id('game').style.zIndex = '20';
			GAME._id('statbar').style.zIndex = '21';
			GAME.Start(preload);
			break;
		}
		case 'instructions': {
			GAME._id('howTo').style.zIndex = '20';
			break;
		}
		case 'about': {
			GAME._id('about').style.zIndex = '20';
			break;
		}
		default: {;}
	}
};

GAME.Start = function(preload) {
	window.focus();
	var	player = preload.player,
		enemies = preload.enemies,
		//bullet = preload.bullet,
		background = preload.background;

	enemies.position(-20, -20, 4);
	enemies.speed(0);
	
	var enemy_width = 20, enemy_height = 20;
	
	GAME.ACTIVE_BULLETS = 0;

	background.speed(0).dir(90).on();
	background.width = GAME_WIDTH;
	background.height = GAME_HEIGHT;

	player.width = 20;
	player.height = 20;
	player.position(~~((background.width-player.width)/2), background.height-player.height-5, 5).speed(0);

	GAME.BULLETS = [];
	GAME.ENEMIES = [];
	GAME.frameCount = 0;
	GAME.enemyDirX = 7;
	GAME.enemyDirY = 0;
	GAME.enemyWidth = 20;
	
	GAME.player = player;
	GAME.player.level = 1;
	GAME.player.lives = 3;
	GAME.player.points = 0;

	for(var b = 0; b < GAME.Config.bulletLimit; b++) {
		GAME.BULLETS.push(GAME.Utils.NewBullet(player));
	}
	
	GAME.Config.enemyCount = GAME.Config.enemyHeight*GAME.Config.enemyWidth;
	var diff = parseInt((background.width-(GAME.Config.enemyWidth*(enemy_width+10)))/2),
		enemyCounter = 0,
		panel = 30;
	for(var i = 0; i < GAME.Config.enemyHeight; i++) {
		for(var j = 0; j < GAME.Config.enemyWidth; j++) {
			var posX = j*(enemy_width+10)+diff,
				posY = i*(enemy_height+10)+panel;
			GAME.ENEMIES[enemyCounter] = GAME.Utils.NewEnemy(posX, posY, i);
			enemyCounter++;
		}
	}
	
	GAME.Config.active = true;
	Mibbu.on();
	
	var gameLoop = function(){
		GAME.frameCount++;
		GAME.keyboard.frame(player,background);

		GAME._id('points').innerHTML = GAME.player.points;
		GAME._id('lives').innerHTML = GAME.player.lives;
		GAME._id('level').innerHTML = GAME.player.level;

		if(GAME.ACTIVE_BULLETS) {
			for(var b=0; b<GAME.ACTIVE_BULLETS; b++) {
				var newY = GAME.BULLETS[b].position().y -= GAME.Config.bulletSpeed;
				GAME.BULLETS[b].position(GAME.BULLETS[b].position().x, newY);
			}
		}

		/* ENEMY MOVEMENT */
		/*if(!(GAME.frameCount%100)) { GAME.enemyDirY += 5; console.log('fC'); }*/
		if(!(GAME.frameCount % 30)){

		var offScreenRight = false,
			offScreenLeft = false;
		for(var i = 0; i < GAME.Config.enemyCount; i++) {
			if(GAME.ENEMIES[i].position().x > background.width-2*GAME.enemyWidth) {
				offScreenRight = true;
			}
			if(GAME.ENEMIES[i].position().x < GAME.enemyWidth) {
				offScreenLeft = true;
			}
		}
		if(offScreenLeft || offScreenRight) {
			GAME.enemyDirX = -GAME.enemyDirX;
			GAME.enemyDirY += 10;
		}
			
		for(var i = 0; i < GAME.Config.enemyCount; i++) {
			GAME.ENEMIES[i].position(GAME.ENEMIES[i].position().x += GAME.enemyDirX, GAME.ENEMIES[i].position().y += GAME.enemyDirY);
		}
		GAME.enemyDirY = 0;
		
		}
	}
	Mibbu.hook(gameLoop);
};