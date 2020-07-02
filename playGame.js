/**
 * @class playGame
 * 
 * First map for tutorial purposes:
 * Learning how to jump
 * First skill reward placed at the end
 * First teleport -> second tut map, appears at the end 
 */
class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  create() {
    // this.scene.start('bossScene');
  /* ---------------------- Creating backgroundLayers ---------------------- */
    this.backgroundCreate();

  /* ---------------------- Creating map from JSON Tiled ---------------------- */
    const map = this.make.tilemap({ key: 'scene1' });

    const tilesetDecrationStoneTile = map.addTilesetImage('stoneTile', 'decorationStone', 16, 16, 1, 2);
    const tilesetDecrationTile = map.addTilesetImage('jungleTileSet', 'decoration');
    const tilesetJungleTileset = map.addTilesetImage('jungleTileSet', 'jungle');
    const tilesetStoneTile = map.addTilesetImage('stoneTile', 'stone', 16, 16, 1, 2);

    map.createStaticLayer('decorationStone', tilesetDecrationStoneTile);
    map.createStaticLayer('decoration', tilesetDecrationTile);
    const jungleLayer = map.createStaticLayer('jungleTile', tilesetJungleTileset);
    const stoneLayer = map.createStaticLayer('stoneTile', tilesetStoneTile);
 
    jungleLayer.setCollisionByProperty({ collides: true });
    stoneLayer.setCollisionByProperty({ collides: true });

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

  /* ---------------------- COINS ---------------------- */

    // this.coins = this.physics.add.group({
    //   key: 'coins',
    //   repeat: 2,
    //   setXY: { x: 150, y: 0, stepX: 250 }
    // });

    // this.coins.children.iterate(function(child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   child.body.offset.y = - 10;
    //   child.body.offset.x = 0;
    // });

  /* ---------------------- GOLD ---------------------- */

    // this.goldText = this.add.text(5, 15, 'Gold: 0', { fontSize: '12px', fill: 'gold' });
    // this.goldText.setScrollFactor(0);

  /* ---------------------- / COINS ---------------------- */

    // TIP 1
    this.tipSpaceText = this.add.text(105, 20, 'Press [SPACE] to jump', { fontSize: '20px', fill: 'gold' });

    // Create bag with skill reward
    this.teleportActive = false; /* switch to true upon collecting skill reward */
    this.skillReward = this.physics.add.sprite(1403, 30, 'swordSkillReward').setScale(0.4);
    this.skillReward.body.offset.y = 5;
    this.skillReward.setSize(40);
    this.skillReward.play('sword_skill_reward', true);
    this.physics.add.collider(this.skillReward, stoneLayer);


  /* ---------------------- ADD PLAYER ---------------------- */
    this.player = new Player(this, 1436, 20);
    // this.player = new Player(this, 16, 100);
    this.healthText = this.add.text(5, 2, 'Health: 100', { fontSize: '12px', fill: 'gold' });
    this.healthText.setScrollFactor(0);

  /* ---------------------- NEXTLEVEL & TELEPORT ---------------------- */
    this.nextLevel = this.physics.add.sprite(1313, 170, 'nextLevel').setAlpha(0);
    this.nextLevel.body.allowGravity = false;
    this.physics.add.collider(this.nextLevel, stoneLayer);
    this.nextLevel.setSize(30, 50);

  /* ---------------------- BEES ---------------------- */
    this.bee = new Bee(this, 400, 100, 261, 554);
    this.bee2 = new Bee(this, 770, 100, 631, 924);
    this.bee3 = new Bee(this, 1140, 100, 1101, 1294);
    

  /* ---------------------- COLLISIONS ---------------------- */
    this.physics.add.collider(this.player, jungleLayer);
    this.physics.add.collider(this.player, stoneLayer);

    // this.physics.add.collider(this.coins, jungleLayer);
    // this.physics.add.collider(this.coins, stoneLayer);
    // this.physics.add.overlap(this.player, this.coins, this.player.collectCoin, null, this);

