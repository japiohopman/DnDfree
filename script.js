function saveFormData(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Save data to localStorage
    localStorage.setItem(formId, JSON.stringify(data));

    console.log("Form data saved to localStorage:", data); // For testing purposes
    alert("Data saved!"); // Confirmation message
}



// Function to dynamically resize textareas
function resizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// Add event listeners to textareas to trigger resizing
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
  textarea.addEventListener('input', () => resizeTextarea(textarea));
  resizeTextarea(textarea); // Initial resize
});

// Function to load data from localStorage on page load
function loadData(formId){
  const savedData = localStorage.getItem(formId);
  if(savedData){
    const data = JSON.parse(savedData);
    const form = document.getElementById(formId);
    for(const key in data){
      const element = form.querySelector(`[name="${key}"]`);
      if(element){
        if(element.type === 'checkbox'){
          element.checked = data[key] === 'on'; //Handle checkboxes
        } else if (element.tagName === 'TEXTAREA'){
          element.value = data[key]; //Handle textareas
        } else {
          element.value = data[key]; //Handle other input types
        }
      }
    }
  }
}

// XP table for level calculation
const xpTable = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 100000,
    13: 120000,
    14: 140000,
    15: 165000,
    16: 195000,
    17: 225000,
    18: 265000,
    19: 305000,
    20: 355000
};

// Get elements for XP slider and level input
const xpSlider = document.getElementById('experiencepoints');
const xpValueDisplay = document.getElementById('xp-value');
const levelInput = document.querySelector('[name="level"]');
const startXPDisplay = document.querySelector('.startXP');
const endXPDisplay = document.querySelector('.endXP');


function updateLevel() {
    let xp = parseInt(xpSlider.value);
    let currentLevel = 1;
    for (let level in xpTable) {
        if (xp >= xpTable[level]) {
            currentLevel = parseInt(level);
        }
    }

    levelInput.value = currentLevel;

    // Update XP range based on current level
    if (currentLevel < 20) {
        xpSlider.max = xpTable[currentLevel + 1] - xpTable[currentLevel];
        xpSlider.min = 0;
        startXPDisplay.textContent = "0 XP";
        endXPDisplay.textContent = `${xpSlider.max} XP`;
    } else {
        xpSlider.max = xpTable[20];
        xpSlider.min = 0;
        startXPDisplay.textContent = "0 XP";
        endXPDisplay.textContent = `${xpSlider.max} XP`;
    }
}

xpSlider.addEventListener('input', () => {
    xpValueDisplay.textContent = xpSlider.value + " XP";
    updateLevel();
});




//Initial level and xp display setup
updateLevel();

//Load data for both forms on page load
loadData('sheet1');
loadData('sheet2'); // Assuming you have a second form with id "sheet2"

function toggleDiceContainer() {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.classList.toggle('hidden');
}
function toggleXPContainer() {
    const diceContainer = document.getElementById('XPContainer');
    diceContainer.classList.toggle('hidden');
}

document.addEventListener('click', function(event) {
    const toggleElements = document.querySelectorAll('.container');
    toggleElements.forEach(el => {
        if (!el.contains(event.target) && !event.target.matches('button')) {
            el.classList.add('hidden');
        }
    });
});

function toggleContainer(containerId) {
    const container = document.getElementById(containerId);
    const isVisible = !container.classList.contains('hidden');

    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));

    if (!isVisible) {
        container.classList.remove('hidden');
    }
}

//dice roll
function rollDice() {
    const diceType1 = document.getElementById('diceType1').value;
    const diceCount1 = parseInt(document.getElementById('diceCount1').value);
    const diceType2 = document.getElementById('diceType2').value;
    const diceCount2 = parseInt(document.getElementById('diceCount2').value);
    const diceSound = document.getElementById('diceSound');

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    diceSound.play();

    setTimeout(() => {
        let total = 0;

        const rollDiceSet = (diceType, diceCount) => {
            if (diceType !== "none") {
                for (let i = 0; i < diceCount; i++) {
                    const roll = Math.floor(Math.random() * parseInt(diceType)) + 1;
                    total += roll;
                    const resultSpan = document.createElement('span');
                    resultSpan.textContent = roll;
                    resultsDiv.appendChild(resultSpan);
                }
            }
        };

        rollDiceSet(diceType1, diceCount1);
        rollDiceSet(diceType2, diceCount2);

        const totalSpan = document.createElement('p');
        totalSpan.textContent = `Total: ${total}`;
        resultsDiv.appendChild(totalSpan);
    }, 500);
}

const tracks = [
    'public/Music/track1.mp3',
    'public/Music/track2.mp3',
    'public/Music/track3.mp3',
    'public/Music/track4.mp3',
    'public/Music/track5.mp3'
];

let currentTrackIndex = null;
let audio = new Audio();

console.log('Script loaded');

document.getElementById('play').addEventListener('click', () => {
    if (audio.paused || !audio.src) {
        console.log('Play button clicked - playing track');
        playTrack();
    } else {
        console.log('Play button clicked - pausing track');
        audio.pause();
    }
});

document.getElementById('pause').addEventListener('click', () => {
    console.log('Pause button clicked');
    pauseTrack();
});

document.getElementById('stop').addEventListener('click', () => {
    console.log('Stop button clicked');
    stopTrack();
});

document.getElementById('next').addEventListener('click', () => {
    console.log('Next button clicked');
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    audio.src = tracks[currentTrackIndex];
    audio.play();
});

document.getElementById('volume').addEventListener('input', (event) => {
    const volume = event.target.value;
    console.log('Setting volume to', volume);
    audio.volume = volume / 100;
});

function playTrack() {
    console.log('Playing track');
    if (!audio.src || audio.paused) {
        playRandomTrack();
    } else {
        audio.play();
    }
}

function playRandomTrack() {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    console.log('Playing random track:', tracks[currentTrackIndex]);
    audio.src = tracks[currentTrackIndex];
    audio.play();
}

audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    audio.src = tracks[currentTrackIndex];
    audio.play();
});

function setVolume(event) {
    const volume = event.target.value;
    console.log('Setting volume to', volume);
    audio.volume = volume / 100;
}

function pauseTrack() {
    console.log('Pausing track');
    audio.pause();
}

function stopTrack() {
    console.log('Stopping track');
    audio.pause();
    audio.currentTime = 0;
}

const audioPlayer = document.getElementById('audio-player');
const musicTracks = ['track1.mp3', 'track2.mp3','track3.mp3', 'track4.mp3','track5.mp3']; // Add your track list here
let currentTrack = 0;

audioPlayer.src = musicTracks[currentTrack];

audioPlayer.addEventListener('ended', function() {
    currentTrack = (currentTrack + 1) % musicTracks.length;
    audioPlayer.src = musicTracks[currentTrack];
    audioPlayer.play();
});
