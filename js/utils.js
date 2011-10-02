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
	newBullet.__id = GAME.Config.uniqueID++;
	console.log('new bullet ID: '+newBullet.__id);
	for(var e=0; e<GAME.ENEMIES.length; e++) {
		GAME.collisionDetection.add(newBullet, GAME.ENEMIES[e], GAME.hitObj );
	}
	return newBullet;
};

GAME.hitObj = function(){ console.log('HIT!'); }

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
/*
GAME.Utils.UpdateItem = function(item) {
	item.position(item.posX, item.posY, 2).speed(1);
	item.movement = 0;
	return item;
};
*/
GAME.Utils.LinkBackToMenu = function(id) {
	GAME._id(id).onclick = function() {
		GAME._id(id).style.zIndex = '5';
	};
};

GAME.Utils.PlusMinus = function() {
	return (~~(Math.random()*2)*2)-1;
};

/* Collision Detection */
GAME.collisionDetection = function() {};
GAME.collisionDetection.table = [];

GAME.collisionDetection.add = function(obj1, obj2, callback) {
	GAME.collisionDetection.table.push({obj1:obj1, obj2:obj2, fn:callback});
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
					if(GAME.BULLETS[i].__id == obj1.__id) {
						GAME.BULLETS[i].top = -50;
						//GAME.BULLETS[i].left = -50;
						GAME.BULLETS[i].position(200,-50);
						GAME.BULLETS.splice(i,1);
					}
				}
				var enemyTab = [];
				for(var i=0; i<GAME.ENEMIES.length; i++) {
					if(GAME.ENEMIES[i].__id == obj2.__id) {
						var enemy = GAME.ENEMIES[i];
						//var enemy_id = i;
						enemy.change('img/explosion.png', 30, 30, 0, 3).speed(5).animation(0).frame(-1).zone(30,30,0,0);
						GAME.player.points += GAME.Config.pointsDiff;
						console.log('Nr of enemies: '+GAME.ENEMIES.length);
						enemy.callback(function(){
							enemy.top = -enemy.height;
							enemy.position(enemy.position().x,enemy.top);
							//GAME.ENEMIES.splice(enemy_id,1);
							console.log('num of enemies: '+GAME.ENEMIES.length);
							enemy.callback(function(){},1000);
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