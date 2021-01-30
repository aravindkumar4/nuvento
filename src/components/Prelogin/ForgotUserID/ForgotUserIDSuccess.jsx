import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { MDBContainer, MDBRow, MDBCol, MDBListGroup } from 'mdbreact';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const billingpayarea = {
  marginTop: '20',
  color: '#696969',
};
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});


class ForgotUserIDSuccess extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      email: ''
    };
  }

  componentDidMount()
  {
    const data = window.location.hash.split('=').length > 1 ? window.location.hash.split('=')[1] : '';
    this.setState({email : data});
  }

  render() {
    const { classes } = this.props;
    return (

      <MDBContainer>
        <MDBRow>
          <MDBCol lg="7" sm="12" xs="12" className="successarea">
            <MDBCol size="12" className="float-left">
              <Paper className={'wrapper-box registerSucess ShortPaper'}>
                <div  {...css(billingpayarea)} className="billingpayarea">
                  <h2 className="successHead"><i className="material-icons iconsuccess">done</i>
                  </h2>
                  <div className="successview mt-4">
                    <span>We’ve sent your User ID to your email:</span>
                    
                  </div>

                   <div className="resendLink text-center w-100">
                   <span>{  this.state.email}</span>
                    {/* <Link to="/ForgotPassword" style={{ lineHeight: '50px' }}>Resend recovery link</Link> */}
                  </div>
                  {/* <Link to="/ForgotPassword" style={{ lineHeight: '50px' }}>Resend User ID</Link> */}
                </div>
              </Paper>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBListGroup className="returnlinks">
          <Link to="/">Return to login</Link>
        </MDBListGroup>
      </MDBContainer>
    );
  }
}
ForgotUserIDSuccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export { ForgotUserIDSuccess };