import { useEffect, useState } from "react";
import Crud from "./components/Crud";
import Register from "./components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
        console.log(user);
      } else {
        console.log("User not found");
      }
    });
    return () => authState();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>Name: {isLoggedIn?.displayName}</h3>
                <h3>Email: {isLoggedIn?.email}</h3>
                <h3>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={isLoggedIn?.photoURL}
                    alt=""
                  />
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
