import React from "react";
import "../App.css";

import { useEffect, useState } from "react";
import { createDoc, deleteData, getRealTimeData } from "../firebase/database";
import {
  Timestamp,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storages } from "../firebase";

const Crud = () => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fileData = await uploadBytesResumable(ref(storages, file.name), file);
    const link = await getDownloadURL(fileData.ref);

    await createDoc("devs", { ...input, photo: link });
  };

  const handleDelete = async (id) => {
    await deleteData("devs", id);
  };

  useEffect(() => {
    getRealTimeData("devs", setData);
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
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
                    placeholder="Age"
                    className="form-control mt-2"
                    name="age"
                    value={input.age}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Skill"
                    className="form-control mt-2"
                    name="skill"
                    value={input.skill}
                    onChange={handleInputChange}
                  />

                  <input
                    className="form-control mt-2"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <input type="submit" className="btn btn-primary  mt-2" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
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
        </div>
      </div>
    </>
  );
};

export default Crud;
