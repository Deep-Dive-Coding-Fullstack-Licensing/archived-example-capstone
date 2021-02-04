import ReactDOM from "react-dom";
import store from "./store/store"
import { App } from './ui/App'

ReactDOM.render(App(store) , document.querySelector("#root"));

