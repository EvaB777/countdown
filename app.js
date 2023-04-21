let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let sections = document.querySelectorAll(".section");
let isPause = false;
let active = document.querySelector(".active");
let activeArray = document.getElementsByClassName("active");
let times = document.querySelectorAll("input");

let currentTime = 0;

let audio = new Audio("sound.mp3");

function removeActiveClasses() {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function pauseCountdown() {
  if (!isPause) {
    isPause = true;
    pause.innerHTML = "Resume";
    sections.forEach((section) => {
      section.classList.replace("active", "pause");
    });
  } else {
    isPause = false;
    pause.innerHTML = "Pause";
    sections.forEach((section) => {
      section.classList.replace("pause", "active");
    });
  }
}

const countDown = (minutes, id) => {
  removeActiveClasses();
  document.getElementById(id).classList.add("active");
  return new Promise((resolve, reject) => {
    let timer = minutes * 60;

    let x = setInterval(function () {
      if (!isPause) {
        let minutes = Math.floor(
          ((timer * 1000) % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor(((timer * 1000) % (1000 * 60)) / 1000);
        timer--;
        document.getElementById(id).value = minutes + "m " + seconds + "s ";
      }
      if (timer <= 0) {
        clearInterval(x);
        audio.play();
        document.getElementById(id).value = "Done ✔️";
        document.getElementById(id).classList.add("done");
        currentTime++;
        resolve();
      }
    }, 1000);
  });
};

start.addEventListener("click", () => {
  countDown(times[currentTime].value, "warmup")
    .then(() => countDown(times[currentTime].value, "break1"))
    .then(() => countDown(times[currentTime].value, "round1"))
    .then(() => countDown(times[currentTime].value, "break2"))
    .then(() => countDown(times[currentTime].value, "round2"))
    .then(() => countDown(times[currentTime].value, "break3"))
    .then(() => countDown(times[currentTime].value, "round3"))
    .then(() => countDown(times[currentTime].value, "break4"))
    .then(() => countDown(times[currentTime].value, "round4"))
    .then(() => countDown(times[currentTime].value, "break5"))
    .then(() => countDown(times[currentTime].value, "cooldown"));
});

window.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    pauseCountdown;
  }
});

pause.addEventListener("click", () => {
  pauseCountdown();
});
