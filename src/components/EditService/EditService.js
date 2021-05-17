import React, { Component } from "react";
import { withAuth } from "../../context/auth.context";
import { withService } from "../../context/service.context";

const validators = {
  name: (value) => {
    let message;
    if (!value) {
      message = "Service name is required";
    }
    return message;
  },
  image: (value) => {
    let message;
    if (!value) {
      message = "Image is required";
    }
    return message;
  },
  duration: (value) => {
    let message;
    if (!value) {
      message = "Service duration is required";
    }
    return message;
  },
  price: (value) => {
    let message;
    if (!value) {
      message = "Price of service is required";
    }
  },
};

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        image: "",
        duration: "",
        description: "",
        price: "",
        worker_id: "",
      },
      errors: {
        name: null,
        image: null,
        duration: null,
        description: null,
        price: null,
        worker_id: null,
      },
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const uploadData = new FormData();
    Object.keys(this.state.fields).forEach((key) => {
      uploadData.append(key, this.state.fields[key]);
    });
    this.props.editService(uploadData);
  }

  handleChange(event) {
    const { name, value, type, files } = event.target;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: type === "file" ? files[0] : value,
      },
      errors: {
        ...this.state.errors,
        [name]:
          type === "file"
            ? validators[name](files[0])
            : validators[name](value),
      },
    });
  }

  isValid() {
    const { errors } = this.state;
    return !Object.keys(errors).some((key) => errors[key]);
  }

  render() {
      const { fields } = this.state;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <label htmlFor="name">Service name:</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onCHange={(e) => this.handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            value={fields.image}
            onCHange={(e) => this.handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            name="duration"
            value={fields.duration}
            onCHange={(e) => this.handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={fields.description}
            onCHange={(e) => this.handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={fields.price}
            onCHange={(e) => this.handleChange(e)}
          />
        </div>
        <button type="submit">Edit Service</button>
      </form>
    );
  }
}

export default withAuth(withService(EditService));