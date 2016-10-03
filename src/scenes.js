MAFIA.scenes = {
    setCurrent: function(scene, delay, wiz){
        if(this.current != null && this.current.onExit != null){
            this.current.onExit(wiz);
        }
        if(delay != null && delay != 0) {

            WIZARD.time.createTimer("sceneTransition", delay, function () {
                if (MAFIA.scenes.current != null && MAFIA.scenes.current.onEnter != null) {
                    MAFIA.scenes.current = scene;
                    MAFIA.scrollingText.reset();
                    MAFIA.scenes.current.onEnter(wiz);
                }
            }, 1, true);
        }else{
            MAFIA.scenes.current = scene;
            MAFIA.scrollingText.reset();
            MAFIA.scenes.current.onEnter(wiz);
        }
    },
    current: null,
    splash: {
        logoBody: WIZARD.physics.createAABB(24, -16, 85, 32),
        inPosition: false,

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
        },
        update: function(wiz){
            if(this.logoBody.y >= 68 && !this.inPosition){
                wiz.playSound("bootup");
                this.inPosition = true;
                WIZARD.time.createTimer("bootupWait",2000, function(){
                    MAFIA.scenes.setCurrent(MAFIA.scenes.walk, 0, wiz);
                }, 1);
            }

            if(!this.inPosition){
                this.logoBody.y += 0.1;
            }
        },
        render: function(wiz){
            wiz.drawText("davidllanos22*", this.logoBody.x, this.logoBody.y);
        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    },
    walk: {
        entities: [],
        tiles0: [],
        tiles1: [],

        onEnter: function(wiz){
            this.entities = [];
            this.tiles0 = [];
            this.tiles1 = [];

            MAFIA.transitionEffects.fadeBrightToNormal();
            MAFIA.entities.addEntity(new MAFIA.entities.player(32, 55), this.entities);

            MAFIA.maps.loadMapToCurrentScene(MAFIA.maps.test);
            for(var i = 0; i <2; i++){
                MAFIA.entities.addEntity(new MAFIA.entities.enemy(Math.random() * 160, Math.random() * 144 - 32), this.entities);
            }
            for(var i = 0; i <1; i++){
                MAFIA.entities.addEntity(new MAFIA.entities.propCar(Math.random() * 160 - 96, Math.random() * 144 - 32), this.entities);
            }
        },
        update: function(wiz){
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].update(wiz);
            }

            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.car, 500);
            }
        },
        render: function(wiz){
            // for(var x = 0; x < 10; x++){
            //     for(var y = 0; y < 10; y++) {
            //         wiz.drawSprite("tiles", x * 16, y * 16, 0, 1);
            //     }
            // }
            for(var i = 0; i < this.tiles0.length; i++){
                this.tiles0[i].render(wiz);
            }
            MAFIA.entities.sortEntities(this.entities);
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].render(wiz);
            }
            for(var i = 0; i < this.tiles1.length; i++){
                this.tiles1[i].render(wiz);
            }

            MAFIA.scrollingText.show("Glitch city", 0, 136, wiz);

        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    },
    car: {
        entities: [],
        onEnter: function(wiz){
            this.entities = [];
            MAFIA.transitionEffects.fadeBrightToNormal();
            MAFIA.entities.addEntity(new MAFIA.entities.playerCar(), this.entities);
        },
        update: function(wiz){
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].update(wiz);
            }
            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.walk, 500);
            }
        },
        render: function(wiz){
            MAFIA.entities.sortEntities(this.entities);
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].render(wiz);
            }
            MAFIA.scrollingText.show("GOTTA GO FAST!!1!", 0 , 0, wiz);
        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    }
};