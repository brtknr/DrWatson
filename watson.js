var watson = require('watson-developer-cloud');
var express = require('express');
var app = express();
var cors = require('cors');

var question = '';

app.use(cors());

app.get('/watson', function(req,res) {
  question = req.query.question;
  if (question === undefined) {
    res.send("error");
  }

  natural_language_classifier.classify({
    text: question,
    classifier_id: '022EFCx11-nlc-221' },
    function(err, response) {
      if (err)
        console.log('error:', err);
      else {
        // console.log(JSON.stringify(response.classes, null, 2));
        var result = {};
        result.class = response.classes[0].class_name
        result.confidence = response.classes[0].confidence
        if (result.confidence > 0.8)
          relationship_extraction.extract({
            text: question,
            dataset: 'ie-en-news' },
            function (err, response) {
              if (err) {
                console.log('error:', err);
              }
              else {
                // console.log(JSON.stringify(response.doc.entities.entity,null,2));
                console.log('The best match is',result.class,result.confidence)
                var keywords = [];
                if (response.doc.entities.entity != null) {
                  for (i = 0; i<response.doc.entities.entity.length; i++) {
                    keyword = response.doc.entities.entity[i].mentref[0].text
                    keyword_type = response.doc.entities.entity[i].type
                    console.log(keyword,keyword_type)
                    switch(result.class){
                      case 'recommendation':
                        if (keyword_type == 'GPE' || keyword_type == 'FACILITY' || keyword_type == 'ORGANIZATION') {
                          if (typeof result.address == 'undefined') {
                            result.address = keyword
                          } else {
                            result.address +=','+keyword
                          }
                          console.log(result.address)
                        }
                        break;
                      case 'direction':
                        if (keyword_type == 'GPE' || keyword_type == 'FACILITY' || keyword_type == 'ORGANIZATION') {
                          if (typeof result.to == 'undefined')
                          {
                            result.from = 'Milton Keynes';
                            result.to = keyword;
                            console.log("To: " + result.to);
                          }
                          else {
                            result.from = result.to;
                            result.to = keyword;
                            console.log("From:",result.from,"To:",result.to);
                          }
                        }
                        break;
                    }
                  }// Outside of the for loop
                } // Outside of If
                
                switch(result.class){
                  case 'recommendation':
                    break;
                  case 'direction':
                    break;
                }
              }
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(result));
          });
      }
  });

}).listen(3000);

var relationship_extraction = watson.relationship_extraction({
  username: '498e16cc-5ef1-44a2-8ef3-35e139912dc3',
  password: '8elW4nIDTKUn',
  version: 'v1'
});

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '498e16cc-5ef1-44a2-8ef3-35e139912dc3',
  password: '8elW4nIDTKUn',
  version: 'v1'
});

// question = 'What are the best hotels around London Bridge?'
