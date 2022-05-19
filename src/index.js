import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
const container = document.getElementById("root");
const script = document.createElement('script');
script.src="https://platform.twitter.com/widgets.js";
script.async=true;
document.body.appendChild(script);



const root = createRoot(container);

root.render(

        <div  className="baseplate">
            <App />
        </div >
);
