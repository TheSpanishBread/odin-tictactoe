(function initialize(){
    const variables = function(){
        //DOM
        const playersSubmit = document.querySelector("#submitPlayers");
        const overlay = document.querySelector("#overlay");
        const body = document.querySelector("body");
        const playersForm = document.querySelector("#playerRegister");
        const game = document.querySelector("#game");
        const gameButtons = document.querySelectorAll(".gameBoard > button");
        //Script
        let player1, player2;
        let players = [player1, player2];
        let gameInstance;
        return {
            playersSubmit, overlay, body, playersForm, game, gameButtons, players
        };
    }();
    ///////////FACTORIES//////////
    function StartGame(variables) {
        //gameInstace variables
        let currentPlayerIndex = 0;
        let win = false;
        let currentMark = variables.players[currentPlayerIndex].mark;
        let board = [["", "", ""],
                        ["", "", ""],
                        ["", "", ""],
                ];
        let resetBoard = () => { 
            board = [["", "", ""],
                        ["", "", ""],
                        ["", "", ""],
                ];
                    variables.gameButtons.forEach(button => {
                    button.textContent = "";
                    button.disabled = false;
                });
            };
        // gameInstance Functions
                //switches player
        const switchPlayer = () =>{
            if (currentPlayerIndex == 0){
                currentPlayerIndex = 1;
            }else{
                currentPlayerIndex = 0;
                }
        }
                //get current player and mark
        const getCurrentPlayer = ()=>  currentPlayerIndex;
        const getCurrentMark = ()=>  variables.players[currentPlayerIndex].mark;
                //updates the board
        const updateBoard = (row, column, mark) =>{
            board[row-1][column-1] = mark; 
            console.log(board);
        
            };
        const checkWin = () => {
            for(let i = 0 ;i<=2; i++){
                 if(
                    (board[0][i] != "") &&
                    (board[0][i] == board[1][i]) &&
                    (board[0][i] == board[2][i])
                 ){
                    return true;
                 }
                 if(
                    (board[i][0] != "") &&
                    (board[i][0] == board[i][1]) &&
                    (board[i][0] == board[i][2])
                 ){
                    return true;
                 }
            }
                 if(
                    (board[0][0] != "") &&
                    (board[0][0] == board[2][2]) &&
                    (board[0][0] == board[1][1])
                 ){
                    return true;
                 }
                 if(
                    (board[0][2] != "") &&
                    (board[0][2] == board[2][0]) &&
                    (board[0][2] == board[1][1])
                 ){
                    return true;
                 }

        }
            const checkTie  = () =>{
                for(let i = 0 ; i <= 2 ; i++){
                    for(let j = 0 ; j <=2; j++){
                        if (board[i][j] == ""){
                            return false;

                        }
                    }
                } 
                return true;
    };
        return {currentPlayerIndex, win, currentMark, board, switchPlayer, getCurrentPlayer,
            getCurrentMark, updateBoard, checkWin, resetBoard, checkTie};
    }
    /////////Player object factory
    function createPlayers(name, mark){
        let score = 0;

        const addScore = () => score++;
        const getScore = () => score;
        const resetScore = () => score = 0;

        return {name, mark, score, addScore, getScore, resetScore};
    }
    /////////////////////EVENTS//////////////
    //.1 Player registration
    (function playersGenerate(variables){
        variables.playersSubmit.addEventListener("click", (e) =>{
            e.preventDefault();
            for(let i = 1 ; i <=2 ;i++){
                let playerName = document.querySelector("#player" + i + "Name").value;
                let playerMark = document.querySelector("#player" + i + "Mark").value;
                variables.players[i-1] = createPlayers(playerName, playerMark);
            }
            variables.body.removeChild(variables.overlay);
            variables.body.removeChild(variables.playersForm);
            //creates properties to objects in array
            for(let j = 1 ; j<=2 ; j++){
                let playerNameDisplay = document.querySelector("#player" + j + "NameDisplay");
                let playerMarkDisplay = document.querySelector("#player" + j + "MarkDisplay");
                let playerScoreDisplay = document.querySelector("#player" + j + "ScoreDisplay");
                playerNameDisplay.textContent = variables.players[(j-1)].name;
                playerMarkDisplay.textContent = variables.players[(j-1)].mark;
                playerScoreDisplay.textContent = variables.players[(j-1)].getScore();
            }
            console.log(variables.players);
            //runs start game function
            gameInstance = StartGame(variables);
        }); 
        }(variables));
    //2. Start Game
    variables.gameButtons.forEach(button => {
        //trigger for individualy buttons
        button.addEventListener("click", () =>{    
            //somwhat optional? not sure if this is needed 
            let playerIndex =  gameInstance.getCurrentPlayer();
            let mark = gameInstance.getCurrentMark();
            let pattern = button.id;
            button.textContent = mark;

            let [row, column] = pattern.split("-").map(Number);
            gameInstance.updateBoard(row, column, mark);
            button.disabled = true;
            
            if (gameInstance.checkWin() == true){
                console.log("win!");
                alert(variables.players[playerIndex].name + " Wins!")
                variables.players[playerIndex].addScore();
                document.querySelector("#player"+ (playerIndex+1) + "ScoreDisplay").textContent = variables.players[playerIndex].getScore(); 
                gameInstance.resetBoard();

                if (variables.players[playerIndex].getScore() == 3){
                    console.log("Game Over!");
                    alert("Game Over! " + variables.players[playerIndex].name + " Wins! Click 'OK' to start a new game.")
                    variables.players[0].resetScore();
                    document.querySelector("#player"+ (1) + "ScoreDisplay").textContent = 0;
                    variables.players[1].resetScore();
                    document.querySelector("#player"+ (2) + "ScoreDisplay").textContent = 0;
                }
                

                gameInstance.switchPlayer();

            }else{
            gameInstance.switchPlayer();
            //add here if tied
                if (gameInstance.checkTie() == true){
                    console.log("tie");
                    alert("Tie! Press 'Ok' to continue.")
                    gameInstance.resetBoard();  
                    console.log("reset");
                }
            }
            //add here to get index if score is equal to 3

            //if false swotch player
            //if true stop game then set game index to winner
            

            //
            //add check here if player has won add the object from the gameinstance object

        });
    });
        //events
    //FUNCTIONS
        //object register


})();