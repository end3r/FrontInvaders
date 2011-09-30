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
	newEnemy.animation(type);
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
	//GAME.collisionDetection.table = [] || GAME.collisionDetection.table;
	// add obj2 to obj1, and then fire callback if collide
		//GAME.collisionDetection.table[obj1.__id] = [] || GAME.collisionDetection.table[obj1.__id];
		//GAME.collisionDetection.table[obj1.__id].push(obj2);
	GAME.collisionDetection.table.push({obj1:obj1, obj2:obj2, fn:callback});
	//console.log('pushed');
	//console.dir(GAME.collisionDetection.table);
};

GAME.collisionDetection.checkAll = function() {
//	for(var i=0; i<GAME.collisionDetection.table.length; i++) {
//		for(var j=0; j<GAME.collisionDetection.table[i].length; i++) {
//			// j
//		}
//	}
	var t = GAME.collisionDetection.table;
	if(t && t.length) {
		for (var i=0; i<t.length; i++) {
			//console.dir(t[i]);
			//console.log(JSON.stringify(t[i]));
			//console.log('t.length: '+t.length+', check '+i+' interactions');
			//var obj1 = t[i].obj1;
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
			
		//	if (!( (o1_Top > o2_Bottom) || (o1_Bottom < o2_Top) || (o1_Left > o2_Right) || (o1_Right < o2_Left) )) {
				//console.dir(MB_collides[loopIndex].hits)
				//MB_collides[loopIndex].hits[element]();
		//		console.log('HIIIIIT!');
		//	}
			if( o1_Top < o2_Top && o2_Top < o1_Bottom )
				console.log('UGH!');
		}

		/*
		for (var i=0, j=0; i<t.length; i++)
		{
			console.log(t.length);
			while(!t[j]) j++;
			var item = t[j];
			//console.log('item '+i+' with id '+j);
			console.dir(item);
			sleep(50000);
		}*/
		//console.log('checking '+GAME.collisionDetection.table.length+' elements vs '+GAME.collisionDetection.table[0]+' elements.');
	}
};