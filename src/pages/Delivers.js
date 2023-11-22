import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

// Se le va a pasar la info de purchase 
// Se tendra que actualizar el estado de scheduled a true
// Y el delivery date se tendra que actualizar con la fecha que se elija en el calendario

const Delivers = props => {

const data = { //Este es un ejemplo agregado a mano para mostrar los pedidos pendientes
  columns: [ // las columnas se mantienen ya que es la info que queremos mostrar
    {
      label: 'Numero de orden',
      field: 'orderNumber',
      sort: 'asc'
    },
    {
      label: 'Usuario',
      field: 'username',
      sort: 'asc'
    },
    {
      label: 'Dirección',
      field: 'adress',
      sort: 'asc'
    },
    {
      label: 'Día de pago',
      field: 'paymentDate',
      sort: 'asc'
      }
  ],
  rows: [
    { // Y estos son los datos de los purchases que se van a mostrar
        orderNumber: 1,
        username: "mari0502",
        address: "San José, Tibás, Colima",
        paymentDate: "06/11/23",
 
    },
    { 
        orderNumber: 2,
        username: "Marilau123",
        address: "Cartago, Oreamuno, San Rafael",
        paymentDate: "07/11/23",
 
    },
    { 
        orderNumber: 3,
        username: "Marilau123",
        address: "Cartago, Oreamuno, San Rafael",
        paymentDate: "08/11/23",
 
    },
    { 
        orderNumber: 4,
        username: "Aleeee",
        address: "San José, Tibás, Colima",
        paymentDate: "08/11/23",
 
    },
    { 
        orderNumber: 5,
        username: "Isaac",
        address: "San José, Tibás, Colima",
        paymentDate: "11/11/23",
 
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