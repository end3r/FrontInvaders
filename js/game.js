"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.init().hitsOff();
	var preload = {};
	preload.player = new Mibbu.spr('img/player.png', 40, 40, 0, 1),
	preload.enemies = new Mibbu.spr('img/enemies.png', 30, 30, 1, 2),
	//preload.bullet = new Mibbu.spr('img/bullet.png', 2, 4, 1, 0),
	preload.explosion = new Mibbu.spr('img/explosion.png', 30, 120, 0, 3),
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
		explosion = preload.explosion,
		background = preload.background;

	enemies.position(-30, -30, 4).speed(0);
	explosion.position(-40,-40).speed(0);
	
	var enemy_width = 30, enemy_height = 30;

	background.speed(0).dir(90).on();
	background.width = GAME_WIDTH;
	background.height = GAME_HEIGHT;
	GAME.background = background;

	player.width = 40;
	player.height = 40;

	GAME.frameCount = 0;
	GAME.enemyDirX = 7;
	GAME.enemyDirY = 0;
	GAME.enemyWidth = 30;
	
	GAME.player = player;
	GAME.player.lives = 3;
	GAME.player.points = 0;
	GAME.player.level = 1;
	
	// new level
	GAME.Utils.newLevel();

	GAME.Config.active = true;
	Mibbu.on();
	
	var gameLoop = function(){
		GAME.frameCount++;
		GAME.keyboard.frame(player,background);

		GAME._id('points').innerHTML = GAME.player.points;
		GAME._id('lives').innerHTML = GAME.player.lives;
		GAME._id('level').innerHTML = GAME.player.level;

		if(GAME.BULLETS.length) {
			for(var b=0; b<GAME.BULLETS.length; b++) {
				var newY = GAME.BULLETS[b].position().y -= GAME.Config.bulletSpeed;
				if(newY <= 0) {
					GAME.BULLETS.splice(b,1);
					//console.log('bullet removed, len = '+GAME.BULLETS.length);
				}
				else {
					GAME.BULLETS[b].top = newY;
					GAME.BULLETS[b].position(GAME.BULLETS[b].position().x, newY);
				}
			}
		}

		/* ENEMY MOVEMENT */
		if(!(GAME.frameCount % (30-4*(GAME.player.level-1)))){
			var offScreenRight = false,
				offScreenLeft = false;
			for(var i = 0; i < GAME.ENEMIES.length; i++) {
				if(GAME.ENEMIES[i].position().x > background.width-2*GAME.enemyWidth) {
					offScreenRight = true;
				}
				if(GAME.ENEMIES[i].position().x < GAME.enemyWidth) {
					offScreenLeft = true;
				}
			}
			if(offScreenLeft || offScreenRight) {
				GAME.enemyDirX = -GAME.enemyDirX;
				GAME.enemyDirY += 15;
			}
			for(var i = 0; i < GAME.ENEMIES.length; i++) {
				GAME.ENEMIES[i].position(GAME.ENEMIES[i].position().x += GAME.enemyDirX, GAME.ENEMIES[i].position().y += GAME.enemyDirY);
				GAME.ENEMIES[i].left += GAME.enemyDirX;
				GAME.ENEMIES[i].top += GAME.enemyDirY;
			}
			GAME.enemyDirY = 0;
		}
	}
	Mibbu.hook(gameLoop);
	Mibbu.hook(GAME.collisionDetection.checkAll);
};