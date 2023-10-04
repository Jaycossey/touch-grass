// GLOBAL VARIABLES
const cloudContainer = document.getElementById('cloud-display');
const grassContainer = document.getElementById('grass-display');
const counterContainer = document.getElementById('counter');

const MAX_CLOUDS = 3;
const MAX_GRASS = 100;

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
        counterContainer.textContent = "You have touched grass " + (counter) + " times!";
        counterContainer.style.transform = "skew(20deg)";
        counterContainer.style.margin = "12px";
        counterContainer.style.fontSize = "1.5rem";
        counterContainer.style.position = "relative";
        counterContainer.style.left = "30px";
        // render wildfire to replace counter 
    } else if (grassCounter > MAX_GRASS) {
        // I need the trigger for wildfire here to coincide with the counter max hit
        counterContainer.textContent = "Oh no! What have you done?! That is a wildfire!";
        wildfire();
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
    // console.log("should append now");

    // add event listener
    bladeGrass.addEventListener('click', e=> {
        grassGenerator(grassCounter)
    });

}

// Generate a new grass object
function grassGenerator(currentGrassCount) {
    console.log("grasstick");
    let randomGrassHeight = Math.floor(Math.random() * (GRASS_HEIGHT_MAX - GRASS_HEIGHT_MIN) + GRASS_HEIGHT_MIN);
    let randomXPosition = Math.floor(Math.random() * SCREEN_WIDTH);

    // if the current grass count is less than the max grass const
    if (currentGrassCount <= MAX_GRASS && currentGrassCount >= 0) {
        // push new grass into array and increment the counter
        grassArray.push(new Grass(randomXPosition, "green", randomGrassHeight));
        grassCounter++;
        loadOnScreenCounter(grassCounter - 1);
        // console.log(grassArray);
    } else if (currentGrassCount > MAX_GRASS) {
        // else trigger wildfire error, eventually triggering the wildfire function to reset the page
        // wildfire();
        console.log("Wildfire!");
        return;
    }

    return;
}

// remove grass on fire contact
function removeGrass() {
    let grass = document.getElementsByClassName('bladeOfGrass');
    // setTimeout -- For whatever reason, this also triggers the removal of the wildfire element
    setTimeout(() => {
        // remove objects from the array
        grassArray.forEach((element) => {
            element = undefined;
            console.log("Grass Array: " + element);
        });
        // remove elements from screen - this also removes the fire div, unsure why
        grassContainer.remove(grass);
    }, 15000);

    return;
}

// // reset grass -- this function will need updating when returning to the project another time
// function resetGrass() {
//     setTimeout(() => {
//         console.log("reset grass check");
//         grassGenerator(grassCounter);
//         // grassContainer.appendChild(grassArray[-1]);
//     }, 5000);
// }

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

// Wildfire and function handler at MAX_GRASS --------------------------------------------------------

// fire detail generator
function fireDetailAddition(parent) {
    for (let i = 0; i < 4; i++) {
        let fireDetail = document.createElement('div');
        fireDetail.class = "firedetail";
        fireDetail.style.width = "200px";
        fireDetail.style.height = "100%";
        parent.appendChild(fireDetail);
    }    
    return;
}

// generate fire on wildfire call
function generateFire() {
    // console.log("firegenerator triggered");
    let fireDiv = document.createElement('div');

    fireDiv.id = "fire";
    fireDiv.style.width = SCREEN_WIDTH;
    fireDiv.style.height = "220px";
    fireDiv.style.border = "4px solid red";
    fireDiv.style.position = "relative";
    fireDiv.style.left = "0";
    fireDiv.style.bottom = 0;
    fireDiv.style.transform = "translate(0, 100px)";

    // add details for fire
    fireDetailAddition(fireDiv);

    grassContainer.appendChild(fireDiv);
    // this timer technically does nothing, as the remove grass triggers the removal of the 
    // fireDiv as well. bug to fix another time.
    setTimeout(() => {
        grassContainer.removeChild(fireDiv);
        window.location.reload();
    }, 20000);
}

// handle the "wildfire" to reset the screen
function wildfire() {
    generateFire();
    removeGrass();
    grassCounter = 0;
    // This timeout function clashed with other timers and triggers too early, maybe a look into async await
    // setTimeout(() => {
    //     resetGrass();
    //     console.log("should reset now");
    // }, 10000);
    // grassGenerator(grassCounter);
    return;
}

document.onload = loadOnScreenCounter(0);
document.onload = generateCloudsTimer(cloudCounter);
document.onload = generateSun();
document.onload = grassGenerator(grassCounter);

/**
 * So the current issues are due to the reset functions of the grass, when it calls grass generator
 * it is not appending the child to the container. 
 * 
 * However, upon looking at the console logs the container is still present as are 5 of the grass blade 
 * objects. could it be an issue with the remove child section in remove grass function? 
 * 
 * best way to debug is to log each stage and check for inconsistencies on the logic as well as enabling the 
 * break points throughout to keep track of both the array contents and the child elements within the grass
 * container.
 * 
 * To make things easier in the short term I will refresh the page to reset the counters etc. 
 * 
 * THIS IS NOT A SOLUTION, this is just to finish the project for now and allow me to move on to other projects
 */