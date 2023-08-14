import Phaser from 'phaser';

// Import stylesheets
import './style.css';

/* ----------------------------------- START SCENE --------------------------------- */
class BootLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'BootLevel' });
  }

  preload() {
    // CHANGE BASE URL!!!!
    this.add.text(20, 20, 'Boot Sequence Initiated.');
    this.load.baseURL =
      'https://griffin-zielke.github.io/g-rift-splash-screen/';
    this.load.bitmapFont({
      key: 'Oswald',
      textureURL: 'static/assets/font/G-Rift-Blue.png',
      fontDataURL: 'static/assets/font/G-Rift-Blue.xml',
    });
    this.load.image('logo', 'static/assets/G Rift.png');

    this.load.image('splashscreen', 'static/assets/splashscreen.png');
  }

  create() {
    this.scene.start('SplashLevel');
  }
}

/* ----------------------------------- START SCENE --------------------------------- */
class SplashLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashLevel' });
  }

  preload() {
    const logo = this.add.image(200, 100, 'logo');
    logo.setScale(1.3);
    this.logo = logo;

    const text1 = this.add.bitmapText(-300, 200, 'Oswald', 'G Rift', 32);
    this.companyLine1 = text1;
    const text2 = this.add.bitmapText(-300, 230, 'Oswald', 'Indie Games', 32);
    this.companyLine2 = text2;

    const loading = this.add.text(180, 300, ['Loading...'], {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: 'black',
      align: 'center',
    });

    /* START PRELOAD ITEMS */
    this.load.baseURL = 'https://griffin-zielke.github.io/xsnake-gamex/';
    this.load.image('SnakeSkin', 'static/assets/SnakeSkin.png');
    /* END PRELOAD ITEMS */
  }
  private logo: Phaser.GameObjects.Image;
  private companyLine1: Phaser.GameObjects.BitmapText;
  private companyLine2: Phaser.GameObjects.BitmapText;

  create() {
    this.cameras.main.setBackgroundColor('#006298');
    //    this.tweens.add({
    //      targets: this.logo, //your image that must spin
    //      rotation: 2 * Math.PI, //rotation value must be radian
    //     ease: 'Bounce',
    //      delay: 600,
    //      duration: 600, //duration is in milliseconds
    //    });

    this.tweens.add({
      targets: this.companyLine1, //your image that must spin
      x: '165',
      ease: 'Elastic',
      duration: 500, //duration is in milliseconds
    });
    this.tweens.add({
      targets: this.companyLine2, //your image that must spin
      x: '135',
      ease: 'Elastic',
      duration: 500, //duration is in milliseconds
    });

    setTimeout(() => {
      this.scene.start('MainLevel');
    }, 2000);
  }

  update() {}
}

/* ----------------------------------- MAIN SCENE --------------------------------- */

class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'MainLevel' });
  }

  preload() {}

  create() {
    this.physics.world.setBoundsCollision(true,true,true,true)
    this.physics.world.setBounds(0,0,400,400)
    const SnakeSkin = this.physics.add.sprite(100, 100, 'SnakeSkin');
    this.SnakeSkin = SnakeSkin;
    const cursorKeys = this.input.keyboard.createCursorKeys();
    this.cursorKeys = cursorKeys;
  }
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private SnakeSkin: Phaser.GameObjects.Sprite;

  update() {
    this.cameras.main.backgroundColor, '#FFF';

    this.moveSprite();
  }
  moveSprite() {
    if (this.cursorKeys.up.isDown) {
      this.SnakeSkin.y -= 5; // will move your sprite right
    }

    if (this.cursorKeys.down.isDown) {
      this.SnakeSkin.y += 5; // will move your sprite right
    }

    if (this.cursorKeys.left.isDown) {
      this.SnakeSkin.x -= 5; // will move your sprite right

    }

    if (this.cursorKeys.right.isDown) {
      this.SnakeSkin.x += 5; // will move your sprite right
    }
  }
  checkBoundary() {
    if (this.SnakeSkin.x >= 400) {
       this.scene.start('MainLevel');
    }

    if (this.SnakeSkin.x <= 0) {
      this.scene.start('MainLevel');    
    }

    if (this.SnakeSkin.y >= 400) {
      this.scene.start('MainLevel');    
    }

    if (this.SnakeSkin.y <= 0) {
      this.scene.start('MainLevel');    
    }
    if (this.SnakeSkin.x >= 400) {
      this.scene.start('MainLevel');  
    }
}
}

/* -------------------------------------------------------------------------- */
/*                                RUN GAME.                                   */
/* -------------------------------------------------------------------------- */

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: '#0x000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BootLevel, SplashLevel, MainLevel],
};

const game = new Phaser.Game(config);
