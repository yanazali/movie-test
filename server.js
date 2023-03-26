const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compress = require('compression');

const port = process.env.PORT || 9002;
const app = express();

app.use(compress());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 10 }));

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port);
console.log("server started on port " + port);