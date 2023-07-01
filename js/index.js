const answerWord = "APPLE";

let index = 0;
let attemps = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "종료";
    div.style =
      "display:flex; justify-content:center;align-items:center;position:absolute; top:40vh; left:45vw; backgroun-color:white; width:200px;height:200px;";
    document.body.appendChild(div);
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attemps === 6) {
      gameOver();
      return;
    }
    index = 0;
    attemps++;
  };
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preindex = index - 1;
      const pre_Block = document.querySelector(
        ".board-column[data-index='" + attemps + preindex + "']"
      );
      pre_Block.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleEnterKey = () => {
    let correct_cnt = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        ".board-column[data-index='" + attemps + i + "']"
      );
      const inputWord = block.innerText;
      const correctWord = answerWord[i];
      console.log(answerWord.includes(inputWord));
      if (inputWord === correctWord) {
        block.style.background = "#6AAA64";
        correct_cnt++;
      } else if (answerWord.includes(inputWord)) {
        block.style.background = "#C8B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "#fff";
    }
    if (correct_cnt === 5) gameOver();
    else nextLine();
  };
  const handleKeyDown = (e) => {
    const key = e.key;
    const keycode = e.keyCode;
    const thisBlock = document.querySelector(
      ".board-column[data-index='" + attemps + index + "']"
    );

    if (key === "Backspace") {
      handleBackspaceKey();
    } else if (index === 5) {
      if (key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keycode && keycode <= 90 && attemps <= 5) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };
  const startTimer = () => {
    const statTime = new Date();

    function setTime() {
      const nowTime = new Date();
      const flowTime = new Date(nowTime - statTime);
      const min = flowTime.getMinutes().toString().padStart(2, "0");
      const sec = flowTime.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#Timer");
      timeDiv.innerText = min + ":" + sec;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
