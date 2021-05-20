import React, { Component } from "react";
import "./EditReserve.css";
import DatePicker from "react-datepicker";
import { addMonths } from 'date-fns';
import { withAuth } from "../../context/auth.context";
import { withReserve } from "../../context/reserve.context";
import { withRouter } from "react-router";
import AdminNavbar from "../General/Navbar/AdminNavbar";
import reserveService from "../../services/reserve.service";
const EMAIL_PATTERN =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validators = {
  reservation_date: (value) => {
    let message;
    if (!value) {
      message = "Reservation date is required";
    }

    return message;
  },
};

class EditReserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        reservation_date: "",
        assigned_worker: "",
        start_date: null,
      },
      errors: {
        reservation_date: null,
        assigned_worker: null,
      },
    };
    this.reserveService = new reserveService();
  }

  async componentDidMount() {
    const result = await this.reserveService.showReserveDetail(
      this.props.match.params.id
    );
    this.setState({
      ...this.state,
      fields: result.data,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.editReserve(this.props.match.params.id, this.state.fields);
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

  onChange = (date) => {
    console.log("date", date);
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        reservation_date: date,
      },
    });
  };
  isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        <AdminNavbar />
        <div className="login-clean-editReseve">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="reservation_date">Fecha:</label>
              <div>
                <DatePicker
                  placeholderText="Elige día y hora"
                  showTimeInput
                  timeInputLabel="Hora:"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  selected={fields.startDate}
                  onChange={this.onChange}
                  maxDate={addMonths(fields.startDate, 5)}
                  filterDate={this.isWeekday}
                />
              </div>
              <input
            className="hidden"
            type="text"
            name="name"
            value={fields.startDate ? fields.startDate : ""}
            />
            </div>
            <button className="btn btn-block btn-primary" type="submit">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(withReserve(withRouter(EditReserve)));
