import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "./withRouter";
import "./addSmartPhone.css";

class EditSmartPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      name: "",
      iphone: "",
      samsung: "",
      error: null,
    };
  }

  componentDidMount() {
    this.loadSmartPhone();
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/smartPhones", {
        id: this.state.id,
        name: this.state.name,
        iphone: this.state.iphone,
        samsung: this.state.samsung,
      });

      if (response.status === 200) {
        alert("Smartphone updated successfully!");
        this.props.navigate("/");
      }
    } catch (error) {
      console.error("Error: ", error);
      this.setState({ error: "Failed to update the smartphone. Please try again." });
    }
  };

  loadSmartPhone = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/smartPhones/${this.state.id}`);
      if (result.status === 200) {
        this.setState(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ error: "Failed to fetch smartphone details." });
    }
  };

  render() {
    const { id, name, iphone, samsung, error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit Smartphone</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={this.onSubmit}>
              <div className="mb-3">
                <label htmlFor="smartPhoneId" className="form-label">ID</label>
                <input
                  id="smartPhoneId"
                  type="number"
                  className="form-control"
                  name="id"
                  value={id}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="smartPhoneName" className="form-label">Name</label>
                <input
                  id="smartPhoneName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Smartphone Name"
                  name="name"
                  value={name}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="smartPhoneIphone" className="form-label">iPhone Sales</label>
                <input
                  id="smartPhoneIphone"
                  type="number"
                  className="form-control"
                  placeholder="Enter iPhone Sales"
                  name="iphone"
                  value={iphone}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="smartPhoneSamsung" className="form-label">Samsung Sales</label>
                <input
                  id="smartPhoneSamsung"
                  type="number"
                  className="form-control"
                  placeholder="Enter Samsung Sales"
                  name="samsung"
                  value={samsung}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-outline-warning">Update</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => this.props.navigate("/")}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditSmartPhone);
