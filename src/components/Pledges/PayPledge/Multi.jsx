import React, { useState } from 'react';
import { MDBNavLink } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
  const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
  const classes = useStyles();
  function setStepState(indx) {
    setStyles(getNavStyles(indx, props.steps.length))
    setComp(indx < props.steps.length ? indx : compState)
    setButtons(getButtonsState(indx, props.steps.length))
  }

  const next = () => setStepState(compState + 1)

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
        className={'progtrckr-' + stylesState[i]}
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

        <Link aria-label="Click here to submit" to="./PayPledgeSuccess" color="secondary" className={classes.ButtonContained}
          style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
          onClick={next} >
          Submit
        </Link>

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