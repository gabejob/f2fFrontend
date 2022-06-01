import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import functionality from "./functionality";
import axios from "axios";

const MainContent = () => {
  const [image, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [results, setResults] = useState(null);
  const URL = "https://apif2f.com/api/Home/Create";

  useEffect(() => {
    document.title = "Face2Fruit";
  }, []);

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        alert("Please upload one file at a time.");
        return;
      }
      if (acceptedFiles[0].type.includes("image"))
        imageChanged(acceptedFiles[0]);
      else alert("Please upload images only!");
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <section className="container">
        {isDragActive ? (
          <div
            id="draggingPlateActive"
            {...getRootProps({ className: "dropzone-dragging" })}
          >
            <input {...getInputProps()} />
            <p>Release to upload.</p>
          </div>
        ) : (
          <div id="draggingPlate" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </section>
    );
  };

  //Function to process image change event, creates an ajax request to communicate
  //with backend server.
  const imageChanged = (input) => {
    var picture = input;
    var source = window.URL.createObjectURL(picture);

    setImage(picture);
    setSrc(source);

    var fdata = new FormData();
    fdata.append("File", picture);

    axios({
      method: "POST",
      url: URL,
      data: fdata,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setResults(res);
    });
  };

  return (
    <>
      <div id="inner-container">
        <div className="text-center">
          <h1 className="display-1">Face2Fruit</h1>
        </div>
        <div className="text-center"></div>
        <div id="content-container" className="text-center">
          <div id="canvas">
            {image !== null ? (
              <div id="functionalityPlate">
                <functionality.PicPlate src={src} />
                <functionality.Results Data={results} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div id="fileDrop">
            {image == null ? (
              <div id="dropZonePlate">
                <h1 className="display-5">Upload Image</h1>
                <Dropzone />
              </div>
            ) : (
              <div>
                <button
                  id="try-again"
                  className="btn btn-primary"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Try another!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MainContent;
