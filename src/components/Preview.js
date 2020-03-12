import React from "react";

import { AppContext } from "../context/AppProvider";
import { base64MimeType } from "../utils";

export default function({ 
  autoUpload, 
  handleSubmit, 
  handleDelete, 
  styleOptions }) {
  const context = React.useContext(AppContext);

  return (
    <div 
      className={`img-previews ${styleOptions.previewsContainerClass}`}
      style={styleOptions.previewsContainerStyle}
    >
      {!!Object.keys(context.imgPreviews).length &&
        Object.keys(context.imgPreviews).map(imgName => {
          const imgSrc = context.imgPreviews[imgName].src;
          const progress = context.imgPreviews[imgName].progress;
          return (
            <div key={Math.random()} className="img-previews__preview">
              <div className="img-previews__preview__left">
                <div
                  className={`img-previews__preview__img-box ${styleOptions.imgContainerClass}`}
                  style={styleOptions.imgContainerStyle}
                >
                  {base64MimeType(imgSrc) === "image" && (
                    <img
                      className={`img-previews__preview__img ${styleOptions.imgClass}`}
                      style={styleOptions.imgStyle}
                      name={imgName}
                      src={imgSrc}
                      alt="upload-preview"
                    />
                  )}
                  {!!imgSrc && imgSrc.split(":")[0] === "blob" && (
                    <video
                      className={`img-previews__preview__img ${styleOptions.imgClass}`}
                      style={styleOptions.imgStyle}
                      name={imgName}
                      src={imgSrc}
                      alt="upload-preview"
                      width="100px"
                      height="100px"
                    />
                  )}
                </div>
                <span 
                  className={`img-previews__preview__name ${styleOptions.previewNameClass}`}
                  style={styleOptions.previewNameStyle}
                >
                  {imgName}
                </span>
              </div>
              <div className="img-previews__preview__right">
                <div 
                  className={`img-previews__preview__progress-container ${styleOptions.progressContainerClass}`}
                  style={styleOptions.progressContainerStyle}
                >
                  <div
                    className={`img-previews__preview__progress ${styleOptions.progressClass}`}
                    style={{
                      width: `${(progress.loaded / progress.total) * 100}%`,
                      ...styleOptions.progressStyle
                    }}
                  />
                </div>
                {!context.uploading && <span 
                  id={imgName}
                  className={`img-previews__preview__delete-btn ${styleOptions.delBtnClass}`}
                  style={styleOptions.delBtnStyle}
                  onClick={handleDelete}
                >
                  ✖
                </span>}
              </div>
            </div>
          );
        })}
      {!!Object.keys(context.imgPreviews).length && !autoUpload && (
        <button
          style={styleOptions.uploadBtnStyle}
          className={styleOptions.uploadBtnClass}
          onClick={handleSubmit}>
            Upload
        </button>
      )}
    </div>
  );
}
