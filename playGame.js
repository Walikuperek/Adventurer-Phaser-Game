class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  create() {
    // Creating backgroundLayers
    this.backgroundCreate();

    // Crating map from JSON Tiled
    const map = this.make.tilemap({ key: 'scene1' });

    const tilesetDecrationStoneTile = map.addTilesetImage('stoneTile', 'decorationStone');
    const tilesetDecrationTile = map.addTilesetImage('jungleTileSet', 'decoration');
    const tilesetJungleTileset = map.addTilesetImage('jungleTileSet', 'jungle');
    const tilesetStoneTile = map.addTilesetImage('stoneTile', 'stone');

    map.createStaticLayer('decorationStone', tilesetDecrationStoneTile);
    map.createStaticLayer('decoration', tilesetDecrationTile);
    const jungleLayer = map.createStaticLayer('jungleTile', tilesetJungleTileset);
    const stoneLayer = map.createStaticLayer('stoneTile', tilesetStoneTile);
 
    jungleLayer.setCollisionByProperty({ collides: true });
    stoneLayer.setCollisionByProperty({ collides: true });


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

    /////////////////////////////////////
    /////////////   coins   /////////////
    /////////////////////////////////////

    this.coins = this.physics.add.group({
      key: 'coins',
      repeat: 2,
      setXY: { x: 150, y: 0, stepX: 250 }
    });

    this.coins.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.body.offset.y = - 10;
      child.body.offset.x = 0;
    });

    ////////////////////////////////////
    /////////////   gold   /////////////
    ////////////////////////////////////

    this.goldText = this.add.text(5, 15, 'Gold: 0', { fontSize: '12px', fill: 'gold' });
    this.goldText.setScrollFactor(0);

    // TIP 1
    this.tipSpaceText = this.add.text(105, 20, 'Press [SPACE] to jump', { fontSize: '20px', fill: 'gold' });

    // Create bag with skill reward
    this.skillReward = this.physics.add.sprite(1403, 30, 'swordSkillReward').setScale(0.4);
    this.skillReward.body.offset.y = 5;
    this.skillReward.play('sword_skill_reward', true);
    this.physics.add.collider(this.skillReward, stoneLayer);

    // Add player
    this.player = new Player(this, 1366, 100);
    this.healthText = this.add.text(5, 2, 'Health: 100', { fontSize: '12px', fill: 'gold' });
    this.healthText.setScrollFactor(0);

    // Add Bees
    this.bee = new Bee(this, 400, 100, 261, 554);
    this.bee2 = new Bee(this, 770, 100, 631, 924);
    this.bee3 = new Bee(this, 1140, 100, 1001, 1294);
    
    // Collisions
    this.physics.add.collider(this.player, jungleLayer);
    this.physics.add.collider(this.player, stoneLayer);
    this.physics.add.collider(this.coins, jungleLayer);
    this.physics.add.collider(this.coins, stoneLayer);

    this.physics.add.overlap(this.player, this.coins, this.player.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.bee, beeOverlap, null, this);
    this.physics.add.overlap(this.player, this.bee2, beeOverlap, null, this);
    this.physics.add.overlap(this.player, this.bee3, beeOverlap, null, this);

    this.physics.add.collider(this.bee, this.platforms);
    this.physics.add.collider(this.bee2, this.platforms);
    this.physics.add.collider(this.bee3, this.platforms);

    // arrows
    this.arrows = this.add.group();

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
    if (this.player.keySpace.isPressed) { this.tipSpaceText.setText('') };
    this.player.movePlayer();
    console.log('x: ', this.player.x, 'y: ', this.player.y);

    this.bee.update();
    this.bee2.update();
    this.bee3.update();

    // If player fall off
    if (this.player.y > 316) { this.scene.restart(); };

    this.healthText.setText('Health: ' + this.player.stats.hitPoints);

    // Scroll the texture of the tilesprites proportionally to the camera scroll
    this.parallaxBackground(this.plx_1, .03);
    this.parallaxBackground(this.plx_2, .1);
    this.parallaxBackground(this.plx_3, .2);
    this.parallaxBackground(this.plx_4, .3);
    this.parallaxBackground(this.plx_5, .6);
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
    this.plx_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'plx1');
    this.plx_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'plx2');
    this.plx_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'plx3');
    this.plx_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'plx4');
    this.plx_5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'plx5');

    // .setOrigin(0,0) - Set its pivot to the top left corner
    // .setScrollFactor(0) - Fix it so it won't move when the camera moves
    this.plx_1.setOrigin(0, 0).setScrollFactor(0);
    this.plx_2.setOrigin(0, 0).setScrollFactor(0);
    this.plx_3.setOrigin(0, 0).setScrollFactor(0);
    this.plx_4.setOrigin(0, 0).setScrollFactor(0);
    this.plx_5.setOrigin(0, 0).setScrollFactor(0);
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

function beeOverlap(player, bee) {
  // Shake the camera when touch the Bee
  this.myCam.shake(50, 0.02);

  // Not working uless WEBGL
  player.setTint(0x00ff00);
  // /.setTint

  this.tweens.add({
    targets: this.player,
    duration: 1500,
    repeat: 0,
    onComplete: () => {
      this.player.clearTint()
    }
  });
}

function spiderKingCollide(player, spiderKing) {

  // this.myCam.shake(50, 0.02);
  
  this.player.setTint(0xff0000);
  spiderKing.play('spiderKingDeath');
  
  this.tweens.add({
    targets: this.player,
    duration: 1000,
    repeat: 0,
    onComplete: () => {
      this.player.clearTint();
      spiderKing.play('spiderKingWalk');
    }});
}


