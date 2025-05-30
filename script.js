(function ticTacToe(){
//variables
const body = document.querySelector("body");

//functions
function overlay(){
    const overlayScreen = document.createElement("div");
    overlayScreen.id = "overlay";
    body.appendChild(overlayScreen);
}
function playerDetails(){
    const playerDetailContainer = document.createElement("div");
    playerDetailContainer.id = "playerDetailContainer";
        
    for (let i = 1; i <= 2; i++) {
        let playerNoDetailContainer = document.createElement("div");
        playerNoDetailContainer.id = "player" + i + "DetailContainer";

        let playerNameLabel = document.createElement("label");
        playerNameLabel.htmlFor = "player" + i + "Name";
        playerNameLabel.textContent = "Player " + i + " Name: ";
        
        let playerNameInput = document.createElement("input");
        playerNameInput.id = "player" + i + "Name";

        let playerMarkLabel = document.createElement("label");
        playerMarkLabel.htmlFor = "player" + i + "Mark";
        playerMarkLabel.textContent = "Player " + i + " Mark: " ; 

        let playerMarkInput = document.createElement("input");
        playerMarkInput.id = "player" + i + "Mark";

        playerNoDetailContainer.appendChild(playerNameLabel);
        playerNoDetailContainer.appendChild(playerNameInput);
        playerNoDetailContainer.appendChild(playerMarkLabel);
        playerNoDetailContainer.appendChild(playerMarkInput);
        playerDetailContainer.appendChild(playerNoDetailContainer);

}
    body.appendChild(playerDetailContainer);


    const submitButton = document.createElement("button");
    submitButton.id = "submitButton";
    submitButton.textContent = "Submit";
    playerDetailContainer.appendChild(submitButton);
}
function submitPlayerDetails(){
    
    const submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", () =>{


        function processPlayer(name, mark, number){
            let score = 0;
            let playerNameDisplay = document.querySelector("#player" + number + "NameDisplay");
            playerNameDisplay.textContent = name;
            
            let playerMarkDisplay = document.querySelector("#player" + number + "MarkDisplay");
            playerMarkDisplay.textContent = mark;

            let scoreDisplay = document.querySelector("#player" + number + "ScoreDisplay");
            scoreDisplay.textContent = score;

            return { name , mark, score, number}
        }

        const player1 = processPlayer(player1Name.value, player1Mark.value , "1");
        const player2 = processPlayer(player2Name.value, player2Mark.value, "2");
        

        const overlay = document.querySelector("#overlay");
        const playerDetailContainer = document.querySelector("#playerDetailContainer");

        body.removeChild(overlay);
        body.removeChild(playerDetailContainer);
    

        //i guess start the game here
        playGame(player1, player2);
    });

}

function playGame(player1, player2){
    let board = [
        ["" , "" , ""],
        ["" , "" , ""],
        ["" , "" , ""] ];
    let prevPlayer;
    const gameBoard = document.querySelector("#gameBoard");
    const buttons = gameBoard.querySelectorAll("button");    
    playerTurn = player1;
/////////////////////////////////////////////////////////////////
    function playerMove(button, playerTurn, board){
        button.disabled = true;
        button.textContent = playerTurn.mark;
        let row = Number(button.id[1]);
        let column  = Number(button.id[3]);
        board[row-1][column-1] = playerTurn.mark;
        let winCondition = evaluatePattern();

        if (winCondition == false){
        if (playerTurn == player1){
                playerTurn = player2;
            }else{
                playerTurn = player1;
            }
            return playerTurn;
        }else{
           return  playerTurn;
        }

    }
    function evaluatePattern(){
            if ((board[0][0] == board[1][1] && board[0][0]== board[2][2] && board[0][0] !== "") ||
                 (board[0][2] == board[1][1] && board[1][1]== board[2][0] && board[0][2] !== "")){
                return true;
            }
         
            for (let l = 0; l<=2 ;l++){
                    if (board[l][0] == board[l][1] && board[l][0]== board[l][2] && board[l][0] !== ""){
                        return true;
                    }
                    if (board[0][l] == board[1][l] && board[0][l]== board[2][l] && board[0][l] !== ""){
                        return true;

                    }

            }
            /////tie
            let counter = 0;
            board.forEach(row => {
                row.forEach(column => {
                    if (column !== ""){
                        counter +=1;
                        console.log(counter);
                    }
                });
            });
            if (counter == 9){
                 board = [
                    ["" , "" , ""],
                    ["" , "" , ""],
                    ["" , "" , ""] ];
                buttons.forEach(button => {
                    button.textContent = "";
                    button.disabled = false;
                    
                });
                alert("Tie");
                 }
                return false;
    }
    function  evaluateWinner(){
        if (prevPlayer == playerTurn){
            let winnerScore = document.querySelector("#player" + playerTurn.number + "ScoreDisplay");
            playerTurn.score += 1;
            winnerScore.textContent = playerTurn.score;
            console.log(playerTurn.name);
            board = [
        ["" , "" , ""],
        ["" , "" , ""],
        ["" , "" , ""] ];
            buttons.forEach(button => {
                button.textContent = "";
                button.disabled = false;
            });
            if (playerTurn.score == 3){
                function resetScores(score, number){
                    let scoreDisplay = document.querySelector("#player" + number + "ScoreDisplay");

                    scoreDisplay.textContent = "0";
                    score = 0;
                }
                
                resetScores(player1.score, "1");
                resetScores(player2.score, "2");
                
                alert(playerTurn.name + " Wins!");/*
                overlay();
                const winnerContainer = document.createElement("div");
                winnerContainer.id = "winnerContainer"
                const winnerName = document.createElement("p");
                winnerName.textContent = playerTurn.name + " WINS!";
                const restart = document.createElement("button");
                restart.id = "restart";
                restart.textContent = "Play Again?";

                winnerContainer.appendChild(winnerName);
                winnerContainer.appendChild(restart);
                body.appendChild(winnerContainer);

                restart.addEventListener("click", () =>{
                        playGame(player1, player2);
                });*/
            }
    }}

//////////////////////////////////////////////////////////////
    buttons.forEach( button => {
        button.addEventListener("click", () => {
            
            switch (button.id) {
                case "r1c1":
                    prevPlayer = playerTurn;
                    //evaluate tie
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();
                    break;
                case "r1c2":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();    
                    break;
                case "r1c3":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();
                    break;
                case "r2c1":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();     
                    break;
                case "r2c2":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();        
                    break;
                case "r2c3":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();            
                    break;
                case "r3c1":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();                
                    break;
                case "r3c2":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();          
                    break;
                case "r3c3":
                    prevPlayer = playerTurn;
                    playerTurn = playerMove(button, playerTurn, board);
                    evaluateWinner();
                    break;

            
                default:
                    break;
            }
            //evaluate score fucntion
        });
    });

}
//events

overlay();
playerDetails();
submitPlayerDetails();



})();
