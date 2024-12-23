import { createStore } from "redux";

const store = createStore(reducer);

function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case "inc":
      return { amount: state.amount + action.payload };
  }
}

store.subscribe(() => {
  console.log(store.getState());
});

setInterval(() => store.dispatch({ type: "inc", payload: 1 }));
