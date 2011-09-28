"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.init().hitsOn();
	var preload = {};
	preload.player = new Mibbu.spr('img/player.png', 30, 30, 0, 0),
	//preload.enemy = new Mibbu.spr('img/enemies.png', 30, 40, 0, 0),
	//preload.bullet = new Mibbu.spr('img/bullet.png', 2, 4, 1, 0),
	preload.background = new Mibbu.bg('img/bg_clouds.jpg', 6, 90, {x:0,y:0});

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
		//enemy = preload.enemy,
		//bullet = preload.bullet,
		background = preload.background;
/*
	enemy.width = 50;
	enemy.height = 50;
	enemy.flyingSpeed = 6;
	enemy.position(-enemy.width,-enemy.height, 4);
	enemy.hit(player, function() { GAME.Utils.GameOver('enemy'); });
	enemy.zone(5,5,5,5);
	enemy.speed(4);
*/
	var enemy_width = 30, enemy_height = 40;
	
	GAME.ACTIVE_BULLETS = 0;

	background.speed(0).dir(90).on();
	background.width = GAME_WIDTH;
	background.height = GAME_HEIGHT;

	player.width = 30;
	player.height = 30;
	player.position(~~((background.width-player.width)/2), background.height-player.height, 5).speed(0);
	player.zone(5,5,5,5);

	GAME.BULLETS = [];
	GAME.ENEMIES = [];

	for(var b = 0; b < GAME.Config.bulletLimit; b++) {
		GAME.BULLETS.push(GAME.Utils.NewBullet(player));
	}
	
	GAME.Config.enemyCount = GAME.Config.enemyHeight*GAME.Config.enemyWidth;
	var diff = parseInt((background.width-(GAME.Config.enemyWidth*(enemy_width+10)))/2),
		enemyCounter = 0;
	for(var i = 0; i < GAME.Config.enemyHeight; i++) {
		for(var j = 0; j < GAME.Config.enemyWidth; j++) {
			var posX = j*(enemy_width+10)+diff,
				posY = i*(enemy_height+10);
			GAME.ENEMIES[enemyCounter] = GAME.Utils.NewEnemy(posX, posY);
			enemyCounter++;
		}
	}
	
	GAME.Config.active = true;
	Mibbu.on();
	
	var gameLoop = function(){
		GAME.keyboard.frame(player,background);

		var actSpeed = background.speed(),
			actHeight = GAME.Config.height,
			actBgHeight = background.position().y;

		GAME._id('height').innerHTML = parseFloat(actHeight).toFixed(1);
		GAME._id('speed').innerHTML = parseFloat(actSpeed).toFixed(1);

		if(actHeight < 0) {
			GAME.Utils.GameOver('crash');
		}

		if(GAME.ACTIVE_BULLETS) {
			for(var b=0; b<GAME.ACTIVE_BULLETS; b++) {
				var newY = GAME.BULLETS[b].position().y -= GAME.Config.bulletSpeed;
				GAME.BULLETS[b].position(GAME.BULLETS[b].position().x, newY);
			}
		}
		GAME.Config.height = actHeight;

		/* ENEMY MOVEMENT */
		var enemies_direction_x = 1,
			enemies_direction_y = 0;
		
		for(var i = 0; i < GAME.Config.enemyCount; i++) {
			if(GAME.ENEMIES[i].position().x > background.width) {
				enemies_direction_x = -1;
				break;
			}
			else if(GAME.ENEMIES[i].position().x < 0) {
				enemies_direction_x = 1;
				break;
			}
		}
		
		for(var i = 0; i < GAME.Config.enemyCount; i++) {
			GAME.ENEMIES[i].position(GAME.ENEMIES[i].position().x += enemies_direction_x, GAME.ENEMIES[i].position().y += enemies_direction_y);
		}
	}
	Mibbu.hook(gameLoop);
};