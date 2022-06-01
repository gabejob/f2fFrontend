import React from "react";

const Results = (props) => {
  if (props.Data !== null) {
    var response = props.Data.data;
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
            <div key={response[key].key}>
              <button className="list-group-item list-group-item-action ">
                <b>{response[key].key}</b> with:{" "}
                <b>{(response[key].value * 100).toFixed(2)}%</b> certainty!
              </button>
            </div>
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
      <div className="pic-card">
        <img id="image-disp" src={props.src} alt=":( what is this?" />
      </div>
    );

  return <></>;
};

export default { PicPlate, Results };
