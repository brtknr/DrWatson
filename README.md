Instructions:
-------------

- Get Watson API key from Bluemix for the following modules and insert them into watson.js:
	- relationship extractor
	- natural language processing

- Generate a training dataset	
	- An example is available in ./training/tourist.csv

- Follow instructions on the natural-language-classifier document to train Watson and get classifier ID, which you will need to specify in watson.js.

- You may need the following node modules:
	- connect
	- cors
	- express
	- gulp
	- gulp-sass
	- jade
	- nodemon
	- serve-static
	- socket.io
	- watson-developer-cloud

- You may also need the following bower components:
	- bootstrap-material-design
	- jquery	

- Run nodemon as service on terminal:
	
	nodemon watson.js

- Run SimpleHTTPServer service on terminal:
	
	python -m SimpleHTTPServer

- On browser, go to http://localhost:8000