    this.physics.add.overlap(this.player, this.bee, beeOverlap, null, this);
    this.physics.add.overlap(this.player, this.bee2, beeOverlap, null, this);
    this.physics.add.overlap(this.player, this.bee3, beeOverlap, null, this);

    this.physics.add.overlap(this.player, this.skillReward, skillReward, null, this);
    this.physics.add.overlap(this.player, this.nextLevel, teleportNextLevel, null, this);

    this.physics.add.collider(this.bee, this.platforms);
    this.physics.add.collider(this.bee2, this.platforms);
    this.physics.add.collider(this.bee3, this.platforms);


    // arrows
    this.arrows = this.add.group();

  /* ---------------------- CAMERA ---------------------- */
    /**
     * @description CAMERA
     * 
     * Set world bounds to allow camera to follow the player
     * RoundPixels for fixing sprites to display as pixel art
     * Making the camera follow the player
     */
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 1600, game.config.height);
    this.physics.world.setBounds(0, 0, 1600, game.config.height, true, true, true, false);
    this.cameras.main.roundPixels = true;
    this.myCam.startFollow(this.player);
  /* ---------------------- / CAMERA ---------------------- */
  }

  /* Updates once per frame */
  update() {
  /* ---------------------- RESET TIP ---------------------- */
    if (this.player.keySpace.isPressed) { this.tipSpaceText.setText('') };

  /* ---------------------- PLAYER UPDATE ---------------------- */
    this.player.movePlayer();

    this.bee.update();
    this.bee2.update();
    this.bee3.update();

  /* ---------------------- IF PLAYER FALLS ---------------------- */
    if (this.player.y > 316) { this.scene.restart(); };
    if (this.player.x >= 1495 && this.player.x <= 1513 && this.player.y > 170) {
      this.myCam.fade(500);
      this.player.setTint(0x00ffff);
      this.scene.restart();
    }

    this.healthText.setText('Health: ' + this.player.stats.hitPoints);

    /* ---------------------- PARALLAX BACKGROUND ---------------------- */
    // Scroll the texture of the tilesprites proportionally to the camera scroll
    parallaxBackground(this, this.plx_1, .03);
    parallaxBackground(this, this.plx_2, .1);
    parallaxBackground(this, this.plx_3, .2);
    parallaxBackground(this, this.plx_4, .3);
    parallaxBackground(this, this.plx_5, .6);
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
}

/**
 * @function beeOverlap
 * 
 * When touch the Bee:
 *  Shake the camera
 *  Deal dmg to player
 *  Set tint of player
 * e.g. of usage:
 *  this.physics.add.overlap(this.player, this.bee, beeOverlap, null, this);
 */
function beeOverlap(player, bee) {
  this.myCam.shake(50, 0.02);
  player.playerHurt();
  // Not working uless WEBGL
  player.setTint(0x00ff00);

  this.tweens.add({
    targets: this.player,
    duration: 1500,
    repeat: 0,
    onComplete: () => {
      this.player.clearTint()
    }
  });
}

/**
 * @function skillReward
 * @param {levitating sword} skillReward
 * 
 * When touch:
 *  Switch this.teleportActive to true
 *  Flash the camera
 *  Disappear the skillReward
 *  Show tooltip
 *  Show teleport to the next lvl
 */
function skillReward(player, skillReward) {
  this.teleportActive = true;
  this.myCam.flash(666);
  skillReward.disableBody(true, true);
  this.tipTeleport = this.add.text(1390, 10, 'Go to the teleport', { fontSize: '14px', fill: 'gold' });
  this.nextLevel.play('nextlevel', true);
  this.tweens.add({
    targets: this.nextLevel,
    alpha: 1,
    duration: 2000,
    repeat: 0
  });
}

function teleportNextLevel() {
  if (this.teleportActive === true) {
    this.scene.start('bossScene');
  }
}
