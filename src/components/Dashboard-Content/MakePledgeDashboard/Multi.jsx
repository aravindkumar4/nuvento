import React, { useState } from 'react';
import { MDBNavLink } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Loader from "../../../shared/Views/Loader";
import RequestHelper from "../../../common/RequestHelper";
import { Pledge } from "../../../core/URLConfig";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import MessageBox from "../../../shared/Views/MessageBox";
import { ValidateSinglePage } from '../../../core/common/validate';

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
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    fontSize: '.875rem',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.75,
    marginLeft: '10px',
    borderRadius: 4,
    "&:hover": {
      color: '#ffffff',
      backgroundColor: theme.palette.secondary.main,
    }
  },
  ButtonOutlined: {
    padding: '6px 35px',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    lineHeight: 1.75,
    marginLeft: '10px',
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    }
  }
}));

export default function MultiStep(props) {

  const [loading, setLoading] = useState(false);
  const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
  const messageRef = React.useRef(null);
  const classes = useStyles();
  function setStepState(indx) {
    setStyles(getNavStyles(indx, props.steps.length))
    setComp(indx < props.steps.length ? indx : compState)
    setButtons(getButtonsState(indx, props.steps.length))
  }

  const next = () => {
    let isValidationSuccess = false;

    if (localStorage.getItem("step2") === "true") {
      if (ValidateSinglePage('addPledgeSection2', "Please enter all mandatory information.")) {
        isValidationSuccess = true;
      }
    };

    if (isValidationSuccess || localStorage.getItem("step2") === "false") {
      setStepState(compState + 1);
    } else {
      let arr = [];
      let PledgeAmtD = localStorage.getItem("PledgeAmtD");
      let FundingProgramD = localStorage.getItem("FundingProgramD");
      let ApplyToD = localStorage.getItem("ApplyToD");
      if (PledgeAmtD != "")
        arr.push(PledgeAmtD);
      if (FundingProgramD != "")
        arr.push(FundingProgramD);
      if (ApplyToD != "")
        arr.push(ApplyToD);
      if (arr.length >= 2) {

      } else {
        messageRef.current.showMessage(
          "Please enter all mandatory information.",
          NotificationMessageTypeEnum.Error
        );
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

  const onClickSubmit = () => {
    const customerDetails = JSON.parse(localStorage.getItem("customerDetailsD"));
    setLoading(true);
    RequestHelper.POST(
      Pledge.AgencyPostPledge,
      APIURLTypeEnum.Default,
      {
        "agency": localStorage.getItem("AgencyNumber"),
        "contractAccountNumber": customerDetails.contractAccount,
        "action": "CREATE",
        "amount": localStorage.getItem("PledgeAmtD"),
        "createdBy": localStorage.getItem("UserName"),
        "fundingSource": localStorage.getItem("FundingProgramD").includes('-') ? localStorage.getItem("FundingProgramD").split('-')[0] : localStorage.getItem("FundingProgramD"),
        "appliedTo": localStorage.getItem("ApplyToD"),
        "updatedBy": "",
        "createdOn": "",
        "createdAt": ""

      },
      (res) => {

        if (res && res.status == StatusCodeEnum.OK) {

          if (res.data) {
            if (res.data.data) {
              setLoading(false);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } else {
          //setCancelPopUp(false);
          //messageRef.current.showMessage(
          //    res.response.data.status.message,
          //    NotificationMessageTypeEnum.Error
          //);
          setLoading(false);
        }
      }
    );

  };

  return (
    <div className='stepheading' onKeyDown={handleKeyDown}>
      <ol className='progtrckrs progtrckrss'>
        {renderSteps()}
      </ol>
      {props.steps[compState].component}
      <div className="paybuttons" style={props.showNavigation ? {} : { display: 'none' }}>

        <Button aria-label="Click here to back" color="secondary" className="cancelbtn" className={classes.ButtonOutlined}
          style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
          onClick={previous} >
          Back
        </Button>

        <Link aria-label="Click here to cancel" to="./" color="secondary" className={classes.ButtonOutlined}
          style={buttonsState.showCancelBtn ? {} : { display: 'none' }}
          onClick={next} >
          Cancel
        </Link>

        <Button aria-label="Click here to next" color="secondary" variant="contained" className={classes.ButtonContained}
          style={buttonsState.showNextBtn ? {} : { display: 'none' }}
          onClick={next}>
          Next
        </Button>

        <Link aria-label="Click here to submit" to="./MakePledgeDashboardSuccess" color="secondary" className={`button-hover ${classes.ButtonContained}`}
          style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
          onClick={onClickSubmit} >
          Submit
        </Link>

        <MessageBox ref={messageRef} />
        {loading && (
          <Loader />
        )}
      </div>
    </div>
  )
}

MultiStep.defaultProps = {
  showNavigation: true
}