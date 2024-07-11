import axios from 'axios';
import { useContext, useState } from 'react';
import { baseUrl } from '../../utils/backEndUtils';
import CreateGroupForm from '../../components/CreateGroupForm';
import { UserContext } from '../../context/User';
import styles from './createGroup.module.css';

function CreateGroup() {
  const { globalUser, getAccessToken } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [groupCreated, setGroupCreated] = useState({ isCreated: false });

  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    groupCreated.isCreated = true;
    setGroupCreated({ ...groupCreated });
    const token = await getAccessToken();
    try {
      const res = await axios.post(
        `${baseUrl}/groups/createGroup`,
        { title: formData.title, purpose: formData.purpose },
        { headers: { Authorization: `bearer ${token}` } }
      );

      const data = res.data;
      groupCreated.groupId = data._id;
      setGroupCreated({ ...groupCreated });
    } catch (error) {
      console.log(error);
    }
  };
  const linkGenerator = async () => {
    try {
      const accessToken = await getAccessToken();
      const res = await axios.post(
        `${baseUrl}/tokenManipulation/createLinkToken/${groupCreated.groupId}`,
        {
          inviter: globalUser?.fullName,
        },
        { headers: { Authorization: `bearer ${accessToken}` } }
      );
      
      const token = res.data;
      console.log(token);
      console.log(groupCreated);
      const newLink = `http://localhost:5173/joinGroup/${groupCreated.groupId}/${token}`;
      navigator.clipboard.writeText(newLink);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {groupCreated.isCreated ? (
        <div>
          <div>למעבר לקבוצה החדשה לחץ כאן</div>
          <div>ליצירת קישור לקבוצה לחץ כאן</div>
          <button onClick={linkGenerator}>קישור</button> <br />
          <span> תמיד תוכלו ליצור קישור מאוחר יותר</span>
        </div>
      ) : (
        <CreateGroupForm
          styles={styles}
          owner={globalUser}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}

export default CreateGroup;
