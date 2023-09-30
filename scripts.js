// GLOBAL VARIABLES
const cloudContainer = document.getElementById('cloud-display');
const grassContainer = document.getElementById('grass-display');
console.log(cloudContainer);
console.log(grassContainer);

const MAX_CLOUDS = 3;
const MAX_GRASS = 100;

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

// grass array
const grassArray = [MAX_GRASS];

// grass object constructor
function Grass(xPosition, color, height) {
    this.xPosition = xPosition;
    this.color = color;
    this.height = height;

    this.width = "10px";
    this.class = "grass";
}

// clouds array 
const cloudArray = [MAX_CLOUDS];

// cloud object constructor
function Cloud(width, height, bubbleCount) {
    this.width = width;
    this.height = height;
    this.bubbleCount = bubbleCount;

    this.class = "cloud";
}

// generate sun function, issue with radial gradient, check syntax errors and go from there.
function generateSun() {
    console.log("sun!");
    // let sunGradient = "radial-gradient(#F87DOA 0%, #F2F80A 90%, transparent 100%)";

    let sun = document.createElement('div');
    sun.id = "sun";
    sun.style.width = "150px";
    sun.style.height = "150px";
    sun.style.border = "6px solid yellow";
    sun.style.borderRadius = "75px";
    sun.style.position = "fixed";
    sun.style.top = 0;
    sun.style.right = 0;
    // sun.style.backgroundImage = sunGradient;

    cloudContainer.appendChild(sun);
    console.log(sun);
}

document.onload = generateSun();