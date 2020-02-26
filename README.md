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
yarn
```

## Demo

```bash
npm install
npm start
```

A browser opens up, or visit http://localhost:3000 to browse the demo.

## Documentation

### fileWindow

Type: `Boolean`<br>
Required: `false`<br>
Default: `false`<br>

If the `fileWindow` is set to `true, there will be a file window button available on drag and drop zone.

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

## Usage

```javascript
import React from 'react';
import ReactDNDUploader from 'react-dnd-uploader';
import "./App.css";

export default function App() {
  const context = React.useContext(AppContext);

  const { uploading } = context;
  return (
    <div className="App">
      <DnD
        className="drag-and-drop"
        preview
        uploadUrl="http://localhost:3001/api/photo"
      >
        <div>
          <div>
            <div style={{ marginBottom: "1rem" }}>
              Customize drop zone text here
            </div>
          </div>
        </div>
      </DnD>
    </div>
  );
};
```
