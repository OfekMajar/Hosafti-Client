import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import MyGroups from "./pages/myGroups/MyGroups";
import SingleGroup from "./pages/singleGroup/SingleGroup";
import SingleGroceryList from "./pages/singleGroceryList/SingleGroceryList";
import "./App.css";
import LinkAuthenticator from "./pages/linkAuthenticator/LinkAuthenticator";
import CreateGroup from "./pages/createGroup/CreateGroup";
import CreateList from "./pages/createList/CreateList";
import GroupHistoryList from "./pages/groupHistoryLists/GroupHistoryList";



function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/myGroups" element={<MyGroups />} />
          <Route path="/myGroups/createGroup" element={<CreateGroup />} />
          <Route path="/myGroups/group/:id" element={<SingleGroup />} />
          <Route path="/myGroups/group/:id/historyLists" element={<GroupHistoryList />} />
          <Route path="/group/:id/createList" element={<CreateList/>} />
          <Route path="/myGroups/group/:groupId/groceryLists/groceryList/:listId" element={<SingleGroceryList />}/>
          <Route path="/joinGroup/:id/:token" element={<LinkAuthenticator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
