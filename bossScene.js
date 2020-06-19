// Global variable for enemies
const ghouls = [];
let flagTest = false;
class bossScene extends Phaser.Scene {
    constructor() {
        super('bossScene');
    }

    preload() {

    }

    create() {
        // Crating map from JSON Tiled
        const mapBoss = this.make.tilemap({ key: 'bossScene' });

        const bossBcgMoon = mapBoss.addTilesetImage('background', 'moon');
        const bossCemetery = mapBoss.addTilesetImage('cemetery', 'cemetery');
        const bossObjectsBehind = mapBoss.addTilesetImage('objects', 'objects');
        const bossGroundTile = mapBoss.addTilesetImage('tileset', 'tileset', 16, 16, 1, 2);
        const bossObjects = mapBoss.addTilesetImage('objects', 'objects');
        const bossObjects2 = mapBoss.addTilesetImage('objects', 'objects');

        mapBoss.createStaticLayer('moon', bossBcgMoon);
        mapBoss.createStaticLayer('cemetery', bossCemetery);
        mapBoss.createStaticLayer('obcjectsBehind', bossObjectsBehind);
        const beneathPlayer = mapBoss.createStaticLayer('ground', bossGroundTile);
        mapBoss.createStaticLayer('objects', bossObjects);
        mapBoss.createStaticLayer('obcjects2', bossObjects2);

        beneathPlayer.setCollisionByProperty({ collides: true });
        // /creating map

        this.player = new Player(this, 16, 100);
        this.arrows = this.add.group();
        this.energyBalls = this.add.group();
        this.physics.add.collider(this.player, beneathPlayer);
        this.boss = new DemonBoss(this, 285, 20, this.player).setScale(0.4).setOrigin(0, 0);
        this.DM = new DarkMatter(this, this.player, this.boss, this.boss.y);
        this.DD = new DarkMatter(this, this.player, this.boss, this.boss.y + 60);
        this.MM = new DarkMatter(this, this.player, this.boss, this.boss.y + 120);
        // ghouls as a tab for group of em
        // preparation for boss phases
        this.physics.add.collider(ghouls, beneathPlayer);

        //___________
        // HIT ENEMY
        this.physics.add.overlap(this.energyBalls, ghouls, this.hitEnemy, null, this);
        this.physics.add.overlap(this.arrows, ghouls, this.hitEnemy, null, this);
        this.physics.add.overlap(this.energyBalls, this.DM, this.hitBall, null, this);

        
        // this.boss.y = 30;

        this.meteor1 = new Meteor(this)
        this.physics.add.collider(this.meteor1, beneathPlayer);

        this.meteor = new Meteor(this)
        this.physics.add.collider(this.meteor, beneathPlayer);

        this.meteor2 = new Meteor(this)
        this.physics.add.collider(this.meteor2, beneathPlayer);





        /**
         * @description CAMERA
         */
        // Set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.roundPixels = true;
        // game.config.width * gameSettings.sceneWidth
        this.myCam.setBounds(0, 0, 800, game.config.height);
        this.physics.world.setBounds(0, 0, 800, game.config.height, true, true, true, false);

        // Making the camera follow the player
        this.myCam.startFollow(this.player);
        /** /camera **/

    }

    update() {
        console.log('aaa');
        if (this.DM.scale >= 0.4) {
            this.DM.state = 'rushForPlayer';
        }
        this.boss.update();
        this.boss.createGhouls();
        this.boss.animFlyUp();
        this.DM.update();
        this.DD.update();
        this.MM.update();

        // FOR PHASE_4
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (this.meteor){
            this.meteor.update();
        }
        this.meteor1.update();
        this.meteor2.update();

        if (this.meteor.body.onFloor()) {
            this.myCam.shake(19);
            this.tweens.add({ targets: this.myCam, duration: 250, onComplete: () => { this.myCam.shake(0); } });
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        this.player.movePlayer();
        this.player.body.offset.y = -5;
    }

    hitEnemy(projectile, enemy) {
        new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        if (enemy == ghouls[0]) {
            ghouls.shift(enemy)
        } else ghouls.pop(enemy);
    }

    hitBall(projectile, ball) {

        projectile.destroy();
        // ball.body.velocity.x *= -1;
        flagTest = true;
        console.log(flagTest);
    }
}
