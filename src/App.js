import React from "react";
import DnD from "./components/DnD";
import "./App.css";

import { AppContext } from "./context/AppProvider";
import ApiService from "./ApiService";
import { createPreviews } from "./utils";

const apiService = new ApiService();

export default function App() {
  const context = React.useContext(AppContext);
  const fileInput = React.useRef();
  const [files, setFiles] = React.useState(undefined);
  const [uploading, setUploading] = React.useState(false);
  const [autoUpload, setAutoUpload] = React.useState(false); // default value should comes from props

  const handleChange = () => {
    createPreviews(fileInput.current.files, context);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (context.files) {
      Object.values(context.files).forEach(file => {
        apiService.uploadFile(file, setUploading, setFiles, context.setContext);
      });
    }
  };

  React.useEffect(() => {
    if (autoUpload) {
      if (files) {
        Object.values(files).forEach(file => {
          apiService.uploadFile(
            file,
            setUploading,
            setFiles,
            context.setContext
          );
        });
      }
    }
  }, [files]);

  return (
    <div className="App">
      <DnD className="drag-and-drop" preview handleSubmit={handleSubmit}>
        <div>
          <div>
            <div style={{ marginBottom: "1rem" }}>
              {!uploading
                ? 'Click "Choose Files" or Drag and Drop files here to upload'
                : "Uploading..."}
            </div>
            {!uploading && (
              <input
                type="file"
                name="files"
                multiple
                ref={fileInput}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </DnD>
    </div>
  );
}
