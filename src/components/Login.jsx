import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, facebookProvider, googleProvider } from "../firebase";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    setIsLoggedIn(data.user);
  };

  const handleGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const handleFacebook = async () => {
    await signInWithPopup(auth, facebookProvider);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control mt-2"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    className="form-control mt-2"
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
                  />

                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                  <button onClick={handleGoogle}>Login With Google</button>
                  <button onClick={handleFacebook}>Login With Facebook</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Skill</th>
                      <th>Age</th>
                      <th>Photo</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.skill}</td>
                          <td>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src={item.photo}
                              alt=""
                            />
                          </td>
                          <td>{item.age}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>{" "}
                            &nbsp;
                            <button className="btn btn-warning btn-sm">
                              Edit
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
