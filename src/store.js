import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      // if (state.balance < action.payload) return { ...state };
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return { ...state };
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount = 0) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount = 0) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(loanAmount = 0, loanPurpose = "") {
  return {
    type: "account/requestLoan",
    payload: { amount: loanAmount, purpose: loanPurpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1200, "Buying a new laptop"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

//////////////////

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Riad Hallouch", "202030380784"));
console.log(store.getState());
