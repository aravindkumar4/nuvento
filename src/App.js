import React, { Component } from 'react';
import { Circle } from 'react-preloaders';
import './App.css';
import './assets/css/custom.css';
import './App-responsive.css';
//import HeaderSwitch from './HeaderSwitch';
import HeaderSwitch from '../src/views/header/headerSwitch';
import Main from './components/Main';
import './common/CommonMethod';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserContextModel from './store/UserContextModel';
import Loader from './shared/Views/Loader';
const Footer = React.lazy(() => import('./shared/Footer/Footer'));
import { withRouter } from 'react-router-dom';
import {isIE} from 'react-device-detect';
import BrowserSupport from './components/browserSupport/BrowserSupport';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#27A088' // old #1f4466
    },
    secondary: {
      main: '#27A088' // old #0d934b
    }
  },
  typography: {
    fontFamily: "proxima-nova",
    // h6: {
    //   fontFamily: "Opensans-bold",
    // }
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userModel: {}
    }
  }

    componentDidMount() {
        //alert('f');
    if (localStorage.getItem('AARegistrationStep1')) {
      localStorage.removeItem("AARegistrationStep1");
    }
    if (localStorage.getItem('AARegistration')) {
      localStorage.removeItem("AARegistration");
    }
    if (localStorage.getItem('AARegistrationStep2')) {
      localStorage.removeItem("AARegistrationStep2");
    }
    if (localStorage.getItem('RegistrationResponse')) {
      localStorage.removeItem("RegistrationResponse");
    }
    if (localStorage.getItem('customerDetailsD')) {
      localStorage.removeItem("customerDetailsD");
    }
    this.setState({
      userModel: {
        experience: "Agency",
        name: "John Test",
        customerNo: 110002208834,
        userId: 446
      }
    });
  }

  themeToggle = (count) => {
    //
  };
  render() {
    if(isIE){
      return(
        <>  
          <BrowserSupport/>
        </>
      )
    }
    const { userModel } = this.state;
    return <React.Suspense fallback="" >
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <HeaderSwitch title={HeaderSwitch} />
          <UserContextModel.Provider value={{ userModel, themeToggle: this.themeToggle }}>
            <Main id="content" title={Main} />
          </UserContextModel.Provider>
          <Footer title={Footer} />
        </div>

      </MuiThemeProvider>
    </React.Suspense>
  }
}

export default withRouter(App);
