import React from 'react';
import { Link } from 'react-router-dom';

export default function Acordion() {
    return (
        <div className='activities-cards'>
            <div className="card">
                <div className="card-body">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h3 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Servicios
                                </button>
                            </h3>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul>
                                        <li><Link to="/home/admin/listaServicios">Lista</Link></li>
                                        <li><Link to="/home/admin/crearServicio">Crear</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Clientes
                                </button>
                            </h3>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul>
                                    <li><Link to="/home/admin/listaClientes">Lista</Link></li>
                                    <li><Link to="/home/admin/crearCliente">Crear Cliente</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Empleados
                                </button>
                            </h3>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul>
                                    <li><Link to="/home/admin/listaTrabajadores">Lista</Link></li>
                                    <li><Link to="/home/admin/crearTrabajador">Crear Trabajador</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
