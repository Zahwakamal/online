const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();

function getTotalOnlinePlayers(callback) {
  request('https://www.growtopiagame.com/detail', (error, response, body) => {
    if (error) {
      return callback(error);
    }
    // Parse the response to extract the total number of players online
    const totalOnline = parseInt(body.match(/"online_user":"(\d+)"/)[1]);
    callback(null, totalOnline);
  });
}

client.on('ready', () => {
  const voiceChannel = client.channels.cache.get("1069230080762585088");
  setInterval(() => {
    getTotalOnlinePlayers((error, totalOnline) => {
      if (error) {
        console.error(error);
      } else {
          voiceChannel.setName(`Online Players: ${totalOnline}`);
      }
    });
  }, 60000); // update the channel name every minute
});

// Example usage: get the total number of online players in Growtopia
getTotalOnlinePlayers((error, totalOnline) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`There are a total of ${totalOnline} players online.`);
  }
});

client.login('MTAzODczNzM4Mjc4NDExMDYwMg.G9rsTw.Q8Ymwd_s-q0C2eWvSif2cTjtPOKa0TwENvXMeQ');