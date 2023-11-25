import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/Calendar.css";
import { Dialog } from 'primereact/dialog';
import "../styles/Purchase.css";
import { set } from 'date-fns';

const EventForm = ({ allEvents, event, onAddEvent, onUpdateEvent, onDeleteEvent, onDefaultEvent }) => {
  const initialEvent = event || { id: '', title: '', start: '', end: '', hour: '',type: '', details: '', 
  makeup: '', clientData: '', duration: '', detailsAddress: '', shippingCost: '', 
  products: [], orderNumber: '', color: ''};
  const [newEvent, setNewEvent] = useState({ name: '', start: '', end: '', details: '' });
  const [makeups, setMakeups] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setNewEvent(event || initialEvent);
  }, [event]);


  const handleSubmit = (e) => { // To add a new event
    e.preventDefault();

    if (!validateForm()) {
      return; // return early if validation fails
    }

    console.log(newEvent.type)

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
    onUpdateEvent(eventWithColor);
    alert('Evento modificado con exito!'); // Set the success message
    setNewEvent(initialEvent); // Reset the form
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

  const validateForm = () => { // To validate the form
    // Check that all fields are filled
    if (!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.details) {
      alert("Debe llenar todos los campos.");
      return false;
    }

    // Check that end time is not before start time
    /*if (new Date(newEvent.end).getTime() < new Date(newEvent.start).getTime()) {
      alert("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return false;
    }*/

    // Check that there isn't already an event at the chosen time
    /*const newEventStart = new Date(newEvent.start).getTime();
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
    }*/
    alert('Evento Creado con exito');
    return true;
  };
  

  const handleProducts = () =>{ //To show products
    setVisible(true);
  }


  return (

    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexWrap: 'wrap' }}>
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
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          dateFormat="dd/M/yy"
        />

        <DatePicker
          className='inputEvent'
          placeholderText="Fin"
          selected={newEvent.end}
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
            options={["Taller", "Cita"]} 
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
            <Dropdown className='inputEvent' value={newEvent.makeup} onChange={(e) => setNewEvent({ ...newEvent, makeup: e.target.value })} placeholder="Seleccione el maquillaje" options={makeups} />

            <input
              className='inputEvent'
              type="text"
              placeholder="Cliente"
              value={newEvent.clientData}
              onChange={(e) => setNewEvent({ ...newEvent, clientData: e.target.value })}
            />

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
          onHide={() => {setVisible(false)}}
          style={{width: '35vw', height: '500px'}}
          header='Productos comprados'
          draggable={false}
          resizable={false}
          dismissableMask
          >
            {newEvent.products != [] && newEvent.products.map((product, {index}) => (
                <div className="descriptionPurchase"  key={index}>
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