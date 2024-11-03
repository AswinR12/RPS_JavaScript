let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
} 
updateScoreElement();
document.body.querySelector('.js-rock-button').addEventListener(
    'click',() => playGame('Rock')    //call playGame when clicked.
);
document.body.querySelector('.js-paper-button').addEventListener(
    'click',() => playGame('Paper')
);
document.body.querySelector('.js-scissor-button').addEventListener(
    'click',() => playGame('Scissors')
);
function updateScoreElement(){
    document.body.querySelector('.js-scoretext').innerText = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
}
function updateResultElement(result){
    document.body.querySelector('.js-result').innerText = ` Result : ${result}`;
}
function updateMovesElement(playerMove,computerMove){
    document.body.querySelector('.js-moves').innerHTML = `You: <img src="Images/${playerMove}-emoji.png" class="move-icon">  Computer: <img src="Images/${computerMove}-emoji.png" class="move-icon">.`;
}

let isAutoPlaying = false;
let intervalID = undefined;
function autoPlay(){ //play game every second.
    if (isAutoPlaying === false) {
        intervalID = setInterval(
            function() {
                const playermove = pickComputerMove();
                playGame(playermove);
            }, 1000
        );
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}
function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result ='';
    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You Lose.';
        }
        else if(computerMove === 'Paper'){
            result = 'You win!';
        }
        else{
            result = 'Tie';
        }
    }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Rock'){
            result = 'You win.';
        }
        else if(computerMove === 'Paper'){
            result = 'Tie.';
        }
        else{
            result = 'You Lose.';
        }
    }
    else if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
            result = 'Tie.';
        }
        else if(computerMove === 'Paper'){
            result = 'You Lose.';
        }
        else{
            result = 'You win!';
        }
    }
    if(result === 'You win!'){
        score.wins +=1;
    }
    else if (result === 'You Lose.'){
        score.losses += 1;
    }
    else{
        score.ties += 1;
    }
    localStorage.setItem('score',JSON.stringify(score)); 
    console.log(`Computer move: ${computerMove}`);
    updateScoreElement();
    updateMovesElement(playerMove,computerMove);
    updateResultElement(result);

}
function pickComputerMove(){
    let computerMove = '';
    const choice = Math.random();
    if(choice >= 0 && choice < (1/3)){
        computerMove = 'Rock';
    }
    else if(choice >= (1/3) && choice < (2/3)){
        computerMove = 'Paper';
    }
    else{
        computerMove = 'Scissors';
    }
    return computerMove;
}