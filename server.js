


const express = require('express')
const app = express()
const PORT = 3000

const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const appDir = path.dirname(require.main.filename)

const logger = require('./logger.js')
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'hello world'
  })
})

app.get('/api', function (req, res) {
  res.status(200).json({
    message: 'hello api'
  })
})

// express-winston logger makes sense BEFORE the router.
app.use(logger.request)


app.get('/logs', (req, res) => {
  // TODO: blacklist other urls from accessing this without permissions
  // carry out pagination for users
  let fileNames = []
  fs.readdir(appDir + '/log', function(err, files) {
      if (err) return;
      files.forEach(function(f) {
          fileNames.push(f)
      });
    res.status(200).json(fileNames)
  })
})

app.get('/hello', (req, res) => {
  res.status(200).json({
    hello: 'World'
  })
})

app.get('/logs/:logname', (req, res) => {
 const logname = req.params.logname;
 fs.readFile(`${ appDir }/log/${ logname }`, 'utf8', function (err, data) {
   if (err) {
     return console.log(err);
   }

   let output = null;
   // "newline-delimited JSON" or "ndjson";
   try {
     output = data.split('\n').map((line) => {
       if (isJSON(line)) {
         return JSON.parse(line);
       } else {
         return line;
       }
     });
     console.log('outputping', output)
     console.log('outputing')
     res.status(200).json(output)
     return
   } catch(e) {
     res.status(401).json({
       success: false,
       message: e
     })
   }
 });
 // 
});

function isJSON(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
app.use(morgan('combined', { "stream": logger.stream }));

// express-winston errorLogger makes sense AFTER the router.
app.use(logger.error)
app.listen(PORT, () => {
  console.log(`listening to port*:${PORT}. press ctrl + c to cancel`)
})
