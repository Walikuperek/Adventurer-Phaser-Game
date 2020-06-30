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
        this.scene = scene;
        this.state = '';
        this.animFlag = 0;

        this.attackCooldown = 0;
        this.bowAttackCooldown = 0;
        this.magicAttackCooldown = 0;
        this.slideCooldown = 0;
        this.rollCooldown = 0;
        this.playerAttack = this.scene.physics.add.staticGroup();
        this.DMG = 0;

        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Z = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.Q = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.E = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.F = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.setCollideWorldBounds(true);
        
        this.body.setSize(14, 24);
    }

    attack_hit(attack, object) {
        this.scene.cameras.main.shake(50, 0.02);
        // this.scene.sound.play('snd_sword_hit', { rate: Phaser.Math.FloatBetween(1, 1.25) });

        var effect = this.scene.add.sprite(attack.x, attack.y, 'blood_slash').setAngle(Math.random() * 90).setScale(0.5);
        if (this.flipX === true) {
            effect.flipX = true;
        } else effect.flipX = false;
        effect.anims.play('blood_slash').on('animationcomplete', () => { effect.destroy() });

        let slash = this.scene.add.sprite(attack.x, attack.y, 'slash', 5).setScale(2, 1);
        if (this.flipX === true) {
            slash.flipX = true;
        } else slash.flipX = false;

        this.scene.tweens.add({
            targets: slash,
            scaleY: { value: 0, ease: 'Sine.easeOut', duration: 250 },
            scaleX: { value: 0, ease: 'Linear', duration: 250 },
            onComplete: () => { slash.destroy() }
        });

        attack.destroy();

        if (!object.hasOwnProperty('HP') || --object.HP < 1) {
            if (typeof object.death === 'function')
                object.death();
            else
                object.destroy();
        }
        else {
            object.HP -= this.DMG;
            let dmg = this.scene.add.text(object.x + 50, object.y, this.DMG, { fontSize: '32px', fill: 'gold' });
            this.scene.tweens.add({
                targets: dmg,
                scaleY: { value: 0, ease: 'Sine.easeOut', duration: 250 },
                scaleX: { value: 0, ease: 'Linear', duration: 250 },
                onComplete: () => { dmg.destroy() }
            });

            object.changeState('hurt');
            object.setTint(0xF00);
            setTimeout( () => object.clearTint(), 100);
            console.log(object.HP);
        }
    }

    movePlayer() {
        this.body.offset.y = 10;
        getKeyState(this.keySpace);
        getKeyState(this.Q);
        getKeyState(this.W);
        getKeyState(this.E);
        getKeyState(this.D);
        getKeyState(this.F);
        

        switch (this.state) {

            case 'attack':
                this.DMG = 1;
                switch (this.animFlag) {
                    case -2:
                        this.setVelocityX(0);
                        this.anims.play('hero_swrd_drw', true);
                        this.animFlag = -1;
                        break;

                    case -1:
                        if (!this.anims.isPlaying)
                            this.animFlag = 0;
                        break;

                    case 0:
                        this.combo = 0;
                        this.setVelocityX(0);
                        this.anims.play('hero_attack1', true);
                        this.animFlag = 1;
                        var attack_box = this.playerAttack.create(this.x + (this.flipX ? -20 : 20), this.y, '', '', false);
                        this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.animFlag = 2;
                        }
                        break;

                    case 2:
                        if (this.Q.isDown)
                            this.combo = 1;
                        if (!this.anims.isPlaying) {
                            if (this.combo)
                                this.changeState('attack2');
                            else {
                                this.changeState('');
                                this.attackCooldown = 1;
                                this.scene.time.addEvent({ delay: 500, callback: () => { this.attackCooldown = 0; } });
                                this.anims.play('hero_idle', true);
                            }
                        }
                        break;
                }
                break;

            case 'attack2':
                this.DMG = 2;
                switch (this.animFlag) {
                    case 0:
                        this.setVelocityX(0);
                        this.anims.play('hero_attack2', true);
                        this.combo = 0;
                        this.animFlag = 1;
                        var attack_box = this.playerAttack.create(this.x + (this.flipX ? -20 : 20), this.y, '', '', false);
                        this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.animFlag = 2;
                        }
                        break;

                    case 2:
                        if (this.Q.isDown)
                            this.combo = 1;
                        if (!this.anims.isPlaying) {
                            if (this.combo)
                                this.changeState('attack3');
                            else {
                                this.changeState('');
                                this.attackCooldown = 1;
                                this.scene.time.addEvent({ delay: 500, callback: () => { this.attackCooldown = 0; } });
                                this.anims.play('hero_idle', true);
                            }
                        }
                        break;
                }
                break;

            case 'attack3':
                this.DMG = 3;
                switch (this.animFlag) {
                    case 0:
                        this.anims.play('hero_attack3', true);
                        this.animFlag = 1;
                        this.setVelocityX((this.flipX ? -1 : 1) * 50);
                        var attack_box = this.playerAttack.create(this.x + (this.flipX ? -20 : 20), this.y, '', '', false);
                        this.scene.time.addEvent({ delay: 100, callback: () => { attack_box.destroy() } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) {
                            this.setVelocityX(0);
                            this.animFlag = 2;
                        }
                        break;

                    case 2:
                        if (!this.anims.isPlaying) {
                            this.changeState('');
                            this.attackCooldown = 1;
                            this.scene.time.addEvent({ delay: 500, callback: () => { this.attackCooldown = 0; } });
                            this.anims.play('hero_idle', true);
                        }
                        break;
                }
                break;

            case 'hero_magic_attack':
                switch (this.animFlag) {

                    case 0:
                        this.anims.play('hero_cast', true);
                        this.scene.time.addEvent({ delay: 700, callback: () => { new Tornado(this.scene).setScale(0.4); } });
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
                        this.scene.time.addEvent({ delay: 700, callback: () => { new Arrow(this.scene).setScale(0.6); } });
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
                        this.scene.time.addEvent({ delay: 300, callback: () => { new Arrow(this.scene).setScale(0.6); } });
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
                        this.scene.tweens.add({ targets: this, currentSlideSpeed: 0, ease: 'Linear', duration: this.anims.duration });
                        this.animFlag = 1;
                        this.slideCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.slideCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying) 
                            this.changeState('');
                        var fade = this.scene.add.image(this.x, this.y, 'hero', this.anims.currentFrame.frame.name).setAlpha(0.3).setTint(0xff0000);
                        this.scene.tweens.add({ targets: fade, alpha: 0, ease: '', duration: 250, onComplete: () => { fade.destroy(); }});
                        break;
                        
                }
                break;

            case 'hero_roll':
                switch (this.animFlag) {
                    case 0:
                        this.anims.play('hero_roll', true);
                        this.setVelocityY(-200)
                        this.animFlag = 1;
                        this.rollCooldown = 1;
                        this.scene.time.addEvent({ delay: 1500, callback: () => { this.rollCooldown = 0; } });
                        break;

                    case 1:
                        if (!this.anims.isPlaying || this.body.onFloor())
                            this.changeState('');
                            var fade = this.scene.add.image(this.x, this.y, 'hero', this.anims.currentFrame.frame.name).setAlpha(0.3).setTint(0xff0000);
                            this.scene.tweens.add({ targets: fade, alpha: 0, ease: 'Power4', duration: 450, onComplete: () => { fade.destroy(); } });
                        break;
                }
                break;

            default:
                this.animFlag = 0;

                if (this.body.onFloor()) {

                    if (this.Q.isPressed && !this.attackCooldown) {

                        this.setVelocityX(0);
                        this.changeState('attack');
                    
                    } else if (this.E.isPressed && !this.bowAttackCooldown) {

                        this.setVelocityX(0);
                        this.changeState('hero_bow_attack');

                    } else if (this.W.isPressed && !this.magicAttackCooldown) {

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
                
                // JUMP
                } else {
                    // Move left while jump
                    if (this.cursors.left.isDown && this.x > 0) {

                        this.flipX = true;
                        this.setVelocityX(-this.stats.walkSpeed);

                        // Shoot ranged while jump & move left
                        if (this.E.isPressed && !this.bowAttackCooldown)
                            this.changeState('hero_bow_jump_attack');

                        // Roll while jump & move left
                        else if (this.D.isPressed && !this.rollCooldown)
                            this.changeState('hero_roll');

                    // Move right while jump
                    } else if (this.cursors.right.isDown && this.x < game.config.width * gameSettings.sceneWidth) {

                        this.flipX = false;
                        this.setVelocityX(this.stats.walkSpeed);

                        // Shoot ranged while jump & move right
                        if (this.E.isPressed && !this.bowAttackCooldown)
                            this.changeState('hero_bow_jump_attack');

                        // Roll while jump & move right
                        else if (this.D.isPressed && !this.rollCooldown)
                            this.changeState('hero_roll');
                    
                    // Shoot while jump
                    } else if (this.E.isPressed && !this.bowAttackCooldown) {

                        this.changeState('hero_bow_jump_attack');

                    // Roll while jump
                    } else if (this.D.isPressed && !this.rollCooldown) {

                        this.changeState('hero_roll');

                    }
                }
                break;
        }
    }

    playerHurt() {
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
     * When collect coin, coin is disabled
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
        this.animFlag = flag;
    };
}

function getKeyState(key) {
    key.isPressed = !key.previous_down && key.isDown;
    key.isReleased = key.previous_down && !key.isDown;
    key.previous_down = key.isDown;
}

