const { Client, Intents } = require("discord.js");
const config = require("./config.json");
const axios = require('axios').default;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = "!";

client.on("messageCreate", function(message){
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  console.log(`Start of call, command: ${command}, args: ${args}`)
  if(command === "ping"){
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had latency of ${timeTaken}ms.`);
    console.log(`Just replied to ${message.author} in ${timeTaken}ms.`);
  }

  if(command === "fetchchar"){
    let charName = args[0];
    Promise.all([fetchChar(charName)])
      .then(function(results){
        const char = results[0];
        const server = char.info.server;

        let promises = [];
        for (let i = 1; i < 4; i++) {
          if(char.season4[`${i}`].team != null){
            promises.push(fetchTeam(`${i}`, server, char.season4[`${i}`].team[0]));
          }
        }

        Promise.all(promises)
          .then(function(results){

          })

        console.log(char.season4);
      })
  }
});

function fetchChar(charName){
  return axios.get('https://ironforge.pro/api/players', {
    params: {
      player: charName
    }
  }).then(function (response){
    return response.data;
  }).catch(function (error){
    console.log(error);
  });
}

function fetchTeam(bracketType, serverName, teamID){
  return axios.get(`https://ironforge.pro/api/pvp/team/${bracketType}/${serverName}/${teamID}`)
    .then(function (response){
      return response.data;
    }).catch(function (error){
      console.log(error);
    });
}

async function fetchTeamSync(bracketType, serverName, teamID){
  try{
    let http_promise = fetchTeam(bracketType, serverName, teamID);
    let response_body = await http_promise;

    return response_body;
  }catch(error){
    console.log(error);
  }
}

function calculatePoints(charInfo, currentSeason){
  try{
    const twosCR = getAccurateRating(charInfo, currentSeason, '2');
    const threesCR = getAccurateRating(charInfo, currentSeason, '3');
    const fivesCR = getAccurateRating(charInfo, currentSeason, '5');

    let results = `2s CR : ${twosCR} granting ${computeTBC(twosCR, 2)},\r\n 3s CR : ${threesCR} granting ${computeTBC(threesCR, 3)},\r\n 5s CR : ${fivesCR} granting ${computeTBC(fivesCR, 5)}.`;
    console.log(results);

    return results;
  }catch(error){
    console.log(error);
  }

}

async function getAccurateRating(charInfo, season, bracketType){
  try{
    if(season[bracketType].team == null){
      return 0;
    }
    let charCR = season[bracketType].cr[0];
    const teamID = season[bracketType].team[0];
    const teamCR = await fetchTeamSync(bracketType, charInfo.server, teamID);

    if(Math.abs(charCR - teamCR) < 150){
      charCR = teamCR;
    }
    return charCR;
  }catch(error){
    console.log(error);
  }
}

function computeTBC(rating, bracketType){
  let exponent = (-0.00412 * rating);
  let number = 2.71828;

  let points = 1022 / (1 + 123 * Math.pow(number, exponent)) + 580
  switch(bracketType){
    case 2:
      points = points * 0.76;
      break;
    case 3:
      points = points * 0.88;
      break;
    case 5:
    default:
      break;
  }
  return Math.round(points);
}

client.login(config.BOT_TOKEN);
