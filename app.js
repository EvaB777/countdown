let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let sections = document.querySelectorAll(".section");
let isPause = false;
let active = document.querySelector(".active");
let activeArray = document.getElementsByClassName("active");

let audio = new Audio("sound.mp3");

function removeActiveClasses() {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
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
        document.getElementById(id).innerHTML = minutes + "m " + seconds + "s ";
      }
      if (timer <= 0) {
        clearInterval(x);
        audio.play();
        document.getElementById(id).innerHTML = "Done ✔️";
        document.getElementById(id).classList.add("done");
        resolve();
      }
    }, 1000);
  });
};

start.addEventListener("click", () => {
  countDown(0.1, "warmup")
    .then(() => countDown(0.1, "round1"))
    .then(() => countDown(1, "break1"))
    .then(() => countDown(7, "round2"))
    .then(() => countDown(1, "break2"))
    .then(() => countDown(7, "round3"))
    .then(() => countDown(1, "break3"))
    .then(() => countDown(7, "round4"))
    .then(() => countDown(1, "break4"))
    .then(() => countDown(5, "cooldown"));
});

pause.addEventListener("click", () => {
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
});
