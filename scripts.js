// GLOBAL VARIABLES
const cloudContainer = document.getElementById('cloud-display');
const grassContainer = document.getElementById('grass-display');
console.log(cloudContainer);
console.log(grassContainer);

const MAX_CLOUDS = 3;
const MAX_GRASS = 50;
const SCREEN_WIDTH = window.innerWidth;

let grassCounter = 0;
let cloudCounter = 0;

/**
 * 
 * Planning: What does this program need to do functionally for the grass? 
 * - I need to generate a single grass blade object onload
 * - I need to create an event listener on the blade of grass that listens for a click
 * - onclick, I need to 'spawn' a new grass object
 * - onclick I also need to increment the grassCounter
 * - the new grass blade also needs the event listener.
 * - the grass blades will all need the event listener
 * - all grass objects will need the class "animate" which I can animate with either CSS or JS 
 * - all grass objects spawned will have a math.random x position.
 * 
 * What does this program need to do for the clouds?
 * - I need to generate a function which onload generates cloud objects and adds them to an array
 * - The cloud objects will need the transition: linear property 
 * - the cloud objects will translate along the x axis over time until the left x position is no longer on screen
 * - Once on off screen the object will then be deleted from the array.
 * - I need to keep track of the amount of clouds on screen with cloudCounter
 * - I need to ensure the clouds are styled correctly.
 * 
 * BONUS: I want to generate a pulsing SUN object at the top right of the screen.
 * 
 */

// GRASS FUNCTIONS ---------------------------------------------------------------------------------------

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
    // console.log(bladeGrass);
    // console.log(grassArray);
}

// When this function is called, generate a new grass object
function grassGenerator(currentGrassCount) {
    let randomGrassHeight = Math.floor(Math.random() * 100 + 40);
    let randomXPosition = Math.floor(Math.random() * SCREEN_WIDTH);

    // if the current grass count is less than the max grass const
    if (currentGrassCount <= MAX_GRASS) {
        // push new grass into array and increment the counter
        grassArray.push(new Grass(randomXPosition, "green", randomGrassHeight));
        grassCounter++;
        console.log(grassArray);
    } else if (currentGrassCount >= MAX_GRASS) {
        // else trigger wildfire error, eventually triggering the wildfire function to reset the page
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

// SUN FUNCTIONS --------------------------------------------------------------------------------------

// generate sun function, issue with radial gradient, check syntax errors and go from there.
function generateSun() {
    // console.log("sun!");

    let sun = document.createElement('div');
    sun.id = "sun";
    sun.style.width = "150px";
    sun.style.height = "150px";
    // sun.style.border = "6px solid yellow";
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

document.onload = generateSun();
document.onload = grassGenerator(grassCounter);