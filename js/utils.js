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
//	var posX = player.position().x + parseInt(player.width/2)-3,
//		posY = player.position().y;
	var posX = -2, posY = -4;
	var newBullet = new Mibbu.spr('img/bullet.png', 2, 4, 0, 0);
//	for(var e=0; e<GAME.ENEMIES.length; e++) {
//		newBullet.hit(GAME.ENEMIES[e], function() { console.log('hit'); /*GAME.Utils.GameOver('enemy');*/ });
//	}
	newBullet.position(posX, posY, 2).speed(0);
	return newBullet;
};

GAME.Utils.NewEnemy = function(posX, posY) {
	var newEnemy = new Mibbu.spr('img/enemies.png', 30, 40, 0, 0);
	newEnemy.animation(0);
	newEnemy.position(posX, posY, 2).speed(0);
	newEnemy.movement = 0;
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