import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { MDBListGroup, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { css } from "glamor";
import { makeStyles } from "@material-ui/core/styles";

const billingpayarea = {
  marginTop: "20",
  color: "#696969",
};
const removebgcommon = {
  verticalAlign: "top",
  alignSelf: "baseline",
};
const donebtnright = {
  float: "right",
};

const useStyles = makeStyles((theme) => ({
  ButtonContained: {
    padding: "8px 35px",
    color: "#ffffff",
    fontSize: "0.875rem",
    textTransform: "uppercase",
    lineHeight: "1.75",
    textDecoration: "none",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    "&:hover": {
      color: "#ffffff",
      backgroundColor: '#098169',
    },
  },
  ButtonOutlined: {
    padding: "8px 35px",
    textTransform: "uppercase",
    fontSize: "0.875rem",
    lineHeight: "1.75",
    borderRadius: 4,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor:'transparent'
    },
  },
}));
export default function RegisterSuccess() {
  
  const classes = useStyles();
  const response = JSON.parse(localStorage.getItem("RegistrationResponse"));
  console.log(response, "RegistrationResponse");
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="7" sm="12" xs="12" className="successarea">
          <MDBCol size="12" className="ml-auto mr-auto">
            {response && response.status && (
              <Paper className={"wrapper-box registerSucess  ShortPaper"}>
                <div {...css(billingpayarea)} class="billingpayarea">
                  <h2 className="successHead">
                    <i class="material-icons iconsuccess">done</i>
                    <Typography className="successtext" color="primary">
                      Success!
                    </Typography>
                  </h2>
                  <div class="successview">
                    Thank you! You have successfully submitted your Agency
                    registration application. We will send additional details of
                    your application in the next few days.
                  </div>

                  <div class="buttonareasuccess justify-content-center mt30">
                    <Link
                      aria-label="click here to back"
                      to="/"
                      {...css(donebtnright)}
                      className={classes.ButtonContained}
                    >
                      Done
                    </Link>
                  </div>
                </div>
              </Paper>
            )}

            {response && !response.status && (
              <Paper className="wrapper-box registerSucess  ShortPaper">
                <div class="billingpayarea  accountarea unable-schedule weRSorry">
                  <h2 className="successHead">
                    <i class="material-icons iconsuccess">block</i>
                    <Typography color="primary" className="successtext">
                      We’re sorry. Please try again 
                    </Typography>
                  </h2>
                  <div class="success">
                    <p>
                     {response.messgae}
                    </p>
                  </div>
                </div>
              </Paper>
            )}
          </MDBCol>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
