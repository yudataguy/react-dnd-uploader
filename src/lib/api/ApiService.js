export class ApiService {
  constructor() {
    this.uploadFile = async (file, setContext, uploadUrl) => {
      if (file) {
        return new Promise((resolve, reject) => {
  
          const formData = new FormData();
          formData.append("file", file);
    
          // Make http request
          const xhr = new XMLHttpRequest();
    
          // Add a 'progress' event listener
          xhr.upload.addEventListener("progress", e => {
            setContext({ uploading: true });
            const currState = e.lengthComputable
              ? { loaded: e.loaded, total: e.total }
              : { loaded: 0, total: 0 };
            setContext(state => ({
              imgPreviews: {
                ...state.imgPreviews,
                [file.name]: {
                  ...state.imgPreviews[file.name],
                  progress: currState
                }
              }
            }));
            if (currState.total > 0 && currState.loaded === currState.total) {
              let newImgPreviewsLength;
              // The file is fully uploaded
              // Remove it from the context
              setContext(
                state => {
                  const newImgPreviews = state.imgPreviews;
                  delete newImgPreviews[file.name];
                  newImgPreviewsLength = Object.keys(newImgPreviews).length;
                  return { imgPreviews: newImgPreviews };
                },
                () => {
                  if (newImgPreviewsLength === 0) {
                    // Once all the files are done uploading set 'uploading' to false
                    // and reset the 'files' state to its initial value
                    setContext({ files: undefined, uploading: false });
                  }
                }
              );
            }
          });
  
          xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
              resolve(xhr.response);
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          };
          
          xhr.onerror = function() {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          };
    
          // Http Request
          xhr.open("POST", uploadUrl);
          xhr.setRequestHeader("Content-Type", "multipart/form-data");
          // xhr.overrideMimeType("text/html");
          xhr.send(formData);
        });
      }
    };
  }
}
