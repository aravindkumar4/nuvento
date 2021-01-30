import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import HorizontalLabelPositionBelowStepper from './stepper';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,Dropdown,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const styles = theme => ({   
    HeaderMain: {
        display: 'none',
    },
    });

class ShortHeader extends React.Component {
  render() {
  return (
   
    <MDBContainer>
        <MDBRow>
        <MDBCol size="12">
             <Paper  className={'wrapper-box paybilltopspace'}> 
		        <MDBCol size="8" className="float-left">
                    <div class="billingpayarea">
                      tertertretretre
                    </div>
                </MDBCol>

            </Paper>
		</MDBCol>
         </MDBRow>
        </MDBContainer>
   
  );
}
}

export default ShortHeader;