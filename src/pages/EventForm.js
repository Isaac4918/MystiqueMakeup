import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/Calendar.css";
import { set } from 'date-fns';

const EventForm = ({ allEvents, event, onAddEvent, onUpdateEvent, onDeleteEvent, onDefaultEvent }) => {
  const initialEvent = event || { title: '', start: '', end: '', type: '', details: '', makeup: '', clientData: '', duration: '' };
  const [newEvent, setNewEvent] = useState({ name: '', start: '', end: '', details: '' });
  const [selectedTypeEvent, setSelectedTypeEvent] = useState('');
  const [selectedMakeup, setSelectedMakeup] = useState('');
  const [makeups, setMakeups] = useState([]);

  useEffect(() => {
    setNewEvent(event || initialEvent);
  }, [event]);

  const handleSubmit = (e) => { // To add a new event
    e.preventDefault();

    if (!validateForm()) {
      return; // return early if validation fails
    }

    console.log(newEvent)

    // Assign color to newEvent based on its type
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
    onAddEvent(eventWithColor);
    setNewEvent(initialEvent); // Reset the form
    setSelectedTypeEvent('');
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
    onUpdateEvent(eventWithColor);
    alert('Evento modificado con exito!'); // Set the success message
    setNewEvent(initialEvent); // Reset the form
  };

  const handleDelete = (e) => { // To delete an existing event
    e.preventDefault();
    onDeleteEvent(newEvent);
    alert('Evento eliminado con exito!'); // Set the success message
    setNewEvent(initialEvent); // Reset the form
    setSelectedTypeEvent('');
  };

  const handleDefault = (e) => { // To handle default form
    e.preventDefault();
    onDefaultEvent(newEvent);
    setNewEvent(initialEvent); // Reset the form
  };

  const validateForm = () => { // To validate the form
    // Check that all fields are filled
    if (!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.details) {
      alert("Debe llenar todos los campos.");
      return false;
    }

    // Check that end time is not before start time
    if (new Date(newEvent.end).getTime() < new Date(newEvent.start).getTime()) {
      alert("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return false;
    }

    // Check that there isn't already an event at the chosen time
    const newEventStart = new Date(newEvent.start).getTime();
    const newEventEnd = new Date(newEvent.end).getTime();

    for (let event of allEvents) {
      const eventStart = new Date(event.start).getTime();
      const eventEnd = new Date(event.end).getTime();

      if ((newEventStart >= eventStart && newEventStart < eventEnd) ||
        (newEventEnd > eventStart && newEventEnd <= eventEnd) ||
        (newEventStart <= eventStart && newEventEnd >= eventEnd)) {
        alert("Existe un evento en ese horario");
        return false;
      }
    }
    alert('Evento Creado con exito');
    return true;
  };

  return (

    <form onSubmit={handleSubmit}>

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
        style={{ marginRight: "10px" }}
        selected={newEvent.start}
        onChange={(start) => setNewEvent({ ...newEvent, start })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="MMMM d, yyyy h:mm aa"
      />

      <br />

      <input
        className='inputEvent'
        type="text"
        placeholder="Detalles"
        value={newEvent.details}
        onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
      />

      <DatePicker
        className='inputEvent'
        placeholderText="Fin"
        style={{ marginRight: "10px" }}
        selected={newEvent.end}
        onChange={(end) => setNewEvent({ ...newEvent, end })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="MMMM d, yyyy h:mm aa"
      />

      <br />

      <Dropdown className='inputEvent' value={selectedTypeEvent} onChange={(e) => { setSelectedTypeEvent(e.target.value); setNewEvent({ ...newEvent, type: e.target.value })}} placeholder="Seleccione el tipo" options={["Taller", "Cita"]}/>



      {newEvent.type === 'Cita' && (
        <>
          <Dropdown className='inputEvent' value={selectedMakeup} onChange={(e) => { setSelectedMakeup(e.target.value); setNewEvent({ ...newEvent, makeup: e.target.value })}} placeholder="Seleccione el maquillaje" options={makeups}/>

          <input
            className='inputEvent'
            type="text"
            placeholder="Datos del cliente"
            value={newEvent.clientData}
            onChange={(e) => setNewEvent({ ...newEvent, clientData: e.target.value })}
          />
        </>
      )}
      {newEvent.type === 'Taller' && (

        <input
          className='inputEvent'
          type="number"
          placeholder="Duración"
          value={newEvent.duration}
          onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
        />

      )}

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