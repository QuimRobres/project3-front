import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { withRouter } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';

import { withAuth } from '../../../context/auth.context';
import { withUser } from '../../../context/user.context';
import { withWorker } from '../../../context/worker.context';
import { withService } from '../../../context/service.context';
import { withReserve } from '../../../context/reserve.context';

function ReserveDate(props) {

    const [startDate, setStartDate] = useState(null);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };

    const onChange = date => {
        console.log("date", date)
        setStartDate(date)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("props name linea 28", props.serviceName)
        const data = { reservation_date: startDate, worker_id: props.worker_id[0], service_name: props.serviceName, user_id: props.user.id}
        console.log("HandleSubmit de createReserve")
        console.log(data)
        await props.createReserve(data);
        window.location.reload();
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <DatePicker
                placeholderText="Elige día y hora"
                showTimeInput
                timeInputLabel="Hora:"
                dateFormat="dd/MM/yyyy h:mm aa"
                selected={startDate}
                onChange={onChange}
                maxDate={addMonths(startDate, 5)}
                filterDate={isWeekday}
                />
            </div>

            <input
            className="hidden"
            type="text"
            name="name"
            value={startDate ? startDate : ""}
            />
            <button className="btn btn-primary btn-sm" type="submit" value="createReserve">Reserva</button>
        </form>

    )
}

export default withAuth(withUser(withWorker(withService(withReserve(withRouter(ReserveDate))))));