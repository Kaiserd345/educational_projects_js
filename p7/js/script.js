'use strict'

// Coding Challenge #2

/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number
(Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages,
you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds
and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and
the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
//1.
const [players1, players2] = game.players;
//2.
const [gk, ...fieldPlayers] = players1;
//3.
const allPlayers = [...players1, ...players2];
//4.
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
//5.
const {odds: {team1, x: draw, team2}} = game;
console.log(team1, draw, team2);
//6.
const printGoals = function (...players) {
    console.log(`${players.length} goals scored.`)
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

console.log('---PART TWO---');

//2.1.
const printScorer = function (arr) {
    for (const [i, player] of game.scored.entries()) {
        console.log(`Goal ${i + 1}: ${player}`)
    }
    //for loop variant
    // for (let i = 0; i < arr.length; i++) {
    //     console.log(`Goal ${i + 1}: ${arr[i]}`);
    // }
}

printScorer(game.scored);

//2.2.
const averageOdd = function (obj) {
    let sum = 0;
    for (const value of Object.values(obj)) {
        sum += value;
    }
    console.log(`Average odd is: ${sum / (Object.keys(obj).length)}`);
}

averageOdd(game.odds);

//2.3.
const printOdds = function (obj) {
    const odds = Object.entries(obj);
    for (const [team, odd] of odds) {
        const teamName = team === 'x' ? 'draw' : `victory ${game[team]}`
        console.log(`Odd of ${teamName}: ${odd}`);
    }
}

printOdds(game.odds);

//2.bonus
const scorers = {};
for (const item of game.scored) {
    let goals = scorers[item] ?? 0;
    scorers[item] = ++goals;
}

console.log(scorers);