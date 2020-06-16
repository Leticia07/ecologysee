import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Partners from './pages/Partners';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Partners} path="/parceiros" />
        </BrowserRouter>
    );
}

export default Routes;