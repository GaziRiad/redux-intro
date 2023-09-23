const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

// ACTION CREATORS

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

export { initialStateAccount, deposit, withdraw, requestLoan, payLoan };
