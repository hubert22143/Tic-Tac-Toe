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
let nickname ='';
const nicknameInput = document.getElementById('nickname');
nicknameInput.addEventListener('change', () => {
    nickname = nicknameInput.value;
    if (nickname.trim() === '') {
        alert('Nickname cannot be empty');
    }
});
let nickname2;
const secondNicknameInput = document.getElementById('nickname2');
secondNicknameInput.addEventListener('change', () => {
    nickname2 = secondNicknameInput.value;
    if (nickname2.trim() === '') {
        alert('Nickname cannot be empty');
    }
});
let svgCircle = document.getElementById('svg-circle');
let svgCross = document.getElementById('svg-cross');
function getMarker (){
    const selectElements = document.getElementById('game-mode');
    function getSelectedValue(){
        let selectedOption = selectElements.value;
        switch(selectedOption){
            case 'option1':
                selectedOption = svgCircle;
                break;
            case 'option2':
                selectedOption = svgCross;
                break;
            default:
                selectedOption = svgCircle;
        }
        return {selectedOption}
    }
    return{getSelectedValue};
}
const checkedOption = document.getElementById('game-mode');
let chosenMarker;
let firstPlayerMarker;
checkedOption.addEventListener('change', () => {
    chosenMarker = getMarker().getSelectedValue().selectedOption;
    firstPlayerMarker = chosenMarker;
});
if(firstPlayerMarker === undefined){
    firstPlayerMarker = svgCircle;
}
let currentPlayerText = document.getElementById('currentPlayer');
let currentPlayer;
let secondPlayerMarker;
function switchPlayer(currentPlayer) {
    if (currentPlayer === firstPlayerMarker) {
        currentPlayerText.textContent = `Current turn is for player: ${nickname2}`;
        return secondPlayerMarker;
    } else {
        currentPlayerText.textContent = `Current turn is for player: ${nickname}`;
        return firstPlayerMarker;
    }
}
startGame.addEventListener('click', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
    currentPlayerText.textContent = `Current turn is for: ${nickname}`;
    nickname2 = secondNicknameInput.value
    if (nickname.trim() === '' || nickname2.trim() === ''  ) {
        e.preventDefault();
        alert('Please enter a nickname before starting the game');
        return 0;
    } else if (!nickname.match(/^[a-zA-Z]{3,}$/) || !nickname2.match(/^[a-zA-Z]{3,}$/)) {
        e.preventDefault();
        alert('Nickname must contain at least 3 letters');
        return 0;
    } else {
        e.preventDefault();
        entryMenu.style.display = 'none';
        boardBoxHolder.style.display = 'grid';
    }
    console.log("The first player marker is: " ,firstPlayerMarker);
    if(firstPlayerMarker === svgCircle){
        secondPlayerMarker = svgCross;
        console.log("The second player marker has been changed to",secondPlayerMarker);
    }else{
        secondPlayerMarker = svgCircle;
        console.log("The second player marker has been changed to",secondPlayerMarker);
    }  
    currentPlayer = firstPlayerMarker;
    headerText.textContent = "I hope you will enjoy your game!";
    createGameBoard();
});
const modalContainer = document.querySelector('.modal-container');
modalContainer.style.display = 'none';
let modalCongratulationsHeader = document.querySelector('.modal-header');
const createGameBoard = () => {
    const boardContainer = document.querySelector('.playerBoard');
    const cells = Array.from({length: 9}, (_,index) => {
        const cell = document.createElement('div');
        cell.textContent = index + 1;
        cell.classList.add('boardBox');
        function resetGame() {
            cells.forEach((item,index) => {
                item.textContent = index + 1;
                item.classList.remove('filled');
                item.style.pointerEvents = 'auto';
            });
            modalContainer.style.display = 'none';
        }
        document.getElementById('menuResetBoard').addEventListener('click',resetGame);
        document.getElementById('playAgain').addEventListener('click',resetGame);
        function checkForTie() {
            return cells.every(cell => cell.textContent === svgCross.textContent || cell.textContent  === svgCircle.textContent);
        }
        function checkForWin() {
            const winCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
        
            const checkWinner = (marker) => {
                for (const combination of winCombinations) {
                    const [a, b, c] = combination;
                    if (
                        cells[a].textContent === marker.textContent &&
                        cells[b].textContent === marker.textContent &&
                        cells[c].textContent === marker.textContent
                    ) {
                        return marker;
                    }
                }
                return null;
            };
        
            const firstPlayerWin = checkWinner(firstPlayerMarker);
            const secondPlayerWin = checkWinner(secondPlayerMarker);
        
            if (firstPlayerWin) {
                return firstPlayerWin;
            } else if (secondPlayerWin) {
                return secondPlayerWin;
            }
        
            return null;
        }
        cell.addEventListener('click', () => {
            if(!cell.classList.contains('filled')){
                if(currentPlayer === firstPlayerMarker){
                    cell.innerHTML = ''; 
                    cell.appendChild(firstPlayerMarker.cloneNode(true));
                    console.log("The current player is: " , currentPlayer, firstPlayerMarker);
                }else{
                    cell.innerHTML = '';
                    cell.appendChild(secondPlayerMarker.cloneNode(true));
                    console.log("The current player is: " , currentPlayer, secondPlayerMarker);
                }
                cell.classList.add('filled');
                if(checkForTie()){
                    currentPlayerText.textContent = "It is a tie!";
                    modalContainer.style.display = 'flex';
                    modalCongratulationsHeader.textContent = "It is a tie! Rough battle!";
                    
                }
                const winner = checkForWin();
                if (winner) {
                    headerText.textContent = "I hope you have enjoyed the game!";
                    const winningPlayer = (winner === firstPlayerMarker) ? nickname : nickname2;
                    currentPlayerText.textContent = `Congratulations, ${winningPlayer} you have won!`;
                    modalContainer.style.display = 'flex';
                    modalCongratulationsHeader.textContent = `Congratulations, ${winningPlayer} you have won this rough battle!`;
                    cells.forEach((cell) => {
                        cell.style.pointerEvents = 'none';
                    });
                    return 0;
                } else {
                    currentPlayer = switchPlayer(currentPlayer);
                }
            }
        })
        return cell;
    });
    cells.forEach(cell => boardContainer.appendChild(cell));
}

function displayNone(e){
    e.target.parentNode.parentNode.parentNode.style.display = 'none';
}
document.getElementById('exit').addEventListener('click',displayNone);
