const pet = document.getElementById('pet');
const happinessFill = document.getElementById('happiness-fill');
const hungerFill = document.getElementById('hunger-fill');
const feedBtn = document.getElementById('feed-btn');
const petBtn = document.getElementById('pet-btn');

let happiness = 50;
let hunger = 50;
let isAnimating = false;

function updatePetStatus() {
    happinessFill.style.width = `${happiness}%`;
    hungerFill.style.width = `${hunger}%`;
    if (!isAnimating) {
        updatePetAnimation();
    }
}

function updatePetAnimation() {
    if (happiness < 30) {
        pet.style.backgroundImage = "url('hurt.gif')";
    } else if (happiness > 70) {
        pet.style.backgroundImage = "url('idle.gif')";
    } else {
        pet.style.backgroundImage = "url('jump.gif')";
    }
}

function feedPet() {
    if (isAnimating) return;
    isAnimating = true;
    hunger = Math.max(0, hunger - 10);
    happiness = Math.min(100, happiness + 5);
    pet.style.backgroundImage = "url('throw.gif')";
    setTimeout(() => {
        isAnimating = false;
        updatePetStatus();
    }, 3000); // Adjust time based on your GIF duration
}

function petPet() {
    if (isAnimating) return;
    isAnimating = true;
    happiness = Math.min(100, happiness + 10);
    hunger = Math.min(100, hunger + 5);
    pet.style.backgroundImage = "url('idleBlink.gif')";
    setTimeout(() => {
        isAnimating = false;
        updatePetStatus();
    }, 3000); // Adjust time based on your GIF duration
}

feedBtn.addEventListener('click', feedPet);
petBtn.addEventListener('click', petPet);

updatePetStatus();

// Simulate time passing
setInterval(() => {
    if (!isAnimating) {
        happiness = Math.max(0, happiness - 1);
        hunger = Math.min(100, hunger + 1);
        updatePetStatus();
    }
}, 600);  // Every minute