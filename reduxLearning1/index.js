import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import axios from "axios";

const store = createStore(
  combineReducers({
    amount: reducerAmount,
    point: reducerPoint,
  }),
  applyMiddleware(logger.default, thunk)
);

function reducerAmount(state = { amount: 1 }, action) {
  switch (action.type) {
    case "init":
      return { amount: state.amount + action.payload };
    case "incAmt":
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function reducerPoint(state = { point: 100 }, action) {
  switch (action.type) {
    case "init":
      return { point: state.point + action.payload };
    case "incPnt":
      return { point: state.point + action.payload };
    default:
      return state;
  }
}

//Action creators
function incrementAmount() {
  return { type: "incAmt", payload: 2 };
}

function incrementPoint() {
  return { type: "incPnt", payload: -2 };
}

async function init(dispatch, getState) {
  const { data } = await axios.get("http://localhost:3000/account/1");
  dispatch({ type: "init", payload: data.amount });
}

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementAmount());
store.dispatch(incrementPoint());
