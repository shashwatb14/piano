const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
playedKeys = [],
currentVolume = 0.5;

const playTune = (key) => {

    let audio = new Audio(`notes/${key}.mp3`); // audio src based on key
    audio.volume = currentVolume;
    audio.play(); // play audio
    playedKeys.push(key);
    // console.log(playedKeys);

    var sliced = playedKeys.slice(playedKeys.length - 6, playedKeys.length),
    comb = ['t', 't', 'y', 't', 'i', 'u'],
    dre = ['i', 'p', 'c'];

    if (sliced.toString() === comb.toString()) {
        play();
    } else if (playedKeys.slice(playedKeys.length - 3, playedKeys.length).toString() === dre.toString()) {
        playDre();
    }

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // clicked key
    clickedKey.classList.add("active");

    // removing active class 100ms after it was added when clicked
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 100);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the array

    // calling playTune function with data-key value as argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

function delayDispatchKeyboardEvent(key, delay) {
    setTimeout(function() {
        document.dispatchEvent(new KeyboardEvent("keydown", {
            key: key
        }));
        playedKeys = [];
    }, delay);
}

const pressedKey = (e) => {
    // check if key is in allowed array
    if (allKeys.includes(e.key)) playTune(e.key);
}

const handleVolume = (e) => {
    // must be between 0 and 1
    currentVolume = e.target.value; // audio volume = range slider value
}

const showHideKeys = () => {
    // toggling hide class from each key
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const play = () => {
    delayDispatchKeyboardEvent("t", 300);
    delayDispatchKeyboardEvent("t", 600);
    delayDispatchKeyboardEvent("y", 1000);
    delayDispatchKeyboardEvent("t", 1500);
    delayDispatchKeyboardEvent("o", 2000);
    delayDispatchKeyboardEvent("i", 2500);
    delayDispatchKeyboardEvent("t", 3000);
    delayDispatchKeyboardEvent("t", 3300);
    delayDispatchKeyboardEvent("x", 3700);
    delayDispatchKeyboardEvent("p", 4200);
    delayDispatchKeyboardEvent("i", 4600);
    delayDispatchKeyboardEvent("u", 5000);
    delayDispatchKeyboardEvent("y", 5450);
    delayDispatchKeyboardEvent("z", 6000);
    delayDispatchKeyboardEvent("z", 6300);
    delayDispatchKeyboardEvent("p", 6800);
    delayDispatchKeyboardEvent("i", 7400);
    delayDispatchKeyboardEvent("o", 7900);
    delayDispatchKeyboardEvent("i", 8500);
}


const playDre = () => {
    let time = 600;

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 8; i++) {
            delayDispatchKeyboardEvent("i", time);
            delayDispatchKeyboardEvent("p", time);
            delayDispatchKeyboardEvent("c", time);
            time += 300;
        }

        for (let i = 0; i < 3; i++) {
            delayDispatchKeyboardEvent("u", time);
            delayDispatchKeyboardEvent("p", time);
            delayDispatchKeyboardEvent("c", time);
            time += 300;
        }
        
        for (let i = 0; i < 5; i++) {
            delayDispatchKeyboardEvent("u", time);
            delayDispatchKeyboardEvent("p", time);
            delayDispatchKeyboardEvent("x", time);
            time += 300;
        }
    }
}


document.addEventListener("keydown", pressedKey);
volumeSlider.addEventListener("input", handleVolume);
keysCheckbox.addEventListener("click", showHideKeys);