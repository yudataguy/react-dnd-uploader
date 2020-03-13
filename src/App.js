import React from "react";
import ReactDnDUploader from "./components/DnD";
import "./App.css";

import { AppContext } from "./context/AppProvider";

export default function App() {
  return (
    <div className="App">
      <ReactDnDUploader
        className="drag-and-drop"
        preview
        fileWindow
        uploadUrl="http://localhost:3001/api/photo"
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
      </ReactDnDUploader>
    </div>
  );
}
