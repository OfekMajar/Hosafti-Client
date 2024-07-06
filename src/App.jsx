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
import UserResetPassword from "./pages/userProfile/UserResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { useContext } from "react";
import { UserContext } from "./context/User";
import Footer from "./components/footer/Footer";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <div className="app-header">
          <Header />
        </div>
        <main className="app-main">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/auth/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route path="/myGroups" element={<MyGroups />} />
                <Route path="/myGroups/createGroup" element={<CreateGroup />} />
                <Route path="/myGroups/group/:id" element={<SingleGroup />} />
                <Route
                  path="/myGroups/group/:id/historyLists"
                  element={<GroupHistoryList />}
                />
                <Route path="/group/:id/createList" element={<CreateList />} />
                <Route
                  path="/myGroups/group/:groupId/groceryLists/groceryList/:listId"
                  element={<SingleGroceryList />}
                />
                <Route
                  path="/joinGroup/:id/:token"
                  element={<LinkAuthenticator />}
                />
                <Route
                  path="/passwordReset/token/:token/id/:id"
                  element={<UserResetPassword />}
                />
                <Route path="*" element={<ErrorPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/auth/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route path="/myGroups" element={<MyGroups />} />
                <Route path="/myGroups/createGroup" element={<CreateGroup />} />
                <Route path="/myGroups/group/:id" element={<SingleGroup />} />
                <Route
                  path="/myGroups/group/:id/historyLists"
                  element={<GroupHistoryList />}
                />
                <Route path="/group/:id/createList" element={<CreateList />} />
                <Route
                  path="/myGroups/group/:groupId/groceryLists/groceryList/:listId"
                  element={<SingleGroceryList />}
                />
                <Route
                  path="/joinGroup/:id/:token"
                  element={<LinkAuthenticator />}
                />
                <Route
                  path="/passwordReset/token/:token/id/:id"
                  element={<UserResetPassword />}
                />
                <Route path="/*" element={<ErrorPage />} />
              </>
            )}
          </Routes>
        </main>

        <div className="app-footer">
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
