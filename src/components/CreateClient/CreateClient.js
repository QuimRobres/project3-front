import React from "react";
import { withAuth } from '../../context/auth.context';
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
import React, { Component } from "react";

const validators = {
    name: (value) => {
        let message;
        if(!value){
            message = "Name is required"
        }
        return message;
    },
    suername: (value) => {
        let message;
        if(!value){
            message = "Surname is required"
        }
        return message;
    },
    email: (value) => {
        let message;
        if(!value){
            message = "Email is required"
        }
        return message;
    },
    password: (value) => {
        let message;
        if(!value){
            message = "Password is required"
        }
        return message;
    },
    birthday: (value) => {
        let message;
        if(!value) {
            message = "Birthday is required"
        }
        return message;
    },
    phone_number: (value) => {
        let message;
        if(!value) {
            message = "Phone number is required"
        }
        return message; 
    }
}

 class CreateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_number: "",
      name: "",
      surname: "",
      client_antiquity: "",
      email: "",
      password: "",
      birthday: "",
      phone_number: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.createClient(this.state.fields);
      this.props.signup(this.state.fields);
    }
  }

  handleChange(event) {
      const { name, value } = event.target;
      this.setState({
          fields: {
              ...this.state.fields,
              [name] : value,
          }
      })
  }

  render() {
      const { fields } = this.state;
    return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={fields.name} onCHange={(e) => this.handleChange(e)} />
            </div>
        </form>
    )
  }
}

export default withAuth(CreateClient);