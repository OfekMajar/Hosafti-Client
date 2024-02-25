import React from "react";

function CreateListForm({ changeHandler, submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="">שם הרשימה:</label>
      <input required onChange={changeHandler} type="text" name="title" id="" />
      <button type="submit">צור רשימה</button>
    </form>
  );
}

export default CreateListForm;
