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
        switch(selectedOption){
            case 'option1':
                selectedOption = 'Circle';
                break;
            case 'option2':
                selectedOption = 'Cross';
                break;
            default:
                selectedOption = 'Circle';
        }
        return {selectedOption}
    }
    return{getSelectedValue};
}
let chosenMarker = 'Circle';
const checkedOption = document.getElementById('game-mode');
checkedOption.addEventListener('change', () => {
    chosenMarker = getMarker().getSelectedValue().selectedOption;
    console.log(chosenMarker);
});

function switchPlayer(currentPlayer) {
    if (currentPlayer === firstPlayerMarker) {
        return secondPlayerMarker;
    } else {
        return firstPlayerMarker;
    }
}
let currentPlayer;
let firstPlayerMarker;
let secondPlayerMarker;
let secondPlayerNickname;
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
    firstPlayerMarker = chosenMarker;
    console.log("The first player marker is: " ,firstPlayerMarker);
    secondPlayerNickname = "Bob";
    if(firstPlayerMarker === 'Circle'){
        secondPlayerMarker = 'Cross';
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
    }else{
        secondPlayerMarker = 'Circle';
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
    }  
    currentPlayer = firstPlayerMarker;
    createGameBoard();
});
const createGameBoard = () => {
    const boardContainer = document.querySelector('.playerBoard');
    const cells = Array.from({length: 9}, (_,index) => {
        const cell = document.createElement('div');
        cell.textContent = index + 1;
        cell.classList.add('boardBox');
        function checkForTie() {
            return cells.every(cell => cell.textContent === 'Cross' || cell.textContent === 'Circle');
        }
        function checkForWin(){
            const winCombinations =[
                [0,1,2], [3,4,5] , [6,7,8],
                [0,3,6], [1,4,7] , [2,5,8],
                [0,4,8], [2,4,6]
            ];
            for(const combination of winCombinations){
                const [a,b,c] = combination;
                if(cells[a].textContent === cells[b].textContent &&
                   cells[b].textContent === cells[c].textContent &&
                   cells[c].textContent === cells[a].textContent){
                    return cells[a].textContent;
                   }
            }
            return null;
        }
        cell.addEventListener('click', () => {
            if(!cell.classList.contains('filled')){
                console.log("The current player is: " , currentPlayer);
                if(currentPlayer === firstPlayerMarker){
                    cell.textContent = firstPlayerMarker;
                }else{
                    cell.textContent = secondPlayerMarker;
                }
                cell.classList.add('filled');
                if(checkForTie()){
                    alert(`${nickname,secondPlayerNickname} Yo! It is a tie!`)
                    
                }
                const winner = checkForWin();
                if (winner) {
                    const winningPlayer = (winner === firstPlayerMarker) ? nickname : secondPlayerNickname;
                    alert(`Player ${winningPlayer} wins!`);
                    
                } else {
                    currentPlayer = switchPlayer(currentPlayer);
                }
            }
        })
        return cell;
    });
    cells.forEach(cell => boardContainer.appendChild(cell));
}

