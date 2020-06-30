
class preloadGame extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
    preload() {

      // Load all tiles & JSON for introduction
      this.load.image('decorationStone', 'assets/tiles/main_lev_buildA_extruded.png');
      this.load.image('decoration', 'assets/tiles/jungle tileset.png');
      this.load.image('jungle', 'assets/tiles/jungle tileset.png');
      this.load.image('stone', 'assets/tiles/main_lev_buildA_extruded.png');
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
      this.load.atlas('hero_addon', 'assets/hero/playerAnimAddon.png', 'assets/hero/playerAnimAddon.json');
      this.load.spritesheet('slash', 'assets/hero/attack100x100.png', { frameWidth: 100, frameHeight: 100 });
      this.load.image('arrow', 'assets/hero/arrow.png');
      this.load.image('blood_slash_1', 'assets/hero/blood_slash/B001.png');
      this.load.image('blood_slash_2', 'assets/hero/blood_slash/B002.png');
      this.load.image('blood_slash_3', 'assets/hero/blood_slash/B003.png');
      this.load.image('blood_slash_4', 'assets/hero/blood_slash/B004.png');
      this.load.image('blood_slash_5', 'assets/hero/blood_slash/B005.png');
      this.load.image('blood_slash_6', 'assets/hero/blood_slash/B006.png');
      this.load.image('blood_slash_7', 'assets/hero/blood_slash/B007.png');
      this.load.image('blood_slash_8', 'assets/hero/blood_slash/B008.png');
      this.load.image('blood_slash_9', 'assets/hero/blood_slash/B009.png');
      this.load.image('blood_slash_10', 'assets/hero/blood_slash/B010.png');

      this.load.spritesheet('energy_ball', 'assets/hero/Energy_ball/EnergyBall.png', { frameWidth:  128, frameWidth: 128 });
      this.load.spritesheet('tornado', 'assets/hero/TornadoLoop_96x96.png', { frameWidth: 96, frameWidth: 96 });
      this.load.atlas('meteor', 'assets/maps/meteor.png', 'assets/maps/meteor.json');
      this.load.atlas('explosion', 'assets/Special/explosion/explosion.png', 'assets/Special/explosion/explosion.json')

      // Load enemy spritesheets
      this.load.spritesheet('bee', 'assets/enemy/bee.png', { frameWidth: 37, frameHeight: 39 });
      this.load.atlas('burningGhoul', 'assets/enemy/burningGhoul/burningGhoul.png', 'assets/enemy/burningGhoul/burningGhoul.json');

      // Load treasure spritesheets
      this.load.spritesheet('coin', 'assets/gold/coins.png', { frameWidth: 16, frameHeight: 16 });
      this.load.atlas('swordSkillReward', 'assets/Special/sword_skill_reward.png', 'assets/Special/sword_skill_reward.json');
      this.load.spritesheet('nextLevel', 'assets/Special/pipo-mapeffect013a-front.png', { frameWidth: 192, frameHeight: 192 });
      this.load.spritesheet('darkMatter', 'assets/Special/pipo-mapeffect023_192.png', { frameWidth: 192, frameHeight: 192 });

      // # # BOSS LEVEL # # //
      // Load all tiles & JSON for introduction
      this.load.image('moon', 'assets/maps/background.png');
      this.load.image('cemetery', 'assets/maps/graveyard.png');
      this.load.image('objects', 'assets/maps/objects.png');
      // tile-extruder -w 16 -h 16 -i tileset.png -o tileset_extruded.png
      this.load.image('tileset', 'assets/maps/tileset_extruded.png');
      this.load.tilemapTiledJSON('bossScene', 'assets/maps/boss/bossMap.json');

      // BOSS
      this.load.spritesheet('BOSS', 'assets/enemy/DemonBoss/demon-attack.png', { frameWidth: 240, frameHeight: 192 });
      this.load.spritesheet('BOSS-idle', 'assets/enemy/DemonBoss/demon-idle.png', { frameWidth: 160, frameHeight: 144 });
      this.load.spritesheet('BOSS-no-breath', 'assets/enemy/DemonBoss/demon-attack-no-breath.png', { frameWidth: 192, frameHeight: 176 });
      this.load.spritesheet('BOSS-fire-breath', 'assets/enemy/DemonBoss/breath-fire.png', { frameWidth: 160, frameHeight: 96 });
      this.load.spritesheet('BOSS-blue-fire-breath', 'assets/enemy/DemonBoss/breath.png', { frameWidth: 160, frameHeight: 96 });
      //    /BOSS LEVEL     //
    }
    /**
     * @file player
     */
    create() {
      this.add.text(20, 20, 'Loading game...');
      this.scene.start('PlayGame');
      // this.scene.start('bossScene');

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
        key: 'hero_roll',
        frames: [
          { key: 'hero', frame: 'adventurer-smrslt-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-03-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-smrslt-03-1.3.png' },
        ],
        frameRate: 14,
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

      this.anims.create({
        key: 'hero_swrd_drw',
        frames: [
          { key: 'hero', frame: 'adventurer-swrd-drw-00-1.3.png' },
          { key: 'hero', frame: 'adventurer-swrd-drw-01-1.3.png' },
          { key: 'hero', frame: 'adventurer-swrd-drw-02-1.3.png' },
          { key: 'hero', frame: 'adventurer-swrd-drw-03-1.3.png' },
        ],
        frameRate: 7,
        repeat: 0
      });
      
      ////////////////
      // HERO_ADDON //
      ////////////////

      this.anims.create({
        key: 'hero_cast',
        frames: [
          { key: 'hero_addon', frame: 'adventurer-cast-00.png' },
          { key: 'hero_addon', frame: 'adventurer-cast-01.png' },
          { key: 'hero_addon', frame: 'adventurer-cast-02.png' },
          { key: 'hero_addon', frame: 'adventurer-cast-03.png' },        ],
        frameRate: 7,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_attack1',
        frames: [
          { key: 'hero_addon', frame: 'adventurer-attack1-00.png' },
          { key: 'hero_addon', frame: 'adventurer-attack1-01.png' },
          { key: 'hero_addon', frame: 'adventurer-attack1-02.png' },
          { key: 'hero_addon', frame: 'adventurer-attack1-03.png' },
          { key: 'hero_addon', frame: 'adventurer-attack1-04.png' },
        ],
        frameRate: 14,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_attack2',
        frames: [
          { key: 'hero_addon', frame: 'adventurer-attack2-00.png' },
          { key: 'hero_addon', frame: 'adventurer-attack2-01.png' },
          { key: 'hero_addon', frame: 'adventurer-attack2-02.png' },
          { key: 'hero_addon', frame: 'adventurer-attack2-03.png' },
          { key: 'hero_addon', frame: 'adventurer-attack2-04.png' },
          { key: 'hero_addon', frame: 'adventurer-attack2-05.png' },
        ],
        frameRate: 15,
        repeat: 0
      });

      this.anims.create({
        key: 'hero_attack3',
        frames: [
          { key: 'hero_addon', frame: 'adventurer-attack3-00.png' },
          { key: 'hero_addon', frame: 'adventurer-attack3-01.png' },
          { key: 'hero_addon', frame: 'adventurer-attack3-02.png' },
          { key: 'hero_addon', frame: 'adventurer-attack3-03.png' },
          { key: 'hero_addon', frame: 'adventurer-attack3-04.png' },
          { key: 'hero_addon', frame: 'adventurer-attack3-05.png' },
        ],
        frameRate: 15,
        repeat: 0
      });

      this.anims.create({
        key: 'blood_slash',
        frames: [
          { key: 'blood_slash_1', frame: null },
          { key: 'blood_slash_2', frame: null },
          { key: 'blood_slash_3', frame: null },
          { key: 'blood_slash_4', frame: null },
          { key: 'blood_slash_5', frame: null },
          { key: 'blood_slash_6', frame: null },
          { key: 'blood_slash_7', frame: null },
          { key: 'blood_slash_8', frame: null },
          { key: 'blood_slash_9', frame: null },
          { key: 'blood_slash_10', frame: null },
        ],
        frameRate: 10,
        repeat: 0
      });
      
      this.anims.create({ key: 'slash_anim', frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 9 }), frameRate: 8, repeat: 0 });

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

      this.anims.create({ key: 'energy_ball_anim', frames: this.anims.generateFrameNumbers('energy_ball', { start: 0, end: 8 }), frameRate: 20, repeat: -1 });
      this.anims.create({ key: 'tornado_anim', frames: this.anims.generateFrameNumbers('tornado', { start: 0, end: 60 }), frameRate: 30, repeat: -1 });


      // Enemies
      this.anims.create({ key: 'bee', frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 7 }), frameRate: 10, repeat: -1 });

      this.anims.create({
        key: 'burningGhoul1',
        frames: [
          { key: 'burningGhoul', frame: 'burning-ghoul-1.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-2.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-3.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-4.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-5.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-6.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-7.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul-8.png' },
        ],
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'burningGhoul2',
        frames: [
          { key: 'burningGhoul', frame: 'burning-ghoul1.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul2.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul3.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul4.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul5.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul6.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul7.png' },
          { key: 'burningGhoul', frame: 'burning-ghoul8.png' },
        ],
        frameRate: 6,
        repeat: -1
      });

      // Special
      this.anims.create({ key: 'coin_spin', frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
      this.anims.create({ key: 'nextlevel', frames: this.anims.generateFrameNumbers('nextLevel', { start: 0, end: 9 }), frameRate: 30, repeat: -1 });
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

      // Meteor
      this.anims.create({
        key: 'Meteor',
        frames: [
          { key: 'meteor', frame: 'frame_00_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_01_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_02_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_03_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_04_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_05_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_06_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_07_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_08_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_09_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_10_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_11_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_12_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_13_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_14_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_15_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_16_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_17_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_18_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_19_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_20_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_21_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_22_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_23_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_24_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_25_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_26_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_27_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_28_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_29_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_30_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_31_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_32_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_33_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_34_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_35_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_36_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_37_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_38_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_39_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_00_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_41_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_42_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_43_delay-0.02s.png' },
          { key: 'meteor', frame: 'frame_44_delay-0.02s.png' },
        ],
        frameRate: 120,
        repeat: -1
      });

      this.anims.create({
        key: 'explosion',
        frames: [
          { key: 'explosion', frame: 'enemy-death2.png' },
          { key: 'explosion', frame: 'enemy-death3.png' },
          { key: 'explosion', frame: 'enemy-death4.png' },
          { key: 'explosion', frame: 'enemy-death5.png' },
          { key: 'explosion', frame: 'enemy-death6.png' },
          { key: 'explosion', frame: 'enemy-death7.png' },
          { key: 'explosion', frame: 'enemy-death8.png' },
          { key: 'explosion', frame: 'enemy-death9.png' },
        ],
        frameRate: 10,
        repeat: 0
      });

      // BOSS FIGHT
      // this suppose to be unused ?
      this.anims.create({
        key: 'BOSS_breath',
        frames: this.anims.generateFrameNumbers('BOSS', { start: 0, end: 10 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'BOSS_idle',
        frames: this.anims.generateFrameNumbers('BOSS-idle', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'BOSS_no_breath',
        frames: this.anims.generateFrameNumbers('BOSS-no-breath', { start: 0, end: 7 }),
        frameRate: 6,
        repeat: 0
      });

      this.anims.create({
        key: 'BOSS_fire_breath',
        frames: this.anims.generateFrameNumbers('BOSS-fire-breath', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: 0
      });

      this.anims.create({
        key: 'BOSS_blue_breath',
        frames: this.anims.generateFrameNumbers('BOSS-blue-fire-breath', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: 0
      });

      this.anims.create({ key: 'darkMatterBoss', frames: this.anims.generateFrameNumbers('darkMatter', { start: 0, end: 29 }), frameRate: 20, repeat: -1 }); 

    }
}

