/**
 * Created by shaq on 08/08/2017.
 */

// The Snake
var snakeX = 3;
var snakeY = 3;
// The Map
var height = 30;
var width = 30;
// The game speed
var interval = 100;
// The amount of growth
var growth = 1;
var score = 0;
// The snakes tail
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
// The food
var fX;
var fY;
// Is the game running
var running = true;
var gameOver = false;
var int;
// Movement
var direction = -1;
//-1 down
//0  up
//1  right
//2  left

// Start the program
function run(){
    int = setInterval(gameLoop, interval);
    draw();
}

function draw(){
    createMap();
    createSnake();
    createFood();
}
// Let's make the map
function createMap(){
    // It's made out of table elements
    document.write("<table>");
    // For every row it makes, it creates a column
    for(var y = 0; y < height; y++){
        document.write("<tr>");
        for(var x = 0; x < width; x++){
            // If it's making the first or final element of the row or column
            // it will use a wall element, instead of a blank element
            if(x == 0|| x == width - 1 || y == 0 || y == height - 1){
                // Each element has an assigned ID (it increments)
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
            }else{
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function get(x,y){
    return document.getElementById(x+"-"+y);
}
function set(x,y,value){
    if(x != null && y != null)
        get(x,y).setAttribute("class", value);
}
// When you make the snake give it a value of "snake"
function createSnake(){
    set(snakeX, snakeY, "snake");
}
function rand(min, max){
    return Math.floor(Math.random()* (max - min) +min)
}
function getType(x,y){
    return get(x,y).getAttribute("class");
}
// When you make the food, put it in a random place within the
// map and give it the value of "food"
function createFood(){
    var found = false;
    while(!found &&(length < (width-2)*(height-2)+1)){
        var foodX = rand(1, width-1);
        var foodY = rand(1, height -1);
        if(getType(foodX, foodY) == "blank")
            found = true;
    }
    set(foodX, foodY, "food");
    fX = foodX;
    fY = foodY;
}
window.addEventListener("keypress", function key(){
    var key = event.keyCode;
    //pause the game with SpaceBar
    if(!running){running = true;
    }
    else if(key == 32){running = false; alert("Paused");
    }
    // move up
    if(direction != -1 && (key == 119 || key == 87)){direction = 0;
    }
    // move down
    else if(direction != 0 && (key == 115 || key == 83)){direction = -1;
    }
    // move right
    else if(direction != 2 && (key == 100 || key == 68)){direction = 1;
    }
    // move left
    else if(direction != 1 && (key == 97 || key == 65)){direction = 2;
    }
});
// If the game isn't pause and isn't game over, keep the game going
function gameLoop(){
    if(running && !gameOver){
        update();
    }else if(gameOver){
        clearInterval(int);
    }
}

function update(){
    set(fX, fY, "food");
    // This keeps you at a consistent length
    updateTail();
    set(tailX[length], tailY[length], "blank");
    if(direction == 0){
        snakeY--;
    }else if(direction == -1){
        snakeY++;
    }else if(direction == 1){
        snakeX++;
    }else if(direction == 2){
        snakeX--;
    }
    set(snakeX, snakeY, "snake");
    // if you get the food, you grow, you get points,
    // and the food respawns
    if(snakeX == fX && snakeY == fY){
        createFood();
        length += growth;
        score+=growth*100;
    }
    // If you bite yourself it's game over
    for(var i = tailX.length-1; i >=0; i--){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            alert("You bit yourself, game over");
            gameOver = true;
            break;
        }
    }

    // If you hit the wall it's game over
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1){
        alert("You hit a wall, game over");
        gameOver = true;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updateTail(){
    for(var i= length; i>0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();