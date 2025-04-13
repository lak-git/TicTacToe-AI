const playX = document.getElementById('PlayX');
const playO = document.getElementById('PlayO');

playX.addEventListener("click", gameRedirect.bind(null, "X"));
playO.addEventListener("click", gameRedirect.bind(null, "O"));

function gameRedirect(sign) {
    sessionStorage.setItem("PlayerSign", JSON.stringify(sign));
    location.href = "./game.html";
}