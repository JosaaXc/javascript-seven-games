const computerChoiseDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoise
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=> {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoise()
    getResult()
}))

function generateComputerChoise(){
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) +1
    if(randomNumber === 1){
        computerChoise = 'rock'
    }
    if(randomNumber === 2){
        computerChoise = 'scissor'
    }
    if(randomNumber === 3){
        computerChoise = 'paper'
    }
    computerChoiseDisplay.innerHTML = computerChoise

}

function getResult(){
    if(computerChoise === userChoice){
        result = 'its a draw '
    }
    if(computerChoise ==='rock' && userChoice ===  'paper'){
        result = 'you win'
    }
    if(computerChoise ==='rock' && userChoice ===  'scissors'){
        result = 'you lost'
    }
    if(computerChoise ==='paper' && userChoice ===  'scissors'){
        result = 'you win'
    }
    if(computerChoise ==='paper' && userChoice ===  'rock'){
        result = 'you lost'
    }
    if(computerChoise ==='scissors' && userChoice ===  'rock'){
        result = 'you win'
    }
    if(computerChoise ==='scissors' && userChoice ===  'paper'){
        result = 'you lose'
    }
    resultDisplay.innerHTML = result
}