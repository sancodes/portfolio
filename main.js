
//**************************/
// Particle.js
//**************************/

window.onload = function () {
    Particles.init({
        selector: '.animated-particle-background',
        speed: 0.3,
        sizeVariations: 3,
        connectParticles: true,
        // color: '#0fffff'
        color: ['#0fffff', '#e8c9d0', '#fdfcfc']
    });
};
//**************************/
//**************************/



//**************************/
// Text Animate
//**************************/

function textAnimate(wordsArray, idParam) {
    let letterCount = 1; //set to 1 to work with substring --> initial display will need at least 1 length  
    let letterEnd = false;
    let dummyVar = 1; //set the influence to change the letterCount up by 1 or down by 1
    let underscoreVisible = true;  //initially the underscore is visible
    let colorChangeElem = 0;

    //repeat the words display
    window.setInterval(() => {

        //recycle the words after finishing the display for display loop
        if (letterCount === 0 && !letterEnd) {
            document.getElementById(idParam).innerHTML = wordsArray[0].substring(0, letterCount);
            //w/o setting it true, the code will break as the wait time for the next timeout is 1second and if letter end is not set to True, it will glitch and go to other else if statements
            //setting letterEnd to true --> kinda traps the execution and makes it wait and execute the logic inside the setTimeout
            //as we know all the letterEnd values are compared to a falsy value, and having set it to a truthy value, the other conditional(if/elif) wont run. 
            letterEnd = true;
            //start recycling the word back to the wordsArray
            window.setTimeout(() => {
                let lastUsedWords = wordsArray.shift();
                wordsArray.push(lastUsedWords);
                dummyVar = 1;    // start of the new word display so need to increment
                letterCount += dummyVar;
                letterEnd = false;
            }, 1000)

        }

        //erase the letters after reaching the end of the word
        else if (letterCount === wordsArray[0].length + 1 && !letterEnd) {
            //w/o setting it true, the code will break as the wait time for the next timeout is 1second and if letter end is not set to True, it will glitch and go to other else if statements
            //setting letterEnd to true --> kinda traps the execution and makes it wait and execute the logic inside the setTimeout
            //as we know all the letterEnd values are compared to a falsy value, and having set it to a truthy value, the other conditional(if/elif) wont run. 
            letterEnd = true;
            //start of the negative length
            window.setTimeout(() => {
                dummyVar = -1;
                letterCount += dummyVar;
                letterEnd = false;
            }, 1000)

        }

        //start the letter display
        else if (!letterEnd) {
            document.getElementById(idParam).innerHTML = wordsArray[0].substring(0, letterCount);
            letterCount += dummyVar;
        }

    }, 210);

    //repeat the blinker display
    window.setInterval(() => {

        //if underscore is visible hide it
        if (underscoreVisible) {
            document.getElementById('uScore').className = 'underscore hidden';  //calls the css .underscore .hidden
            underscoreVisible = false;
        }
        //if the underscore is hidden show it
        else {
            document.getElementById('uScore').className = 'underscore';   //calls the css .underscore 
            underscoreVisible = true;
        }

    }, 400)
}

textAnimate(['sanSays = "Hello!";', 'Software Engineer'], 'letter');

//**************************/
//**************************/


//**************************/
//RANDOM QUOTE GENERATOR
//**************************/
//api call to get the random quote
async function randomQuote() {
    let res = await fetch('https://api.quotable.io/random');
    let data = await res.json();
    if (res.ok) {

        insertQuotes(data.content, data.author);
    } else {
        console.log(data.error());
    }
}

//inserting the quotes and author inside the html page
function insertQuotes(randQuote, author) {
    // let quote = document.getElementById('quotes');
    // quote.innerHTML += `<p> ${randQuote} </p>`;

    //gets the element which has the id and then appends the whole 
    let element = document.getElementById('quotes');
    let quoteTag = insertTag(randQuote);
    let authorTag = insertTag(author);
    element.appendChild(quoteTag);
    element.appendChild(authorTag);
}

//responsible only for creating p tag and adding inputs inside that p tag 
function insertTag(inputs) {
    let tag = document.createElement('p'); //creates <p> tag
    let text = document.createTextNode(inputs);  //basically all the string --> quotes
    return tag.appendChild(text);    //<p> life is great </p>
}

randomQuote(); //need to call the function
//**************************/
//**************************/


//**************************/
//LIGHT THEME/DARK THEME
//**************************/
function changeDisplay() {
    if (document.body.style.backgroundColor === 'blue') {
        darkTheme();
    } else {
        lightTheme();
    }
}

//changing background to light theme
function lightTheme() {
    document.body.style.backgroundColor = 'blue';
    document.body.style.color = "white";
}

//changing background to dark theme
function darkTheme() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = "black";
}
//**************************/
//**************************/


//get total project items
function totalProjectItems() {
    let totalItems = document.getElementsByClassName('carousel-item').length;
    return totalItems;
}

let rotation = 1;
let increment = rotation;
let max = totalProjectItems();
let left = false;

function leftButton() {

    //need to first hide the current item so that i can bring in the next item
    hideProject();

    if (rotation === 1) {
        rotation = max;
    } else {
        rotation -= 1;
    }

    //after the item is hid, next item should appear
    showProject();
}

function rightButton() {
    //need to first hide the current item so that i can bring in the next item
    hideProject();

    if (rotation === max) {
        rotation = 1;
    } else {
        rotation += 1;
    }
    //after the item is hid, next item should appear
    showProject();
}

function hideProject() {
    document.getElementById('carousel-item-' + rotation).classList.add('hide');
}
function showProject() {
    document.getElementById('carousel-item-' + rotation).classList.remove('hide');
}

