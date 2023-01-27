import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";

import App from "./component/App";
import reducers from "./reducer";

const root=createRoot(document.getElementById("root"));
const store=createStore(reducers,applyMiddleware(thunk));



root.render(
    <Provider store={store}>
        <App />
    </Provider>
)