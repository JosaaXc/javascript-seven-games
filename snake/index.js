const canvas = document.getElementById('game')
const snake = canvas.getContext('2d')

class SnakePart{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

let speed = 7

let tileCount = 20
let tileSize = canvas.width / tileCount-2
let headX = 10
let headY = 10
const snakeParts=[]
let tailLengt = 2


let appleX = 5
let appleY = 5

let xVelocity=0
let yVelocity=0

let score = 0

const sound = new Audio("audio.mp3")
//game loop
function drawGame(){
    changeSnakePosition()
    let result = isGameOver()
    if(result)
        return

    clearScreen()


    checkAppleCollision()
    drawApple()
    drawSnake()
    drawScore()
    setTimeout(drawGame, 1000/speed)
}

function isGameOver(){
    let gameOver = false 
    if(yVelocity === 0 && xVelocity===0)
        return false
    //walls 
    if(headX < 0 || headX === tileCount || headY < 0 || headY===tileCount)
    gameOver = true

    if(gameOver){
        snake.fillStyle = "white"
        snake.font = "50px Verdanana"
         var gradient = snake.createLinearGradient(0, 0, canvas.width, 0)
         snake.fillText("GAME OVER!", canvas.width/8.5, canvas.height/2)
    }
    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver= true
            break
        }
    }

    return gameOver
}
function drawScore(){
    snake.fillStyle= "white"
    snake.font = "10px Verdana"
    snake.fillText("Score"+score, canvas.width-50, 10)
}

function drawSnake(){
    snake.fillStyle='green'
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        snake.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY))
    while(snakeParts.length > tailLengt){
        snakeParts.shift()
    }

    snake.fillStyle = 'orange'
    snake.fillRect((headX*tileCount), (headY*tileCount), tileSize, tileSize)
}
function clearScreen(){
    snake.fillStyle= 'black'
    snake.fillRect(0, 0, canvas.clientWidth, canvas.height)
}

function changeSnakePosition(){
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple(){
    snake.fillStyle="red"
    snake.fillRect(appleX*tileCount,appleY*tileCount, tileSize, tileSize)
}
function checkAppleCollision(){
    if(appleX===headX && appleY===headY){
        appleX = Math.floor(Math.random()*tileCount)
        appleY = Math.floor(Math.random()*tileCount)
        tailLengt++
        score++
        sound.play();
    }
}
document.body.addEventListener('keydown', keydown)
function keydown(event){
    if(event.keyCode == 38){
        if(yVelocity==1)
            return
        yVelocity = -1
        xVelocity = 0 
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity==-1)
            return
        yVelocity = 1
        xVelocity = 0 
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity==1)
            return
        yVelocity = 0
        xVelocity = -1 
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity==-1)
            return
        yVelocity = 0
        xVelocity = 1 
    }

}
drawGame()