/**
 * @class BlueArrow
 *
 * For Player.state: hero_bow_attack
 * For Player.state: hero_bow_jump_attack
 */
class BlueArrow extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

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
        scene.arrows.add(this);
        scene.time.delayedCall(700, () => { this.destroy(); }, this, this.scene);
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
    constructor(scene, player, boss, yWhere) {

        let x = boss.x;
        let y = yWhere;

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
                    console.log(this.scale);
                }
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
                break;
            default:
                break;
        }

    }
}