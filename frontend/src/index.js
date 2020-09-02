import {Home} from "./ui/home/Home";
import {Profile} from "./ui/profile/Profile";
import {Image} from "./ui/image/Image"
import {FourOhFour} from "./ui/four-oh-four/FourOhFour";
import {MainNav} from "./ui/shared/components/main-nav/MainNav";

import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import {faDove, faEnvelope, faKey, faPencilAlt, faPhone, faStroopwafel} from '@fortawesome/free-solid-svg-icons'
import {Provider} from "react-redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import reducer from './store/index'

const store = configureStore({reducer});

library.add(faStroopwafel, faEnvelope, faKey, faDove, faPhone, faPencilAlt);

const Routing = (store) => (
	<>
		<Provider store={store}>
		<BrowserRouter>
			<MainNav/>
			<Switch>
				<Route exact path="/profile/:profileHandle" component={Profile}/>
				<Route exact path="/image" component={Image}/>
				<Route exact path="/" component={Home}/>
				<Route component={FourOhFour}/>
			</Switch>
		</BrowserRouter>
		</Provider>
	</>
);

ReactDOM.render(Routing(store) , document.querySelector("#root"));

