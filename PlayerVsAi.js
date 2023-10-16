const aiSubmitButton = document.getElementById('aiBeforeSubmitButton');
console.log(aiSubmitButton);
function createGameConfiguration() {
    const state = {
        userNickname: '',
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
        state.aiMarker = state.playerMarker === 'aiCircle' ? 'aiCross' : 'aiCircle';
    }

    return {
        getPlayerMarker,
        getAiMarker,
        loadPlayersData: () => ({
            Players: {
                playerOne: state.userNickname,
                playerTwo: "Ai",
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
console.log("yes")
gameConfig.getPlayerMarker();
gameConfig.getAiMarker();
const playersData = gameConfig.loadPlayersData();
console.log(playersData);
entryMenu.style.display = 'none';
})