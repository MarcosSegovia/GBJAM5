MAFIA.entities = {
    sortEntities: function(list){
        list.sort(function(a, b){
            var aa = Math.floor(a.body.y);
            var bb = Math.floor(b.body.y);
            if(aa == bb){
                aa = Math.floor(a.body.x);
                bb = Math.floor(b.body.x);
            }
            return aa - bb;
        });
    },
    addEntity: function(entity, list){
        list.push(entity);
    },

    removeEntity: function(entity, list){
        list.splice(list.indexOf(entity), 1);
    },

    player: function(){
        this.name = "Player";
        this.animation = "player_idle_";
        this.body = WIZARD.physics.createAABB(32, 55, 16, 8);
        this.direction = "down";
        this.lastAnimationAndDirection = "";

        var body = this.body;
        function collides(){
            for(var i = 0; i < MAFIA.scenes.current.entities.length; i++){
                var e = MAFIA.scenes.current.entities[i];
                if(e.name != "Player"){
                    if(WIZARD.physics.intersects(body, e.body)){
                        return true;
                    }
                }
            }
            return false;
        }

        this.update = function(wiz){
            this.animation = "player_idle_";
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.animation = "player_walk_";
                this.direction = "left";
                this.body.x -= MAFIA.constants.playerSpeed;
                if(collides()){
                    this.body.x += MAFIA.constants.playerSpeed;
                }
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.animation = "player_walk_";
                this.direction = "right";
                this.body.x += MAFIA.constants.playerSpeed;
                if(collides()){
                    this.body.x -= MAFIA.constants.playerSpeed;
                }
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.animation = "player_walk_";
                this.direction = "up";
                this.body.y -= MAFIA.constants.playerSpeed;
                if(collides()){
                    this.body.y += MAFIA.constants.playerSpeed;
                }
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.animation = "player_walk_";
                this.direction = "down";
                this.body.y += MAFIA.constants.playerSpeed;
                if(collides()){
                    this.body.y -= MAFIA.constants.playerSpeed;
                }
            }

            if(this.lastAnimationAndDirection != this.animation + this.direction){
                WIZARD.animation.reset(this.lastAnimationAndDirection);
            }
            this.lastAnimationAndDirection = this.animation + this.direction;
        };

        this.render = function(wiz){
            wiz.drawSprite("effects", this.body.x, this.body.y - 1, 0, 0);
            wiz.drawAnimation("player", this.animation + this.direction, this.body.x, this.body.y - 24);
            wiz.drawAABB(this.body, "blue");
        };
    },
    playerCar: function(){
        this.name = "PlayerCar";
        this.body = WIZARD.physics.createAABB(16, 16, 85, 32);

        this.update = function(wiz){
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.body.x -= MAFIA.constants.playerCarSpeed;
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.body.x += MAFIA.constants.playerCarSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.body.y -= MAFIA.constants.playerCarSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.body.y += MAFIA.constants.playerCarSpeed;
            }

            if(this.body.x < 0) this.body.x = 0;
            else if(this.body.x > 160 - 85) this.body.x = 160 - 85;
            if(this.body.y < 0) this.body.y = 0;
            else if(this.body.y > 144 - 32) this.body.y = 144 - 32;
        };
        this.render = function(wiz){
            wiz.drawSprite("cars", this.body.x, this.body.y, 0, 0);
            wiz.drawAABB(this.body, "blue");
        };
    },
    propCar: function(x, y){
        this.name = "PropCar";
        this.body = WIZARD.physics.createAABB(x, y, 85, 24),

        this.update = function(wiz){

        };
        this.render = function(wiz){
            wiz.drawSprite("cars", this.body.x, this.body.y - 8, 0, 0);
            wiz.drawAABB(this.body, "yellow");
        };
    },
    enemy: function(x, y){
        this.name = "Enemy";
        this.animation = "enemy_idle_";
        this.body = WIZARD.physics.createAABB(x, y, 16, 8);
        this.direction = "down";
        this.lastAnimationAndDirection = "";

        this.update = function(wiz){
            this.animation = "enemy_idle_";
            this.lastAnimationAndDirection = this.animation + this.direction;
        };

        this.render = function(wiz){
            wiz.drawSprite("effects", this.body.x, this.body.y - 1, 0, 0);
            wiz.drawAnimation("player", this.animation + this.direction, this.body.x, this.body.y - 24);
            wiz.drawAABB(this.body, "yellow");
        };
    },
    bullet: function(x, y, shooter, direction){
        this.name = "Bullet";
        this.body = WIZARD.physics.createAABB(x, y, 4, 4);

        this.update = function(wiz){
        };

        this.render = function(wiz){
            wiz.drawSprite("effects", this.body.x, this.body.y - 1, 2, 0);
            wiz.drawAABB(this.body, "red");
        };
    }
};