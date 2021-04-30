const { existsSync } = require('fs');
const path = require('path');
const express = require('express');
const { authenticate } = require('./usercontroler');

const router = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', router);
app.listen(process.env.port || 3000);

router.post('/authenticate', authenticate);
router.get('/*', function (req, res) {
  if (req.url === '/') {
    res.sendFile(path.join(__dirname + "/login.html"));
    return
  }
  if (existsSync(path.join(__dirname + req.url))) {
    res.sendFile(path.join(__dirname + req.url));
    return
  }
  const extensions = ['.js', '.css', '.html', '.png', '.jpeg', '.jpg'];
  for (let extension of extensions) {
    let pathatt = path.join(__dirname + req.url + extension);
    if (existsSync(pathatt)) {
      res.sendFile(pathatt);
      return;
    }
  }
  console.log("Arquivo morreu");
  res.status(404).send();
  return

});

console.log("Rodando", new Date());