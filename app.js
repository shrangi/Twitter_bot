const Twitter = require('twitter') ;
const config = require('./config').key ;
//const fetch = require('node-fetch') ;
const unirest = require('unirest') ;
 
var T = new Twitter(config);

//const quotesEndPoint = "https://talaikis.com/api/quotes/random/" ; another random endpoint

const quotesEndPoint= "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1" ;

 function postQuote(){
	 unirest.get(quotesEndPoint)
		.header("X-Mashape-Key", process.env.API_KEY)
		.header("Accept", "application/json")
		.end(function (result) {
			var quote =  result.body[0].quote; 
			quote = quote + ' #famous #quote'
			let l =  quote.length
			if(l >=3 && l<140)
				{
					T.post('statuses/update',{ status: quote}, function(err,tweet,res){
					if(err) console.log(err);
					console.log(`Tweeted '${quote}' on -${tweet.created_at}`);
					});		   		
				}
		});         
}

postQuote();


 setInterval(postQuote, 1000*60*60*6);

// POST A simple format to post a tweet on twitter..

// T.post('statuses/update', {status: 'I Love Twitter'},  function(err, tweet, response) {
//   if(err) throw err;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

// SEARCH A TWEET - q is for query category 

// T.get("search/tweets", {q: 'poem',count:5}, function(error, tweets, response) {
//   // console.log(tweets.statuses);
//    tw = tweets.statuses;
//    for( i=0 ; i<tw.length ; i++){
//    		console.log(tw[i].text);
//    		console.log("  ");
//    }
  
// });

//Stream is used for making a connection and look for any event happening 

// T.stream("statuses/filter",{track:"news"},function(stream){
//      stream.on('data',function(tweet){
//      	console.log(tweet.text);
//      	console.log("----");
//      });

//      stream.on("error",function(err){
//      	console.log(err);
//      });
// });


// We need to migrate to Enterprise  or premium version of account API..
// can't use 'site' or 'user' stream 

// var stream = T.stream('user');

// stream.on("follow",followed);
// stream.on("direct_message",dm);
// stream.on("error",(err)=>console.log(err));

// function followed(evt){
// 	console.log(evt);
// }

// Giphy public api endpoint

// var data = "https://api.giphy.com/v1/gifs/random?api_key='yourKeyHere'&tag=memes&rating=PG";

// async function giphyAPI(){
// 	let res = await fetch(data)
// 	let body = await res.json();
// 	gif = body.data.images.downsized_medium.url  ;
//     console.log(gif);
//     return gif;
// }
// giphyAPI().catch(err => console.log(err));

//  async function uploadMedia(){
// 	let data  = await giphyAPI();
// 	console.log(data);

// POST a Tweet on twitter with a status and a Image but we need to convert it into base64 readfile from data

// 	T.post('media/upload', {media: data}, function(error, media, response) {

// 	  if (!error) {
// 	    // If successful, a media object will be returned.
// 	    console.log(media);

// 	    // Lets tweet it
// 	    var status = {
// 	      status: 'I am a tweet',
// 	      media_ids: media.media_id_string // Pass the media id string
// 	    }

// 	    T.post('statuses/update', status, function(error, tweet, response) {
// 	      if (!error) {
// 	        console.log(tweet);
// 	      }
// 	    });

// 	  }
// 	});

// }
// uploadMedia();
