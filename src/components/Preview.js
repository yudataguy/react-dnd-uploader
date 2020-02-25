import React from "react";

import { AppContext } from "../context/AppProvider";
import { base64MimeType } from "../utils";

export default function({ autoUpload, handleSubmit, handleDelete }) {
  const context = React.useContext(AppContext);

  return (
    <div className="img-previews">
      {!!Object.keys(context.imgPreviews).length &&
        Object.keys(context.imgPreviews).map((imgName, index) => {
          const imgSrc = context.imgPreviews[imgName].src;
          const progress = context.imgPreviews[imgName].progress;
          return (
            <div key={Math.random()} className="img-previews__preview">
              <div className="img-previews__preview__img-box">
                {base64MimeType(imgSrc) === "image" && (
                  <img
                    className="img-previews__preview__img"
                    name={imgName}
                    src={imgSrc}
                    alt="upload-preview"
                  />
                )}
                {!!imgSrc && imgSrc.split(":")[0] === "blob" && (
                  <video
                    className="img-preview__preview__img"
                    name={imgName}
                    src={imgSrc}
                    alt="upload-preview"
                    width="100px"
                    height="100px"
                  />
                )}
              </div>
              <span className="img-previews__preview__name">{imgName}</span>
              <div className="img-previews__preview__progress-container">
                <div
                  className="img-previews__preview__progress"
                  style={{
                    width: `${(progress.loaded / progress.total) * 100}%`
                  }}
                />
              </div>
              <span 
                id={index}
                className="img-previews__preview__delete-btn"
                onClick={handleDelete}
              >
                ✖
              </span>
            </div>
          );
        })}
      {!!Object.keys(context.imgPreviews).length && !autoUpload && (
        <button onClick={handleSubmit}>Upload</button>
      )}
    </div>
  );
}
