/**
 * @type {BIG EXPLOSION}
 * @class Explosion
 * 
 * Plays explosion animation at the enemies coords
 * AFTER the hit
 */
class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.play('explosion');
        // Destroy to slighlty better memory managment
        scene.time.delayedCall(700, () => { this.destroy(); }, this, this.scene);
    }
}

/**
 * @class ExplodingGhoul
 * 
 * Finished ghoul for BOSS fight
 * Explodes when it touch player.x - 20 || player.x + 20
 */
class ExplodingGhoul extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'explodingGhoul');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.player = player;
        this.HP = 1;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.body.setSize(32, 41);
        
        this.setCollideWorldBounds(true);
        let roll = Phaser.Math.Between(0, 100);
        roll <= 50 ? this.anims.play('burningGhoul1', true) : this.anims.play('burningGhoul2', true);
        this.body.offset.x = 10;
        this.body.offset.y = 2;
        
        this.hit = false;
    }
    
    update() {
        if (this.x > this.player.x) {
            // If touch the players X
            if (this.x <= this.player.x + 20 && (this.player.y >= this.y + 10) && this.player.state != 'slide') {
                new Explosion(this.scene, this.x, this.y);
                if (this == ghouls[0]) {
                    ghouls.shift(this)
                } else ghouls.pop(this);
             } else {
                this.flipX = false;
                this.x -= 1;
            }
        } 
        else if (this.x < this.player.x) {
            // If touch the players X
            if (this.x >= this.player.x - 20 && (this.player.y >= this.y + 10) && this.player.state != 'slide') {
                new Explosion(this.scene, this.x, this.y);
                if (this == ghouls[0]) {
                    ghouls.shift(this)
                } else ghouls.pop(this);
            } else {
                this.flipX = true;
                this.x += 1;
            }
        }
    }
}

/**
 * @class Bee
 * 
 * For tutorial purposes only
 * It's flying horizontally
 * 
 * Reverses direction at:
 * @param xMin - starting point
 * @param xMax - reversing point
 */
class Bee extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, xMin, xMax) {
        super(scene, x, y, 'bee');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.xMin = xMin;
        this.xMax = xMax;

        this.HP = 3;
        this.speed = 50;
        this.body.setSize(24, 24);
        this.body.setAllowGravity(false);
        this.setCollideWorldBounds(true);
        this.anims.play('bee');
        this.forward = true;
    }

    update() {
        if (this.forward == true) {
            if (this.body.position.x > this.xMax) this.forward = false;
            this.flipX = true;
            this.body.velocity.x = this.speed;
        } else {
            if (this.body.position.x < this.xMin) this.forward = true;
            this.flipX = false;
            this.body.velocity.x = - this.speed;
        }
    }
}
