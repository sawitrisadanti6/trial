import React from 'react';
import Routes from "./routes";
import configureStore from "./shared/configure-store";

const store = configureStore({});

function App() {
    return (
        <Routes store={store}/>
    );
}

export default App;
