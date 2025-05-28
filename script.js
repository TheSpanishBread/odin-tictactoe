(function (){
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
        let player1Name = document.querySelector("#player1Name");
        let player1Mark = document.querySelector("#player1Mark");
        let player2Name = document.querySelector("#player2Name") ;
        let player2Mark = document.querySelector("#player2Mark") ;


        function processPlayer(name, mark, nameDisplay, markDisplay, number){
            let score = 0;
            let playerNameDisplay = document.querySelector("#" + nameDisplay + "Display");
            playerNameDisplay.textContent = "Player " + number + " Name: " + name;
            let playerMarkDisplay = document.querySelector("#" + markDisplay + "Display");
            playerMarkDisplay.textContent = "Player " + number + " Mark: " + mark;
            let scoreDisplay = document.querySelector("#player" + number + "Score");
            scoreDisplay.textContent = score;
            playerMarkDisplay.textContent = "Player " + number + " Mark: " + mark;
            return { name , mark}
        }

        const player1 = processPlayer(player1Name.value, player1Mark.value, "player1Name" , "player1Mark" , "1");
        const player2 = processPlayer(player2Name.value, player2Mark.value, "player2Name" , "player2Mark", "2");
        

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
        ["" , "" , ""],
        
    ];
    const gameBoard = document.querySelector("#gameBoard");
    const buttons = gameBoard.querySelectorAll("button");    
    playerTurn = player1;

    function playerMove(button, playerTurn, board){
        button.disabled = true;
        button.textContent = playerTurn.mark;
        let row = Number(button.id[1]);
        let column  = Number(button.id[3]);
        board[row-1][column-1] = playerTurn.mark;
        if (playerTurn == player1){
            playerTurn = player2;
        }else{
            playerTurn = player1;
        }
        console.log(board);
    }


    buttons.forEach( button => {
        button.addEventListener("click", () => {
            switch (button.id) {
                case "r1c1":
                    playerMove(button, playerTurn, board);

                    break;
                case "r1c2":
                    playerMove(button, playerTurn, board);                  
                    break;
                case "r1c3":
                    playerMove(button, playerTurn, board);
                    break;
                case "r2c1":
                    playerMove(button, playerTurn, board);                
                    break;
                case "r2c2":
                    playerMove(button, playerTurn, board);                    
                    break;
                case "r2c3":
                    playerMove(button, playerTurn, board);                    
                    break;
                case "r3c1":
                    playerMove(button, playerTurn, board);                    
                    break;
                case "r3c2":
                    playerMove(button, playerTurn, board);                    
                    break;
                case "r3c3":
                    playerMove(button, playerTurn, board);                    
                    break;

            
                default:
                    break;
            }
        });
    });

}
//events

overlay();
playerDetails();
submitPlayerDetails();



})();