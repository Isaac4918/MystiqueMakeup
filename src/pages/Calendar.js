import React, { useState} from "react";
import "../styles/Calendar.css";
import Navbar from "../components/Navbar" 
import {Calendar,momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import back from "../components/assets/arrowBack.png";
import moment from 'moment';
import Delivers from "../pages/Delivers";
import EventForm from "../pages/EventForm";
import 'moment/locale/es';
const localizer = momentLocalizer(moment);

const events = [ //Este es un ejemplo agregado a mano
                //Hay un error con los meses por ejemplo el 11 deberia ser noviembre pero es diciembre
                //Es porque en la libreria los meses empiezan en 0
                //Asi que el mes se debe escribir restando un 1
    {
        title: "Reunión",
        allDay: true,
        start: new Date(2023, 11-1, 20),
        end: new Date(2023, 11-1, 20),
    }

];

export function Back() {
  return (
    <div className="backSearch">
      <a href="/"><img src={back} alt="" /></a>
    </div>
  )
}

function CalendarView(){
  const [allEvents, setAllEvents] = useState(events); // state to manage all events
  const [view, setView] = useState('month'); // state to manage the current view
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <div>
          <Navbar showIcons={true} />
          <Back />
          <div className="Calendar">
          <h1>Calendario</h1>
            <h2>Pedidos pendientes</h2>
            <Delivers /> 
            <br /><br />
            <h2>Administrar Evento</h2>
            <br /><br />
            <EventForm  onDeleteEvent={handleDeleteEvent} allEvents={allEvents} event={selectedEvent} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} />
            <br /><br /><br />
            <Calendar 
              localizer={localizer} 
              events={allEvents} 
              startAccessor="start" 
              endAccessor="end" 
              style={{ height: 500, margin: "50px" }} 
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
        </div>
        );
}

export default CalendarView;