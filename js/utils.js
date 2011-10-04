GAME.Utils = {};

GAME.$id = function(id) { return document.getElementById(id); };
GAME.$tag = function(tag, container) { return (container || document).getElementsByTagName(tag)[0]; };

GAME.Utils.Alert = function(title, message) {
	var div = GAME.$id('message');
	if(title) { // show
		div.style.zIndex = '20';
		div.innerHTML = '<div class="box">'+title+message+'</div><div class="shadow"></div>';
	}
	else { // hide
		div.style.zIndex = '5';
	}
};

GAME.Utils.GameOver = function(what) {
	var msg = '',
		score = parseFloat(GAME.Config.height).toFixed(1),
		defaultMsg = '<p>'+(GAME.Config.msg.congratulations).replace('#',score)+'</p>';

	switch(what) {
		case 'player': {
			msg = 'OMGZORD Y U NO AVOID ENEMY?';
			break;
		}
		case 'enemy': {
			msg = 'OMGZORD Y U NO AVOID BULLET?';
			break;
		}
		default: { msg = defaultMsg; }
	}
	Mibbu.off();
	GAME.Utils.Alert(GAME.Config.msg.gameOver, msg+GAME.Config.msg.tryAgain);
};

GAME.Utils.NewBullet = function() {
	var posX = GAME.player.position().x + parseInt(GAME.player.width/2)-1,
		posY = GAME.player.position().y;
	var newBullet = new Mibbu.spr('img/bullet.png', 2, 4, 0, 0);
	newBullet.width = 2;
	newBullet.height = 4;
	newBullet.left = posX;
	newBullet.top = posY;
	newBullet.hit = true;
	newBullet.position(posX, posY, 2).speed(0);
	for(var e=0; e<GAME.ENEMIES.length; e++) {
		GAME.CollisionDetection.Add(newBullet, GAME.ENEMIES[e]);
	}
	GAME.state.points -= 10;
	return newBullet;
};

GAME.Utils.NewEnemy = function(posX, posY, type) {
	var newEnemy = new Mibbu.spr('img/enemies.png', GAME.enemy.width, GAME.enemy.height, 1, 2);
	newEnemy.animation(type%3);
	newEnemy.position(posX, posY, 2).speed(30);
	newEnemy.movement = 0;
	//newEnemy.hit = (type%2) ? true : false;
	newEnemy.hit = true;
	newEnemy.width = GAME.enemy.width;
	newEnemy.height = GAME.enemy.height;
	newEnemy.left = posX;
	newEnemy.top = posY;
	return newEnemy;
};

GAME.Utils.LinkBackToMenu = function(id) {
	GAME.$id(id).onclick = function() {
		GAME.$id(id).style.zIndex = '5';
	};
};
/*
GAME.Utils.PlusMinus = function() {
	return (~~(Math.random()*2)*2)-1;
};
*/
GAME.Utils.NewLevel = function() {
	var diff = parseInt((GAME.background.width-(GAME.Config.enemyWidth*(GAME.enemy.width+10)))/2),
		enemyCounter = 0;

	GAME.player.position(~~((GAME.background.width-GAME.player.width)/2),
		GAME.background.height-GAME.player.height-GAME.state.borderBottom, 5).speed(0);
	GAME.BULLETS = [];
	GAME.ENEMIES = [];
	GAME.Config.enemyHeight = GAME.state.level;

	for(var i = 0; i < GAME.Config.enemyHeight; i++) {
		for(var j = 0; j < GAME.Config.enemyWidth; j++) {
			var posX = j*(GAME.enemy.width+10)+diff,
				posY = i*(GAME.enemy.height+10)+GAME.state.borderTop;
			GAME.ENEMIES[enemyCounter] = GAME.Utils.NewEnemy(posX, posY, i);
			enemyCounter++;
		}
	}
};

/* Collision Detection */
GAME.CollisionDetection = function() {};
GAME.CollisionDetection.table = [];

GAME.CollisionDetection.Add = function(obj1, obj2) {
	GAME.CollisionDetection.table.push({obj1:obj1, obj2:obj2});
};
GAME.CollisionDetection.CheckAll = function() {
	var t = GAME.CollisionDetection.table;
	if(t && t.length) {
		for (var i=0; i<t.length; i++) {
			var obj1 = t[i].obj1,
				obj2 = t[i].obj2,
				fn = t[i].fn;
			var o1_Top = obj1.top,
				o1_Bottom = obj1.top+obj1.height,
				o1_Left = obj1.left,
				o1_Right = obj1.left+obj1.width,
				o2_Top = obj2.top,
				o2_Bottom = obj2.top+obj2.height,
				o2_Left = obj2.left,
				o2_Right = obj2.left+obj2.width;

			if( !( (o1_Top <= o2_Top) || (o1_Bottom >= o2_Bottom)
				|| (o1_Left <= o2_Left) || (o1_Right >= o2_Right) ) && obj1.hit && obj2.hit ) {
				for(var i=0; i<GAME.BULLETS.length; i++) {
					if(GAME.BULLETS[i].id() == obj1.id()) {
						GAME.BULLETS[i].top = -50;
						GAME.BULLETS[i].position(200,-50);
						GAME.BULLETS.splice(i,1);
					}
				}
				var enemyTab = [];
				for(var i=0; i<GAME.ENEMIES.length; i++) {
					if(GAME.ENEMIES[i].id() == obj2.id()) {
						var enemy = GAME.ENEMIES[i];
						enemy.change('img/explosion.png', 30, 30, 0, 3);
						enemy.speed(5).animation(0).frame(-1).zone(30,30,0,0);
						GAME.state.points += GAME.Config.pointsDiff;
						enemy.callback(function(){
							enemy.top = -enemy.height;
							enemy.position(enemy.position().x,enemy.top);
							enemy.callback(function(){},1000);
							if(!GAME.ENEMIES.length) {
								GAME.state.level += 1;
								GAME.Utils.NewLevel();
								var unlock = '';
								if(GAME.player.level == 5) {
									unlock = "You've reached level 5 and unlocked new rocket!";
									var anim = GAME.player.animation();
									GAME.player.animation((anim += 1) % 2);
								}
								if(GAME.player.level == 10) {
									var winTitle = "<h2>We have a winner!</h2>",
										winText = "<p>You've reached level 10 and won the game! Who's awesome? You're awesome!</p>";
									GAME.Utils.Alert(winTitle, winText);
									GAME.Config.active = false;
									Mibbu.off();
								}
								GAME.Utils.Alert(GAME.Config.msg.nextLevelTitle, GAME.Config.msg.nextLevelText+unlock);
								GAME.Config.active = false;
								Mibbu.off();
							}
						}, 1);
					}
					else {
						enemyTab.push(GAME.ENEMIES[i]);
					}
				}
				GAME.ENEMIES = enemyTab;
			}
		}
	}
};