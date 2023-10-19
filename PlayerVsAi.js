const aiSubmitButton = document.getElementById('aiBeforeSubmitButton');
console.log(aiSubmitButton);
function createGameConfiguration() {
    const state = {
        userNickname: 'Nameless',
        aiNickname: 'Ai',
        playerMarker: 'aiCircle',
        aiMarker: 'aiCross',
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
        console.log(state.playerMarker);
        console.log(state.aiMarker);
    }
    return {
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
entryMenu.style.display = 'none';
})
function getAiDifficulty(){
    const boardHolder = document.querySelector('.playerAiBoard');
    const board = ['','','',
                   '','','',
                   '','',''];
function aiEasyMode(board,aiMarker) {
        const randomIndex = Math.floor(Math.random() * board.length);
        const div = board[randomIndex];
        if (div.textContent === '' && !div.classList.contains('filled')) {
            div.textContent = aiMarker;
            div.classList.add('filled');
        }
    }
    function aiMediumMode(board,aiMarker){


    }
    function aiHardMode(board,aiMarker){

    }
    function getBotLevelAdvance(board,aiMarker){
        const advanceSelector = document.getElementById('bot-level').value;
        switch(advanceSelector){
            case "easy":
                console.log("There will be a function easy");
                return aiEasyMode(board,aiMarker);
            case "medium":
                console.log("There will be a function medium");
                return "Function for medium";
            case "hard":
                console.log("There will be a function hard");
                return "Function for hard";
            default:
                console.log("Choosed function by default easy");
                return aiEasyMode();
        }
    }
    return{
        getBotLevelAdvance,
    }
}
function getGameBoardLogic(){
    const playersData = gameConfig.loadPlayersData();
    gameConfig.getPlayerMarker();
    gameConfig.getAiMarker();
    const getAiDiff = getAiDifficulty();
    let currentAiPlayer = playersData.Players.playerOne;
    let currentMarker = playersData.Markers.playerMarker;
    function switchPlayer(){
        currentAiPlayer = (currentAiPlayer === playersData.Players.playerOne) ? playersData.Players.playerTwo : playersData.Players.playerOne;
        currentMarker = (currentAiPlayer === playersData.Players.playerOne) ? playersData.Markers.playerMarker : playersData.Markers.aiMarker;
    }
    function getSvgTextcontent(currentPlayer, div) {
        const svgCircle = document.getElementById('ai-svg-circle');
        const svgCross = document.getElementById('ai-svg-cross');
        if (currentPlayer === playersData.Players.playerOne) {
            currentMarker = playersData.Markers.playerMarker;
        } else {
            currentMarker = playersData.Markers.aiMarker;
        }
        console.log(`Current player mark is ${currentMarker}, setting the content to SVG ${currentMarker}`);
        const svgContent = (currentMarker === 'aiCircle') ? svgCircle.outerHTML : svgCross.outerHTML;
        div.innerHTML = svgContent;
    }
    const boardHolder = document.querySelector('.playerAiBoard');
    const board = ['','','',
                   '','','',
                   '','',''];
    const getAiMode = getAiDiff.getBotLevelAdvance();
    board.forEach((item,index) => {
        const div = document.createElement('div');
        div.textContent = index + 1;
        boardHolder.appendChild(div);
        div.addEventListener('click', () => {
            if(!div.classList.contains('filled')){
                let aiMarker = playersData.Markers.aiMarker;
                getAiMode(board,aiMarker);
                getSvgTextcontent(currentAiPlayer,div);
                div.classList.add('filled');
                switchPlayer();
            }
        });
    });
}