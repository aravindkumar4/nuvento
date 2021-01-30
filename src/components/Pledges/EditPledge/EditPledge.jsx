import React from "react";
import Paper from "@material-ui/core/Paper";
import { MDBContainer, MDBRow, MDBCol, MDBNavLink } from "mdbreact";
import HorizontalLabelPositionBelowStepper from "./stepper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import HeaderSwitch from "../../../HeaderSwitch";
import Loader from "../../../shared/Views/Loader";

class PayBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        // const self = this;
        // if(self.props.location.state){

        // this.setState({ loading:false, EditData: self.props.location.state.EditData });
        // }else{
        //   this.props.history.push('/Pledges');
        // }
    }

    render() {
        const { EditData } = this.state || {};
        //console.log(EditData, 'edit')

        return (
            <React.Suspense fallback={<Loader />}>
                <MDBContainer className="editPledgeSec">
                    <MDBRow>
                        {this.state.loading && <Loader />}

                        <MDBCol lg="12" sm="12" xs="12" className="smallcontainer">
                            <div className={"wrapper-box paybilltopspace"}>
                                <MDBCol
                                    lg="7"
                                    sm="12"
                                    xs="12"
                                    className="ml-auto mr-auto PayPledgeSec"
                                >
                                    <Paper elevation={1} className="ShortPaper" role="region" aria-label="edit pledge">
                                        <div class="billingpayarea">
                                            <Typography
                                                color="primary"
                                                component="h2"
                                                className="titlehead"
                                            >
                                                Edit Pledge
                                            </Typography>
                                            <HorizontalLabelPositionBelowStepper
                                                editData={EditData}
                                            />
                                        </div>
                                    </Paper>
                                </MDBCol>
                                {/* <MDBCol lg="5" sm="4" xs="12" className="float-left bluearea d-none d-sm-block">
              <div class="enrollboxarea">
                <b>Pay with Credit or Debit Card?</b>
                <p>Use your 13-digit account number from your Account Summary to pay by card.</p>
                <MDBNavLink to="./Pledges" className="enrolllink">Pay with Credit or Debit Card</MDBNavLink>
              </div>
            </MDBCol> */}
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Suspense>
        );
    }
}

export default PayBill;
