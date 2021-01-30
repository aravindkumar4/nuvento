import React from "react";
import { MDBRow, MDBCol,MDBContainer } from "mdbreact";
import "./privacyPolicy-page.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { StatusCodeEnum, } from "../../core/Enum";
import RequestHelper from "../../common/RequestHelper";
import ReactHtmlParser from 'react-html-parser';

function PrivacyPolicy(props){
    const [privacyPolicy, setPrivacyPolicy] = React.useState({});
    React.useEffect(() => {
        const url = "https://u-swg.smartcmobile.net/Configuration-API/api/1/Configuration/GetTermsConditions?Mode=0&Utilityid=0";
        RequestHelper.GET1(url, (res) => {
            if (res && res.status == StatusCodeEnum.OK) {
                if (res.data) {
                    if (res.data.data) {
                        setPrivacyPolicy(Object.values(res.data.data)[0].privacyPolicy);
                    } else {
                    }
                } else {
                    setPrivacyPolicy(Object.values(res.data.data)[0].privacyPolicy);
                }
            } else {
            }
        }
        );
    }, []);
    return(
    <Dialog fullScreen
    aria-labelledby="alert-title"
    open={props.openPrivacy}
    onClose={props.closePrivacy}
     classes={{ paperScrollPaper: 'dialogclass' }}>
        <div className="gutterareapop">
            <IconButton aria-label="Click Here to Close" edge="start" color="inherit" onClick={props.closePrivacy}>
                <CloseIcon />
            </IconButton>
        </div>
        <Typography variant="h6" color="inherit" id="alert-title"></Typography>
            <MDBContainer>
                <MDBRow className="text-left term-page">
                    <MDBCol size="12">
                        {ReactHtmlParser(privacyPolicy)}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Dialog>
    )
}
export default PrivacyPolicy;