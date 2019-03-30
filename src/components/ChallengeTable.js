import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export const BasicTable = props => {
  return (
    <MDBTable hover>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Challenge Type</th>
          <th>Quantity</th>
          <th>Duration</th>
          <th>Start Time</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>Sleep</td>
          <td>7 hours / Night</td>
          <td>5 days</td>
          <td>@z</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}
