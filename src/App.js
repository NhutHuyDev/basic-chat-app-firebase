import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useContext, useEffect } from "react";

import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import "./style.scss"

function App() {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_INIT_STATE", payload: {} })
    })

    return () => {
      unsub()
    }
  }, [dispatch])

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
