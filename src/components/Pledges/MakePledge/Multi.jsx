import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pledge } from "../../../core/URLConfig";
import Loader from "../../../shared/Views/Loader";
import MessageBox from "../../../shared/Views/MessageBox";
import RequestHelper from "../../../common/RequestHelper";
import { StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum } from "../../../core/Enum";
import { ValidateSinglePage, HandleCutCopyPasteRule } from '../../../core/common/validate';
import { useHistory } from 'react-router-dom';
import C4CService from "../../Pledges/C4CService/C4CService";
import { SetUserBehaviour } from '../../../core/services/setUserBehaviour';
import { LoginAttemptSuccessful, PledgeMade } from '../../../common/setBehaviourValue';
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
            backgroundColor: '#098169',
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
            color: '#098169',
        }
    }
}));

export default function MultiStep(props) {
    const [stylesState, setStyles] = useState(getNavStyles(0, props.steps.length))
    const [compState, setComp] = useState(0)
    const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const messageRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        //
        localStorage.setItem("customerM", null);
    }, []);

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return { displayDate: [year, month, day].join('-'), sendDate: [month, day, year].join('-') };
    }
    const onClickSubmit = () => {
        const agencyData = JSON.parse(localStorage.getItem("UData"));
        const datas = JSON.parse(localStorage.getItem("customerM"));
        var text = `Pledging Agency: ${agencyData.agency[0].agencyName}; BP of Pledging Agency: ${agencyData.agency[0].agencyNumber}; Pledge amount: ${localStorage.getItem("PledgeAmtM")}; SWG Customer Contract Account: ${datas.contractAccount}`;

        setLoading(true);

        RequestHelper.POST(
            Pledge.AgencyPostPledge,
            APIURLTypeEnum.Default,
            {
                "agency": localStorage.getItem("AgencyNumber"),
                "contractAccountNumber": datas.contractAccount,
                "action": "CREATE",
                "amount": localStorage.getItem("PledgeAmtM"),
                "createdBy": localStorage.getItem("UserName"),
                "fundingSource":  localStorage.getItem("FundingProgramM").includes('-')?localStorage.getItem("FundingProgramM").split('-')[0]:localStorage.getItem("FundingProgramM"),
                "appliedTo": localStorage.getItem("ApplyToM"),
                "updatedBy": "",
                "createdOn": "",
                "createdAt": ""

            },
            (res) => {
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {

                            //
                            C4CService.makePledgeRequest(text, (result) => {

                                setLoading(false);
                                setData(res.data.data);
                                const datas = JSON.parse(localStorage.getItem("customerM"));
                                SetUserBehaviour(PledgeMade.Name,
                                    PledgeMade.Name,
                                    PledgeMade.Name,
                                    PledgeMade.Event,
                                    PledgeMade.EventDetails.
                                    replace("{Contract Account}", datas.contractAccount).
                                    replace("<amount of pledge>",localStorage.getItem("PledgeAmtM")).
                                    replace("{Funding Source}", localStorage.getItem("FundingProgramM").includes('-')?localStorage.getItem("FundingProgramM").split('-')[0]:localStorage.getItem("FundingProgramM")).
                                    replace("{Apply To}", localStorage.getItem("ApplyToM")).
                                    replace("{Date / Time}", 
                                    moment(new Date()).format('MM/DD/YYYY hh:mm A'))
                                );
                                history.push({
                                    pathname: "/MakePledgeSuccess",
                                    state: {
                                        data: datas
                                    }
                                });

                            });
                            //

                        } else {
                            setLoading(false);
                            setData(res.data.data);
                        }
                    } else {
                        setLoading(false);
                    }
                } else {
                    //setCancelPopUp(false);
                    messageRef.current.showMessage(
                        res.response.data.status.message,
                        NotificationMessageTypeEnum.Error
                    );
                    setLoading(false);
                }
            }
        );

    };

    function setStepState(indx) {
        setStyles(getNavStyles(indx, props.steps.length))
        setComp(indx < props.steps.length ? indx : compState)
        setButtons(getButtonsState(indx, props.steps.length))
    }

    const next = (e) => {
        let isValidationSuccess = false;
        switch (compState) {
            case 0:
                if (ValidateSinglePage('addPledgeSection1', "Please enter all mandatory information.")) {
                    const datas = JSON.parse(localStorage.getItem("customerM"));

                    if (!datas) {
                        messageRef.current.showMessage(
                            "Please perform search to continue.",
                            NotificationMessageTypeEnum.Error
                        );

                        return;
                    }

                    isValidationSuccess = true;
                }
                break;
            case 1:
                if (ValidateSinglePage('addPledgeSection2', "Please enter all mandatory information.")) {
                    isValidationSuccess = true;
                }
                break;
            default:
                isValidationSuccess = true;
        }

        if (isValidationSuccess) {
            setStepState(compState + 1);
        } else {
            let arr =[];
            let PledgeAmtM= localStorage.getItem("PledgeAmtM");
            let FundingProgramM= localStorage.getItem("FundingProgramM");
            let ApplyToM= localStorage.getItem("ApplyToM");
            if(PledgeAmtM !="")
            arr.push(PledgeAmtM);
            if(FundingProgramM !="")
            arr.push(FundingProgramM);
            if(ApplyToM !="")
            arr.push(ApplyToM);
            if(arr.length>=2){
                
            }else{
                messageRef.current.showMessage(
                    "Please enter all the mandatory information.",
                    NotificationMessageTypeEnum.Error
                );
            }
        }
    }

    const previous = () => {
        if (compState === 1) {
            localStorage.setItem("customerM", null);
        }

        setStepState((compState > 0) ? compState - 1 : compState);
    };

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

    return (
        <div className='stepheading' onKeyDown={handleKeyDown}>
            {loading && (
                <Loader />
            )}
            <ol className='progtrckrs progtrckrss twostepper'>
                {renderSteps()}
            </ol>
            {props.steps[compState].component}
            <div className="paybuttons" style={props.showNavigation ? {} : { display: 'none' }}>

            <Button aria-label="Click here to back" color="secondary" className="cancelbtn" className={classes.ButtonOutlined}
                    style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
                    onClick={previous} >
                    Back
            </Button>
            <Link aria-label="Click here to cancel" to="./Pledges" className={classes.ButtonOutlined}
                    style={buttonsState.showCancelBtn ? {} : { display: 'none' }}
                    onClick={next} >
                    Cancel
            </Link>

            <Button aria-label="Click here to next" color="secondary" variant="contained" className={classes.ButtonContained}
                    style={buttonsState.showNextBtn ? {} : { display: 'none' }}
                    onClick={next}>
                    Next
            </Button>

            <Button aria-label="Click here to submit" color="secondary" variant="contained" className={classes.ButtonContained}
                    style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
                    onClick={onClickSubmit} >
                    Submit
            </Button>

            </div>

            <MessageBox ref={messageRef} />
        </div>
    )
}
MultiStep.defaultProps = {
    showNavigation: true
}