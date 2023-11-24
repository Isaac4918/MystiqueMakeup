import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

// Se le va a pasar la info de purchase 
// Se tendra que actualizar el estado de scheduled a true
// Y el delivery date se tendra que actualizar con la fecha que se elija en el calendario

const Delivers = props => {

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
      }
  ],
  rows: [
    { // Y estos son los datos de los purchases que se van a mostrar
        requestedNumber: 1,
        username: "mari0502",
        makeup: "Mariposa",
        requestedDate: "06/11/23",
 
    },
    { 
        requestedNumber: 2,
        username: "Marilau123",
        makeup: "Boda",
        requestedDate: "07/11/23",
 
    },
    { 
        requestedNumber: 3,
        username: "Marilau123",
        makeup: "Bruja",
        requestedDate: "08/11/23",
 
    },
    { 
        requestedNumber: 4,
        username: "Aleeee",
        makeup: "Mariposa",
        requestedDate: "08/11/23",
 
    }
  ]
};

return (
    <MDBTable scrollY>
      <MDBTableHead columns={data.columns} />
      <MDBTableBody rows={data.rows} />
    </MDBTable>
  );
};


export default Delivers;