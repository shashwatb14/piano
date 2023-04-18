const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
currentVolume = 0.5;

const playTune = (key) => {
    let audio = new Audio(`notes/${key}.mp3`); // audio src based on key
    audio.volume = currentVolume;
    audio.play(); // play audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // clicked key
    clickedKey.classList.add("active");
    // removing active class 100ms after it was added when clicked
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 100);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the array q
    // calling playTune function with data-key value as argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});


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

document.addEventListener("keydown", pressedKey);
volumeSlider.addEventListener("input", handleVolume);
keysCheckbox.addEventListener("click", showHideKeys);