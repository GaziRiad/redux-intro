const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      // if (state.balance < action.payload) return { ...state };
      return {
        ...state,
        balance: state.balance - action.payload,
      };

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

    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return { ...state };
  }
}

// ACTION CREATORS

function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    // API request
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return ACTION
    dispatch({ type: "account/deposit", payload: converted });
  };
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
