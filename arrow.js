class BlueArrow extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        let x = scene.player.x;
        let y = scene.player.y;

        super(scene, x, y, 'blue_arrow');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.play('blue_arrow_anim');
        this.body.allowGravity = false;

        if (scene.player.scaleX == 1) {

            this.body.velocity.x += 300;
            this.body.offset.x = 50;
            this.scaleX = 1;

        } else if (scene.player.scaleX == -1) {

            this.body.velocity.x -= 300;
            this.body.offset.x = 190;
            this.scaleX = -1;

        }
        scene.arrows.add(this);
    }

    update() {
        if (this.y < 0) {
            this.destroy();
        }
    }
}