import React from 'react';
import Home from "./pages/Home/index";

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },

];

export default routes;
