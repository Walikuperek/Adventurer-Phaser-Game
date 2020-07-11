/**
 * @class Arrow
 *
 * For Player.state: hero_bow_attack
 * For Player.state: hero_bow_jump_attack
 */
class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y + 2;

        super(scene, x, y, 'arrow');
        this.DMG = 1;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(32, 5);
        this.body.allowGravity = false;

        // Move in the direction of player's sight
        // Add flip image when player flipped
        if (scene.player.flipX == false) {
            this.body.velocity.x += 400;
            this.flipX = false;

        } else if (scene.player.flipX == true) {
            this.body.velocity.x -= 400;
            this.flipX = true;

        }
        scene.arrows.add(this);
        scene.time.delayedCall(700, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class BlueArrow - class Arrow upgrade ? TODO:
 */
class BlueArrow extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y + 2;

        super(scene, x, y, 'blue_arrow');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(80, 20);

        this.play('blue_arrow_anim');
        this.body.allowGravity = false;

        // Move in the direction of player's sight
        // Add flip image when player flipped
        if (scene.player.flipX == false) {
            this.body.velocity.x += 300;
            this.flipX = false;

        } else if (scene.player.flipX == true) {
            this.body.velocity.x -= 300;
            this.flipX = true;

        }
        scene.blueArrows.add(this);
        scene.time.delayedCall(700, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class MagicBarrier
 * 
 * For Player.state: hero_magic_barrier
 */
class MagicBarrier extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

        super(scene, x, y, 'tornado');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(64, 64);
        this.play('magic_barrier_anim');
        this.body.allowGravity = false;

        scene.energyBalls.add(this);
        scene.time.delayedCall(1500, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class EnergyBall
 * 
 * For Player.state: hero_magic_attack
 */
class EnergyBall extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

        // Adds some positioning to the EnergyBall
        // If player flipped: move a bit to the left, etc.  
        scene.player.flipX ? x -= 20 : x += 20;
        y += 3;
        super(scene, x, y, 'energy_ball');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(80, 20);
        this.play('energy_ball_anim');
        this.body.allowGravity = false;

        // Flips the image if player is flipped
        if (scene.player.flipX == false) {
            this.body.velocity.x += 300;
            this.flipX = false;

        } else if (scene.player.flipX == true) {
            this.body.velocity.x -= 300;
            this.flipX = true;

        }
        scene.energyBalls.add(this);
        scene.time.delayedCall(1000, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class Tornado
 * 
 * For Player.state: hero_magic_attack
 */
class Tornado extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

        // Adds some positioning to the EnergyBall
        // If player flipped: move a bit to the left, etc.  
        scene.player.flipX ? x -= 20 : x += 20;
        y += 3;
        super(scene, x, y, 'tornado');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(96, 96);
        this.play('tornado_anim');
        this.body.allowGravity = false;

        // Flips the image if player is flipped
        if (scene.player.flipX == false) {
            this.body.velocity.x += 100;
            this.flipX = false;

        } else if (scene.player.flipX == true) {
            this.body.velocity.x -= 100;
            this.flipX = true;

        }
        scene.energyBalls.add(this);
        scene.time.delayedCall(1500, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class Meteor
 * 
 * For BOSS: Phase_4
 * Spawns one Meteor that explodes when touch the ground
 */
class Meteor extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x + Phaser.Math.Between(-75, 75);
        let y = Phaser.Math.Between(-100, -300);

        super(scene, x, y, 'meteor');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.angle = 90;
        this.body.setSize(14, 34);
        this.body.offset.y = 10;
        this.play('Meteor', true);
        this.hit = false;

    }

    update() {
        if (!this.body.onFloor()) {
            var fade = this.scene.add.image(this.x, this.y, 'meteor', this.anims.currentFrame.frame.name).setAlpha(0.05).setTint(0xff0000);
            fade.angle = 90;
            this.scene.tweens.add({ targets: fade, alpha: 0, ease: '', duration: 250, onComplete: () => { fade.destroy(); } });
        }
        if (this.body.onFloor()) {
            this.angle = 0;
            if (this.hit !== true) this.play('explosion', true);
            this.hit = true;
        }
        // if (!this.anims.isPLaying) this.destroy();
    }
}


class DarkMatter extends Phaser.GameObjects.Sprite {
    constructor(scene, player, boss, yStartingPosition) {

        let x = boss.x;
        let y = yStartingPosition;

        super(scene, x, y, 'darkMatter');
        
        this.boss = boss;
        this.player = player;
        this.state = 'static';
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(50, 50);
        this.body.allowGravity = false;
        this.play('darkMatterBoss', true);
        this.scale = 0.1;
    }

    update() {
        switch(this.state) {
            case 'static':
                if (this.scale <= 0.4) {
                    this.scale += 0.001;
                } else this.state = 'rushForPlayer';
                break;
            case 'rushForPlayer':
                if (!flagTest) {
                    if (this.y < this.player.y) {
                        this.y += 0.6;
                    } else if (this.y > this.player.y) {
                        this.y -= 0.3;
                    }
                }
                if (this.x > this.player.x) {
                    if (flagTest) {
                        this.x += 1.5
                    } else this.x -= 1.5;

                } else if (this.x < this.player.x) {
                    if (flagTest) {
                        this.x -= 1.5
                    }
                    else this.x += 1.5;
                }
                break;
            case 'rushForBoss':
                /**
                 * xAxisDistance = abs(boss.x - ball.x)
                 * b = abs(boss.y - ball.y)
                 * stepX = ball.x += 1
                 * stepY = b / a
                 */
                const xAxisDistance = Math.abs(this.boss.x - this.x);
                const yAxisDistance = Math.abs(this.boss.y - this.y);
                this.stepX = 5;
                this.stepY = 3;

                if (this.x < this.boss.x + 100) this.x += this.stepX;
                else if (this.x >= this.boss.x) { this.destroy() }
                else this.x += this.stepX;
                
                // console.log('boss.x: ', this.boss.x, 'ball.x: ', this.x);

                if (this.y < 68) this.y = this.y;
                else this.y -= yAxisDistance/xAxisDistance;
                console.log('boss.y: ', this.boss.y, 'ball.y: ', this.y);

                break;
        }

    }
}