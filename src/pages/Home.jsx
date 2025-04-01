import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8000/smartPhones");
      if (result.status === 200) {
        // console.log(result.data)
        this.setState({ users: result.data, error: null });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      this.setState({ error: "Failed to load phones. Please try again later." });
    }
  };

  deleteUser = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8000/smartPhones/${id}`);
      if (result.status === 200) {
        alert("Course deleted successfully!");
        this.loadUsers(); 
      }
    } catch (err) {
      console.error("Error deleting data:", err);
      this.setState({ error: "Failed to delete the course. Please try again later." });
    }
  };

  render() {
    const { users, error } = this.state;

    return (
      <div className="container">
        <div className="py-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Month</th>
                <th scope="col">Brand(Iphone)</th>
                <th scope="col">Brand(Samsung)</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.iphone}</td>
                    <td>{user.samsung}</td>
                    <td>
                      <Link className="btn btn-outline-warning mx-2" to={`/edit/smartPhone/${user.id}`}>
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => this.deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                !error && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No phones available.
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
