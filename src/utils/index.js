/**
 * Returns the type of file based on it's base64 endcoding
 *
 * @param {string} encoded - Base 64 encoded file
 */
export const base64MimeType = encoded => {
  let result = null;
  if (typeof encoded !== "string") return result;

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) result = mime[1].split("/")[0];

  return result;
};

/**
 * Creates a filtered list (by fileType) of the previews and adds them
 * to the provided context as imgPreviews. Also adds the filtered files
 * to the provided context as files.
 *
 * @param {object} filesToPreview - Object of files to be added to preview
 * @param {React.Context} context - The context to add the previews to
 * @param {string} fileType - Type of file to filter by
 */
export const createPreviews = (filesToPreview, context, fileType) => {
  if (filesToPreview) {
    // Filter files base on type
    if (fileType)
      filesToPreview = Object.values(filesToPreview).filter(file => {
        return fileType.includes(file.type.split("/")[0]);
      });
    // Add files to the 'files' state
    if (!context.files) context.setContext({ files: { ...filesToPreview } });
    else {
      // Create unique keys for the files if the 'files' state already contains files
      const filesLength = Object.keys(context.files).length;
      Object.values(filesToPreview).forEach((file, index) =>
        context.setContext(state => ({
          files: { ...state.files, [filesLength + index]: file }
        }))
      );
    }
    // Add the img previews to the context so <Preview /> can display them
    Object.values(filesToPreview).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const imgSrc = file.type.match("video")
          ? getVideoThumbnail(file)
          : e.target.result;
        context.setContext(state => ({
          imgPreviews: {
            ...state.imgPreviews,
            [file.name]: {
              ...state.imgPreviews[file.name],
              src: imgSrc,
              progress: {
                loaded: 0,
                total: 1
              }
            }
          }
        }));
      };
      reader.readAsDataURL(file);
    });
  }
};

const getVideoThumbnail = file => {
  const video = document.createElement("video");
  video.setAttribute("src", URL.createObjectURL(file));
  return video.getAttribute("src");
};
