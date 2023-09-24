// import { useSelector } from "react-redux";

import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  // const { balance } = useSelector((store) => store.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

// The old way of connecting redux to react (before hooks !!)

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
export default connect(mapStateToProps)(BalanceDisplay);
