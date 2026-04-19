const playX = document.getElementById('PlayX');
const playO = document.getElementById('PlayO');
const difficulty = document.getElementsByName("difficulty")
const back = document.getElementById('Back');

playX.addEventListener("click", gameRedirect.bind(null, "X"));
playO.addEventListener("click", gameRedirect.bind(null, "O"));
back.addEventListener("click", () => { location.href = "./"; });

function gameRedirect(sign) {
    for (const radio of difficulty) {
        if (radio.checked) {
            sessionStorage.setItem("Difficulty", JSON.stringify(radio.id));
        }
    }
    sessionStorage.setItem("PlayerSign", JSON.stringify(sign));
    location.href = "./game-6x6.html";
}