import React, { useState, useEffect } from "react";
import "../styles/Calendar.css";
import Navbar from "../components/Navbar"
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format, parseISO } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import back from "../components/assets/arrowBack.png";
import moment from 'moment';
import Delivers from "../pages/Delivers";
import EventForm from "../pages/EventForm";
import 'moment/locale/es';
const localizer = momentLocalizer(moment);



export function Back() {
  return (
    <div className="backSearch">
      <a href="/accountAdmin"><img src={back} alt="" /></a>
    </div>
  )
}

function CalendarView() {
  const [allEvents, setAllEvents] = useState([]); // state to manage all events
  const [view, setView] = useState('month'); // state to manage the current view
  const [selectedEvent, setSelectedEvent] = useState(null);
  const baseAPIurl = 'http://localhost:5000';
  const listAll = [];

  const getPurchases = async() => {
    const response = await fetch(baseAPIurl + '/purchases/get/all',{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    }).then(res => res.json());


    for (let i = 0; i < response.length; i++) {      
        if(response[i].scheduled === "aceptada"){
          let purchase = response[i];
          let dateStr = purchase.deliveryDate;
          let parts = dateStr.split("/");
          let deliveryDate = new Date(`20${parts[2]}`, parts[1] - 1, parts[0]);
          let cost = purchase.finalPrice-purchase.partialPrice;
          let cart = purchase.cart;
          let products = cart.products;
          deliveryDate.setHours(6);
          deliveryDate.setMinutes(0);

          let purchasePending ={
            id: purchase.orderNumber,
            title: "Pedido número "+purchase.orderNumber,
            start: deliveryDate,
            end: deliveryDate,
            hour: deliveryDate,
            type: 'Pedido',
            color: '#1abc9c',
            duration: 12,
            clientData: purchase.username,
            orderNumber: "Número de compra "+purchase.orderNumber,
            detailsAddress: purchase.address + "." + purchase.details,
            shippingCost: "₡"+cost,
            products: products
          }

          // Verifica si listAll ya contiene un objeto con el mismo número de pedido
          let isDuplicate = listAll.some(obj => obj.orderNumber === purchasePending.orderNumber);

          // Si no es un duplicado, agrega el objeto a listAll
          if (!isDuplicate) {
            listAll.push(purchasePending);
          }
        }
    }
    getAgenda();
  }

  const getAgenda = async () =>{
    const response = await fetch(baseAPIurl + '/agenda/get/all',{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    }).then(res => res.json());

    let newEntry = {};
    for (let i = 0; i < response.length; i++) {  
      let entry = response[i];     
      let dateStart = new Date(parseISO(entry.start));
      let dateEnd = new Date(parseISO(entry.end));
      let dateHour = new Date(parseISO(entry.hour));

      if(entry.type ==='Taller'){
        newEntry ={
          id: entry.id,
          title: entry.title,
          start: dateStart,
          end: dateEnd,
          hour: dateHour,
          type: entry.type,
          color: '#f1c40f',
          duration: entry.duration,
          details: entry.details
        }
      }else{
        newEntry = {
          title: entry.title,
          start: dateStart,
          end: dateEnd,
          hour: dateHour,
          type: entry.type,
          color: '#8e44ad',
          duration: entry.duration,
          details: entry.details,
          makeup: entry.makeup,
          clientData: entry.clientData
        }
      }

      // Verifica si listAll ya contiene un objeto con el mismo título
      let isDuplicate = listAll.some(obj => obj.title === newEntry.title);

      // Si newEntry no está vacío y no es un duplicado, agrega el objeto a listAll
      if(Object.keys(newEntry).length !== 0 && !isDuplicate){
          listAll.push(newEntry);
      }
    }
    
    setAllEvents(listAll);
    console.log("LISTA", listAll);
  }


  const addAgenda = async (event) =>{
    const response = await fetch(baseAPIurl + '/agenda/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: event.title,
        start: event.start,
        end: event.end,
        hour: event.hour,
        duration: event.duration,
        type: event.type,
        details: event.details,
        makeup: event.makeup,
        clientData: event.clientData
      })
    });

    if (response.ok) {
      const data = await response.json();
      const id = data.id;
      console.log("ID del documento creado: ", id);
      return id;
    } else {
        console.error("Error al crear la entrada en la agenda");
    }

  }

  const modifyAgenda = async (event) =>{
    if(event.type === 'Pedido'){
      //Modificar en Purchases
    }else if(event.type === 'Taller' ){
      const response = await fetch(baseAPIurl + '/agenda/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          hour: event.hour,
          duration: event.duration,
          type: event.type,
          details: event.details,
          makeup: "",
          clientData: ""
        })
      });

    }else{
      const response = await fetch(baseAPIurl + '/agenda/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          hour: event.hour,
          duration: event.duration,
          type: event.type,
          details: event.details,
          makeup: event.makeup,
          clientData: event.clientData
        })
      });
    }    
  }

  const deleteAgenda = async (event) =>{
    if(event.type === 'Pedido'){
      //Hacer update, cambiar el schelued a 'cancelada'
    }else{
      const response = await fetch(baseAPIurl + '/agenda/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: event.id
        })
      });
    }
  }



  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleAddEvent = async (event) => {
    var idEvent = await addAgenda(event);
    console.log("ID EVENT", idEvent);
    const eventWithId = { ...event, id: idEvent };
    console.log("EVENT WITH ID", eventWithId);
    setAllEvents([...allEvents, eventWithId]);
    setSelectedEvent(null); // Clear the selected event after adding a new one
  };

  const handleUpdateEvent = (updatedEvent) => {
    console.log("ID MOD", updatedEvent.id)
    console.log("TITLE", updatedEvent.title)
    modifyAgenda(updatedEvent);
    setAllEvents(allEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    console.log("ID ELIMINAR", eventToDelete.id);
    deleteAgenda(eventToDelete);
    setAllEvents(allEvents.filter(event => event.id !== eventToDelete.id));
    setSelectedEvent(null); // Clear the selected event after deleting
  };

  const handleDefaultEvent = (defaultevent) => {
    setSelectedEvent(null); // Clear the selected event after deleting
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div>
      <Navbar showIcons={true} />
      <Back />
      <div className="Calendar">
        <h1>Calendario</h1>
        <br/>
        <div className="parentContainer">
          <section className="layoutCalendar">     
            <div>
              <h2>Maquillajes solicitados</h2>
              <br/>
              <Delivers />
              <br/><br/>
              <h2>Administrar Evento</h2>
              <br/>
              <EventForm onDefaultEvent={handleDefaultEvent} onDeleteEvent={handleDeleteEvent} allEvents={allEvents} event={selectedEvent} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} />
            </div>
            
            <div>
              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, marginLeft: 30 }}
                eventPropGetter={event => ({ style: { backgroundColor: event.color } })}
                views={['month', 'week', 'day', 'agenda']}
                onView={setView}
                onSelectEvent={handleEventSelect}
                messages={{
                  date: 'Fecha',
                  time: 'Hora',
                  event: 'Evento',
                  allDay: 'Todo el dia',
                  week: 'Semana',
                  work_week: 'Semana de trabajo',
                  day: 'Dia',
                  month: 'Mes',
                  previous: 'Anterior',
                  next: 'Siguiente',
                  yesterday: 'Ayer',
                  tomorrow: 'Mañana',
                  today: 'Hoy',
                  agenda: 'Agenda',
                  noEventsInRange: 'No hay eventos proximos',
                }}
              />
            </div>
          </section>
        </div>
          
      </div>
    </div>
  );
}

export default CalendarView;