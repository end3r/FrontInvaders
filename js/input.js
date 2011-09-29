GAME.Input = function(){
	document.onkeydown = this.keydown.bind(this);
	document.onkeyup = this.keyup.bind(this);
	document.onkeypress = function(e){
	    switch (e.keyCode) {
			case GAME.Config.input.UP:
			case GAME.Config.input.DOWN:
			case GAME.Config.input.LEFT:
			case GAME.Config.input.RIGHT:
			case GAME.Config.input.SHOOT:
			case GAME.Config.input.PAUSE:
			case GAME.Config.input.START:
			    return false;
		}
	};
};

GAME.Input.prototype = {
	held: {},
	pressed: {},
	keydown: function(e) {
		switch (e.keyCode) {/*
			case GAME.Config.input.UP: {
				this.pressed.up = true;
				this.pressed.down = false;
				this.held.up = true;
				this.held.down = false;
				break;
			}
			case GAME.Config.input.DOWN: {
				this.pressed.down = true;
				this.pressed.up = false;
				this.held.down = true;
				this.held.up = false;
				break;
			}*/
			case GAME.Config.input.LEFT: {
				this.pressed.left = true;
				this.pressed.right = false;
				this.held.left = true;
				this.held.right = false;
				break;
			}
			case GAME.Config.input.RIGHT: {
				this.pressed.right = true;
				this.pressed.left = false;
				this.held.right = true;
				this.held.left = false;
				break;
			}
			case GAME.Config.input.PAUSE: {
				if(GAME.Config.active) {
					GAME.Config.active = false;
					GAME.Utils.Alert(GAME.Config.msg.pausedTitle, GAME.Config.msg.pausedText);
					Mibbu.off();
				} else {
					GAME.Config.active = true;
					GAME.Utils.Alert();
					Mibbu.on();
					GAME.keyboard.held = {};
					GAME.keyboard.pressed = {};
				}
				break;
			}
			case GAME.Config.input.SHOOT: {
				if(GAME.Config.active) {
					// SHOOT
					this.pressed.shoot = true;
				}
				break;
			}
			case GAME.Config.input.START: {
				if(!GAME.Config.active)
					GAME._tag('h1', GAME._id('menu')).onclick();
				break;
			}
			default: { return; }
		}
		return false;
	},
	keyup: function(e) {
		switch (e.keyCode) {/*
			case GAME.Config.input.UP: {
				this.held.up = false;
				break;
			}
			case GAME.Config.input.DOWN: {
				this.held.down = false;
				break;
			}*/
			case GAME.Config.input.LEFT: {
				this.held.left = false;
				break;
			}
			case GAME.Config.input.RIGHT: {
				this.held.right = false;
				break;
			}
			default: { return; }
		}
		return false;
	},
	frame: function(player) {
		if (GAME.Config.active) {/*
			if (this.pressed.up || this.held.up) {
				player.position(player.position().x, player.position().y -= 2);
			}
			if (this.pressed.down || this.held.down) {
				player.position(player.position().x, player.position().y += 2);
			}*/
			if ( (this.pressed.left || this.held.left)) {
				player.position(player.position().x -= GAME.Config.moveInterval, player.position().y);
			}
			if (this.pressed.right || this.held.right) {
				player.position(player.position().x += GAME.Config.moveInterval, player.position().y);
			}
			if(this.pressed.shoot) {
				this.pressed.shoot = false;
				if(GAME.ACTIVE_BULLETS < GAME.Config.bulletLimit) {
					GAME.BULLETS[GAME.ACTIVE_BULLETS].position(player.position().x+(player.width/2)-1, player.position().y);
					for(var b = 0; b < GAME.Config.enemyCount; b++) {
						GAME.BULLETS[GAME.ACTIVE_BULLETS].hit(GAME.ENEMIES[0], function() { GAME.Utils.GameOver('player'); });
					}
					GAME.ACTIVE_BULLETS += 1;
					console.log('SHOOT!');
				}
			}
		}
		this.pressed = {};
	}
};