import React, { Fragment } from "react";
import axios from "axios";
const App = () => {
  const [data, setData] = React.useState([]);
  const [title, setTitile] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  React.useEffect(() => {
    const fetachApi = async () => {
      try {
        let res = await axios.get("http://localhost:5000/tasks");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    return fetachApi;
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      let res = await axios.get("http://localhost:5000/tasks");
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    const formData = { title, description };
    try {
      await axios.post("http://localhost:5000/", formData);
      let res = await axios.get("http://localhost:5000/tasks");
      setData(res.data);
      setTitile("");
      setDescription("");
    } catch (error) {}
  };
  const handleFetchById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/task/${id}`);
      setTitile(res.data.title);
      setDescription(res.data.description);
      setEdit(true);
      setEditId(id);
    } catch (error) {}
  };
  const handleEdit = async () => {
    let formData = { title, description };
    try {
      await axios.put(`http://localhost:5000/${editId}`, formData);
      setTitile("");
      setDescription("");
      let res = await axios.get("http://localhost:5000/tasks");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginLeft: 20 }}>
      <input
        style={{ height: 30 }}
        placeholder="title"
        value={title}
        onChange={(e) => setTitile(e.target.value)}
      />
      <br />
      <br />
      <input
        style={{ height: 30 }}
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      {edit ? (
        <button onClick={handleEdit}>Edit</button>
      ) : (
        <button onClick={handleCreate}>Create</button>
      )}
      {data.map((item) => (
        <div style={{ marginLeft: 20 }} key={item.title}>
          <h1>{item.title}</h1>

          <div style={{ display: "flex" }}>
            <p>{item.description}</p>

            <button
              style={{ marginRight: 20, marginLeft: 20 }}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button onClick={() => handleFetchById(item._id)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
