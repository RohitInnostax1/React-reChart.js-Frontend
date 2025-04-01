import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "./withRouter.jsx"; // Import the HOC
import "./addSmartPhone.css";

class AddSmartPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      iphone: "",
      samsung: "",
      error: null,
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/smartPhones", {
        name: this.state.name,
        iphone: this.state.iphone,
        samsung: this.state.samsung,
      });

      if (response.status === 201) {
        alert("Course saved successfully!");

       
        this.setState({ name: "", iphone: "", samsung: "", error: null });

       
        setTimeout(() => {
          this.props.navigate("/");
        }, 500);
      }
    } catch (error) {
      console.error("Error: ", error);
      this.setState({ error: "Failed to save the course. Please try again." });
    }
  };

  render() {
    const { name, iphone, samsung, error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Register Course</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={this.onSubmit}>
              <div className="mb-3">
                <label htmlFor="monthId" className="form-label">Enter Month</label>
                <input
                id="monthId"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Month"
                  value={name}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="smartPhoneIPhone" className="form-label">Enter Iphone Sales on that Month</label>
                <input
                  id="smartPhoneIPhone"
                  type="number"
                  className="form-control"
                  placeholder="Iphone Sales"
                  name="iphone"
                  value={iphone}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="smartPhoneSamsung" className="form-label">Enter Samsung Sales on that Month</label>
                <input
                type="number"
                  id="smartPhoneSamsung"
                  className="form-control"
                  placeholder="Samsung Sales"
                  name="samsung"
                  value={samsung}
                  onChange={this.onInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-outline-warning">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => this.props.navigate("/")}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddSmartPhone);
