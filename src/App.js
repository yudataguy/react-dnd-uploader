import React from "react";
import DnD from "./DnD";
import './App.css';

import { AppContext } from './AppProvider';
import ApiService from './ApiService';

const apiService = new ApiService();

export default function App() {
  const context = React.useContext(AppContext);
  const fileInput = React.useRef();
  const [files, setFiles] = React.useState(undefined);
  const [uploading, setUploading] = React.useState(false);
  const [autoUpload, setAutoUpload] = React.useState(false)

  const handleDrop = files => {
    createPreviews(files);
  };

  const handleChange = () => {
    createPreviews(fileInput.current.files);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(files) {
      Object.values(files).forEach(file => {
        apiService.uploadFile(file, setUploading, setFiles, context.setContext);
      });
    }
  }

  React.useEffect(() => {
    if (autoUpload){
      if(files) {
        Object.values(files).forEach(file => {
          apiService.uploadFile(file, setUploading, setFiles, context.setContext);
        });
      }
    }
  }, [files])

  const createPreviews = filesToPreview => {
    if(filesToPreview) {
      // Add files to the 'files' state
      if(!files) setFiles({...filesToPreview});
      else {
        // Create unique keys for the files if the 'files' state already contains files
        const filesLength = Object.keys(files).length;
        Object.values(filesToPreview).forEach((file, index) => setFiles({...files, [filesLength + index]: file}))
      }
      Object.values(filesToPreview).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          context.setContext(state => ({ 
            imgPreviews: {
              ...state.imgPreviews, 
              [file.name]: {
                ...state.imgPreviews[file.name],
                src: e.target.result,
                progress: {
                  loaded: 0,
                  total: 1
                }
              }
            }
          }));
        }
        reader.readAsDataURL(file);
      });
    }
  }


  return (
    <div className="App">
      <DnD handleDrop={handleDrop} className="drag-and-drop">
        <div>
          <div>
            <div style={{marginBottom: '1rem'}}>
              { !uploading ? "Click \"Choose Files\" or Drag and Drop files here to upload" : "Uploading..." }
            </div>
            {
              !uploading && (
                <input type="file" name="files" multiple ref={fileInput} onChange={handleChange} />
              )
            }
            <div className="img-previews">
              {
                !!Object.keys(context.imgPreviews).length && Object.keys(context.imgPreviews).map((imgName, index) => {
                  const imgSrc = context.imgPreviews[imgName].src;
                  const progress = context.imgPreviews[imgName].progress;
                  return (
                    <div key={Math.random()} className="img-previews__preview">
                        <div className="img-previews__preview__img-box">
                          <img className="img-previews__preview__img" name={imgName} src={imgSrc} alt="upload-preview" />
                        </div>
                      <span className="img-previews__preview__name">{imgName}</span>
                      <div className="img-previews__preview__progress-container">
                        <div className="img-previews__preview__progress" style={{width: `${(progress.loaded/progress.total)*100}%`}} />
                      </div>
                    </div>
                  )
                })
              }
              {
                !!Object.keys(context.imgPreviews).length && !uploading && (
                  <button onClick={handleSubmit}>Upload</button>
                )
              }
            </div>
          </div>
        </div>
      </DnD>
    </div>
  );
}
