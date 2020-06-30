const coin = (scene) => {
    scene.coinUI = scene.physics.add.sprite(16, 192, 'coin').setScrollFactor(0).setScale(1.2);
    scene.coinUI.body.allowGravity = false;
    scene.coinUI.anims.play('coin_spin');

    scene.goldText = scene.add.text(22, 184, '0', { fontSize: '14px', fill: 'gold' });
    scene.goldText.setScrollFactor(0);
}