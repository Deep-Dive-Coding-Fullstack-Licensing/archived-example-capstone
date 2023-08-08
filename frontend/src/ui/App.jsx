import React from 'react'
import {LandingPage} from "./feed/LandingPage";
// import {Profile} from "./profile/Profile";
import {FourOhFour} from "./FourOhFour";
import 'bootstrap/dist/css/bootstrap.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
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
import { MainNav } from '../shared/components/main-nav/MainNav.tsx'
import { SignIn } from './SignIn'

library.add(faStroopwafel, faEnvelope, faKey, faDove, faPhone, faPencilAlt, faSignOutAlt, faUser);

export const App = ({store}) => (
  <>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <MainNav/>
          <Routes>
            {/*<Route path="/profile/:profileHandle" element={<Profile />} />*/}
            <Route path="/feed" element={<LandingPage />} />
            <Route path="/" element={<SignIn />} />
            <Route element={<FourOhFour />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </>

);