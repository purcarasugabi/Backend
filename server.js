var Twit = require('twit');
var express = require('express');
var Sequelize = require('sequelize');


//here are some incomplete API KEYS 
//the code will not work 
//for testing and validation, i can bring keys to classroom 
var T = new Twit({
  consumer_key:         'hx94I5OeN8PJ4Q4YBXInsu',
  consumer_secret:      'ZYbAQY91a9NJ7M5DJxixjTljqeuizFRgswukzLLUoLymEm0',
  access_token:         '938487435192930304-BaNZBYefadTZVD7J12OvdFJ3FDOF',
  access_token_secret:  'IQ2J3ZdHIfWoTPy7GCfPafFQYVA6S7FfEJzWFQwx78',
});

var sequelize = new Sequelize('tweets', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

var QueryString = sequelize.define('queryString',{
  name: Sequelize.STRING
});

var QueryResult = sequelize.define('queryResult', {
  queryId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  retweetNumber: Sequelize.INTEGER,
  userId: Sequelize.STRING
});

QueryResult.belongsTo(QueryString, {foreignKey: 'queryId', targetKey: 'id'});

var searchedString = "trump"; //dummy string used for twitter API search
var numberOfResults = 2; //dummy int used for twitter API (how many tweets to search)


//populate database after searching tweets
T.get('search/tweets', { q: searchedString, count: numberOfResults }, function(err, data, response) {
  
  QueryString.create({name:'searchedString'}).then(task =>{
    
    for(var i = 0 ; i< numberOfResults; i++){
      QueryResult.create({
        queryId: task.dataValues.id,
        text:  data.statuses[i].text,
        retweetNumber:data.statuses[i].retweet_count,
        userId: data.statuses[i].user.id
      });
    }
  })
})

var app = express()

app.get('/', function (req, res) {
  T.get('search/tweets', { q: searchedString, count: numberOfResults }, function(err, data, response) {
  //res.send(data.statuses[0].user);//that works
  res.send(data.statuses);
  });
});


//get a query string with a specific id
app.get('/queryString/:id', function(request, response) {
    QueryString.findOne({where: {id:request.params.id}}).then(function(queryString) {
        if(queryString) {
            response.status(200).send(queryString)
        } else {
            response.status(404).send()
        }
    })
})

app.get('/queryString/:id/queryResults', function(request, response) {
    QueryString.findAll({where:{category_id: request.params.id}}).then(
            function(results) {
                response.status(200).send(results)
            }
        )
})

app.listen(8080);
