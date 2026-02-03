const playX = document.getElementById('PlayX');
const playO = document.getElementById('PlayO');
const difficulty = document.getElementsByName("difficulty")
const try2 = document.getElementById('Try2');

playX.addEventListener("click", gameRedirect.bind(null, "X"));
playO.addEventListener("click", gameRedirect.bind(null, "O"));
try2.addEventListener("click", ()=>{location.href = "./ttt-2.html";});

function gameRedirect(sign) {
    for (const radio of difficulty) {
        if (radio.checked) {
            sessionStorage.setItem("Difficulty", JSON.stringify(radio.id));
        }
    }
    sessionStorage.setItem("PlayerSign", JSON.stringify(sign));
    location.href = "./game.html";
}