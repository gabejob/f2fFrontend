import React, { useState, useEffect, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";
import $ from "jquery";


const Results = (props) => {
  if (props.Data !== null) {
    var response = props.Data;
    return (
      <div id="results-view">
        <h3 className="display-6">
          <b>
            The verdict is in!.... <br />
            You're a:
          </b>
        </h3>{" "}
        <br />
        <div id="res-view" className="list-group">
          {Object.keys(response).map((key) => (
            <>
              <button
                key={key}
                className="list-group-item list-group-item-action "
              >
                <b>{response[key].key}</b> with:{" "}
                <b>{(response[key].value * 100).toFixed(2)}%</b> certainty!
              </button>
            </>
          ))}
        </div>
      </div>
    );
  }
  return "";
};

const PicPlate = (props) => {
  if (props.src)
    return (
      <>
        <div className="pic-card">
          <img id="image-disp" src={props.src} alt=":( what is this?" />
        </div>
      </>
    );

  return <></>;
};
const UseStateObject = () => {
  const [image, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [results, setResults] = useState(null);

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
          <div {...getRootProps({ className: "dropzone-dragging" })}>
            <input {...getInputProps()} />
            <p>Release to upload.</p>
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </section>
    );
  };

  const imageChanged = (input) => {
    var picture = input;
    var source = window.URL.createObjectURL(picture);

    setImage(picture);
    setSrc(source);

    var fdata = new FormData();
    fdata.append("File", picture);

    var URL = "ec2-54-215-64-155.us-west-1.compute.amazonaws.com/Home/Create";

    $.ajax({
      type: "post",
      url: URL,
      data: fdata,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log(response);
        setResults(response);
      },
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <a className="navbar-brand">Face2Fruit</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a href="#top" className="nav-link text-dark">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#bottom" className="nav-link text-dark">
                  Privacy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-grey">v1.0</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="inner-container">
        <div className="text-center">
          <h1 className="display-1">Face2Fruit</h1>
        </div>
        <div className="text-center"></div>
        <div id="content-container" className="text-center">
          <div id="canvas">
            {image !== null ? (
              <>
                <PicPlate src={src} />
                <Results Data={results} />
              </>
            ) : (
              <></>
            )}
          </div>
          <div id="fileDrop">
            {image == null ? (
              <>
                <h1 className="display-5">Upload Image</h1>
                <Dropzone />
              </>
            ) : (
              <>
                <button
                  id="try-again"
                  className="btn btn-primary"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Try another!
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UseStateObject;
