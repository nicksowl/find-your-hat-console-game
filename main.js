const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    this.field = field;
    this.workingField = [];
    // this.randomField = [];
    // Player position - Array number and Index in that Arrray
    this.playerRow = 0;
    this.playerIndex = 0;
    // Win/Lose condition; true - won, false - lost, 0 - game in progress
    this.condition = 0;
    // Message to user, like you 'you move left, right, lost..'
    this.message = '';
  }

  copyField() {
    // Should be Initiated in the begining of the game
    for (var i = 0; i < this.field.length; i++) {
        this.workingField[i] = this.field[i].slice();
    }
  }

  generateField(width, height, difficulty) {
    // Difficulty from 0 to 9
    // Should be fineduned in the future
  
    for (var i = 0 ; i < width; i++) {
        // this.randomField[i] = [];
        this.field[i] = [];
        for (var j = 0; j < height; j++) {

          // this.randomField[i][j] = (Math.random() * 2 | 0) + 1;
          // this.field[i][j] = (Math.random() * 2 | 0) + 1;
          this.field[i][j] = (Math.random() * 10 | 0);

          // if (this.randomField[i][j] == 1) {
          //   this.randomField[i][j] = fieldCharacter;
          // }
          //  if (this.randomField[i][j] == 2) {
          //   this.randomField[i][j] = hole;
          // }
          // if (this.field[i][j] == 1) {
          //   this.field[i][j] = fieldCharacter;
          // }
          // if (this.field[i][j] == 2) {
          //   this.field[i][j] = hole;
          // }

          if (this.field[i][j] > difficulty) {
            this.field[i][j] = fieldCharacter;
          }
          if (this.field[i][j] <= difficulty) {
            this.field[i][j] = hole;
          }
        }
    }

    let randomArray = Math.floor(Math.random() * width);
    let randomIndex = Math.floor(Math.random() * height);
    
    // this.randomField[0][0] = pathCharacter;
    // this.randomField[randomArray][randomIndex] = hat;
    // return this.randomField;

    this.field[0][0] = pathCharacter;
    this.field[randomArray][randomIndex] = hat;

    this.copyField();
  }

  findInitialPlayerPosition() {
    // Take amount of nested Arrays and iterate over each of them, using For-Eeach?
    // Use For method like in copyField, to search for user location in as many arrays a possible
    for (var i = 0; i < this.workingField.length; i++) {
      if (this.workingField[i] === pathCharacter) {
        this.playerRow = [i];
        this.playerIndex = this.workingField[i].lastIndexOf(pathCharacter);
      }
    }
  }

  printUserLocation() {
    return 'User location is row # ' + this.playerRow + ' and index # ' + this.playerIndex + ' btw, arrays length is ' + this.workingField.length; 
  }

  printOriginalField() {
    return this.field.map(e => e.join('')).join('\n');
  }

  printField() {
    return this.workingField.map(e => e.join('')).join('\n');
  }

  checkCondition() {
    try {
      if (this.field[this.playerRow][this.playerIndex] === hole 
      || this.playerIndex < 0 
      || this.playerRow > this.field.length
      || this.playerIndex > this.field[0].length - 1
      ) {
        this.condition = false;
      }
      if (this.field[this.playerRow][this.playerIndex] === hat) {
        this.condition = true;
      }
    } catch (e) {
      this.condition = false;
    }
      return this.condition;
  }

  playerMove(direction) {
    this.findInitialPlayerPosition();

    // Error cather aimed to prevent player going outside the field

    if (direction == 's') {
        this.playerRow += 1;
        try {
          this.workingField[this.playerRow].
            splice(this.playerIndex,1, pathCharacter);
          this.message = 'You move DOWN!';
        } catch (e) {
          this.condition = false;
        }
    }
    if (direction == 'a') {
      this.playerIndex -= 1;
      this.workingField[this.playerRow].
        splice(this.playerIndex, 1, pathCharacter);
      this.message = 'You move LEFT!';
    }
    if (direction == 'w') {
      this.playerRow -= 1;
      try {
        this.workingField[this.playerRow].
          splice(this.playerIndex, 1, pathCharacter);
        this.message = 'You move UP!';
      } catch (e) {
        this.condition = false;
      }
    }
    if (direction == 'd') {
      this.playerIndex += 1;
      this.workingField[this.playerRow].
        splice(this.playerIndex, 1, pathCharacter);
      this.message = 'You move RIGHT!';
    }

    this.checkCondition();
  }

  initiateGame() {
    this.generateField(5, 5, 2);

    this.copyField();

    while (this.condition === 0) {
        console.log(this.printField());
        console.log(this.message);
        let userMove = prompt('Where to go? (USE WSAD AND `Q` TO QUIT)');
        this.playerMove(userMove);

        if (userMove === 'q') {
          this.condition = false;
          console.log('You quit!')
        }
        if (userMove === 'loc') {
          console.log(this.printUserLocation());
        }
        if (userMove === 'generate') {
          this.generateField();
        }
    }
    if (this.condition === true) {
      console.log(this.printField());
      console.log(this.message);
      console.log('You won!');
    }
    if (this.condition === false) {
      console.log(this.printField());
      console.log(this.message);
      console.log('You lost!');
    }
  }


};

const myField = new Field([
  []
//   // ['*', '░', '░'],
//   // ['░', '░', 'O'],
//   // ['░', 'O', '░']
// //   ['░', '^', '░'],
// //   ['░', '░', '░'],
// //   // ['*', '░', 'O', '░', '░'],
// //   // ['░', 'O', '░', '░', '░'],
// //   // ['░', '^', '░', '░', '░'],
// //   // ['*', '░', 'O', '░', '░'],
// //   // ['░', 'O', '░', '░', '░'],
// //   // ['░', '^', '░', '░', '░'],
// //   // ['*', '░', 'O', '░', '░'],
// //   // ['░', 'O', '░', '░', '░'],
// //   // ['░', '^', '░', '░', '░'],
]);

// const myField = new Field;

myField.initiateGame();
