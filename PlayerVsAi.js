const aiSubmitButton = document.getElementById('aiBeforeSubmitButton');
console.log(aiSubmitButton);
function createGameConfiguration() {
    const state = {
        userNickname: '',
        aiNickname: 'Ai',
        playerMarker: '',
        aiMarker: '',
    };

    const aiButton = document.getElementById('aiButton');
    const aiBeforeContainer = document.querySelector('.AiBeforeYouStartGame');
    const playerButton = document.getElementById('playerButton');
    const aiUserNickname = document.getElementById('aiUserNickname');

    aiButton.addEventListener('click', () => {
        aiBeforeContainer.style.display = 'flex';
        playerButton.style.display = 'none';
        aiButton.style.display = 'none';
        headerText.textContent = 'Before you start enjoying your game...';
    });

    aiUserNickname.addEventListener('change', () => {
        state.userNickname = aiUserNickname.value;
    });
    function getPlayerMarker() {
        const circleInput = document.querySelector('input[name="marker"][value="aiCircle"]');
        const crossInput = document.querySelector('input[name="marker"][value="aiCross"]');
        if (circleInput.checked) {
            state.playerMarker = circleInput.value;
        } else if (crossInput.checked) {
            state.playerMarker = crossInput.value;
        } else {
            state.playerMarker = circleInput.value
        }
    }
    function getAiMarker() {
        const circleInput = document.querySelector('input[name="marker"][value="aiCircle"]');
        const crossInput = document.querySelector('input[name="marker"][value="aiCross"]');
        state.aiMarker = state.playerMarker === circleInput.value ? crossInput.value : circleInput.value;
    }
    function getBotLevelAdvance(){
        const advanceSelector = document.getElementById('bot-level').value;
        switch(advanceSelector){
            case "easy":
                console.log("There will be a function easy");
                return "Function for easy";
            case "medium":
                console.log("There will be a function medium");
                return "Function for medium";
            case "hard":
                console.log("There will be a function hard");
                return "Function for hard";
            default:
                return "Function for easy";
        }
    }
    return {
        getBotLevelAdvance,
        getPlayerMarker,
        getAiMarker,
        loadPlayersData: () => ({
            Players: {
                playerOne: state.userNickname,
                playerTwo: state.aiNickname,
            },
            Markers: {
                playerMarker: state.playerMarker,
                aiMarker: state.aiMarker,
            }
        }),
    };
}
const gameConfig = createGameConfiguration();
aiSubmitButton.addEventListener('click', (e) => {
e.preventDefault();
getGameBoardLogic();
headerText.textContent = 'I hope you will enjoy the game!';
const playersData = gameConfig.loadPlayersData();
console.log(playersData);
console.log(playersData.Players.playerOne);
entryMenu.style.display = 'none';
})
function getGameBoardLogic(){
    const playersData = gameConfig.loadPlayersData();
    gameConfig.getPlayerMarker();
    gameConfig.getAiMarker();
    let currentAiPlayer = playersData.Players.playerOne;
    function switchPlayer(){
        currentAiPlayer = (currentAiPlayer === playersData.Players.playerOne) ? playersData.Players.playerTwo : playersData.Players.playerOne;
    }
    const boardHolder = document.querySelector('.playerAiBoard');
    const board = ['','','',
                   '','','',
                   '','',''];
    board.forEach((item,index) => {
        currentIndex = index + 1;
        const div = document.createElement('div');
        div.textContent = currentIndex;
        boardHolder.appendChild(div);
        div.addEventListener('click', () => {
            if(!div.classList.contains('filled')){
                div.classList.add('filled');
                console.log("Current player is, before the change", currentAiPlayer);
                switchPlayer();
                console.log("Current player is: after the change",currentAiPlayer);
            }
        });
    });
}