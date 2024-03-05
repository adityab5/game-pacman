
const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const squares = [];
let score = 0;

// 28 * 28 = 784
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 4, 4, 4, 4, 4, 4, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1,  //476
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

// create board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div'); //create a square
        grid.appendChild(square); //put the square in the grid
        squares.push(square); //put the square in the squares array

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        }
}
}

createBoard();

// starting position of pacman
let pacmanCurrentIndex = 472;

squares[pacmanCurrentIndex].classList.add('pacman');

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman');
    switch(e.keyCode) {
        case 40:
            console.log('pressed down');
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                pacmanCurrentIndex += width;
            }
            break;
        case 38:
            console.log('pressed up');
            if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                pacmanCurrentIndex -= width;
            }
            break;
        case 37:
            console.log('pressed left');
            if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {
                pacmanCurrentIndex -= 1;
            }
            if(pacmanCurrentIndex === 364){
                pacmanCurrentIndex = 391;
            }
            break;
        case 39:
            console.log('pressed right');
            if(pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')){
                pacmanCurrentIndex += 1;
            }
            if(pacmanCurrentIndex === 391){
                pacmanCurrentIndex = 364;
            }
            break;
        default:
            console.log('pressed something else');
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}

document.addEventListener('keyup', control);

function pacDotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
}

function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //removing the power-pellet class form square
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className);
    squares[ghost.startIndex].classList.add('ghost');
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    console.log('moving ghost');
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    console.log(direction);

    //1.remove any ghost
    //2.add direction to current index
    //3.add ghost class
    ghost.timerId = setInterval(function() {
        //if the next square your ghost is going to go to does not contain a wall and a ghost, you can go there
        if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            //you can go here
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
            //move into that space
            //add direction to current index
            //add ghost class
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost');
        } else {
            //else find a new direction to try
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        //if the ghost is currently scared
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //if the ghost is currently scared and pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
        
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }


    checkForGameOver();
    }, ghost.speed);
}

//check for game over
function checkForGameOver() {
    if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
        scoreDisplay.innerHTML = 'You LOSE';
    }
}

//check for win
function checkForWin() {
    if(score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
        scoreDisplay.innerHTML = 'You WIN';
    }
}