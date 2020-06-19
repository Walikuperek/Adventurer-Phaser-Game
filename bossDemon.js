class DemonBoss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'BOSS');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.SCENE = scene;
        this.player = player;
        this.HP = 20;
        this.hurt = 0;
        this.flag = 0;
        this.state = "";
        // this.body.setSize(270, 140);
        this.body.setSize(160, 144);
        // this.body.offset.y = 90;

        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        this.anims.play('BOSS_idle', true);
        // this.body.offset.x = 30;
    }

    update() {
        if (this.x < this.player.x) {
            this.flipX = true;
        } else this.flipX = false;
    }

    Phase_1() {
        // class DarkMatter
    }

    Phase_2() {

    }
        
    // Phase_2
    createGhouls() {
        if (ghouls.length == 0) {
            ghouls.push(this.SCENE.exploGhoul = new ExplodingGhoul(this.SCENE, Phaser.Math.Between(600, 700), 120, this.player));
            ghouls.push(this.SCENE.exploGhoul = new ExplodingGhoul(this.SCENE, Phaser.Math.Between(30, 100), 120, this.player));
        }

        if (ghouls) {
            ghouls.forEach((item, index) => {
                item.update();
            });
        }
    }

    // Animation to-fly-up
    animFlyUp() {
        this.setScale(0.9);
    }
}