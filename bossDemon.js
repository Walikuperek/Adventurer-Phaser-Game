class DemonBoss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'BOSS');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.SCENE = scene;
        this.player = player;

        this.HP = 200;
        this.hurt = 0;
        this.flag = 0;
        this.state = '';

        this.body.setSize(70, 90);
        this.body.offset.x = 30;
        // this.body.offset.y = 40;

        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.anims.play('BOSS_idle', true);
    }

    changeState(state, flag = 0) {
        this.state = state;
        this.animFlag = flag;
    }

    death() {
        this.destroy();
    }

    update() {
        // switch(this.state) {
        //     case 'hurt':
        //         this.scene.tweens.add({
        //             targets: this,
        //             scaleY: { value: 0.9, ease: 'Sine.easeOut', duration: 250 },
        //             scaleX: { value: 0.9, ease: 'Linear', duration: 250 },
        //             // onComplete: () => { slash.destroy() }
        //         });
        //         break;
        // }
        if (this.x < this.player.x - 50) {
            this.flipX = true;
        } else this.flipX = false;
    }

    Phase_1() {
        // class DarkMatter
    }

    Phase_2() {

    }
        
    // ::Phase_2
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

    Phase_4() {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // this.meteor1 = new Meteor(this)
        // this.physics.add.collider(this.meteor1, beneathPlayer);

        // this.meteor = new Meteor(this)
        // this.physics.add.collider(this.meteor, beneathPlayer);

        // this.meteor2 = new Meteor(this)
        // this.physics.add.collider(this.meteor2, beneathPlayer);
        
        // if (this.meteor){
        //     this.meteor.update();
        // }
        // this.meteor1.update();
        // this.meteor2.update();

        // if (this.meteor.body.onFloor()) {
        //     this.myCam.shake(19);
        //     this.tweens.add({ targets: this.myCam, duration: 250, onComplete: () => { this.myCam.shake(0); } });
        // }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    // Animation to-fly-up
    animFlyUp() {
        this.setScale(0.9);
    }
}