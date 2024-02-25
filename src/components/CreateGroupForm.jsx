import React from "react";
/**
 * @param {title: { type: String }}
 * @param {owner: { type: mongoose.Types.ObjectId, ref: "User" },}
 * @param {participants: [{ type: mongoose.Types.ObjectId, ref: "User" }]}
 * @param {historyGroceryLists: [{ type: mongoose.Types.ObjectId, ref: "GroceryList" }]}
 */
function CreateGroupForm({ styles, changeHandler, submitHandler, owner }) {
  return (
    <form className={styles.createGroupForm} onSubmit={submitHandler}>
      <div className={styles.createGroupLableAndInput}>
        <label>מנהל:</label>
        <input
          className={styles.createGroupInput}
          type="text"
          placeholder={owner.fullName}
          disabled
        />
      </div>

      <div className={styles.createGroupLableAndInput}>
        <label htmlFor="createGroupTitleInput">*שם הקבוצה:</label>
        <input
          id="createGroupTitleInput"
          className={styles.createGroupInput}
          onChange={changeHandler}
          type="text"
          name="title"
        />
      </div>

      <div className={styles.createGroupLableAndInput}>
        <label htmlFor="createGroupPurposeInput">מטרת הקבוצה</label>
        <input
          id="createGroupPurposeInput"
          className={styles.createGroupInput}
          onChange={changeHandler}
          type="text"
          name="purpose"
        />
      </div>
      <button type="sumbit">צור קבוצה</button>
    </form>
  );
}

export default CreateGroupForm;
