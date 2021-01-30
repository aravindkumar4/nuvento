import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, Redirect, useHistory } from 'react-router-dom';
import {
  NotificationMessageTypeEnum
} from "../../../core/Enum";
import RequestHelper from "../../../common/RequestHelper";
import { ValidateSinglePage, HandleCutCopyPasteRule } from "../../../core/common/validate";
import { APIURLTypeEnum } from "../../../core/Enum";
import MessageBox from '../../../shared/Views/MessageBox';
import Loader from "../../../shared/Views/Loader";
import {SetTFADataModel,GetTFADataModel} from "../../../store/LegacyUserDataStore";
const Dashboard = React.lazy(() => import('../../Dashboard'));

const getNavStyles = (indx, length) => {
  let styles = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return styles
}

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showSecondstep: true,
      showPreviousBtn: true,
      showNextBtn: true

    }
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
      showCancelBtn: true,
      showFirststep: true
    }
  } else {
    return {
      showPreviousBtn: true,
      showSubmitBtn: true,
      showThirdstep: true
    }
  }
}

const useStyles = makeStyles(theme => ({
  ButtonContained: {
    padding: '6px 35px',
    color: '#ffffff',
    fontSize: '0.875rem',
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    "&:hover": {
      color: '#ffffff',
      backgroundColor: theme.palette.secondary.main,
    }
  },
  ButtonOutlined: {
    padding: '8px 35px',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 4,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    }
  }
}));

