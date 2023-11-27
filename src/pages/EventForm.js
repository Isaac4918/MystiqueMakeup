import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/Calendar.css";
import { Dialog } from 'primereact/dialog';
import "../styles/Purchase.css";
import { format, parseISO } from 'date-fns';

const EventForm = ({ allEvents, event, onAddEvent, onUpdateEvent, onDeleteEvent, onDefaultEvent }) => {
  const initialEvent = event || {
    id: '', title: '', start: '', end: '', hour: '', type: '', details: '',
    makeup: '', clientData: '', duration: '', detailsAddress: '', shippingCost: '',
    products: [], orderNumber: '', color: ''
  };
  const [newEvent, setNewEvent] = useState({ name: '', start: '', end: '', details: '' });
  const [makeups, setMakeups] = useState([]);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [makeupTypes, setMakeupTypes] = useState(["Taller", "Cita"]);
  const baseAPIurl = 'http://localhost:5000';

  useEffect(() => {
    setNewEvent(event || initialEvent);
  }, [event]);

  useEffect(() => {
    if (newEvent.type === 'Cita') {
      parseMakeups();
      parseUsers();
    }
  }, [newEvent]);

  const parseMakeups = async () => {
    const tmpMakeups = [];

    const response = await fetch(baseAPIurl + '/publications/get/all', {
      method: 'GET',
    }).then(res => res.json());

    for (let makeup of response) {
      tmpMakeups.push(makeup.name);
    }
    setMakeups(tmpMakeups);
  }

  const parseUsers = async () => {
    const tmpUsers = [];

    const response = await fetch(baseAPIurl + '/getAllUsers', {
      method: 'GET',
    }).then(res => res.json());

    for (let user of response) {
      tmpUsers.push(user);
    }
    setUsers(tmpUsers);
  }

  const handleSubmit = (e) => { // To add a new event
    e.preventDefault();

    if (!validateForm()) {
      return; // return early if validation fails
    }

    // Assign color to newEvent based on its type
    let color;
    switch (newEvent.type) {
      case 'Pedido':
        color = '#1abc9c'; //turquesa
        break;
      case 'Cita':
        color = '#8e44ad'; //morado
        break;
      case 'Taller':
        color = '#f1c40f'; //amarillo
        break;
      default:
        color = '#e74c3c'; //rojo
    }
    const eventWithColor = { ...newEvent, color };
    onAddEvent(eventWithColor);
    setNewEvent(initialEvent); // Reset the form
  };

  const handleUpdate = (e) => { // To update an existing event
    e.preventDefault();
    let color;
    switch (newEvent.type) {
      case 'Pedido':
        color = '#1abc9c';
        break;
      case 'Cita':
        color = '#8e44ad';
        break;
      case 'Taller':
        color = '#f1c40f';
        break;
      default:
        color = '#e74c3c';
    }
    const eventWithColor = { ...newEvent, color };
    let response = onUpdateEvent(event, eventWithColor);
    if(response === true){
      alert('Evento modificado con exito!'); // Set the success message
      setNewEvent(initialEvent); // Reset the form
    }
  };

  const handleDelete = (e) => { // To delete an existing event
    e.preventDefault();
    onDeleteEvent(newEvent);
    alert('Evento eliminado con exito!'); // Set the success message
    setNewEvent(initialEvent); // Reset the form
  };

  const handleDefault = (e) => { // To handle default form
    e.preventDefault();
    onDefaultEvent(newEvent);
    setNewEvent(initialEvent); // Reset the form
  };

  const doEventsDayOverlap = (event1, event2) => {
    // Convertir las fechas de inicio y fin en objetos Date
    let event1Start = new Date(event1.start);
    let event1End = new Date(event1.end);
    let event2Start = new Date(event2.start);
    let event2End = new Date(event2.end);
    event1Start.setHours(0, 0, 0, 0);
    event1End.setHours(0, 0, 0, 0);
    event2Start.setHours(0, 0, 0, 0);
    event2End.setHours(0, 0, 0, 0);

    // Verificar si los eventos se superponen
    if ((event1Start.getTime() < event2End.getTime() && event2Start.getTime() < event1End.getTime())
      || (event1Start.getTime() === event2Start.getTime() && event1End.getTime() === event2End.getTime())) {
      return true;
    } else {
      return false;
    }
  }

  const validateForm = () => { // To validate the form
    // Check that all fields are filled
    if (!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.details) {
      alert("Debe llenar todos los campos.");
      return false;
    }

    // Check that the event doesn't overlap with another event
    for (let tmpEvent of allEvents) {
      if (doEventsDayOverlap(newEvent, tmpEvent)) {
        if (newEvent.type === "Taller" && tmpEvent.type === "Pedido") {
          let accepted = window.confirm("El " + tmpEvent.title + " está en ese horario, ¿desea agregar el taller de igual forma?");
          if (accepted) {
            return true;
          } else {
            return false;
          }
        } else {
          alert("Existe un evento en ese horario.");
          return false;
        }
      }
    }

    // Check that end time is not before start time
    if (new Date(newEvent.end).getTime() < new Date(newEvent.start).getTime()) {
      alert("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return false;
    }

    //check that the duration is not negative
    if (newEvent.duration < 0) {
      alert("La duración no puede ser negativa.");
      return false;
    }

    //check that the start and end dates are later or equal to today
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);

    if (new Date(newEvent.start).getTime() < todaysDate.getTime() || new Date(newEvent.end).getTime() < todaysDate.getTime()) {
      alert("La fecha de inicio y fin no pueden ser anteriores a la fecha actual.");
      return false;
    }

    let rightNow = new Date();
    if ((new Date(newEvent.hour).getTime() < rightNow.getTime()) && (new Date(newEvent.start).getTime() === todaysDate.getTime())){
      alert("La hora no puede ser anterior a la hora actual.");
      return false;
    }

    alert('Evento Creado con exito');
    return true;
  };


  const handleProducts = () => { //To show products
    setVisible(true);
  }


  return (

    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '50%', padding: '5px' }}>
        <input
          className='inputEvent'
          type="text"
          placeholder="Nombre"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />

        <DatePicker
          className='inputEvent'
          placeholderText="Inicio"
          selected={newEvent.start}
          onChange={(start) => {
            if (newEvent.type === "Pedido") {
              setNewEvent({ ...newEvent, start: start, end: start });
            } else {
              setNewEvent({ ...newEvent, start: start });
            }
          }}
          dateFormat="dd/M/yy"
        />

        <DatePicker
          className='inputEvent'
          placeholderText="Fin"
          selected={newEvent.end}
          disabled={newEvent.type === "Pedido" ? true : false}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          dateFormat="dd/M/yy"
        />

        <DatePicker
          className='inputEvent'
          placeholderText="Hora"
          selected={newEvent.hour}
          onChange={(hour) => setNewEvent({ ...newEvent, hour })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />

        {newEvent.type !== 'Pedido' && (
          <Dropdown className='inputEvent'
            value={newEvent.type}
            onChange={(e) => {
              setNewEvent({ ...newEvent, type: e.target.value });
            }}
            placeholder="Seleccione el tipo"
            options={makeupTypes}
          />
        )}

        {newEvent.type === 'Pedido' && (
          <input
            className='inputEvent'
            type="text"
            placeholder="Tipo"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            readOnly
          />
        )}

      </div>

      <div style={{ flex: '50%', padding: '5px' }}>
        <input
          className='inputEvent'
          type="number"
          placeholder="Duración(en horas)"
          value={newEvent.duration}
          onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
        />


        {newEvent.type === 'Cita' && (
          <>
            <Dropdown className='inputEvent' value={newEvent.makeup}
              onChange={(e) => setNewEvent({ ...newEvent, makeup: e.target.value })}
              placeholder="Seleccione el maquillaje" options={makeups} />

            <Dropdown className='inputEvent' value={newEvent.clientData}
              onChange={(e) => setNewEvent({ ...newEvent, clientData: e.target.value })}
              placeholder="Seleccione el usuario" options={users} />



            <textarea
              className='inputEvent'
              type="text"
              placeholder="Detalles"
              value={newEvent.details}
              onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
            />

          </>
        )}

        {newEvent.type === 'Taller' && (
          <textarea
            className='inputEvent'
            type="text"
            placeholder="Detalles"
            value={newEvent.details}
            onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
          />
        )}

        {newEvent.type === 'Pedido' && (
          <>
            <input
              className='inputEvent'
              type="text"
              placeholder="Cliente"
              value={newEvent.clientData}
              onChange={(e) => setNewEvent({ ...newEvent, clientData: e.target.value })}
              readOnly
            />

            <input
              className='inputEvent'
              type="text"
              placeholder="Número de compra"
              value={newEvent.orderNumber}
              onChange={(e) => setNewEvent({ ...newEvent, orderNumber: e.target.value })}
              readOnly
            />

            <textarea
              className='inputEvent'
              type="text"
              placeholder="Detalle dirección"
              value={newEvent.detailsAddress}
              onChange={(e) => setNewEvent({ ...newEvent, detailsAddress: e.target.value })}
              readOnly
            />

            <input
              className='inputEvent'
              type="text"
              placeholder="Costo de envío"
              value={newEvent.shippingCost}
              onChange={(e) => setNewEvent({ ...newEvent, shippingCost: e.target.value })}
              readOnly
            />

            <button type="button" className='productsButton' onClick={handleProducts}>Ver Productos</button>
            <Dialog visible={visible}
              onHide={() => { setVisible(false) }}
              style={{ width: '35vw', height: '500px' }}
              header='Productos comprados'
              draggable={false}
              resizable={false}
              dismissableMask
            >
              {newEvent.products != [] && newEvent.products.map((product, { index }) => (
                <div className="descriptionPurchase" key={index}>
                  <li>Nombre del producto: {product.name} y la cantidad comprada: {product.quantity}</li>
                </div>
              ))}
            </Dialog>

          </>
        )}

      </div>


      <div className="CalendarButton">
        <br />
        {event ? (
          <>
            <button type="submit" onClick={handleUpdate}>Modificar Evento</button>
            <button type="button" onClick={handleDelete}>Eliminar Evento</button>
            <button type="button" onClick={handleDefault}>Volver</button>
          </>
        ) : (
          <button type="submit" onClick={handleSubmit}>Agregar Evento</button>
        )}
      </div>
    </form>
  );
};

export default EventForm;