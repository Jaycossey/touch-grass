// GLOBAL VARIABLES
const cloudContainer = document.getElementById('cloud-display');
const grassContainer = document.getElementById('grass-display');
const counterContainer = document.getElementById('counter');

const MAX_CLOUDS = 3;
const MAX_GRASS = 10;

const SCREEN_WIDTH = window.innerWidth;

const CLOUD_HEIGHT_MAX = 200;
const CLOUD_HEIGHT_MIN = 120;
const CLOUD_WIDTH_MAX = 450;
const CLOUD_WIDTH_MIN = 200;
const CLOUD_BUBBLE_MAX = 5;
const CLOUD_BUBBLE_MIN = 3;

const GRASS_HEIGHT_MAX = 150;
const GRASS_HEIGHT_MIN = 80;

let cloudCounter = 0;
let grassCounter = 0;

// ARRAYS
const grassArray = [MAX_GRASS + 1];
const cloudsArray = [MAX_CLOUDS + 1];

// CLOUD FUNCTIONS -------------------------------------------------------------------------------------

// Timer to spawn a new cloud
function generateCloudsTimer() {
    cloudCounter++;
    // Create maximum amount of clouds for the page
    if (cloudCounter <= MAX_CLOUDS && cloudCounter >= 0) {
        // set timeout of 10s / 10000 ms. for each cloud.
        setTimeout(() => {
            generateCloud();
            generateCloudsTimer(cloudCounter);
            return cloudCounter;
        }, 6000 * cloudCounter);
    } else {
        // console.log("cloud count exceeded");
        return;
    }
     
}

// spawn single cloud shell
function generateCloud() {
    // generate random height and width of full cloud
    let randomWidth = Math.floor(Math.random() * (CLOUD_WIDTH_MAX - CLOUD_WIDTH_MIN) + CLOUD_WIDTH_MIN);
    let randomHeight = Math.floor(Math.random() * (CLOUD_HEIGHT_MAX - CLOUD_HEIGHT_MIN) + CLOUD_HEIGHT_MIN);

    // generate random position
    let randomYPosition = Math.floor(Math.random() * (400 - 20) + 20);
    let randomXPosition = Math.floor(Math.random() * (SCREEN_WIDTH - 0) + 0);

    // create element and position
    let cloud = document.createElement('div');
    cloud.className = "cloud";
    cloud.style.width = randomWidth + "px";
    cloud.style.height = randomHeight + "px";
    cloud.style.position = "fixed";
    cloud.style.right = "10";
    cloud.style.top = randomYPosition + "px";
    cloud.style.zIndex = cloudCounter;

    // element style
    cloud.style.opacity = "65%";
    cloud.style.left = randomXPosition + "px";
    cloud.style.marginTop = "20px";

    // add to array and append to container element
    cloudsArray.push(cloud);
    cloudContainer.appendChild(cloud);

    // random bubble count for details
    let randomBubbleCount = Math.floor(Math.random() * (5 - 3) + 3);
    cloudBubbles(randomBubbleCount);
}

// Create the detail divs and styling
function cloudBubbles(bubbleCount) {
    // so, with a mini bit of recursion
    bubbleCount--;    
    // console.log(bubbleCount);

    // create duplicate of the div we want to manipulate
    let cloudCopy = cloudsArray[cloudCounter];

    // create and style the details
    let detailDiv = document.createElement('div');
    detailDiv.className = "cloudBubble";
    detailDiv.style.width = (bubbleCount + 1) * 100 + "%";
    detailDiv.style.height = bubbleCount + "0%";
    detailDiv.style.border = "20px solid #E7EAE5";
    detailDiv.style.borderRadius = "50%";
    detailDiv.style.backgroundColor = "white";
    detailDiv.style.padding = "20px";
    detailDiv.style.position = "absolute";


    // append to parent div
    cloudCopy.appendChild(detailDiv);

    // Replace original with clone
    cloudsArray[cloudCounter] = cloudCopy;
    
    // console.log(cloudsArray[cloudCounter]);
    
    if (bubbleCount <= 0) {
        // console.log("bubbles finished");
        return;
    } else {
        cloudBubbles(bubbleCount);
    }

    return;
}

// GRASS FUNCTIONS ---------------------------------------------------------------------------------------


// assign the grass counter to the screen
function loadOnScreenCounter(counter) {
    // providing counter is within range
    if (grassCounter >= 0 && grassCounter <= MAX_GRASS) {
        // styling for the counter display
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

    let randomGrassHeight = Math.floor(Math.random() * (GRASS_HEIGHT_MAX - GRASS_HEIGHT_MIN) + GRASS_HEIGHT_MIN);
    let randomXPosition = Math.floor(Math.random() * SCREEN_WIDTH);

    // if the current grass count is less than the max grass const
    if (currentGrassCount <= MAX_GRASS && currentGrassCount >= 0) {
        // push new grass into array and increment the counter
        grassArray.push(new Grass(randomXPosition, "green", randomGrassHeight));
        grassCounter++;
        loadOnScreenCounter(grassCounter);
        // console.log(grassArray);
    } else if (currentGrassCount >= MAX_GRASS) {
        // else trigger wildfire error, eventually triggering the wildfire function to reset the page
        wildfire();
        return;
        // console.log("Wildfire!");
    }

    return;
}

// remove grass on fire contact
function removeGrass() {
    // get correct boundings and assign elements
    let fire = document.getElementById('fire');
    let fireRangeMax = fire.getBoundingClientRect('left') + 100;
    let fireRangeMin = fire.getBoundingClientRect('left');
    let elementsInFire = document.getElementsByClassName('bladeOfGrass');

    if (elementsInFire.xPosition <= fireRangeMax || elementsInFire.xPosition >= fireRangeMin) {
        grassContainer.removeChild(elementsInFire);        
    }   

    // so how do i target the elements within the range of the fire?
    // I have the width of the fire set at 100px
    // I also know the xPositions of each of the grass elements.
    // I need to get the boundingClientRect left of the fire
    // With that information I can work out collision and remove the elements with this knowledge

    grassArray.forEach((element) => {
        element = undefined;
    });

    return;
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
    sun.style.zIndex = 0;
    sun.style.backgroundImage = "radial-gradient(orange 40%, transparent 80%)";

    cloudContainer.appendChild(sun);
}

// Counter Resets ------------------------------------------------------------------------------------
function counterReset() {
    // console.log("update counter to 0");
    grassCounter = 0;
    // console.log("counter: " + grassCounter);
    return;
}


// Wildfire and function handler at MAX_GRASS --------------------------------------------------------

// animation for the fire
function animateFire() {

}

// generate fire on wildfire call
function generateFire() {
    console.log("firegenerator triggered");
    let fireDiv = document.createElement('div');
    fireDiv.id = "fire";
    fireDiv.style.width = "100px";
    fireDiv.style.height = "220px";
    fireDiv.style.border = "4px solid red";
    fireDiv.style.position = "relative";
    fireDiv.style.left = "0";
    fireDiv.style.bottom = "90px";

    grassContainer.appendChild(fireDiv);

    // animateFire();
    removeGrass();
    // grassContainer.removeChild(fireDiv);
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
    console.log("wildfire triggered");
    
    generateFire();
    counterReset();

    // generateFire();
    // loadOnScreenCounter(0);
    // grassGenerator(0);
}

document.onload = loadOnScreenCounter(0);
document.onload = generateCloudsTimer(cloudCounter);
document.onload = generateSun();
document.onload = grassGenerator(grassCounter);