document.addEventListener('DOMContentLoaded', function(){
    
    const b0 = document.getElementById('box1'); //0
    const b1 = document.getElementById('box2'); //1
    const b2 = document.getElementById('box3'); //2
    const b3 = document.getElementById('box4'); //3
    const b4 = document.getElementById('box5'); //4
    const b5 = document.getElementById('box6'); //5
    const b6 = document.getElementById('box7'); //6
    const b7 = document.getElementById('box8'); //7
    const b8 = document.getElementById('box9'); //8

    let currPlayer = document.getElementById('currPlayer');
    const result = document.getElementById('result');
    const resultDiv = document.getElementById('resultDiv');
    
    
    // player true : X and false : O
    let player = true;


    // no of boxes played
    let count = 0;
    
    
    // add click event listener to boxes
    const boxes = document.getElementsByClassName('box');
    for(let i=0; i<boxes.length; i++){
        boxes.item(i).setAttribute('data-id', i);
        boxes.item(i).addEventListener('click', playerTurn);
    }


    // individual player's turn
    function playerTurn(){

        count ++;
        this.style.backgroundColor = '#508688';
        this.removeEventListener('click', playerTurn);
        
        let thisBoxID = parseInt(this.getAttribute('data-id'), 10);
 
        let winner;

        if(player){ 
            this.innerHTML = 'X';
            winner = (checkForWinner(thisBoxID,'X')) ? 'X' : '';
        }
        else{
            this.innerHTML = 'O';
            winner = (checkForWinner(thisBoxID,'O')) ? 'O' : '';
        }

        if(winner != ''){
            endgame();
            result.innerHTML = `Yay! ${winner} has won.`;
        }else if(checkforTie()){
            endgame();
            result.innerHTML = `Game Tied.`;
        }
        
        // change turn
        player = !player;
        
        if(player) currPlayer.innerHTML = 'X';
        else currPlayer.innerHTML = 'O';
    }
    
    
    // check grid for possible win

    // 0 1 2
    // 3 4 5
    // 6 7 8

    function checkForWinner(position, symbol){
        switch(position){
            case 0: {
                // 1 2
                // 3 6
                // 4 8
                if (b1.innerHTML == symbol && b2.innerHTML == symbol || 
                    b3.innerHTML == symbol && b6.innerHTML == symbol || 
                    b4.innerHTML == symbol && b8.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 1: {
                // 0 2
                // 4 7
                if (b0.innerHTML == symbol && b2.innerHTML == symbol || 
                    b4.innerHTML == symbol && b7.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 2: {
                // 0 1
                // 4 6
                // 5 8
                if (b0.innerHTML == symbol && b1.innerHTML == symbol || 
                    b4.innerHTML == symbol && b6.innerHTML == symbol || 
                    b5.innerHTML == symbol && b8.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 3: {
                // 0 6
                // 4 5
                if (b0.innerHTML == symbol && b6.innerHTML == symbol || 
                    b4.innerHTML == symbol && b5.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 4: {
                // 0 8
                // 2 6
                // 1 7
                // 3 5
                if (b0.innerHTML == symbol && b8.innerHTML == symbol || 
                    b2.innerHTML == symbol && b6.innerHTML == symbol || 
                    b1.innerHTML == symbol && b7.innerHTML == symbol ||
                    b3.innerHTML == symbol && b5.innerHTML == symbol){
                    return true;
                }
                break;
            }
            case 5: {
                // 2 8
                // 3 4
                if (b2.innerHTML == symbol && b8.innerHTML == symbol || 
                    b3.innerHTML == symbol && b4.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 6: {
                // 0 3
                // 2 4
                // 7 8
                if (b0.innerHTML == symbol && b3.innerHTML == symbol || 
                    b2.innerHTML == symbol && b4.innerHTML == symbol || 
                    b7.innerHTML == symbol && b8.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 7: {
                // 1 4
                // 6 8
                if (b1.innerHTML == symbol && b4.innerHTML == symbol || 
                    b6.innerHTML == symbol && b8.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            case 8: {
                // 2 5
                // 0 4
                // 6 7
                if (b2.innerHTML == symbol && b5.innerHTML == symbol || 
                    b0.innerHTML == symbol && b4.innerHTML == symbol || 
                    b6.innerHTML == symbol && b7.innerHTML == symbol){
                    return true;
                } 
                break;
            }
            default:{
                return false;
            }
        }
    }

    
    // game over
    function endgame(){
        for(let i=0; i<boxes.length; i++){
            boxes.item(i).removeEventListener('click', playerTurn);
        }
        
        let btn = document.createElement('button');
        btn.innerHTML = 'New Game?';
        btn.setAttribute('class', 'new-btn');
        resultDiv.appendChild(btn);

        btn.addEventListener('click', function(){
            window.location.reload();
        })
    }

    
    function checkforTie(){
        return count === 9;
    }

});