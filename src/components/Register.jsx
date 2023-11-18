import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, storages } from "../firebase";
import Login from "./Login";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);

  const [input, setInput] = useState({
    name: "",
    skill: "",
    age: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFromRegister = async (e) => {
    e.preventDefault();
    const data = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    const fileData = await uploadBytesResumable(ref(storages, file.name), file);
    const link = await getDownloadURL(fileData.ref);

    await updateProfile(data.user, {
      displayName: input.name,
      photoURL: link,
    });
    setIsLoggedIn(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {isLoggedIn ? (
                  <>
                    {" "}
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout
                    </button>
                  </>
                ) : (
                  "You are logged out"
                )}

                <form onSubmit={handleFromRegister}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control mt-2"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                  />
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

                  <input
                    className="form-control mt-2"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
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

export default Register;
