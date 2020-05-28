import React from "react";
import ReactDndUploader from "react-dnd-uploader";

export default function App() {
  return (
    <div className="App">
      <ReactDndUploader
        className="drag-and-drop"
        preview
        fileWindow
        uploadUrl="http://localhost:3001/api/photo"
        uploadbody={{
          example: 'hello'
        }}
      >
        {
          uploading => {
            return (
            <div>
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  {!uploading
                    ? 'Click "Choose Files" or Drag and Drop files here to upload'
                    : "Uploading..."}
                </div>
              </div>
            </div>
            )
          }
        }
      </ReactDndUploader>
    </div>
  );
}
