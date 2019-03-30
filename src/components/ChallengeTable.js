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
              {
                  props.challenges.map(challenge =>
                      <tr>
                          <td>{challenge.challenge_type}</td>
                          <td>{challenge.target_quantity}</td>
                          <td>{challenge.challenge_duration}</td>
                          <td>{challenge.start_time}</td>
                          <td>{challenge.pledge_amount}</td>
                          <td>{challenge.participants.length}</td>
                      </tr>
                  )
              }
      </MDBTableBody>
    </MDBTable>
  );
};

ChallengeTable.defaultProps = {
    challenges: [],
    headers: [],
};
