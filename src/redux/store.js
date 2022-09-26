import { legacy_createStore, applyMiddleware } from "redux";
import reducer from "./rootReducer";

const store = legacy_createStore(reducer, applyMiddleware());

export default store