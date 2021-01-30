import React, { useState, useRef, useEffect } from 'react';
import { MDBNavLink } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RequestHelper from '../../../common/RequestHelper';
import { useHistory } from 'react-router-dom';
import MessageBox from "../../../shared/Views/MessageBox";
import { Pledge } from "../../../core/URLConfig";
import Loader from "../../../shared/Views/Loader";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import { ValidateSinglePage, HandleCutCopyPasteRule } from '../../../core/common/validate';
import C4CService from "../../Pledges/C4CService/C4CService";
import { SetUserBehaviour } from '../../../core/services/setUserBehaviour';
import { PledgeEdited, PledgeMade } from '../../../common/setBehaviourValue';
import moment from "moment";
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
      showPreviousBtn: true,
      showNextBtn: true,
    }
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    }
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
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
  console.log(props)
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const messageRef = useRef(null);

  useEffect(() => {
    const row = JSON.parse(localStorage.getItem('EditData'));
    localStorage.setItem("FundingSource",row.FundingSource);
    localStorage.setItem("AppliedTo",row.AppliedTo);
    localStorage.setItem("EditAmount",row.PledgeValue.replace('$', ''));
  }, [])

  const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
  const classes = useStyles();
  function setStepState(indx) {
    setStyles(getNavStyles(indx, props.steps.length))
    setComp(indx < props.steps.length ? indx : compState)
    setButtons(getButtonsState(indx, props.steps.length))
  }

  const next = () => {
    //console.log(compState)
    //if (compState == 1) {
    //    // RequestHelper.POST("",{})
    //}
    // const _localEditData = JSON.parse(localStorage.getItem('EditData'));
    // if(_localEditData){
    //   localStorage.getItem('EditAmount',_localEditData.PledgeValue );
    // }
    switch (compState) {
      case 0:
        if (ValidateSinglePage('editPledgeSection1', "Please enter all mandatory information.")) {
          setStepState(compState + 1);
        }
        break;
      default:
        setStepState(compState + 1);
    }
  }

  const previous = () => {
    // const _localEditData = JSON.parse(localStorage.getItem('EditData'));
    // if(_localEditData){
    //   localStorage.getItem('EditAmount',_localEditData.PledgeValue );
    // }
    setStepState((compState > 0) ? compState - 1 : compState)
  }

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
        className={'progtrckr-' + stylesState[i]}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{props.steps[i].name}</span>
      </li>
    ))

  const handleSubmit = () => {
    const row = JSON.parse(localStorage.getItem('EditData'));
    const amount = localStorage.getItem('EditAmount');
      setLoading(true);

      const agencyData = JSON.parse(localStorage.getItem("UData"));
      let text = `Pledging Agency: ${agencyData.agency[0].agencyName}; BP of Pledging Agency: ${agencyData.agency[0].agencyNumber}; New pledge amount: ${amount}; Old Pledge amount: ${row.PledgeValue}; SWG Customer Contract Account: ${row.AccountNumber}`;

    RequestHelper.POST(
      Pledge.AgencyPostPledge,
      APIURLTypeEnum.Default,
      {
        agency: localStorage.getItem("AgencyNumber"),
        contractAccountNumber: row.AccountNumber,
        action: "UPDATE",
        amount: amount.replace("$", ""),
        createdOn: row.CreatedOn,
        createdBy: row.CreatedBy,
        fundingSource: localStorage.getItem("FundingSource").includes('-')?localStorage.getItem("FundingSource").split('-')[0]:localStorage.getItem("FundingSource"),
        appliedTo: localStorage.getItem("AppliedTo"),
        updatedBy: localStorage.getItem("UserName"),
        createdAt: row.CreatedAt
      },
      (res) => {
        
          if (res && res.data && res.data.status.code == StatusCodeEnum.OK && res.data.data.msgType === "Y") {

              //
              C4CService.editPledgeRequest(text, (result) => {

                  setLoading(false);
                SetUserBehaviour(PledgeEdited.Name,
                  PledgeEdited.Name,
                  PledgeEdited.Name,
                  PledgeEdited.Event,
                  PledgeEdited.EventDetails.
                    replace("{Contract Account}", row.AccountNumber).
                    replace("<amount of pledge>", amount).
                    replace("{Funding Source}", localStorage.getItem("FundingSource").includes('-') ? localStorage.getItem("FundingSource").split('-')[0] : localStorage.getItem("FundingSource")).
                    replace("{Apply To}", localStorage.getItem("AppliedTo")).
                    replace("{Date / Time}", moment(new Date()).format('MM/DD/YYYY hh:mm A'))
                );
                  localStorage.removeItem('AppliedTo');
                  localStorage.removeItem('FundingSource');
                  localStorage.removeItem('EditAmount');

                  history.push({
                      pathname: "/Pledges",
                      state: {
                          message: {
                              text: "Pledge successfully updated.",
                              isSuccess: true
                          }
                      }
                  });

              });
            //

        } else {
          messageRef.current.showMessage(
            "We're sorry. We are unable to save your changes at this time. Please try again later. If you need immediate assistance contact Southwest Gas Agency Assistance at 877-860-6020.",
            NotificationMessageTypeEnum.Error
          );

          setLoading(false);
        }
      }
    );
  }

  return (
    <div className='stepheading' onKeyDown={handleKeyDown}>
<MessageBox ref={messageRef} />
      {loading && (
        <Loader />
      )}
      <ol className='progtrckr progtrckrpay'>
        {renderSteps()}
      </ol>
      {props.steps[compState].component}
      <div className="paybuttons" style={props.showNavigation ? {} : { display: 'none' }}>

        <Button aria-label="Click here to back" color="secondary" className="cancelbtn" className={classes.ButtonOutlined}
          style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
          onClick={previous} >
          Back
        </Button>

        <Button aria-label="Click here to submit" color="secondary" className={classes.ButtonContained} onClick={handleSubmit}
          style={buttonsState.showPreviousBtn ? {} : { display: 'none' }} >
          Submit
        </Button>

        <Link aria-label="Click here to cancel" to="./Pledges" className={classes.ButtonOutlined}
          style={buttonsState.showNextBtn ? {} : { display: 'none' }}
          onClick={next} >
          Cancel
          </Link>

        <Button aria-label="Click here to next" color="secondary" variant="contained" className={classes.ButtonContained}
          style={buttonsState.showNextBtn ? {} : { display: 'none' }}
          onClick={next}>
          Next
        </Button>

      </div>
      
    </div>
  )
}

MultiStep.defaultProps = {
  showNavigation: true
}