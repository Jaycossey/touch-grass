// GLOBAL VARIABLES
const cloudContainer = document.getElementById('cloud-display');
const grassContainer = document.getElementById('grass-display');
const counterContainer = document.getElementById('counter');

const MAX_CLOUDS = 3;
const MAX_GRASS = 100;
const SCREEN_WIDTH = window.innerWidth;

let grassCounter = 0;
let cloudCounter = 0;

// GRASS FUNCTIONS ---------------------------------------------------------------------------------------

// assign the grass counter to the screen
function loadOnScreenCounter(counter) {
    // providing counter is within range
    if (grassCounter >= 0 && grassCounter <= MAX_GRASS) {
        // styling for the counter
        counterContainer.textContent = "You have touched grass " + (counter - 1) + " times!";
        counterContainer.style.transform = "skew(20deg)";
        counterContainer.style.margin = "12px";
        counterContainer.style.fontSize = "1.5rem";
        counterContainer.style.position = "relative";
        counterContainer.style.left = "30px";
        // render wildfire to replace counter 
    } else if (grassCounter > MAX_GRASS) {
        counterContainer.textContent = "Oh no! What have you done?! That is a wildfire!";
    } else {
        counterContainer.textContent = "Error loading grass total";
    }
}

// grass array
const grassArray = [];

// grass object constructor
function Grass(xPosition, color, height) {
    // constructor bindings
    this.xPosition = xPosition;
    this.color = color;
    this.height = height + "px";
    this.width = "12px";
    this.class = "grass";
    
    // Grass div generation and basic style + position
    let bladeGrass = document.createElement('div');
    bladeGrass.className = "bladeOfGrass";
    bladeGrass.style.borderLeft = "2px solid green";
    bladeGrass.style.borderTop = "15px solid green";
    bladeGrass.style.borderBottom = "5px solid black";
    
    bladeGrass.style.width = this.width;
    bladeGrass.style.height = this.height;
    bladeGrass.style.left = this.xPosition + "px";
    bladeGrass.style.marginBottom = "10px";

    // add blade to screen
    grassContainer.appendChild(bladeGrass);

    // add event listener
    bladeGrass.addEventListener('click', e=> {
        grassGenerator(grassCounter)
    });
}

// Generate a new grass object
function grassGenerator(currentGrassCount) {

    let randomGrassHeight = Math.floor(Math.random() * 100 + 40);
    let randomXPosition = Math.floor(Math.random() * SCREEN_WIDTH);

    // if the current grass count is less than the max grass const
    if (currentGrassCount <= MAX_GRASS) {
        // push new grass into array and increment the counter
        grassArray.push(new Grass(randomXPosition, "green", randomGrassHeight));
        grassCounter++;
        loadOnScreenCounter(grassCounter);
        // console.log(grassArray);
    } else if (currentGrassCount >= MAX_GRASS) {
        // else trigger wildfire error, eventually triggering the wildfire function to reset the page
        wildfire();
        console.log("Wildfire!");
    }

    return;
}

// CLOUD FUNCTIONS -------------------------------------------------------------------------------------

// clouds array 
const cloudArray = [MAX_CLOUDS];

// cloud object constructor
function Cloud(width, height, bubbleCount) {
    this.width = width;
    this.height = height;
    this.bubbleCount = bubbleCount;

    this.class = "cloud";
}

// cloud generator
function cloudGenerator() {
    
}

// 
function cloudChangeAnimation() {

}


// SUN FUNCTIONS --------------------------------------------------------------------------------------

// generate sun function, issue with radial gradient, check syntax errors and go from there.
function generateSun() {
    // console.log("sun!");

    let sun = document.createElement('div');
    sun.id = "sun";
    sun.style.width = "150px";
    sun.style.height = "150px";
    sun.style.borderRadius = "80px";
    sun.style.position = "fixed";
    sun.style.top = 0;
    sun.style.right = 0;
    sun.style.backgroundImage = "radial-gradient(orange 40%, transparent 80%)";
    sun.style.animation = "pulse";
    sun.style.animationDuration = "1s";
    sun.style.animationIterationCount = "infinite";

    cloudContainer.appendChild(sun);
    // console.log(sun);
}

// Counter Resets ------------------------------------------------------------------------------------
function counterReset() {

}


// Wildfire and function handler at MAX_GRASS --------------------------------------------------------

// generate fire on wildfire call
function generateFire() {

}

// handle the "wildfire" to reset the screen
function wildfire() {
    // document.getElementsByClassName('');

    // This function needs to handle a lot, might be worth having a few functions trigger within this function to keep with SRP
    // SRP = Single Responsibility Principle.

    // This function needs to be triggered only when max grass count is reached ./
    // This function needs to change cloud color to a darker gray -- call a cloud edit function
    // this function needs to generate a "fire" object sweeping left to right -- call a "fire generation function"
    // This function needs to delete all grass blades at an xPosition equal to the fire's x position -- handle this within the fire gen function
    // This function needs to trigger a counter reset for the grass blades -- keep this here
    // 

    // cloudChangeAnimation();
    // generateFire();
    // loadOnScreenCounter(0);
    // grassGenerator(0);
}

document.onload = loadOnScreenCounter(0);
document.onload = generateSun();
document.onload = grassGenerator(grassCounter);