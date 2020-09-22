import React from 'react'
import {Home} from "./home/Home";
import {Profile} from "./profile/Profile";
import {Image} from "./image/Image"
import {FourOhFour} from "./four-oh-four/FourOhFour";
import {MainNav} from "./shared/components/main-nav/MainNav";
import 'bootstrap/dist/css/bootstrap.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import {Provider} from "react-redux";

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faDove,
	faEnvelope,
	faKey,
	faPencilAlt,
	faPhone,
	faSignOutAlt,
	faStroopwafel, faUser,
} from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel, faEnvelope, faKey, faDove, faPhone, faPencilAlt, faSignOutAlt, faUser);

export const App = (store) => (
	<>
		<Provider store={store}>
			<BrowserRouter>
				<MainNav/>
				<Switch>
					<Route exact path="/profile/:profileHandle" component={Profile} />
					<Route exact path="/image" component={Image} />
					<Route exact path="/" component={Home} />
					<Route component={FourOhFour} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</>
);