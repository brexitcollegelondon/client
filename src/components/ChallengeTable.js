import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export const ChallengeTable = props => {
  return (
    <MDBTable hover>
      <MDBTableHead color="default-color" textWhite>
        <tr>
          {props.headers.map(header => <th>{header}</th>)}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>Sleep</td>
          <td>7 hours / Night</td>
          <td>5 days</td>
          <td>12:00</td>
					<td>1000 </td>
        </tr>
				<tr>
          <td>Steps</td>
          <td>5</td>
          <td>20 seconds</td>
          <td>Now</td>
					<td>50</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}
