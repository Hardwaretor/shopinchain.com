
const Bot = require('node-telegram-bot-api');
const request = require('request');
const token = require('./token');
const url = 'https://shopinchain/djs';
const trigger = `DJs schedule`;
const trigger2 = `Cinema schedule`;
const trigger3 = `Games`;
const trigger4 = `NFT's`;
const url2 = 'https://shopinchain/games';
const url3 = 'https://shopinchain/cinema';
const url4 = 'https://shopinchain/nfts';
const bot = new Bot(token, {polling: true});


const prepareData = (body) => {
 const djs = JSON.parse(body).djs;
 return djs.filter((dj) => dj !== undefined)
  .map((dj) => `${dj.name} on ${dj.net}`)
  .join('\n\n');

};

const prepareData2 = (body) => {
  const games = JSON.parse(body).games;
  return games.filter((game) => game !== undefined)
   .map((game) => `${game.name} on ${game.net}`)
   .join('\n\n');
  
  };

const prepareData3 = (body) => {
const cinema = JSON.parse(body).cinema;
return cinema.filter((movie) => movie !== undefined)
 .map((movie) => `${movie.name} on ${movie.net}`)
 .join('\n\n');

};

const prepareData4 = (body) => {
  const nfts = JSON.parse(body).nfts;
  return nfts.filter((nft) => nft !== undefined)
   .map((nft) => `${nft.name} on ${nft.net}`)
   .join('\n\n');
  
  };




bot.on('message', (msg) => {

 //////////// var hi = "hi";
 //////////// if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
 //////////// bot.sendMessage(msg.chat.id,"Hello dear user");
 ///////////// } 
      
 /////////////// var bye = "bye";
 ///////////// if (msg.text.toString().toLowerCase().includes(bye)) {
 /////////// bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
 ////////// } 


 if (msg.text.toString() === trigger) {
  return request(url, (err, resp, body) => {
   bot.sendMessage(msg.chat.id, prepareData(body));
   
  });

 }


 if (msg.text.toString() === trigger2) {
  return request(url2, (err, resp, body) => {
   bot.sendMessage(msg.chat.id, prepareData2(body));
   
  });

 }


 if (msg.text.toString() === trigger3) {
  return request(url3, (err, resp, body) => {
   bot.sendMessage(msg.chat.id, prepareData3(body));
   
  });

 }

 if (msg.text.toString() === trigger4) {
  return request(url4, (err, resp, body) => {
   bot.sendMessage(msg.chat.id, prepareData4(body));
   
  });

 }

bot.sendPhoto(msg.chat.id,"https://shopinchain.com/assets/logo5.png" );

bot.sendMessage(msg.chat.id, 'Hello,  every our agents are busy at the moment, we`ll contact you as soon as possible. Thanks for your patience.', {
  reply_markup: {
    keyboard: [[trigger],
               [trigger2],
               [trigger3],
               [trigger4],
  ],
              
   }
  }
 );
});

//////////////////////// Data Server //////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4001;
const djs = require('./djs.json');
const cinema = require('./cinema.json');
const games = require('./games.json');
const nfts = require('./nfts.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.json();
});

app.get('/nfts', (req, res) => {
  res.json(nfts);
});

app.get('/djs', (req, res) => {
  res.json(djs);
});

app.get('/cinema', (req, res) => {
  res.json(cinema);
});

app.get('/games', (req, res) => {
  res.json(games);
});



app.listen(port, () => {
  console.log(`ShopInChain.com Telegram Bot on :${port}`);
});