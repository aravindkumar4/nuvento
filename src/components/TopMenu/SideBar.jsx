import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logowhite.png';
import menuItems from './MenuItem'
import {MDBBadge } from 'mdbreact';
const styles = {
  list: {
    width: 275,
  },
  links: {
    textDecoration:'none',
    width:'100%',
    position:'relative'
  },
  menuHeader: {
    paddingLeft: '30px'
  },
  TypoP:{display:'flex'},
  TypoSpan:{fontSize:15}
};
class MenuBar extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      left: false,
      open: false,
    }
  }
  componentDidMount(){
      const RespBar = document.querySelector('.RespAppbar');
      function handleScroll() {
        if (window.scrollY > 70) {
          RespBar.classList.add('fixed-nav');
        } else {
          RespBar.classList.remove('fixed-nav');
        }
      }
     
      window.addEventListener('scroll', handleScroll);

  }
  
  componentDidUpdate() {
    const body = document.querySelector('html');
    if (this.state.left === true ) {
        body.classList.add('iosdevices')
    }
    else{
      body.classList.remove('iosdevices')
    }
  }
// this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
handleClick( item ) {
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) )
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleSwitchClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

// if the menu item doesn't have any child, this method simply returns a clickable menu item that 
// redirects to any location and if there is no child this method uses recursion to go until the 
// last level of children and then returns the item by the first condition.
handler( children ) {
    const { classes } = this.props
    const { state } = this
return children.map( ( subOption ) => {
      if ( !subOption.children ) {
        return (
          <li key={ subOption.name } onClick={this.toggleDrawer('left', false)}>
            <ListItem button key={ subOption.name }>
              <Link to={ subOption.url } className={ classes.links }>
              <ListItemText primary={ subOption.name } 
              />
              {subOption.notificationBadge  &&
              <MDBBadge color="danger SideBarBadge" className="ml-2">{subOption.notificationBadge}</MDBBadge>
              }
              </Link>
            </ListItem>
          </li>
        )
      }
      return (
        <li key={ subOption.name }>
          <ListItem button onClick={ () => this.handleClick( subOption.name ) }>
            <ListItemText primary={ subOption.name } />
            { state[ subOption.name ] ? 
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse in={ state[ subOption.name ] } 
            timeout="auto" unmountOnExit classes={{ wrapperInner: 'PaddingLeft' }} onClick={this.toggleDrawer('left', false)}>
            { this.handler( subOption.children ) }
          </Collapse>
        </li>
      )
    } )
  }
render() {
    const { classes, drawerOpen, menuOptions } = this.props
    return (
      <div className="d-block d-lg-none ResponsiveMenuDrawer">
        	<header className="HeaderMain">
	<div className="container">
		<div className="row">
			<div className="col-md-4 col-sm-4 col-xs-12">
				<a aria-label="South west gas logo" id="logo-container" href="/#/Dashboard" className="brand-logo"><img src={logo} alt="South west gas logo" /></a>
			</div>
      </div>
      </div>
      </header>
      <AppBar position="static" className="RespAppbar">
        <Toolbar>
          <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
        <SwipeableDrawer open={this.state.left} onClose={this.toggleDrawer('left', false)}
        onOpen={this.toggleDrawer('left', true)} classes={{ paper: 'DrawerBin',paperAnchorLeft:'DrawerLeft' }} >
          <div className={classes.list}>
            <List className="sidebarlistcomp">
              <ListItem  key="menuHeading" disableGutters >
                <Grid className="LogoContainerSidebar" lg={12} xs={12} sm={12}>
                  <Link aria-label="South west gas logo" id="logo-container" to="/" className="brand-logo"><img src={logoWhite} alt="South west gas logo" /></Link>
                </Grid>
              </ListItem>
            {/* <ListItem>
                <Typography component="p" className={classes.TypoP}>
                  <Typography component="span" className={classes.TypoSpan} style={{padding:'0px 5px 0 0'}}>Welcome Back, </Typography>
                  <Typography component="span" className={classes.TypoSpan}>Jofe Doe</Typography>
                </Typography>
            </ListItem> 
              <ListItem className="SwitchButton" onClick={this.handleSwitchClick}>
                <ListItemText primary="Switch Portal"/>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse onClick={this.toggleDrawer('left', false)} in={this.state.open} timeout="auto" unmountOnExit classes={{ wrapperInner: 'PaddingLeft' }}>
                <ListItem button>
                  <a aria-label="navigate to home" href="https://t.smartenergywater.com/" className={ classes.links }>
                  <ListItemText primary="Residential" /></a>
                </ListItem>
                <ListItem button>
                  <Link aria-label="navigate to enterprise" to="/" className={ classes.links }>
                  <ListItemText primary="Enterprise" /></Link>
                </ListItem>
                <ListItem button>
                  <Link aria-label="navigate to Landlord" to="/" className={ classes.links }>
                  <ListItemText primary="Landlord" /></Link>
                </ListItem>
                <ListItem button>
                  <Link aria-label="navigate to property manager" to="/" className={ classes.links }>
                  <ListItemText primary="Property Manager" /></Link>
                </ListItem>
                <ListItem button>
                  <Link aria-label="click here to Agency" to="/" className={ classes.links }>
                  <ListItemText primary="Agency" /></Link>
                </ListItem>
                <ListItem button>
                  <Link aria-label="click here to Supplier" to="/" className={ classes.links }>
                  <ListItemText primary="Supplier" /></Link>
                </ListItem>
        </Collapse>*/}
  
            { this.handler( menuItems.data ) }

            <ListItem className="SideBarSignout">
              <Link aria-label="click here to signout" to="/" className={ classes.links }>
              <ListItemText primary="Signout"  />
              </Link>
            </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}
export default withStyles(styles)(MenuBar)