import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MDBBtn, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol, MDBNavLink} from 'mdbreact';
import EnrolledAutoPay from './autopay_enrolled.jsx';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="listingContainer" style={{border:1  }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({	
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },  
});

class AutoPayTabContainer extends React.Component {
 showNotifier = (event) =>{
	 event.preventDefault();
	 const answer = (this.answerInput && this.answerInput.value) || null;
 }
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  
  
  
  
  state = {
    value: 0,
    selected: [],
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  render() {
    const { classes, theme } = this.props;
	const { fullScreen } = this.props;
	const { handleClick } = this.props;
    return (
      <div className={'autopay_tabs_wrapper'}>
        <AppBar position="static" color="default" className="autopay_tabs_header">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth" className="TabsWrapper"
          >
            <Tab className="TabsChild" label="Not Enrolled" />
            <Tab className="TabsChild" label="Enrolled" />
          </Tabs>
		  <MDBCol size="2" className="buttonclass ml-auto right">
		  
      <MDBNavLink aria-label="click here to enroll" to="../EnrollAutopay" variant="outlined" class="btn btn-primary enrolprimary" color="primary" onClick={this.handleClickOpen}>{' '}{selected.length}Enroll</MDBNavLink>
		  
      
        <Dialog fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Are you sure ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have selected () accounts to unenroll from auto-pay. This will unenroll you from auto pay. Please note that any pending or scheduled auto payments will be processed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button aria-label="click here to cancel" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button aria-label="click here to unenroll" onClick={this.handleClose} color="primary">
              Unenroll
            </Button>
          </DialogActions>
        </Dialog>
		 </MDBCol>
        </AppBar>
        <SwipeableViews className="dashboard_swipeitems"
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
			{/* <UnEnrolledAutoPay /> */}
		  </TabContainer>
          <TabContainer dir={theme.direction}>
		  <EnrolledAutoPay />
		  </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

AutoPayTabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AutoPayTabContainer);