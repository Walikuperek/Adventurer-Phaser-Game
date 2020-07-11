class forestGame extends Phaser.Scene {
    constructor() {
        super('forestGame');
    }

    preload() {
        /* Forest Scene */
        this.load.image('forestBackground1', 'assets/background/forestLayers/Layer_0010_1.png');
        this.load.image('forestBackground2', 'assets/background/forestLayers/Layer_0009_2.png');
        this.load.image('forestBackground3', 'assets/background/forestLayers/Layer_0008_3.png');
        this.load.image('forestBackground4', 'assets/background/forestLayers/Layer_0007_Lights.png');
        this.load.image('forestBackground5', 'assets/background/forestLayers/Layer_0006_4.png');
        this.load.image('forestBackground6', 'assets/background/forestLayers/Layer_0005_5.png');
        this.load.image('forestBackground7', 'assets/background/forestLayers/Layer_0004_Lights.png');
        this.load.image('forestBackground8', 'assets/background/forestLayers/Layer_0003_6.png');
        this.load.image('forestBackground9', 'assets/background/forestLayers/Layer_0002_7.png');
        this.load.image('forestBackground10', 'assets/background/forestLayers/Layer_0001_8.png');
        this.load.image('forestBackground11', 'assets/background/forestLayers/Layer_0000_9.png');
    }

    create() {
        // Creating backgroundLayers
        this.backgroundCreate();
        this.player = new Player(this, 16, 100);

        /**
         * @description CAMERA
         */
        // Set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        // game.config.width * gameSettings.sceneWidth
        this.myCam.setBounds(0, 0, 1600, game.config.height);
        this.physics.world.setBounds(0, 0, 1600, game.config.height, true, true, true, false);
        this.cameras.main.roundPixels = true;

        // Making the camera follow the player
        this.myCam.startFollow(this.player);
        /** /camera **/

    }

    update() {
        this.player.movePlayer();
        // Scroll the texture of the tilesprites proportionally to the camera scroll
        this.parallaxBackground(this.forestBackground1, .03);
        this.parallaxBackground(this.forestBackground2, .1);
        this.parallaxBackground(this.forestBackground3, .2);
        this.parallaxBackground(this.forestBackground4, .3);
        this.parallaxBackground(this.forestBackground5, .6);
        this.parallaxBackground(this.forestBackground6, .03);
        this.parallaxBackground(this.forestBackground7, .1);
        this.parallaxBackground(this.forestBackground8, .2);
        this.parallaxBackground(this.forestBackground9, .3);
        this.parallaxBackground(this.forestBackground10, .6);
        this.parallaxBackground(this.forestBackground11, .6);
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
        this.forestBackground1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground1');
        this.forestBackground2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground2');
        this.forestBackground3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground3');
        this.forestBackground4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground4');
        this.forestBackground5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground5');
        this.forestBackground6 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground6');
        this.forestBackground7 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground7');
        this.forestBackground8 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground8');
        this.forestBackground9 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground9');
        this.forestBackground10 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground10');
        this.forestBackground11 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forestBackground11');

        // .setOrigin(0,0) - Set its pivot to the top left corner
        // .setScrollFactor(0) - Fix it so it won't move when the camera moves
        this.forestBackground1.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground2.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground3.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground4.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground5.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground6.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground7.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground8.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground9.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground10.setOrigin(0, 0).setScrollFactor(0);
        this.forestBackground11.setOrigin(0, 0).setScrollFactor(0);
    }

    /**
     * @function parallaxBackground
     * @param { background Tile Sprite } background 
     * @param { move Speed Rate } tilePositionXChange
     * 
     * Update background move when camera moves
     */
    parallaxBackground(background, tilePositionXChange = 1) {
        background.tilePositionX = this.myCam.scrollX * tilePositionXChange;
    }
}



