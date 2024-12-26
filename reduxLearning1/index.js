import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import axios from "axios";

const store = createStore(reducer, applyMiddleware(logger.default, thunk));

function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case "init":
      return { amount: state.amount + action.payload };
    case "inc":
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

//Action creators
function increment() {
  return { type: "inc", payload: 2 };
}

async function init(dispatch, getState) {
  const { data } = await axios.get("http://localhost:3000/account/1");
  dispatch({ type: "init", payload: data.amount });
}

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(init);
