import Navbar from '../components/navbar/Navbar';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
export default function ProfilePage() {

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Imię i nazwisko</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                <MDBCardText className="text-muted">Jakub Tuta</MDBCardText>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Email</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                <MDBCardText className="text-muted">jakuptuta@example.com</MDBCardText>
              </MDBCol>
            </MDBRow>
            <hr />
          </MDBCardBody>
        </MDBCard>
      </div>
 
    </>
  );
}