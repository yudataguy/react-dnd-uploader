export default class ApiService {
  uploadFile = (file, setUploading, setFiles, setContext) => {
    if(file) {
      const formData = new FormData();
      formData.append('file', file);

      // Make http request
      const xhr = new XMLHttpRequest();

      // Add a 'progress' event listener
      xhr.upload.addEventListener('progress', e => {
        setUploading(true);
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
        if(currState.total > 0 && currState.loaded === currState.total) {
          // The file is fully uploaded
          // Remove it from the context
          setContext(state => {
            const newImgPreviews = state.imgPreviews;
            delete newImgPreviews[file.name];
            if(Object.keys(newImgPreviews).length === 0) {
              // Once all the files are done uploading set 'uploading' to false
              // and reset the 'files' state to its initial value
              setUploading(false);
              setFiles(undefined);
            }
            return { imgPreviews: newImgPreviews };
          });
        }
      });

      // Http Request
      xhr.open("POST", "http://localhost:3001/api/photo");
      xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      xhr.send(formData);
    }
  }
}