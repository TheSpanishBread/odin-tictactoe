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
    
    const player1DetailContainer = document.createElement("div");
    player1DetailContainer.id = "player1DetailContainer";

    const player2DetailContainer = document.createElement("div");
    player2DetailContainer.id = "player2DetailContainer";

    const player1NameLabel = document.createElement("label");
    player1NameLabel.htmlFor = "player1Name";
    player1NameLabel.textContent = "Player 1 Name: ";
    const player1NameInput = document.createElement("input");
    player1NameInput.id = "player1Name";


    const player1MarkLabel = document.createElement("label");
    player1MarkLabel.htmlFor = "player1Mark";
    player1MarkLabel.textContent = "Player 1 Mark: "
    const player1MarkInput = document.createElement("input");
    player1MarkInput.id = "player1Mark";


    const player2NameLabel = document.createElement("label");
    player2NameLabel.htmlFor = "player2Name";
    player2NameLabel.textContent = "Player 2 Name: ";
    const player2NameInput = document.createElement("input");
    player2NameInput.id = "player2Name";


    const player2MarkLabel = document.createElement("label");
    player2MarkLabel.htmlFor = "player2Mark";
    player2MarkLabel.textContent = "Player 2 Mark: "
    const player2MarkInput = document.createElement("input");
    player2MarkInput.id = "player2Mark";


    player1DetailContainer.appendChild(player1NameLabel);
    player1DetailContainer.appendChild(player1NameInput);
    player1DetailContainer.appendChild(player1MarkLabel);
    player1DetailContainer.appendChild(player1MarkInput);
    
    player2DetailContainer.appendChild(player2NameLabel);
    player2DetailContainer.appendChild(player2NameInput);
    player2DetailContainer.appendChild(player2MarkLabel);
    player2DetailContainer.appendChild(player2MarkInput);


    playerDetailContainer.appendChild(player1DetailContainer);
    playerDetailContainer.appendChild(player2DetailContainer);
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
            let playerNameDisplay = document.querySelector("#" + nameDisplay + "Display");
            playerNameDisplay.textContent = "Player " + number + " Name: " + name;
            let playerMarkDisplay = document.querySelector("#" + markDisplay + "Display");
            playerMarkDisplay.textContent = "Mark: " + mark;
            return { name , mark}
        }

        const player1 = processPlayer(player1Name.value, player1Mark.value, "player1Name" , "player1Mark" , "1");
        const player2 = processPlayer(player2Name.value, player2Mark.value, "player2Name" , "player2Mark", "2");
        



    });
}
//events
overlay();
playerDetails();
submitPlayerDetails();



})();