export default function MultiStep(props) {
  const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
  const classes = useStyles();
  let { activationKey } = useParams();
  let history = useHistory();
  const [click, setClick] = useState(0)
  const messageRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  function setStepState(indx) {
    setStyles(getNavStyles(indx, props.steps.length))
    setComp(indx < props.steps.length ? indx : compState)
    setButtons(getButtonsState(indx, props.steps.length))
  }


  const isUserExist = () => {
    let data = JSON.parse(localStorage.getItem('loginFirstStep'));
    
    const url = "agency/IsUserAvailable";
    const param = "?userName=" + data.Username;
    setLoading(true);
    RequestHelper.GET(
      url,
      APIURLTypeEnum.Agency,
      param,
      (res) => {
        if (res && res.status == 200) {
          
          setLoading(false);
          if (res.data.data.isUserExist) {
            messageRef.current.showMessage(
              'Username is already in use. Please register with a new username.',
              NotificationMessageTypeEnum.Error
            );
          } else {

            setStepState(compState + 1);
          }

        } else {
          messageRef.current.showMessage(
            res.response.data.status.message,
            NotificationMessageTypeEnum.Error
          );
        }
      }
    );

  }

  const next = () => {
    localStorage.setItem("invalidPassword", "false");
    
    //setLoading(true);
    if (compState == 0) {



      let data = JSON.parse(localStorage.getItem('loginFirstStep'));


      if (data == null) {
        messageRef.current.showMessage(
          'Please enter all mandatory fields.',
          NotificationMessageTypeEnum.Error
        );
        return;
      }
      if (data.ConfirmPassword.length <= 0 && data.password.length <= 0 && data.Username.length <= 0) {
        messageRef.current.showMessage(
          'Please Enter All Mandatory Fields.',
          NotificationMessageTypeEnum.Error
        );
        return;

      }

      if (data.ConfirmPassword ===undefined && data.password===undefined && data.Username ===undefined) {
        messageRef.current.showMessage(
          'Please Enter All Mandatory Fields.',
          NotificationMessageTypeEnum.Error
        );
        return;

      }



      let isValid = data.ConfirmPassword.length > 0 && data.password.length > 0 && data.ConfirmPassword == data.password;

      if (!(!!data.Username)) {
        messageRef.current.showMessage(
          'Please Enter Username',
          NotificationMessageTypeEnum.Error
        );
        setLoading(false);
        return;
      }

      if (data.Username.split(" ").length >= 2) {

        messageRef.current.showMessage(
          'Please Enter Valid Username.',
          NotificationMessageTypeEnum.Error
        );
        return;
      }

      if(!(!!data.password)) // condition added 
      {
        messageRef.current.showMessage(
          'Please Enter Password',
          NotificationMessageTypeEnum.Error
        );
        setLoading(false);
        return;
     }

      var passwordstring=document.getElementById('txtpasswordInfo');
      if (passwordstring === null) {
        localStorage.setItem("invalidPassword", "true");
        messageRef.current.showMessage(
          'Password Criteria not fulfilled.',   // correction here
          NotificationMessageTypeEnum.Error
        );
        return;
      }
      var passwordStr = document.getElementById('txtpasswordInfo').innerText;
      if (passwordStr === "Invalid Password.") {
        localStorage.setItem("invalidPassword", "true");
        messageRef.current.showMessage(
          'Password Criteria not fulfilled.',   // correction here
          NotificationMessageTypeEnum.Error
        );
        return;
      }

      if (!isValid) {
        setLoading(false);
        messageRef.current.showMessage(
          'Passwords do not match, please try again.',
          NotificationMessageTypeEnum.Error
        );
        if (isValid) {
          isUserExist();
          //setStepState(compState + 1) 
        }
      }
      else {
        setLoading(false);
        isUserExist();
        //setStepState(compState + 1)
      }
    }
  }

  const previous = () => setStepState((compState > 0) ? compState - 1 : compState)

  const handleKeyDown = (evt) => evt.which === 13 ? next(props.steps.length) : {}

  const handleOnClick = (evt) => {
    if (evt.currentTarget.value === props.steps.length - 1 && compState === props.steps.length - 1) {
      setStepState(props.steps.length)
    } else {
      setStepState(evt.currentTarget.value)
    }
  }

  const ValidateUserName = () => {

    
    localStorage.removeItem("ActivationMessage")
    var result = JSON.parse(localStorage.getItem("loginFirstStep"));

    var data = {
      activationKey: window.location.hash.split('/').length > 1 ? window.location.hash.split('/')[2] : '',
      userName: result.Username,
      password: result.password
    };
    RequestHelper.POST(

      "agency/CreateUser",
      APIURLTypeEnum.Agency,
      data,
      (res) => {
        if (res && res.status == 200) {

          localStorage.setItem("ActivationMessage", 'success')
          // history.push('/LoginSuccess/true');
          return false;
        } else {
          localStorage.setItem("ActivationMessage", res.response.data.status.message);
          //history.push('/LoginSuccess/false');

          return true;
        }
      },
    );


  }


  const submitRequest = () => {
    
    localStorage.removeItem("ActivationMessage")
    setLoading(true);
    if (localStorage.getItem("IsTermCondiChecked") === "false") {
      messageRef.current.showMessage(
        'Please accept the Terms & Conditions in order to continue.',
        NotificationMessageTypeEnum.Error
      );
      setLoading(false);
      return;
    }

const UserDetails=GetTFADataModel();
    if(!UserDetails.hasOwnProperty("LegacyUserData"))
    {
      window.location.href="#/";

       return;
    }
    

    var result = JSON.parse(localStorage.getItem("loginFirstStep"));
    var data = {
      userID: UserDetails.LegacyUserData.userID,
      userName: result.Username,
      password: result.password
    };
    RequestHelper.POST(

      "user/UpdateLegacyUser",
      APIURLTypeEnum.Agency,
      data,
      (res) => {
        if (res && res.status == 200) 
        {
          setLoading(false);

          localStorage.setItem("ActivationMessage", 'success')
          history.push('/LoginSuccess/true');
        } else {
          setLoading(false);
          localStorage.setItem("ActivationMessage", res.response.data.status.message);
          history.push('/LoginSuccess/false');
        }
      },
    );
  }

  const renderSteps = () =>
    props.steps.map((s, i) => (
      <li
        className={'progtrckrs-' + stylesState[i]}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{props.steps[i].name}</span>
      </li>
    ))

  return (
    <div className='stepheading' onKeyDown={handleKeyDown}>
      <MessageBox ref={messageRef} />
      <ol className='progtrckrs progtrckrss'>
        {renderSteps()}
      </ol>
      {loading && (<Loader />)}
      {props.steps[compState].component}
      <div className="paybuttons" style={props.showNavigation ? {} : { display: 'none' }}>

        <Button aria-label="click here to back" color="secondary" className={classes.ButtonOutlined}
          style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
          onClick={previous} >
          Back
        </Button>

        <Link aria-label="click here to cancel" to="/" className={classes.ButtonOutlined}
          style={buttonsState.showCancelBtn ? {} : { display: 'none' }}
          onClick={next} >
          Cancel
        </Link>

        <Button aria-label="click here to next" color="secondary" variant="contained" className={classes.ButtonContained}
          style={buttonsState.showNextBtn ? {} : { display: 'none' }}
          onClick={next} >
          Next
        </Button>


        {/* <Link to="./LoginSuccess" className={classes.ButtonContained}
          style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
          onClick={next} >
           Submit
        </Link> */}

        {/* <Link to="./LoginSuccess" className={classes.ButtonContained}
          style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
          onClick={submit} >
          Submit
        </Link> */}

        <Button aria-label="click here to next" aria-label="click here to back" className={classes.ButtonContained}
          style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
          onClick={submitRequest} >
          Reset
        </Button>

      </div>
    </div>
  );
}

MultiStep.defaultProps = {
  showNavigation: true
}