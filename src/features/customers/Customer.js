import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");

  const customer = useSelector((store) => store.customer.fullName);
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName) return;
    dispatch(updateName(fullName));
  }

  return (
    <>
      <h2>👋 Welcome, {customer}</h2>
      <div>
        <label>Change full name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <button onClick={handleClick}>Update</button>
      </div>
    </>
  );
}

export default Customer;
