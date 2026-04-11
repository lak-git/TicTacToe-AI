const playX = document.getElementById('PlayX');
const playO = document.getElementById('PlayO');
const difficulty = document.getElementsByName("difficulty")
const tryNew = document.getElementById('Try6x6');

playX.addEventListener("click", gameRedirect.bind(null, "X"));
playO.addEventListener("click", gameRedirect.bind(null, "O"));
tryNew.addEventListener("click", ()=>{location.href = "./ttt-6x6.html";});
function gameRedirect(sign) {
    for (const radio of difficulty) {
        if (radio.checked) {
            sessionStorage.setItem("Difficulty", JSON.stringify(radio.id));
        }
    }
    sessionStorage.setItem("PlayerSign", JSON.stringify(sign));
    location.href = "./game.html";
}