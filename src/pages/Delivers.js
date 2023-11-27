import React, { useRef, useState, useEffect } from 'react';
import '../styles/Calendar.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { red } from '@mui/material/colors';

// Se le va a pasar la info de purchase 
// Se tendra que actualizar el estado de scheduled a true
// Y el delivery date se tendra que actualizar con la fecha que se elija en el calendario

function Delivers() {
  const baseAPIurl = 'http://localhost:5000';
  const [selectedRequestedMakeups, setRequestedMakeups] = useState([]);

  useEffect(() => {
    const getRequestedMakeups = async () => {
      const response = await fetch(baseAPIurl + '/publications/request/get/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json());
      
      let tmpRequestedMakeups = [];
      response.forEach(requestedMakeup => {
        if(requestedMakeup.scheduled === "Pendiente") {
          tmpRequestedMakeups.push(requestedMakeup);
        }
      });

      setRequestedMakeups(tmpRequestedMakeups);
    }
  
    getRequestedMakeups();
  }, []);


  const data = { //Este es un ejemplo agregado a mano para mostrar los pedidos pendientes
    columns: [ // las columnas se mantienen ya que es la info que queremos mostrar
      {
        label: 'No. Solicitud',
        field: 'requestedNumber',
        sort: 'asc'
      },
      {
        label: 'Usuario',
        field: 'username',
        sort: 'asc'
      },
      {
        label: 'Maquillaje',
        field: 'makeup',
        sort: 'asc'
      },
      {
        label: 'Día solicitado',
        field: 'requestedDate',
        sort: 'asc'
      },
      {
        label: 'Estado',
        field: 'scheduled',
        sort: 'asc'
      }
    ],
    rows: selectedRequestedMakeups && selectedRequestedMakeups.map(requestedMakeup => {
      return {
        requestedNumber: requestedMakeup.orderNumber,
        username: requestedMakeup.username,
        makeup: requestedMakeup.makeup,
        requestedDate: requestedMakeup.requestedDate,
        scheduled: <td className="rowCustomize" style={{color: requestedMakeup.scheduled === "Pendiente" ? "rgb(192, 25, 25)" : "green"}}>{requestedMakeup.scheduled}</td>
      }
    })
  };

  return (
    <MDBTable scrollY className="coloredHeader">
      <MDBTableHead columns={data.columns} />
      <MDBTableBody rows={data.rows} />
    </MDBTable>
  );
};


export default Delivers;