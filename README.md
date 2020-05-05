# React-DnD-Uploader

React Drag-n-Drop Uploader is a light weight React library that create a drag and drop zone for uploading your files.

## Features

* Image and video thumbnail previews
* Upload multiple files
* Display progress updates
* Response design
* Customizable theme

## Installation

For npm

```bash
npm install --save react-dnd-uploader
```

For yarn

```bash
yarn add react-dnd-uploader
```

## Demo

```bash
git clone https://github.com/yudataguy/react-dnd-uploader.git
cd react-dnd-uploader
npm install
npm start
```

A browser opens up, or visit http://localhost:3000 to browse the demo.

## Documentation

### fileWindow

Type: `Boolean`<br>
Required: `false`<br>
Default: `false`<br>

If the `fileWindow` is set to `true`, there will be a file window button available on drag and drop zone.

### autoUpload

Type: `Boolean`<br>
Required: `false`<br>
Default: `false`<br>

If the `autoUpload` is set to `true`, the dropped file will be automatically uploaded.

### preview

Type: `Boolean`<br>
Required: `false`<br>
Default: `true`<br>

If the `preview` is set to `false`, the image/video preview thumbnail will be disabled in the drop and drag zone.

### uploadUrl

Type: `String`<br>
Required: `true`<br>
Default: `null`<br>

`uploadUrl` should be the upload endpoint for uploading files.

### styleOptions

Type: `Object`<br>
Required: `false`<br>
Default: `{}`<br>

`styleOptions` allows you to style the elements within `react-dnd-uploader` either using inline styles or classNames. The possible options are:

`{ dragContainer, drag, dragText, fileInput, previewsContainer, imgContainer, img, previewName, progressContainer, progress, delBtn, uploadBtn }`

You can add inline styles by adding a `Style` suffix to the option and add a className by adding a `Class` Suffix. For example, to add inline styles to `dragContainer` we would use the `dragContainerStyle` option. All the options must either be suffixed by `Style` or `Class` expect for `dragText` which could be used without a suffix to replace the text that is displayed when the user drags over the element.

### onResolve

Type: `Function`<br>
Required: `false`<br>
Default: `null`<br>

`onResolve` gets called as a callback when the upload api call resolves.

### onReject

Type: `Function`<br>
Required: `false`<br>
Default: `null`<br>

`onReject` gets called as a callback when the upload api call is rejected or fails.

## Sample Code

### Frontend

```javascript
import React from 'react';
import ReactDnDUploader from 'react-dnd-uploader';
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <ReactDnDUploader
        className="drag-and-drop"
        preview
        fileWindow
        uploadUrl="http://localhost:3001/api/photo"
      >
        <div style={{ marginBottom: "1rem" }}>
          {!uploading
                ? "Customize drop zone text here"
                : "Uploading..."}
        </div>
      </ReactDnDUploader>
    </div>
  );
}
```

### Backend

```javascript
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

// File is being uploaded as json object in request body
app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
      res.setHeader('Content-Type', 'application/json')
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end('Upload Done');
    });
});

app.listen(PORT,function(){
    console.log(`Node server working on port ${PORT}`);
});
```
