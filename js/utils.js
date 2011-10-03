GAME.Utils = {};

GAME._id = function(id) { return document.getElementById(id); };
GAME._tag = function(tag, container) { return (container || document).getElementsByTagName(tag)[0]; };

GAME.Utils.Alert = function(title, message) {
	var div = GAME._id('message');
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

GAME.Utils.NewBullet = function(player) {
	var posX = player.position().x + parseInt(player.width/2)-1,
		posY = player.position().y;
	var newBullet = new Mibbu.spr('img/bullet.png', 2, 4, 0, 0);
	newBullet.width = 2;
	newBullet.height = 4;
	newBullet.left = posX;
	newBullet.top = posY;
	newBullet.position(posX, posY, 2).speed(0);
	//console.log('new bullet ID: '+newBullet.id());
	for(var e=0; e<GAME.ENEMIES.length; e++) {
		GAME.collisionDetection.add(newBullet, GAME.ENEMIES[e], GAME.hitObj );
	}
	GAME.player.points -= 10;
	return newBullet;
};

//GAME.hitObj = function(){ console.log('HIT!'); }

GAME.Utils.NewEnemy = function(posX, posY, type) {
	var newEnemy = new Mibbu.spr('img/enemies.png', 30, 30, 1, 2);
	newEnemy.animation(type%3);
	newEnemy.position(posX, posY, 2).speed(30);
	newEnemy.movement = 0;
	newEnemy.width = 30;
	newEnemy.height = 30;
	newEnemy.left = posX;
	newEnemy.top = posY;
	return newEnemy;
};

GAME.Utils.LinkBackToMenu = function(id) {
	GAME._id(id).onclick = function() {
		GAME._id(id).style.zIndex = '5';
	};
};

GAME.Utils.PlusMinus = function() {
	return (~~(Math.random()*2)*2)-1;
};

GAME.Utils.newLevel = function() {
	var enemy_width = 30, enemy_height = 30;
	var diff = parseInt((GAME.background.width-(GAME.Config.enemyWidth*(enemy_width+10)))/2),
		enemyCounter = 0,
		panel = 70;

	GAME.player.position(~~((GAME.background.width-GAME.player.width)/2), GAME.background.height-GAME.player.height-15, 5).speed(0);
	GAME.BULLETS = [];
	GAME.ENEMIES = [];
	GAME.Config.enemyHeight = GAME.player.level;

	for(var i = 0; i < GAME.Config.enemyHeight; i++) {
		for(var j = 0; j < GAME.Config.enemyWidth; j++) {
			var posX = j*(enemy_width+10)+diff,
				posY = i*(enemy_height+10)+panel;
			GAME.ENEMIES[enemyCounter] = GAME.Utils.NewEnemy(posX, posY, i);
			enemyCounter++;
		}
	}
};

/* Collision Detection */
GAME.collisionDetection = function() {};
GAME.collisionDetection.table = [];

GAME.collisionDetection.add = function(obj1, obj2) {
	GAME.collisionDetection.table.push({obj1:obj1, obj2:obj2});
};
GAME.collisionDetection.checkAll = function() {
	var t = GAME.collisionDetection.table;
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

			if( !( (o1_Top <= o2_Top) || (o1_Bottom >= o2_Bottom) || (o1_Left <= o2_Left) || (o1_Right >= o2_Right) ) ) {
				for(var i=0; i<GAME.BULLETS.length; i++) {
					if(GAME.BULLETS[i].id() == obj1.id()) {
						GAME.BULLETS[i].top = -50;
						//GAME.BULLETS[i].left = -50;
						GAME.BULLETS[i].position(200,-50);
						GAME.BULLETS.splice(i,1);
					}
				}
				var enemyTab = [];
				for(var i=0; i<GAME.ENEMIES.length; i++) {
					if(GAME.ENEMIES[i].id() == obj2.id()) {
						var enemy = GAME.ENEMIES[i];
						//var enemy_id = i;
						enemy.change('img/explosion.png', 30, 30, 0, 3).speed(5).animation(0).frame(-1).zone(30,30,0,0);
						GAME.player.points += GAME.Config.pointsDiff;
						enemy.callback(function(){
							enemy.top = -enemy.height;
							enemy.position(enemy.position().x,enemy.top);
							//GAME.ENEMIES.splice(enemy_id,1);
							//console.log('Number of enemies: '+GAME.ENEMIES.length);
							enemy.callback(function(){},1000);
							if(!GAME.ENEMIES.length) {
								//alert('Game over!');
								GAME.player.level += 1;
								GAME.Utils.newLevel();
								var unlock = '';
								if(GAME.player.level == 5) {
									unlock = "You've reached level 5 and unlocked new rocket!";
									var anim = GAME.player.animation();
									GAME.player.animation((anim += 1) % 2);
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