function el(text) {
    return document.querySelector(text);
}

const char = el(".char");
const block = el(".block");
const btn = el(".start-btn");
const score = el(".score");
const highestScore = el(".highest-score");
const body = el(".body");
let state = "pause";
let jumps_number = 0;
let time = 0;
let interval;


window.onload = () => {
    if (localStorage.getItem("score") !== null) {
        highestScore.textContent = `highest score ${localStorage.getItem("score")}`;
    }
}


document.onkeydown = (e) => {
    //console.log(e.key);
    if (e.key == "Enter") {
        body.click();
    }
    if (e.key == " ") {
        btn.click();
    }
}


btn.onclick = () => {
    if (state === "pause") {
        interval = setInterval(() => {
            time++;
            console.log(time);
            if (time == 10) {
                block.classList.remove("block-animation");
                setTimeout(() => {
                    block.classList.add("block-animation");
                }, 300);
                block.style.animationDuration = "800ms";
            }
            if (time == 20) {
                block.classList.remove("block-animation");
                setTimeout(() => {
                    block.classList.add("block-animation");
                }, 300);
                block.style.animationDuration = "600ms";
            }
            if (time == 30) {
                block.classList.remove("block-animation");
                setTimeout(() => {
                    block.classList.add("block-animation");
                }, 300);
                block.style.animationDuration = "550ms";
            }
        }, 1000);

        state = "play";
        btn.style.transform = "translate(-50%,-50%) rotate(360deg)";
        btn.innerHTML = '<i class="bi bi-pause-fill"></i>'
        setTimeout(() => {
            body.addEventListener("click", jump);
            block.classList.add("block-animation");
            block.style.animationPlayState = "running";
            body.click();
        }, 100);
    } else {
        clearInterval(interval);
        state = "pause";
        btn.style.transform = "translate(-50%,-50%) rotate(0deg)";
        btn.innerHTML = '<i class="bi bi-play-fill"></i>';
        body.removeEventListener("click", jump);
        block.style.animationPlayState = "paused";
        body.click();
    }
}

function jump() {
    if (char.classList !== "jump") {
        char.classList.add("jump");
        jumps_number++;
        score.textContent = `${jumps_number} jumps`;
        setTimeout(() => {
            char.classList.remove("jump");
        }, 400);
    }
}


setInterval(() => {
    let chartop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockleft < 40 && blockleft > 0 && chartop >= 130) {
        if (jumps_number > localStorage.getItem("score")) {
            localStorage.setItem("score", jumps_number);
        }
        alert("your score is " + jumps_number);
        window.location.reload();
    }
}, 10);