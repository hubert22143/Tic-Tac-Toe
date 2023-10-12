const playerButton = document.getElementById('playerButton');
const aiButton = document.getElementById('aiButton');
const buttonPlayerContainer = document.querySelector('.PlayerVsPlayer');
const buttonAiContainer = document.querySelector('.PlayerVsAi');
const headerText = document.getElementById('header-text');
const beforeYouStartBox = document.querySelector('.beforeyoustartgame');
const boardBoxHolder = document.querySelector('.playervsplayermode')
const entryMenu = document.querySelector('.content');
playerButton.addEventListener('click', () => {
    playerButton.style.display = 'none';
    aiButton.style.display = 'none';
    headerText.textContent = 'Before you start enjoying your game...';
    beforeYouStartBox.style.display = "flex";
    beforeYouStartBox.style.justifyContent = "center";
    beforeYouStartBox.style.alignItems = "center";
    beforeYouStartBox.style.flexDirection = "column";
});


const startGame = document.querySelector('.startGame');
const nicknameInput = document.getElementById('nickname');
let nickname;
nicknameInput.addEventListener('change', () => {
    nickname = nicknameInput.value;
    if (nickname.trim() === '') {
        alert('Nickname cannot be empty');
    }

});
function getMarker (){
    const selectElements = document.getElementById('game-mode');
    function getSelectedValue(){
        let selectedOption = selectElements.value;
        if(selectedOption === 'option1'){
            selectedOption = "Circle";
        }else if(selectedOption === 'option2'){
            selectedOption = "Cross";
        }
        return {selectedOption}
    }
    return{getSelectedValue};
}
let chosenMarker = '';
const checkedOption = document.getElementById('game-mode');
checkedOption.addEventListener('change', () => {
    chosenMarker = getMarker().getSelectedValue().selectedOption;
    console.log(chosenMarker);
});

startGame.addEventListener('click', (e) => {
    const nicknameValue = nicknameInput.value;
    if (nicknameValue.trim() === '') {
        e.preventDefault();
        alert('Please enter a nickname before starting the game');
    } else if (!nicknameValue.match(/^[a-zA-Z]{3,}$/)) {
        e.preventDefault();
        alert('Nickname must contain at least 3 letters');
    } else {
        e.preventDefault();
        entryMenu.style.display = 'none';
        boardBoxHolder.style.display = 'grid';
    }

    let firstPlayerMarker = chosenMarker;
    console.log("The first player marker is: " ,firstPlayerMarker);
    const secondPlayerNickname = "Bob";

    let secondPlayerMarker;
    if(firstPlayerMarker === 'Circle'){
        secondPlayerMarker = 'Cross';
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
    }else{
        secondPlayerMarker = 'Circle';
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
    }
});
