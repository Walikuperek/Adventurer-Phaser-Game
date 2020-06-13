class SpiderKing extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'spiderKing');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.HP = 3;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        this.body.setSize(270, 140);
        this.body.offset.y = 90;
        // this.body.offset.y = 150; for death of spiderKing

        this.setCollideWorldBounds(true);
        this.anims.play('spiderKingWalk', true);
        this.body.offset.x = 30;

        this.spiderKinghealthText = this.scene.add.text(this.body.position.x - 10, this.body.position.x, 'Health: ' + this.HP, { fontSize: '12px', fill: '#000' });
    }

    update() {
        switch (this.state) {
            case "Hurt":
                this.setVelocityX(0);
                if (this.flag == 0) {
                    this.flag = 1;
                }
                if (!this.anims.isPlaying) {
                    this.state = "";
                }
                break;

            default:
                this.anims.play('slime_move', true);
                if (this.body.velocity.x === 0) {
                }
                break;
        }
    }

    death() {
        this.scene.add.sprite(this.x, this.y).anims.play('spiderKing_death');
        this.destroy();
    }
}

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
            this.scaleX = - 1;
            this.body.offset.x = 24;
            this.body.velocity.x = this.speed;
        } else {
            if (this.body.position.x < this.xMin) this.forward = true;
            this.scaleX = 1;
            this.body.velocity.x = - this.speed;
        }

    }

    death() {
        this.destroy();
    }
}