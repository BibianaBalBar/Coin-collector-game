let game;
let player;
let platforms;
let badges;
let items;
let cursors;
let jumpButton;
let text;
let winningMessage;
let won = false;
let currentScore = 0;
let winningScore = 100;

// add coins to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(200, 500, 'coin');
  createItem(520, 300, 'coin');
  createItem(150, 500, 'coin');
  createItem(100, 350, 'coin');
  createItem(700, 250, 'coin');
  createItem(225, 220, 'coin');
  createItem(530, 150, 'coin');
  createItem(330, 75, 'coin');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(300, 450, 'platform');
  platforms.create(420, 350, 'platform');
  platforms.create(50, 400, 'platform');
  platforms.create(600, 300, 'platform');
  platforms.create(150, 270, 'platform');
  platforms.create(480, 200, 'platform');
  platforms.create(280, 125, 'platform');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  let item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  let badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an coin
function itemHandler(player, item) {
  item.kill();
  currentScore = currentScore + 10;
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#439FD9';     
    //Load images
    game.load.image('platform', 'imgs/platform_2.png');    
    //Load spritesheets
    game.load.spritesheet('player', 'imgs/chalkers.png', 48, 62);
    game.load.spritesheet('coin', 'imgs/coin.png', 36, 44);
    game.load.spritesheet('badge', 'imgs/badge.png', 42, 54);
  }
  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    addItems();
    addPlatforms();
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 28px orbitron", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 72px orbitron", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }
  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;
    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
