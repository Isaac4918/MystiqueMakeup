import React, { useState} from "react";
import "../styles/Calendar.css";
import Navbar from "../components/Navbar" 
import {Calendar,momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import back from "../components/assets/arrowBack.png";
import moment from 'moment';
import 'moment/locale/es';
const localizer = momentLocalizer(moment);


export function Back() {
    return (
      <div className="backSearch">
        <a href="/"><img src={back} alt="" /></a>
      </div>
    )
  }


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



function CalendarView(){
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [setErrorMessage] = useState("");

    const validateForm = () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert("Debe llenar todos los campos.");
          return false;
        }
        if (new Date(newEvent.end).getTime() < new Date(newEvent.start).getTime()) {
            alert("La fecha de finalización no puede ser anterior a la fecha de inicio.");
            return false;
          }
          
        setErrorMessage("");
        return true;
      };
    
      // Check if there's already an event at the same time
        const existingEvent = allEvents.find(event => {
        const newEventStart = new Date(newEvent.start).getTime();
        const newEventEnd = new Date(newEvent.end).getTime();

        const eventStart = new Date(event.start).getTime();
        const eventEnd = event.end ? new Date(event.end).getTime() : null;
      
      
        return (
            eventStart === newEventStart &&
            eventEnd === newEventEnd
          );
        });

    function handleAddEvent(e) {

        e.preventDefault();
        if (!validateForm()) {
          return; // return early if validation fails
        }

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
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                if (existingEvent) {
                alert("Existe un evento en ese horario"); 
                return;
                }
             }
    
        }

        const eventWithColor = { ...newEvent, color };
        setAllEvents([...allEvents, eventWithColor]);
        setNewEvent({ title: '', start: null, end: null }); // Reset the form
    }

    function MyCustomView({ events }) {
        
        return (
          <div>
            {events.map(event => (
              <div key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.start.toString()} - {event.end.toString()}</p>
              </div>
            ))}
          </div>
        );
      }

  return (
    
    <div>
          <Navbar showIcons={true} />
          <Back />
          <div className="Calendar">
          <h1>Calendario</h1>
            <h2>Agregar un nuevo evento</h2>
            <form onSubmit={handleAddEvent}>
            <div>
                <input type="text" placeholder="Nombre" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Inicio" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}  
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                dateFormat="MMMM d, yyyy h:mm aa" />

                <DatePicker placeholderText="Fin" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                dateFormat="MMMM d, yyyy h:mm aa" />
                
                <select 
                style={{ width: "20%", marginRight: "10px" }} 
                value={newEvent.type} 
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                >
                <option value="">Seleccione el tipo</option>
                <option value="Taller">Taller</option>
                <option value="Pedido">Pedido</option>
                <option value="Cita">Cita</option>
                </select>
                
                
                <div className="CalendarButton">
                <button type="submit" stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Agregar evento
                </button>
                </div>  
            </div>
            <br /><br /><br />
            </form>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} eventPropGetter={event => ({ style: { backgroundColor: event.color } })}  
               views={['month', 'week', 'day', 'agenda', 'Pedidos']}
               components={{
                 Pedidos: MyCustomView
               }}
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