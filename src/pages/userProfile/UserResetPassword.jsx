import React from "react";
import { useParams } from "react-router-dom";

function UserResetPassword({ resetToken, userId }) {
  const param = useParams();
  return (
    <div>
      h
      {/* <div>this is reset password</div>
      <div>
        <h1>Password Reset</h1>
        <p>Reset Token: {resetToken}</p>
        <p>User ID: {userId}</p>
      </div> */}
    </div>
  );
}

export default UserResetPassword;
