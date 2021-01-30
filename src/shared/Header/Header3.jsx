import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as hashHistory, Link, Route } from 'react-router-dom';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';

const styles = theme => ({
    LinkClass:{
        display:'inline-block',
        float:'left',
        color:'#005984',
        fontWeight:400,
    }
});

class Header3 extends React.Component {
  render() {
		const { classes } = this.props;
    return (
	<header className="ShortHeader" role="region" aria-label="header">
    <MDBContainer>
        <MDBRow>
            <MDBCol size="12">

                         <Link aria-label="navigate to service" to="/services" className={classes.LinkClass} color="primary">
                         <i className="material-icons">chevron_left</i><span>Back to Services</span></Link>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
	</header>
    );
  }
}

export default withStyles(styles)(Header3);