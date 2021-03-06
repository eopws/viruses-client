import { combineReducers } from "redux";

const reducers = ['config', 'game']

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default
        return initial
    }, {})
)
