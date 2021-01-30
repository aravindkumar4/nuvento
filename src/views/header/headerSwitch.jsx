import React, { Component } from 'react';
import Header from '../../shared/Header/Header';//./shared/Header/Header
import Header2 from './header2';//./shared/Header/Header
import SwipeableTemporaryDrawer from '../../components/TopMenu/SideBar';
import NavigationMenu from '../../components/TopMenu/NavigationMenu2';//./components/TopMenu/NavigationMenu2
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

class HeaderSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleRights: {},
            dashboardNotification: {},
            showDashbaordNotification: false
        }
    }
    //componentDidMount() {

    //}

    render() {
        //var pageName = window.location.hash.split("/").slice(-1);
        var pageName = window.location.hash.split("/")[1];
        if (pageName.indexOf('?') !== -1) {
            pageName = pageName.split("?")[0];
        }
        //call session tracker if user is already logged in
        //if (localStorage.getItem('UserID') && Convert.ToBoolean(localStorage.getItem('TwoFactorAuthenticated')) == true)
        //    SessionTracker();
        var tf = pageName.toLowerCase();
        
        if (tf == '') { return <Header2 /> }
        if (tf == 'loginpage') { return <Header2 /> }
        if (tf == 'prefaq') { return <Header2 /> }
        if (tf == 'forgotuserid') { return <Header2 /> }
        if (tf == 'forgotuseridsuccess') { return <Header2 /> }
        if (tf == 'register') { return <Header2 /> }
        if (tf == 'forgotpassword') { return <Header2 /> }
        if (tf == 'forgotsuccess') { return <Header2 /> }
        if (tf == 'authentication') { return <Header2 /> }
        //if (tf == 'relogin') { return null }
        if (tf == 'makepledgesuccess') { return null }
        if (tf == 'thankyousuccess') { return null }
        if (tf == 'customerstatusdetails') { return null }
        if (tf == 'loginsuccess') { return null }
        if (tf == 'login') { return null }
        if (tf == 'registersuccess') { return null }
        if (tf == 'register') { return null }
        if (tf == 'makepledgedashboardsuccess') { return null }
        if (tf == 'editpledgesucess') { return null }
        if (tf == 'paypledge') { return null }
        if (tf == 'paypledgesuccess') { return null }
        if (tf == 'forgotpassword') { return null }
        if (tf == 'forgotsuccess') { return null }
        if (tf == 'forgotuserid') { return null  }
        if (tf == 'forgotuseridsuccess') { return null }
        if (tf == 'resetpasswordform') { return null }
        if (tf == 'resetpasswordformsuccess') { return <Header2 /> }
        if (tf == 'resetusernamepassword') { return null }
        if (tf == 'term') { return null }
        
        
        return (
            <MuiThemeProvider role="region" aria-label="header" theme={theme}>
                <Header title={Header} />
                <SwipeableTemporaryDrawer />
                <NavigationMenu title={NavigationMenu} />
            </MuiThemeProvider>
        );
    }
}

export default HeaderSwitch;

