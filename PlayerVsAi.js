const aiBeforeContainer = document.querySelector('.AiBeforeYouStartGame');
aiButton.addEventListener('click', () => {
    aiBeforeContainer.style.display = 'flex';
    playerButton.style.display = 'none';
    aiButton.style.display = 'none';
    headerText.textContent = 'Before you start enjoying your game...';
})
const aiUserNickname = document.getElementById('aiUserNickname');
let userNickname;
aiUserNickname.addEventListener('change', () => {
    userNickname = aiUserNickname.value;
});
userNickname = aiUserNickname.value
const aiSubmitButton = document.getElementById('aiBeforeSubmitButton');
aiSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    entryMenu.style.display = 'none';
    console.log(userNickname);
})
function getPlayerMarker(){
    const circleInput = document.querySelector('input[name="marker"][value="aiCircle"]');
    const crossInput = document.querySelector('input[name="marker"][value="aiCross"]');
    if(circleInput.selected){
        console.log("Circle is selected");
    }else if(crossInput.selected){
        console.log("Cross is selected");
    }
    return 0;
}
const loadPlayersData = (userNickname) =>{
    const Players = {
        playerOne: userNickname,
        playerTwo: "Ai",
    };
    const Markers = {
    };


}