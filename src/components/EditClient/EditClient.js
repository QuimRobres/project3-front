import React, { Component } from "react";
import './EditClient.css';
import { withRouter } from "react-router";
import { withAuth } from "../../context/auth.context";
import { withUser } from "../../context/user.context";
import userService from "../../services/user.service";
import AdminNavbar from "../../components/General/Navbar/AdminNavbar";

const EMAIL_PATTERN =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validators = {
  password: (value) => {
    let message;
    if (!value) {
      message = "Password is required";
    }

    return message;
  },
  phone_number: (value) => {
    let message;
    if (!value) {
      message = "Phonenumber is required";
    }

    return message;
  },
  birthday: (value) => {
    let message;
    if (!value) {
      message = "Birthday is required";
    }

    return message;
  },
  email: (value) => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid email";
    }

    return message;
  },
};

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        password: "",
        phone_number: "",
        email: "",
        birthday: ""
      },
      errors: {
        password: null,
        phone_number: null,
        email: null,
        birthday: null
      },
    };
    this.userService = new userService();
  }

  async componentDidMount() {
    const result = await this.userService.showUserDetail(
      this.props.match.params.id
    );
    this.setState({
      ...this.state,
      fields: result.data,
    });
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.editUser(this.props.match.params.id, this.state.fields);
    await this.props.history.push("/");
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name](value),
      },
    });
  }

  render() {
    const { fields } = this.state;
    return (
      <div>
      <AdminNavbar />
        <div className="login-clean-editClient">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="password">Nueva contraseña:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={fields.password}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Teléfono:</label>
              <input
                className="form-control"
                type="text"
                name="phone_number"
                value={fields.phone_number}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={fields.email}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Fecha de nacimiento:</label>
              <input
                className="form-control"
                type="text"
                name="birthday"
                value={fields.birthday}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <button className="btn btn-block btn-primary" type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(withUser(withRouter(EditClient)));
