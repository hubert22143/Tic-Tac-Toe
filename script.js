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
let chosenMarker = svgCircle;
const checkedOption = document.getElementById('game-mode');
checkedOption.addEventListener('change', () => {
    chosenMarker = getMarker().getSelectedValue().selectedOption;
    console.log(chosenMarker);
});
let currentPlayerText = document.getElementById('currentPlayer');
currentPlayerText.textContent = `Current turn is for: ${nickname}`;
let currentPlayer;
let firstPlayerMarker;
let secondPlayerMarker;
let secondPlayerNickname;
function switchPlayer(currentPlayer) {
    if (currentPlayer === firstPlayerMarker) {
        currentPlayerText.textContent = `Current turn is for player: ${secondPlayerNickname}`;
        return secondPlayerMarker;
    } else {
        currentPlayerText.textContent = `Current turn is for player: ${nickname}`;
        return firstPlayerMarker;
    }
}
startGame.addEventListener('click', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
    if (nickname.trim() === '') {
        e.preventDefault();
        alert('Please enter a nickname before starting the game');
    } else if (!nickname.match(/^[a-zA-Z]{3,}$/)) {
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
    if(firstPlayerMarker === svgCircle){
        secondPlayerMarker = svgCross;
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
    }else{
        secondPlayerMarker = svgCircle;
        console.log(secondPlayerMarker);
        console.log(secondPlayerNickname);
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
            });
            modalContainer.style.display = 'none';
        }
        document.getElementById('menuResetBoard').addEventListener('click',resetGame);
        document.getElementById('playAgain').addEventListener('click',resetGame);
        function checkForTie() {
            return cells.every(cell => cell.textContent === svgCross.textContent || cell.textContent  === svgCircle.textContent);
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
                   cells[b].textContent === cells[c].textContent){
                    return cells[a].textContent;
                   }
            }
            return null;
        }
        cell.addEventListener('click', () => {
            if(!cell.classList.contains('filled')){
                console.log("The current player is: " , currentPlayer);
                if(currentPlayer === firstPlayerMarker){
                    cell.innerHTML = '';
                    cell.appendChild(firstPlayerMarker.cloneNode(true));
                }else{
                    cell.innerHTML = '';
                    cell.appendChild(secondPlayerMarker.cloneNode(true));
                }
                cell.classList.add('filled');
                if(checkForTie()){
                    currentPlayerText.textContent = "It is a tie!";
                    modalContainer.style.display = 'flex';
                    modalCongratulationsHeader.textContent = "It is a tie! Rough battle!";
                    
                }
                const winner = checkForWin();
                if (winner) {
                    const winningPlayer = (winner === firstPlayerMarker) ? nickname : secondPlayerNickname;
                    alert(`Player ${winningPlayer} wins!`);
                    currentPlayerText.textContent = `Congratulations, ${winningPlayer} you have won!`;
                    modalContainer.style.display = 'flex';
                    modalCongratulationsHeader.textContent = `Congratulations, ${winningPlayer} you have won this rough battle!`;
                    cells.forEach((cell) => {
                        cell.style.pointerEvents = 'none';
                    });
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
