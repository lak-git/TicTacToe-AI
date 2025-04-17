const playX = document.getElementById('PlayX');
const playO = document.getElementById('PlayO');
const difficulty = document.getElementsByName("difficulty")

playX.addEventListener("click", gameRedirect.bind(null, "X"));
playO.addEventListener("click", gameRedirect.bind(null, "O"));

function gameRedirect(sign) {
    for (const radio of difficulty) {
        if (radio.checked) {
            sessionStorage.setItem("Difficulty", JSON.stringify(radio.id));
        }
    }
    sessionStorage.setItem("PlayerSign", JSON.stringify(sign));
    location.href = "./game.html";
}