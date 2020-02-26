import React from "react";
import DnD from "./components/DnD";
import "./App.css";

import { AppContext } from "./context/AppProvider";

export default function App() {
  const context = React.useContext(AppContext);

  const { uploading } = context;
  return (
    <div className="App">
      <DnD
        className="drag-and-drop"
        preview
        fileWindow
        uploadUrl="http://localhost:3001/api/photo"
        
      >
        <div>
          <div>
            <div style={{ marginBottom: "1rem" }}>
              {!uploading
                ? 'Click "Choose Files" or Drag and Drop files here to upload'
                : "Uploading..."}
            </div>
          </div>
        </div>
      </DnD>
    </div>
  );
}
