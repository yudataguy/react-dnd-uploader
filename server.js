const express = require("express");
const multer  = require('multer');
const cors = require('cors');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage : storage}).single('userPhoto');

const PORT = 3001;

app.use(cors());
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
      res.setHeader('Content-Type', 'text/plain')
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end('Upload Done');
    });
});

app.listen(PORT,function(){
    console.log(`Node server working on port ${PORT}`);
});
