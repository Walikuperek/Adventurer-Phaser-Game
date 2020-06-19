class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hero');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.stats = {
            walkSpeed: 130,
            jumpSpeed: 230,
            slideSpeed: 350,
            hitPoints: 100,
            gold: 0,
        };

        this.state = '';
        this.animFlag = 0;

        this.bowAttackCooldown = 0;
        this.magicAttackCooldown = 0;
        this.slideCooldown = 0;

        this.jumpCounter = 0;
        this.death = false;

        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Z = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.E = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.R = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.F = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.setCollideWorldBounds(true);
        
        this.body.setSize(14, 24);

    }

    movePlayer() {
        this.body.offset.y = 10;
        getKeyState(this.keySpace);
        getKeyState(this.E);
        getKeyState(this.R);
        getKeyState(this.D);
        getKeyState(this.F);
        

        switch (this.state) {

            case 'hero_magic_attack':
                switch (this.animFlag) {

                    case 0:
                        this.anims.play('hero_cast', true);
                        this.scene.time.addEvent({ delay: 700, callback: () => { new EnergyBall(this.scene).setScale(0.4); } });
                        this.setVelocityX(0);
                        this.animFlag = 1;
                        this.bowAttackCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.bowAttackCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.changeState('');
                            this.anims.play('hero_idle');
                        }
                        break;
                }
                break;

            case 'hero_bow_attack':
                switch(this.animFlag) {
                    case 0:
                        this.anims.play('hero_bow', true);
                        this.scene.time.addEvent({ delay: 700, callback: () => { var arrow = new BlueArrow(this.scene); } });
                        this.setVelocityX(0);
                        this.animFlag = 1;
                        this.bowAttackCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.bowAttackCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.changeState('');
                            this.anims.play('hero_idle');
                        }
                        break;
                }
                break;

            case 'hero_bow_jump_attack':
                this.body.velocity.y = Math.min(this.body.velocity.y, 10);

                switch (this.animFlag) {

                    case 0:
                        this.anims.play('hero_bow_jump', true);
                        this.scene.time.addEvent({ delay: 300, callback: () => { var arrow = new BlueArrow(this.scene); } });
                        this.setVelocityX(0);
                        this.animFlag = 1;

                        this.bowAttackCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.bowAttackCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.changeState('');
                            this.anims.play('hero_idle');
                        }
                        break;
                }
                break;

            case 'slide':
                switch (this.animFlag) {
                    case 0:
                        this.anims.play('hero_slide', true);
                        this.flipX == false 
                            ? this.setVelocityX(this.stats.slideSpeed)
                            : this.setVelocityX(-this.stats.slideSpeed);
                        // this.scene.tweens.add({ targets: this, currentSlideSpeed: 0, ease: 'Linear', duration: this.anims.duration });
                        this.animFlag = 1;
                        this.slideCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.slideCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) this.changeState('');
                        
                        var fade = this.scene.add.image(this.x, this.y, 'hero', this.anims.currentFrame.frame.name).setAlpha(0.3).setTint(0xff0000);
                        this.scene.tweens.add({ targets: fade, alpha: 0, ease: '', duration: 250, onComplete: () => { fade.destroy(); }});
                        break;
                        
                }
                break;

            default:
                this.animFlag = 0;

                if (this.body.onFloor()) {

                    this.jump = 1;

                    if (this.E.isPressed && !this.bowAttackCooldown) {

                        this.setVelocityX(0);
                        this.changeState('hero_bow_attack');

                    } else if (this.F.isPressed && !this.magicAttackCooldown) {

                        this.changeState('hero_magic_attack');

                    } else if (this.D.isPressed && !this.slideCooldown) {

                        this.changeState('slide');
                    
                    } 
                    else if (this.keySpace.isPressed) {

                        this.setVelocityY(-this.stats.jumpSpeed);
                        this.anims.play('hero_jump', true);

                    } 
                    else if (this.cursors.left.isDown && this.x > 0) {

                        this.flipX = true;
                        this.setVelocityX(-this.stats.walkSpeed);
                        this.anims.play('hero_run', true);

                    } else if (this.cursors.right.isDown && this.x < game.config.width * gameSettings.sceneWidth) {

                        this.flipX = false;
                        this.setVelocityX(this.stats.walkSpeed);
                        this.anims.play('hero_run', true);

                    } else {

                        this.setVelocityX(0);
                        this.anims.play('hero_idle', true);

                    }

                } else {
                    if (this.cursors.left.isDown && this.x > 0) {

                        this.flipX = true;
                        this.setVelocityX(-this.stats.walkSpeed);

                    } else if (this.cursors.right.isDown && this.x < game.config.width * gameSettings.sceneWidth) {

                        this.flipX = false;
                        this.setVelocityX(this.stats.walkSpeed);

                    } else if (this.R.isPressed && !this.bowAttackCooldown) {

                        this.changeState('hero_bow_jump_attack');
                    }
                }
                // else {

                //     if (this.keySpace.isPressed && this.jump) {
                //         this.jump--;
                //         this.change_state("Boost");
                //     }
                //     else if (this.X.isPressed && !this.attack_cooldown) {
                //         this.change_state("AttackAir");
                //     } else this.setVelocityX(0);

                    // if (this.body.velocity.y > 0 && this.anims.getCurrentKey() != 'hero_fall')
                    //     this.anims.play('hero_fall', true);
                    // else if (this.body.velocity.y < 0 && this.Z.isUp)
                    //     this.body.velocity.y *= 0.8;

                // }
                break;

        }

        // if (this.state == 'slide') {

        //     this.body.setSize(16, 16);
        //     this.body.offset.y = 16;

        // } else {

        //     this.body.setSize(16, 24);
        //     this.body.offset.y = 8;

        // }

    }

    playerHurt() {
        // console.log(this.stats.hitPoints, 'hitPoints');
        this.stats.hitPoints -= 1;

        if (this.stats.hitPoints <= 0) {
            this.resetPlayerPosition();
        }
    }

    /**
     * @function collectCoin
     * 
     * @param {this.player} player
     * @param coin
     * When collects coin it is disabled
     * When no more coins left add new pool 
     */
    collectCoin(player, coin) {
        coin.disableBody(true, true);

        //  Adds and update to gold
        player.stats.gold += 1;
        this.goldText.setText('Gold: ' + player.stats.gold);

        if (this.coins.countActive(true) === 0) {
            this.coins.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }

    resetPlayerPosition() {
        this.stats.hitPoints = 100;
        this.stats.gold = 0;
        
        this.x = 16;
        this.y = 102;
    }

    changeState(state, flag = 0) {
        this.state = state;
        this.flag = flag;
    };
}

function getKeyState(key) {
    key.isPressed = !key.previous_down && key.isDown;
    key.isReleased = key.previous_down && !key.isDown;
    key.previous_down = key.isDown;
}

