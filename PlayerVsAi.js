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
            return circleInput.value;
        } else if (crossInput.checked) {
            return crossInput.value;
        } else {
            return circleInput.value;
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
function getAiDifficulty(board,aiMarker){
function aiEasyMode() {
        const randomIndex = Math.floor(Math.random() * board.length);
        const div = board[randomIndex];
        if (div.textContent === '' && !div.classList.contains('filled')) {
            div.textContent = aiMarker;
            div.classList.add('filled');
        }
    }
    function aiMediumMode(){


    }
    function aiHardMode(){

    }
    function getBotLevelAdvance(){
        const advanceSelector = document.getElementById('bot-level').value;
        switch(advanceSelector){
            case "easy":
                console.log("There will be a function easy");
                return aiEasyMode();
            case "medium":
                console.log("There will be a function medium");
                return aiMediumMode();
            case "hard":
                console.log("There will be a function hard");
                return aiHardMode();
            default:
                console.log("Choosed function by default easy");
                return aiEasyMode();
        }
    }
    return{
        getBotLevelAdvance,
    }
}
function getGameBoardLogic() {
    const playersData = gameConfig.loadPlayersData();
    const playerOneMarker = gameConfig.getPlayerMarker();
    const aiMarker = gameConfig.getAiMarker();

    let currentPlayer = playersData.Players.playerOne;
    let currentMarker = playerOneMarker;
    console.log(currentPlayer);
    console.log("The player marker is: " ,currentMarker);
    const boardHolder = document.querySelector('.playerAiBoard');

    const board = ['', '', '',
                   '', '', '',
                   '', '', ''];



    function switchPlayer() {
    console.log("Before current player and marker", currentPlayer, currentMarker);
    currentPlayer = (currentPlayer === playersData.Players.playerOne) ? playersData.Players.playerTwo : playersData.Players.playerOne;
    currentMarker = (currentMarker === playersData.Markers.playerOne) ? playersData.Markers.playerTwo : playersData.Markers.playerOne;
} 
    function checkForTie() {
        return board.every(cell => cell === playerOneMarker || cell === aiMarker);
    }
    function checkForWin() {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;
            if (board[a] === currentMarker && board[b] === currentMarker && board[c] === currentMarker) {
                return currentMarker;
            }
        }

        return null;
    }
    function handlePlayerMove(index, div) {
        if (!div.classList.contains('filled')) {
            div.classList.add('filled');
            getSvgTextcontent(div);
            switchPlayer();
        }
    }
    function getSvgTextcontent(div) {
        const aisvgCircle = document.getElementById('ai-svg-circle');
        const aisvgCross = document.getElementById('ai-svg-cross');
    
        let svgContent;
    
        if (currentMarker === 'aiCircle') {
            svgContent = aisvgCircle.outerHTML;
        } else {
            svgContent = aisvgCross.outerHTML;
        }
        div.innerHTML = svgContent;
    }
    
    for (let index = 0; index < 9; index++) {
        const div = document.createElement('div');
        div.textContent = index + 1;
        boardHolder.appendChild(div);
    
        (function (currentIndex) {
            div.addEventListener('click', () => {
                if (!div.classList.contains('filled')) {
                    handlePlayerMove(currentIndex, div);
                    console.log("After current player and marker", currentPlayer, currentMarker);
                }
            });
        })(index);
    }
}