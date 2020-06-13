const gameSettings = {
  sceneWidth: 100,
  gold: 0,
};

const config = {
  type: Phaser.CANVAS,
  parent: 'phaser-app',
  // width: 640,
  width: 384, // total 384 = 24 * 16
  height: 208, // total 216 = 13.5 * 16
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true,
      // debugVelocityColor: 0xffff00,
      // debugBodyColor: 0x0000ff,
      // debugStaticBodyColor: 0xffffff
    }
  },
  scene: [
    preloadGame,
    playGame,
  ],
}

const game = new Phaser.Game(config);

