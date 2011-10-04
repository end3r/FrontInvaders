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
			case GAME.Config.input.CHANGE:
			    return false;
		}
	};
};

GAME.Input.prototype = {
	held: {},
	pressed: {},
	keydown: function(e) {
		switch (e.keyCode) {
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
					this.pressed.shoot = true;
					//this.held.shoot = true;
				}
				break;
			}
			case GAME.Config.input.START: {
				if(!GAME.Config.active)
					GAME.$tag('h1', GAME.$id('menu')).onclick();
				break;
			}
			case GAME.Config.input.CHANGE: {
				var anim = GAME.player.animation();
				GAME.player.animation((anim += 1) % 2); 
				break;
			}
			default: { return; }
		}
		return false;
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case GAME.Config.input.LEFT: {
				this.held.left = false;
				break;
			}
			case GAME.Config.input.RIGHT: {
				this.held.right = false;
				break;
			}/*
			case GAME.Config.input.SHOOT: {
				this.held.shoot = false;
				break;
			}*/
			default: { return; }
		}
		return false;
	},
	frame: function() {
		if (GAME.Config.active) {
			if (this.pressed.left || this.held.left) {
				GAME.player.position(GAME.player.position().x -= GAME.Config.moveInterval, GAME.player.position().y);
			}
			if (this.pressed.right || this.held.right) {
				GAME.player.position(GAME.player.position().x += GAME.Config.moveInterval, GAME.player.position().y);
			}
			if(this.pressed.shoot) {
				this.pressed.shoot = false;
				if(GAME.BULLETS.length < GAME.Config.bulletLimit) {
					GAME.BULLETS.push(GAME.Utils.NewBullet());
				}
			}
		}
		this.pressed = {};
	}
};