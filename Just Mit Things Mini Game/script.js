let score = 0;
let cross = true;
let gameOverFlag = false;

const audio = new Audio('music/Bhag Bhag.mp3');
const audiogo = new Audio('music/gameover.mp3');
const student = document.querySelector('.student');
const gameOver = document.querySelector('.gameOver');
const guard = document.querySelector('.guard');
const scoreCont = document.getElementById('scoreCont');

audio.play(); // Play audio on page load

document.onkeydown = function (e) {
    if (gameOverFlag) return; // Stop game controls when game over

    if (e.keyCode === 38) {
        student.classList.add('animateStudent');
        setTimeout(() => {
            student.classList.remove('animateStudent');
        }, 700);
    }
    if (e.keyCode === 39) {
        let studentX = parseInt(window.getComputedStyle(student).getPropertyValue('left'));
        student.style.left = (studentX + 112) + "px";
    }
    if (e.keyCode === 37) {
        let studentX = parseInt(window.getComputedStyle(student).getPropertyValue('left'));
        student.style.left = (studentX - 112) + "px";
    }
};

setInterval(() => {
    if (gameOverFlag) return;

    let dx = parseInt(window.getComputedStyle(student).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(student).getPropertyValue('bottom'));
    
    let ox = parseInt(window.getComputedStyle(guard).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(guard).getPropertyValue('bottom'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Sorry you are not allowed in campus! Without ID-Card";
        guard.style.animation = "none";
        guard.style.left = dx + "px";
        audiogo.play();
        gameOverFlag = true;
        
        audio.pause();
        
        setTimeout(() => {
            audiogo.pause();
        }, 5000);
        
    } else if (offsetX < 145 && cross) {
        score++;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}
