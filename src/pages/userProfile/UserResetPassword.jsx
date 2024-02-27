import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserResetPasswordForm from "../../components/UserResetPasswordForm";
import styles from "./userProfile.module.css";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";
function UserResetPassword() {
  const [formData, setFormData] = useState({});
  const [isNotMatch, setIsNotMatch] = useState(false);
  const [didPasswordReset, setDidPasswordReset] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchError, setFetchError] = useState();
  const param = useParams();

  useEffect(() => {
    console.log(param.token);
  }, []);
  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password != formData.confirmPassword) {
      console.log("not");
      setIsNotMatch(true);
      return;
    } else {
      try {
        const res = await axios.post(
          `${baseUrl}/users/resetPassword`,
          {
            newPassword: formData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${param.token}`,
            },
          }
        );
        console.log(res);
        setIsNotMatch(false);
      } catch (error) {
        console.log(error);
        if (error.response.data == "token expired") {
          setFetchError("פג תוקף בקשתך, תשלח בקשה שוב");
          setIsError(true);
        }
        console.log(`error ${error}`);
      }
    }
  };

  return (
    <div>
      {!isError ? (
        <UserResetPasswordForm
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          isNotMatch={isNotMatch}
        />
      ) : (
        <div>
          <div>{fetchError}</div>
        </div>
      )}
    </div>
  );
}

export default UserResetPassword;
