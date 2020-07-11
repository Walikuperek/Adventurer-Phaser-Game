/**
 * @class rockGame
 */
class rockGame extends Phaser.Scene {
    constructor() {
        super('RockGame');
    }

    preload() {
        // Load all tiles & JSON
        this.load.image('bcg_layer01', 'assets/maps/ROCK/background1.png');
        this.load.image('bcg_layer02', 'assets/maps/ROCK/background2.png');
        this.load.image('bcg_layer03', 'assets/maps/ROCK/background3.png');
        this.load.image('rock_decor_behind', 'assets/maps/ROCK/main_lev_build.png');
        this.load.image('other_behind', 'assets/maps/ROCK/other_lev_build.png');
        this.load.image('rock_behind_main', 'assets/maps/ROCK/main_lev_build.png');
        this.load.image('rock_main', 'assets/maps/ROCK/main_lev_build.png');
        this.load.image('rock_decor_front', 'assets/maps/ROCK/main_lev_build.png');
        this.load.image('rock_decor_grass', 'assets/maps/ROCK/main_lev_build.png');
        this.load.tilemapTiledJSON('sceneRock', 'assets/maps/ROCK/RockTiled.json');
    }

    create() {
        /* ---------------------- Creating parallax backgroundLayers ---------------------- */
        this.backgroundCreate();
        /* ---------------------- Creating map from JSON Tiled ---------------------- */
        const map = this.make.tilemap({ key: 'sceneRock' });
        /*
        addTilesetImage('tiles_spritesheet','gameTiles')
            var tileset = this.map.addTilesetImage('tiles_spritesheet','gameTiles');
        createStatic/DynamicLayer('backgroundLayer', tileset)
			this.backgroundLayer = this.map.createLayer('backgroundLayer', tileset);
        */
        // const bcg1 = map.addTilesetImage('background1', 'bcg_layer01');
        // const bcg2 = map.addTilesetImage('background2', 'bcg_layer02');
        // const bcg3 = map.addTilesetImage('background3', 'bcg_layer03');
        const rock_decor_behind = map.addTilesetImage('main_lev_build', 'rock_decor_behind');
        const other_behind = map.addTilesetImage('other_lev_build', 'other_behind');
        const rock_behind_main = map.addTilesetImage('main_lev_build', 'rock_behind_main');
        const rock_main = map.addTilesetImage('main_lev_build', 'rock_main');
        const rock_decor_front = map.addTilesetImage('main_lev_build', 'rock_decor_front');
        const rock_decor_grass = map.addTilesetImage('main_lev_build', 'rock_decor_grass');

        // map.createStaticLayer('Background01', bcg1);
        // map.createStaticLayer('Background02', bcg2);
        // map.createStaticLayer('Background03', bcg3);
        map.createStaticLayer('RockDecorationBehind', rock_decor_behind);
        map.createStaticLayer('OtherBehind', other_behind);
        const rock_behind_main_collider = map.createStaticLayer('RockBehindMain', rock_behind_main);
        const rock_collider = map.createStaticLayer('RockTiled', rock_main);
        map.createStaticLayer('RockDecoration', rock_decor_front);
        map.createStaticLayer('RockDecorationGrass', rock_decor_grass);


        rock_collider.setCollisionByProperty({ collides: true });
        rock_behind_main_collider.setCollisionByProperty({ collides: true });

        /* ---------------------- DEBUG GRAPHICS COLLIDERS ---------------------- */
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // jungleLayer.renderDebug(debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // stoneLayer.renderDebug(debugGraphics, {
        //   tileColor: null, // Color of non-colliding tiles
        //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        /* ---------------------- / DEBUG GRAPHICS COLLIDERS ---------------------- */

        /* ---------------------- ADD PLAYER ---------------------- */
        this.player = new Player(this, 16, 20);
        // this.player = new Player(this, 3000, 100);
        this.healthText = this.add.text(5, 2, 'Health: 100', { fontSize: '12px', fill: 'gold' });
        this.healthText.setScrollFactor(0);

        /* ---------------------- COLLISIONS ---------------------- */
        this.physics.add.collider(this.player, rock_behind_main_collider);
        this.physics.add.collider(this.player, rock_collider);

        // arrows
        this.arrows = this.add.group();
        this.energyBalls = this.add.group();

        /* ---------------------- CAMERA ---------------------- */
        /**
         * @description CAMERA
         * 
         * Set world bounds to allow camera to follow the player
         * RoundPixels for fixing sprites to display as pixel art
         * Making the camera follow the player
         */
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, 3200, game.config.height);
        this.physics.world.setBounds(0, 0, 3200, game.config.height, true, true, true, false);
        // this.cameras.main.roundPixels = true;
        this.myCam.startFollow(this.player);
        /* ---------------------- / CAMERA ---------------------- */
    }

    /* Updates once per frame */
    update() {
        /* ---------------------- PLAYER UPDATE ---------------------- */
        this.player.movePlayer();

        /* ---------------------- IF PLAYER FALLS ---------------------- */
        if (this.player.y > 316) { this.scene.restart(); };
        // if (this.player.x >= 1495 && this.player.x <= 1513 && this.player.y > 170) {
        //     this.myCam.fade(500);
        //     this.player.setTint(0x00ffff);
        //     this.scene.restart();
        // }

        this.healthText.setText('Health: ' + this.player.stats.hitPoints);

        /* ---------------------- PARALLAX BACKGROUND ---------------------- */
        // Scroll the texture of the tilesprites proportionally to the camera scroll
        parallaxBackground(this, this.bcg_1, .03);
        parallaxBackground(this, this.bcg_2, .1);
        parallaxBackground(this, this.bcg_3, .6);
    }

    /**
     * @function backgroundCreate
     * 
     * Creating background tileSprite variables
     * Setting pivots to the top-left corners
     * Fixing it to prevent from moving
     */
    backgroundCreate() {

        // Create an tiled sprite with the size of our game screen
        this.bcg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bcg_layer01');
        this.bcg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bcg_layer02');
        this.bcg_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bcg_layer03');

        // .setOrigin(0,0) - Set its pivot to the top left corner
        // .setScrollFactor(0) - Fix it so it won't move when the camera moves
        this.bcg_1.setOrigin(0, 0).setScrollFactor(0);
        this.bcg_2.setOrigin(0, 0).setScrollFactor(0);
        this.bcg_3.setOrigin(0, 0).setScrollFactor(0);
    }
}
