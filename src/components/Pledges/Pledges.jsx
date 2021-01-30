import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PledgesAutoPay from './autopay_enrolled';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
function HeadingSectionArea() {
    const EnrollAutopay = (props) => <Link aria-label="Click here to make pledge" to="/MakePledge" {...props} />;
    return (
        <Grid component="div" className="pageheading-wrapper">
            <MDBContainer>
                <MDBRow>
                    <MDBCol sm="6" xs="12">
                        <Grid component="div" className="pageheading-box">
                            <Typography component="h1">Pledge History</Typography>
                        </Grid>
                    </MDBCol>
                    <MDBCol sm="6" xs="12">
                    {localStorage.getItem("RoleType") !== "Viewer" &&    <Button
                            aria-label="click here to make pledge"
                            variant="outlined"
                            className="make-pledges-btn"
                            color="primary"
                            component={EnrollAutopay}
                        >
                            Add New Pledge
                        </Button> 

    }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Grid>
    );
}

class Pledges extends React.Component {
    constructor(props) {
        super(props);
        //
        const message = props.location.state ? props.location.state.message : props.location.state;
        
        this.state = {
            message: message
        }
    }

    resetMessage = (isUpdate) => {
        if (isUpdate) {
            this.setState({
                message: null
            });
        }
    }

    render() {
        return (
            <React.Suspense fallback="">
            <section class="page-wrapper pledgeSec">
                <HeadingSectionArea />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="12">
                            <PledgesAutoPay
                                resetMessage={this.resetMessage}
                                message={this.state.message } />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </section>
            </React.Suspense>
        );
    }
}

export default Pledges;