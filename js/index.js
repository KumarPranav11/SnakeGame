//game constants & variable
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 11, y: 17}
]
food = {x: 6, y: 7};

//game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if snake bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    
}

function gameEngine(){
    //part 1: updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over: Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y  && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highest Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), 
            y: Math.round(a + (b-a)* Math.random())}
    } 

    //Moving the snake
     for (let i = snakeArr.length - 2; i >= 0; i--) {
         snakeArr[i+1] = {...snakeArr[i]};
     }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("Highest Score: ", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score: " + hiscore;
}


window.requestAnimationFrame(main);


/*
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1}  //start the game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("pressed w")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

            
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})*/



// Initialize the input direction
inputDir = { x: 0, y: 0 };

// Keyboard event listener for arrow keys
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };  // Start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

// Mouse click event listener for left and right clicks
window.addEventListener("mousedown", event => {
    switch (event.button) {
        case 0: // Left mouse button
            console.log("Left Mouse Click (Move Left)");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 2: // Right mouse button
            console.log("Right Mouse Click (Move Right)");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});

// Mouse wheel scroll event listener for up and down movements
window.addEventListener("wheel", event => {
    if (event.deltaY < 0) {
        console.log("Scroll Wheel Forward (Move Up)");
        inputDir.x = 0;
        inputDir.y = -1;
    } else if (event.deltaY > 0) {
        console.log("Scroll Wheel Backward (Move Down)");
        inputDir.x = 0;
        inputDir.y = 1;
    }
});

// Prevent context menu on right-click to avoid interference
window.addEventListener("contextmenu", event => {
    event.preventDefault();
});
