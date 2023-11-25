import React, { useState, useEffect } from "react";
import "../styles/Calendar.css";
import Navbar from "../components/Navbar"
import { Calendar, momentLocalizer } from "react-big-calendar";
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

  const getPurchases = async() => {
    const response = await fetch(baseAPIurl + '/purchases/get/all',{
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    }).then(res => res.json());

    let purchasesListAll = [];
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
            title: "Pedido número "+purchase.orderNumber,
            start: deliveryDate,
            end: deliveryDate,
            hour: deliveryDate,
            type: 'Pedido',
            duration: 12,
            clientData: purchase.username,
            orderNumber: "Número de compra "+purchase.orderNumber,
            detailsAddress: purchase.address + "." + purchase.details,
            shippingCost: "₡"+cost,
            products: products
          }

          purchasesListAll.push(purchasePending);
        }
    }

    setAllEvents(purchasesListAll);
}


  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleAddEvent = (event) => {
    const eventWithId = { ...event, id: Date.now() };
    setAllEvents([...allEvents, eventWithId]);
    setSelectedEvent(null); // Clear the selected event after adding a new one
  };

  const handleUpdateEvent = (updatedEvent) => {
    setAllEvents(allEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
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