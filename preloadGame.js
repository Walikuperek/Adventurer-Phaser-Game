
class preloadGame extends Phaser.Scene {
    constructor() {
      super("PreloadScene");
    }
    preload() {

      // Load all tiles & JSON for introduction
      this.load.image('decorationStone', 'assets/tiles/main_lev_buildA.png');
      this.load.image('decoration', 'assets/tiles/jungle tileset.png');
      this.load.image('jungle', 'assets/tiles/jungle tileset.png');
      this.load.image('stone', 'assets/tiles/main_lev_buildA.png');
      this.load.tilemapTiledJSON('scene1', 'assets/tiles/tiledMapScene1..json');

      // Load all assets tile sprites
      this.load.image('plx1', 'assets/background/plx-1.png');
      this.load.image('plx2', 'assets/background/plx-2.png');
      this.load.image('plx3', 'assets/background/plx-3.png');
      this.load.image('plx4', 'assets/background/plx-4.png');
      this.load.image('plx5', 'assets/background/plx-5.png');

      // Load all platform sprites
      this.load.image('ground', 'assets/platform/jungle-ground.png');
      this.load.image('box', 'assets/platform/box.png');
      this.load.image('ledge', 'assets/platform/platform-1.png');

      // Load player spritesheets
      this.load.atlas('hero', 'assets/hero/hero_sword_bow_basic/hero_sword_bow_basic.png', 'assets/hero/hero_sword_bow_basic/hero_sword_bow_basic.json');
      this.load.atlas('blue_arrow', 'assets/hero/blue_arrow/blue_arrow.png', 'assets/hero/blue_arrow/blue_arrow.json');

      // Load enemy spritesheets
      this.load.spritesheet('bee', 'assets/enemy/bee.png', { frameWidth: 37, frameHeight: 39 });

      // Load enemy images
      this.load.image('spiderKingWalk0', 'assets/enemy/spiderKing/SkeletonKing_Walk_0.png');
      this.load.image('spiderKingWalk1', 'assets/enemy/spiderKing/SkeletonKing_Walk_1.png');
      this.load.image('spiderKingWalk2', 'assets/enemy/spiderKing/SkeletonKing_Walk_2.png');
      this.load.image('spiderKingWalk3', 'assets/enemy/spiderKing/SkeletonKing_Walk_3.png');

      this.load.image('spiderKingDeath0', 'assets/enemy/spiderKing/SkeletonKing_Death_0.png');
      this.load.image('spiderKingDeath1', 'assets/enemy/spiderKing/SkeletonKing_Death_1.png');
      this.load.image('spiderKingDeath2', 'assets/enemy/spiderKing/SkeletonKing_Death_2.png');
      this.load.image('spiderKingDeath3', 'assets/enemy/spiderKing/SkeletonKing_Death_3.png');

      // Load treasure spritesheets
      this.load.spritesheet('coins', 'assets/gold/coins.png', { frameWidth: 16, frameHeight: 16 });
      this.load.atlas('swordSkillReward', 'assets/Special/sword_skill_reward.png', 'assets/Special/sword_skill_reward.json');
    }
    /**
     * @file player
     */
    create() {
      this.add.text(20, 20, 'Loading game...');
      this.scene.start("PlayGame");

      this.anims.create({
        key: 'hero_idle',
        frames: [
          { key: 'hero', frame: 'adventurer-idle-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-idle-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-idle-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-idle-03-1.3.png' },
        ],
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'hero_jump',
        frames: [
          { key: 'hero', frame: 'adventurer-jump-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-jump-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-jump-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-jump-03-1.3.png' },
        ],
        frameRate: 7,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_run',
        frames: [
          { key: 'hero', frame: 'adventurer-run-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-run-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-run-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-run-03-1.3.png' },
          { key: 'hero', frame: 'adventurer-run-04-1.3.png' },
          { key: 'hero', frame: 'adventurer-run-05-1.3.png' },
        ],
        frameRate: 9,
        repeat: -1
      });

      this.anims.create({
        key: 'hero_slide',
        frames: [
          { key: 'hero', frame: 'adventurer-slide-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-slide-01-1.3.png' },
        ],
        frameRate: 9,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_bow_jump',
        frames: [
          { key: 'hero', frame: 'adventurer-bow-jump-00.png' },
          { key: 'hero', frame: 'adventurer-bow-jump-01.png' },
          { key: 'hero', frame: 'adventurer-bow-jump-02.png' },
          { key: 'hero', frame: 'adventurer-bow-jump-03.png' },
          { key: 'hero', frame: 'adventurer-bow-jump-04.png' },
          { key: 'hero', frame: 'adventurer-bow-jump-05.png' },
        ],
        frameRate: 14,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_bow',
        frames: [
          { key: 'hero', frame: 'adventurer-bow-00.png' },
          { key: 'hero', frame: 'adventurer-bow-01.png' },
          { key: 'hero', frame: 'adventurer-bow-02.png' },
          { key: 'hero', frame: 'adventurer-bow-03.png' },
          { key: 'hero', frame: 'adventurer-bow-04.png' },
          { key: 'hero', frame: 'adventurer-bow-05.png' },
          { key: 'hero', frame: 'adventurer-bow-06.png' },
          { key: 'hero', frame: 'adventurer-bow-07.png' },
          { key: 'hero', frame: 'adventurer-bow-08.png' },
        ],
        frameRate: 9,
        repeat: 0
      });

      // Particles
      this.anims.create({
        key: 'blue_arrow_anim',
        frames: [
          { key: 'blue_arrow', frame: 'frame_00_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_01_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_02_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_03_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_04_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_05_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_06_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_07_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_08_delay-0.08s.png' },
          { key: 'blue_arrow', frame: 'frame_09_delay-0.08s.png' },
        ],
        frameRate: 17,
        repeat: 0
      });

     

      // Enemies
      this.anims.create({ key: 'bee', frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: 'spiderKingWalk', frames: [
        { key: 'spiderKingWalk0', frame: null },
        { key: 'spiderKingWalk1', frame: null },
        { key: 'spiderKingWalk2', frame: null },
        { key: 'spiderKingWalk3', frame: null, duration: 50 },
      ], frameRate: 4, repeat: -1 });
      this.anims.create({
        key: 'spiderKingDeath', frames: [
          { key: 'spiderKingDeath0', frame: null },
          { key: 'spiderKingDeath1', frame: null },
          { key: 'spiderKingDeath2', frame: null },
          { key: 'spiderKingDeath3', frame: null, duration: 50 },
        ], frameRate: 4, repeat: -1
      });

      // Special
      this.anims.create({ key: 'coin', frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });

      this.anims.create({
        key: 'sword_skill_reward',
        frames: [
          { key: 'swordSkillReward', frame: 'Special_0.png' },
          { key: 'swordSkillReward', frame: 'Special_1.png' },
          { key: 'swordSkillReward', frame: 'Special_2.png' },
          { key: 'swordSkillReward', frame: 'Special_3.png' },
        ],
        frameRate: 5,
        repeat: -1
      });
    }
}

