/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games) {
        // create a new div element
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;


// set inner HTML using template literal


// grab number of games card and set its inner HTML


const gamesCard = document.getElementById("num-games");
const totalGamesCount = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGamesCount.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length); // 🔑 Secret Key Component 1

    addGamesToPage(unfundedGames);

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

const displayStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
  Currently, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.
  We need your help to fund these amazing games!
`;

const descriptionElement = document.createElement("p");
descriptionElement.innerText = displayStr;
descriptionContainer.appendChild(descriptionElement);


// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...rest] = sortedGames;

// create new elements for each and set inner text to the game name
const topGameElement = document.createElement("p");
topGameElement.innerText = topGame.name;

const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;

// append each to its container
firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(secondGameElement);


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item