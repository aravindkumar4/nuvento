import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RequestHelper from "../../../common/RequestHelper";
import { StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum } from '../../../core/Enum';
import MessageBox from "../../../shared/Views/MessageBox";
import { isEmailAddress } from '../../../common/Validation';
import { useHistory } from 'react-router-dom';
import { ValidateSinglePage, HandleCutCopyPasteRule, ValidateAgency } from '../../../core/common/validate';
import Loader from "../../../shared/Views/Loader";

import { Pledge } from "../../../core/URLConfig";

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
            backgroundColor: '#098169'
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
            color:'#098169',
            backgroundColor:'transparent'
        }
    }
}));

export default function MultiStep(props) {
    const history = useHistory();
    const [stylesState, setStyles] = useState(
        getNavStyles(0, props.steps.length)
    );
    const messageRef = React.useRef(null);
    const [compState, setComp] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentCustomerNumber, setCurrentCustomerNumber] = useState('');
    const [buttonsState, setButtons] = useState(
        getButtonsState(0, props.steps.length)
    );
    const classes = useStyles();

    useEffect(() => {
        localStorage.clear();
    }, []);

    function setStepState(indx) {
        setStyles(getNavStyles(indx, props.steps.length));
        setComp(indx < props.steps.length ? indx : compState);
        setButtons(getButtonsState(indx, props.steps.length));
    }

    const next = () => {
        //setLoading(true);
        //
        //
        //if (compState==0 && document.getElementById("OrgName") && document.getElementById("OrgName").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Organization Name.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //}
        //else if (compState == 0 && document.getElementById("TaxIDNumber") && document.getElementById("TaxIDNumber").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter TaxID Number.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //}
        //else if (!ValidateSinglePage("registrationSection1", "Please enter all mandatory fields.")) {
        //    messageRef.current.showMessage(
        //        "Enter valid TaxID Number.",
        //        NotificationMessageTypeEnum.Error
        //    );
        //}
        //if (compState==1 && document.getElementById("PCName") && document.getElementById("PCName").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Primary Contact Name.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        //else if (compState==1 && document.getElementById("PCJobTitle") && document.getElementById("PCJobTitle").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Primary Job Title.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        //else if (compState==1 && document.getElementById("PCEmailAddress") && document.getElementById("PCEmailAddress").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Primary Email Address.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        //else if (compState==1 && document.getElementById("PCEmailAddress") && !isEmailAddress(document.getElementById("PCEmailAddress").value)) {
        //  messageRef.current.showMessage(
        //    "Enter Valid Email Address.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        //else if (compState==1 && document.getElementById("PCConfirmEmailAddress") && document.getElementById("PCConfirmEmailAddress").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Confirm Email Address.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        //else if (compState==1 && document.getElementById("PCConfirmEmailAddress") && !isEmailAddress(document.getElementById("PCConfirmEmailAddress").value)) {
        //  messageRef.current.showMessage(
        //    "Enter Valid Email Address.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 

        //else if (compState==1 && document.getElementById("PCEmailAddress") && document.getElementById("PCEmailAddress").value == document.getElementById("PCConfirmEmailAddress").value == 0) {
        //  messageRef.current.showMessage(
        //    "Primary Email Address must be same as Confirm Email Addres.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 

        //else if (compState==1 && document.getElementById("PCPhone") && document.getElementById("PCPhone").value.length < 10) {
        //  messageRef.current.showMessage(
        //    "Enter Primary Contact Phone.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //} 
        // else if (compState==1 && isNumber(document.getElementById("PCPhone").value)) {
        //   messageRef.current.showMessage(
        //     "Contact Phone detail should be .",
        //     NotificationMessageTypeEnum.Error
        //   );
        // } 
        //else if (compState==1 && document.getElementById("PCFax") && document.getElementById("PCFax").value.length == 0) {
        //  messageRef.current.showMessage(
        //    "Enter Primary Contact Fax.",
        //    NotificationMessageTypeEnum.Error
        //  );
        //}
        setLoading(true);
        switch (compState) {
            case 0: {
                
                if (ValidateAgency("registrationSection1", "Please enter all the mandatory information.") ==='single') {
                    setLoading(false);
                    return;
                }

                if (!ValidateAgency("registrationSection1", "Please enter all the mandatory information.")) {
                    messageRef.current.showMessage(
                        "Please enter all the mandatory information.",
                        NotificationMessageTypeEnum.Error
                    );
                    setLoading(false);
                    return;
                }

                //Verify for valid Org and Tax id by calling API before proceeding to next step
                //verifyDataBeforeContinue(document.getElementById("OrgName").value, document.getElementById("TaxIDNumber").value)
                //setLoading(false);
                // return;

                break;
            }
            case 1: {
                if (ValidateAgency("registrationSection2", "Please enter all the mandatory information.") ==='single') {
                    setLoading(false);
                    return;
                }

                if (!ValidateAgency("registrationSection2", "Please enter all the mandatory information.")) {
                    messageRef.current.showMessage(
                        "Please enter all the mandatory information.",
                        NotificationMessageTypeEnum.Error
                    );

                    setLoading(false);
                    return;
                }

                const step2 = JSON.parse(localStorage.getItem("AARegistrationStep2"));

                //if (step2.PCEmailAddress.length != step2.PCConfirmEmailAddress.length) {
                //    messageRef.current.showMessage(
                //        "Your confirm email address does not match primary contact email.",
                //        NotificationMessageTypeEnum.Error
                //    );

                //    setLoading(false);
                //    return
                //}

                if (step2.PCEmailAddress !== step2.PCConfirmEmailAddress) {
                    // messageRef.current.showMessage(
                    //     "Your confirm email address does not match primary contact email.",
                    //     NotificationMessageTypeEnum.Error
                    // );

                    setLoading(false);
                    return
                }
                if(step2.SCEmailAddress !== step2.SCConfirmEmailAddress){
                    setLoading(false);
                    return;
                }
                // if (step2.SCEmailAddress !== undefined && step2.SCEmailAddress !== "" && step2.SCConfirmEmailAddress === undefined && step2.SCConfirmEmailAddress !== "") {
                // //    messageRef.current.showMessage(
                // //        "Your confirm secondary contact email address does not match contact email.",
                // //        NotificationMessageTypeEnum.Error
                // //    );

                //    setLoading(false);
                //    return
                // }

                // if ((step2.SCEmailAddress || step2.SCConfirmEmailAddress) && step2.SCConfirmEmailAddress !== step2.SCEmailAddress) {
                //     messageRef.current.showMessage(
                //         "Your confirm secondary contact email address does not match contact email.",
                //         NotificationMessageTypeEnum.Error
                //     );

                //     setLoading(false);
                //     return
                // }

                //if ((step2.SCEmailAddress || step2.SCConfirmEmailAddress) && step2.SCConfirmEmailAddress !== undefined && step2.SCEmailAddress.length !== step2.SCConfirmEmailAddress.length) {
                //    messageRef.current.showMessage(
                //        "Your confirm secondary contact email address does not match contact email.",
                //        NotificationMessageTypeEnum.Error
                //    );

                //    setLoading(false);
                //    return
                //}

                break;
            }
            case 2: {

                break;
            }
            default: {
                break;
            }
        }

        setLoading(false);
        setStepState(compState + 1);
    };

    const previous = () => {
        // if (compState - 1 == 0 && localStorage.getItem("AARegistrationStep1") != null) {
        //   const _AARegistrationStep1 = JSON.parse(localStorage.getItem("AARegistrationStep1"));

        //   const inputTypes = document.querySelectorAll("input[type=text]");

        //   for (var i = 0; i < inputTypes.length; ++i) {
        //     inputTypes[i].value = localStorage.getItem("AARegistrationStep1")[inputTypes[i]]
        //   }


        // } else if (
        //   compState - 1 == 1 &&
        //   localStorage.getItem("AARegistrationStep2") != null
        // ) {
        //   const _AARegistrationStep2 = JSON.parse(localStorage.getItem("AARegistrationStep2"));
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
                className={'progtrckrs-' + stylesState[i]}
                onClick={handleOnClick}
                key={i}
                value={i}
            >
                <em>{i + 1}</em>
                <span>{props.steps[i].name}</span>
            </li>
        ))

    const getValueOrDefault = (val) => {
        if (!val) {
            return "";
        }

        return val + "; \n";
    };

    const verifyDataBeforeContinue = (orgName, taxId) => {
        setLoading(true);

        RequestHelper.POST(
            Pledge.GetAgencyLookup,
            APIURLTypeEnum.Default,
            {
                "organizationName": orgName,// "CHOCTAW NATION EMERGENCY SERVICES",
                "taxId": taxId.replace('-', '')// "040000000"
            },
            (res) => {
                setLoading(false);

                if (res && res.status == StatusCodeEnum.OK && res.data && res.data.data) {
                    setCurrentCustomerNumber(res.data.data.businessPartner);
                    setStepState(compState + 1);
                } else {
                    setCurrentCustomerNumber('');
                    // messageRef.current.showMessage(
                    //     "Please enter valid Organization Name and TaxId number.",//res.response.data.status.message
                    //     NotificationMessageTypeEnum.Error
                    // );
                }
            }
        );
    }

    const handleClick = () => {
        setLoading(true);

        if (!document.getElementById('chkRegistrationAgree').checked) {
            messageRef.current.showMessage(
                "Please accept the Terms of Use in order to continue.",
                NotificationMessageTypeEnum.Error
            );

            setLoading(false);
            return;
        }

        localStorage.removeItem('RegistrationResponse');
        const step1 = JSON.parse(localStorage.getItem("AARegistrationStep1"));
        const step2 = JSON.parse(localStorage.getItem("AARegistrationStep2"));

        const physicalAddress = {
            addressLine: step1.Address1 || '',
            city: step1.City1 || '',
            state: step1.State1 ? step1.State1.toString() : '',
            zipCode: step1.ZipCode1 || '',
            country: ""
        };

        let mailingAddress;
        if (step1.usePhysical === true) {
            mailingAddress = physicalAddress;
        } else {
            mailingAddress = {
                addressLine: step1.Address2 || '',
                city: step1.City2,
                state: step1.State2 ? step1.State2.toString() : '',
                zipCode: step1.ZipCode2 || '',
                country: ""
            }
        }

        //
        //setLoading(true);

        RequestHelper.POST(
            "agency/Register",
            APIURLTypeEnum.Agency,
            {
                utilityId: 0,
                organizationName: step1.OrgName,
                taxIdNumber: step1.TaxIDNumber,
                customerNumber: currentCustomerNumber,//BusinessPartner
                physicalAddress: physicalAddress,
                mailingAddress: mailingAddress,
                primaryContact: {
                    name: step2.PCName,
                    jobTitle: step2.PCJobTitle,
                    email: step2.PCEmailAddress,
                    phone: step2.PCPhone,
                    fax: step2.PCFax,
                    mobile:step2.PCMobile
                },
                secondaryContact: {
                    name: step2.SCName,
                    jobTitle: step2.SCJobTitle,
                    email: step2.SCEmailAddress,
                    phone: step2.SCPhone,
                    mobile:step2.SCMobile,
                    fax: step2.SCFax
                },
                updatedByUser: 0,
                updatedBy: 0
            },
            (res) => {
                
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        return createServiceRequest(callSuccess, res.data);
                        setLoading(false);
                    } else {
                        localStorage.setItem("RegistrationResponse", JSON.stringify({
                            messgae: res.response.data.status.message,
                            status: false
                        }));
                        setLoading(false);
                    }

                    history.push("/RegisterSuccess");
                } else {
                    if (res.response.data.status.message === "Primary Email Id already exist. Please try with other mail id ") {

                        messageRef.current.showMessage(
                            res.response.data.status.message,
                            NotificationMessageTypeEnum.Error
                        );
                    } else {
                        localStorage.setItem("RegistrationResponse", JSON.stringify({
                            messgae: res.response.data.status.message,
                            status: false
                        }));
                        setLoading(false);
                        history.push("/RegisterSuccess");
                    }
                }

                setLoading(false);
            }
        );
    }

    const callSuccess = (d) => {

        localStorage.removeItem("AARegistrationStep1");
        localStorage.removeItem("AARegistrationStep2");
        localStorage.removeItem("AARegistrationStep1");

        localStorage.setItem("RegistrationResponse", JSON.stringify({
            messgae:
                "Thank you! You have successfully submitted your Agency registration application. We will send additional details of your application in the next few days.",
            status: true,
        }));

        history.push("/RegisterSuccess");
    }

    const createServiceRequest = (callbackFn, callbackData) => {

        const step1 = JSON.parse(localStorage.getItem("AARegistrationStep1"));
        const step2 = JSON.parse(localStorage.getItem("AARegistrationStep2"));

        const fullAddress1 = step1.Address1 + ", " + step1.City1 + " " + step1.State1 + " " + step1.ZipCode1;

        let fullAddress2 = "";

        if (!step1.usePhysical) {
            fullAddress2 = step1.Address2 + ", " + step1.City2 + " " + step1.State2 + " " + step1.ZipCode2;
        } else {
            fullAddress2 = fullAddress1;
        }

        let text = `Name of the Organization: ${step1.OrgName};\nTax ID Number: ${step1.TaxIDNumber};\nAddress: ${fullAddress1}\nMailing Address: ${fullAddress2}\n`;
        text += `Primary Contact: ${step2.PCName}; \n${step2.PCJobTitle}; \n${step2.PCEmailAddress}; \n${step2.PCPhone}; \n${getValueOrDefault(step2.PCFax)}`;
        text += `Secondary Contact: ${getValueOrDefault(step2.SCName)}${getValueOrDefault(step2.SCJobTitle)}${getValueOrDefault(step2.SCEmailAddress)}${getValueOrDefault(step2.SCPhone)}${getValueOrDefault(step2.SCFax)}`;

        const params = {
            "IncidentServiceIssueCategoryID": "SR_01_14",
            "ProcessingTypeCode": "SRRQ",
            "Name": "New Agency Registration Request",
            "DataOriginTypeCode": "4",
            "ServicePriorityCode": "3",
            "ServiceRequestUserLifeCycleStatusCode": "1",
            "BuyerPartyID": "",
            "ObjectServiceIssueCategoryID": "",
            "CauseServiceIssueCategoryID": "",
            "ActivityServiceIssueCategoryID": "",
            "ReportedPartyID": "",
            "ServiceIssueCategoryID": "SR_01_14_05",
            "ServiceRequestClassificationCode": "",
            "ServiceRequestTextCollection": [
                {
                    "TypeCode": "10004",
                    "LanguageCode": "EN",
                    "Text": text
                }
            ]
        };
        setLoading(true);

        RequestHelper.POST(Pledge.CreateC4CTicket,
            APIURLTypeEnum.Default,
            params, (res) => {
                const { status, data, statusText } = res;
                var self = this;

                if (status) {
                    if (res.status == StatusCodeEnum.OK) {
                        //setLoading(false);

                    }
                    else {
                        //self.massegeRef.current.showMessage("error", "You have not successfully registered.")
                    }
                } else {
                    //self.massegeRef.current.showMessage("error", "You have not successfully registered.")
                }

                setLoading(false);

                callbackFn(callbackData);
            });
    }


    return (
        <div className='stepheading' onKeyDown={handleKeyDown}>
            {loading && (
                <Loader />
            )}
            <ol className='progtrckrs progtrckrss'>
                {renderSteps()}
            </ol>

            {props.steps[compState].component}
            <div className="paybuttons" style={props.showNavigation ? {} : { display: 'none' }}>

                <Button aria-label="click here to back" color="secondary" className={classes.ButtonOutlined}
                    style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
                    onClick={previous} >
                    Back
        </Button>

                {/*<Link aria-label="click here to cancel" to="/" className={classes.ButtonOutlined}
          style={buttonsState.showCancelBtn ? {} : { display: 'none' }}
          onClick={next} >
          Cancel
        </Link>*/}
                <Link to="/" aria-label="click here to Cancel and go to login page" color="secondary" className={classes.ButtonOutlined}
                    style={buttonsState.showCancelBtn ? {} : { display: 'none' }} >
                    Cancel
                </Link>
                <Button aria-label="click here to next" color="secondary" variant="contained" className={classes.ButtonContained}
                    style={buttonsState.showNextBtn ? {} : { display: 'none' }}
                    onClick={next} >
                    Next
                </Button>

                <Button aria-label="click here to submit" className={classes.ButtonContained} onClick={handleClick}
                    style={buttonsState.showSubmitBtn ? {} : { display: 'none' }}
                //onClick={next}
                >
                    Register
                </Button>

            </div>


            <MessageBox ref={messageRef} />
        </div>
    );
}

MultiStep.defaultProps = {
    showNavigation: true
}