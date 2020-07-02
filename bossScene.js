// Global variable for enemies
const ghouls = [];
let flagTest = false;

class bossScene extends Phaser.Scene {
    constructor() {
        super('bossScene');
    }

    create() {

        this.moonBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'moon');
        this.cemeteryBackground = this.add.tileSprite(0, 85, game.config.width, game.config.height, 'cemetery');
        this.moonBackground.setOrigin(0, 0).setScrollFactor(0);
        this.cemeteryBackground.setOrigin(0, 0).setScrollFactor(0);

        // Crating map from JSON Tiled
        const mapBoss = this.make.tilemap({ key: 'bossScene' });

        // const bossBcgMoon = mapBoss.addTilesetImage('background', 'moon');
        // const bossCemetery = mapBoss.addTilesetImage('cemetery', 'cemetery');
        const bossObjectsBehind = mapBoss.addTilesetImage('objects', 'objects');
        const bossGroundTile = mapBoss.addTilesetImage('tileset', 'tileset', 16, 16, 1, 2); /* Extruded tileset */
        const bossObjects = mapBoss.addTilesetImage('objects', 'objects');
        const bossObjects2 = mapBoss.addTilesetImage('objects', 'objects');

        // mapBoss.createStaticLayer('moon', bossBcgMoon);
        // mapBoss.createStaticLayer('cemetery', bossCemetery);
        mapBoss.createStaticLayer('obcjectsBehind', bossObjectsBehind);
        const beneathPlayer = mapBoss.createStaticLayer('ground', bossGroundTile);
        mapBoss.createStaticLayer('objects', bossObjects);
        mapBoss.createStaticLayer('obcjects2', bossObjects2);

        beneathPlayer.setCollisionByProperty({ collides: true });
        // /creating map

        this.player = new Player(this, 120, 100);
        this.arrows = this.add.group();
        this.energyBalls = this.add.group();
        this.physics.add.collider(this.player, beneathPlayer);

        this.boss = new DemonBoss(this, 285,30, this.player).setOrigin(0, 0);
        this.DM = new DarkMatter(this, this.player, this.boss, this.boss.y);
        // this.DD = new DarkMatter(this, this.player, this.boss, this.boss.y + 60);
        // this.MM = new DarkMatter(this, this.player, this.boss, this.boss.y + 120);
        
        //___________
        // HIT ENEMY

        /* Melee overlap with boss */
        this.physics.add.overlap(this.player.playerAttack, this.boss, (object, attack) => { this.player.attack_hit(attack, object) }, null, this);
        this.physics.add.overlap(this.arrows, this.boss, (object, attack) => { this.player.attack_hit(attack, object) }, null, this);

        /* Particles overlaps */
        this.physics.add.overlap(this.energyBalls, ghouls, this.hitGhouls, null, this);
        this.physics.add.overlap(this.arrows, ghouls, this.hitGhouls, null, this);
        this.physics.add.overlap(this.energyBalls, this.DM, this.hitDarkMatter, null, this);
        this.physics.add.overlap(this.DM, this.player, this.changeState_RushForBoss, null, this);

        this.colliderPlayerToBoss = this.physics.add.collider(this.player, this.boss);
        this.physics.add.collider(ghouls, beneathPlayer); /* const [] for this.boss.Phase_2() */
        
        this.camera(); /* main camera settings: follows this.player */
    }

    update() {
        this.collideRemovePlayerBoss(); /* Removes collision when player.state == 'slide' || 'hero_roll' */

        // if (this.DM.scale >= 0.4) {
        //     this.DM.state = 'rushForPlayer';
        // }
        this.boss.update();
        // this.boss.createGhouls();
        // this.boss.animFlyUp();
        // this.DM.update();
        // this.DD.update();
        // this.MM.update();


        
        this.player.movePlayer();
        this.player.body.offset.y = -5;

        parallaxBackground(this, this.moonBackground, .03);
        parallaxBackground(this, this.cemeteryBackground, .2);
    }

    /**
     * @method collideRomovePlayerBoss
     * 
     * Remove collider when player is in 'slide' or 'hero_roll' state
     */
    collideRemovePlayerBoss() {
        if(this.player.state === 'slide' || this.player.state === 'hero_roll') {
            this.colliderPlayerToBoss.active = false;
            this.time.delayedCall(200, () => { this.colliderPlayerToBoss.active = true }, this, this.scene);
        }
    }

    // TODO:
    changeState_RushForBoss(ball, player) {
        ball.state = 'rushForBoss';
    }

    hitGhouls(projectile, enemy) {
        new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        if (enemy == ghouls[0]) {
            ghouls.shift(enemy)
        } else ghouls.pop(enemy);
    }

    hitDarkMatter(projectile, ball) {

        projectile.destroy();
        flagTest = true;
    }

    /**
    * @method camera
    */
    camera() {
        // Set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.roundPixels = true;
        // game.config.width * gameSettings.sceneWidth
        this.myCam.setBounds(0, 0, 800, game.config.height);
        this.physics.world.setBounds(0, 0, 800, game.config.height, true, true, true, false);

        // Making the camera follow the player
        this.myCam.startFollow(this.player);
    }
}
