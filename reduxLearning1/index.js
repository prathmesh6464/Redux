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
      return { amount: state.amount, pending: false };
    case "inc":
      return { amount: state.amount + action.payload, pending: false };
    case "pending":
      return { ...state, pending: true };
    case "error":
      return { amount: state.amount + action.error };
    default:
      return state;
  }
}

function reducerPoint(state = { point: 100 }, action) {
  switch (action.type) {
    case "inc":
      return { point: state.point + action.payload };
    default:
      return state;
  }
}

//Action creators
function increment() {
  return { type: "inc", payload: 2 };
}

function incrementPoint() {
  return { type: "inc", payload: -2 };
}

async function init(dispatch, getState) {
  dispatch({ type: "pending" });
  try {
    const { data } = await axios.get("http://localhost:3000/accounts/1");
    dispatch({ type: "init", payload: data.amount });
  } catch (error) {
    dispatch({ type: "error", error: error.message });
  }
}

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(incrementPoint());
store.dispatch(init);
