import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter bgColor="dark" className="text-light text-center text-lg-start shadow-sm">
      <MDBContainer className="p-4 d-flex flex-column align-items-center justify-content-center">
        <h5 className="mb-2">
          <MDBIcon icon="headset" className="me-2 text-success" />
          <span className="text-warning">ResolveNow</span>
        </h5>
        <p className="mb-0 small">&copy; {new Date().getFullYear()} | All rights reserved</p>
      </MDBContainer>
    </MDBFooter>
  );
}
