import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import heLocale from 'date-fns/locale/he'; // Import Hebrew locale
import CreateListForm from '../../components/CreateListForm';
import axios from 'axios';
import { baseUrl } from '../../utils/backEndUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/User';

function CreateList() {
  //Todo add validation so he can't make new list
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { accessToken } = useContext(UserContext);
  const date = new Date();
  const formattedDate = date.toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  console.log(formattedDate);
  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };

  const createGroceryList = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}/groceryLists/createGroceryList`,
        {
          groupId: id,
          title: formData.title,
          date: { enDate: date, heDate: formattedDate },
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = res.data;
      navigate(`/myGroups/group/${id}/groceryLists/groceryList/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CreateListForm
        changeHandler={changeHandler}
        submitHandler={createGroceryList}
      />
    </div>
  );
}

export default CreateList;
