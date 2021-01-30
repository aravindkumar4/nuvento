import RequestHelper from "../../common/RequestHelper";
import { UserBehaviorAPI } from "../Config";
import { TwoFactorAuthentication } from "../URLConfig";
const Agency = 'Agency';

export const SetUserBehaviour = (
    screenName,
    actionType,
    moduleName,
    actionSubject,
    actionNotes
) => {
    const dt = new Date().toISOString();
    const browserInfo = window.BrowserInfo;
    let userId = localStorage.getItem("UserId") ? parseInt(localStorage.getItem("UserId")) : 0;
    let request = {
        "inDatetime": dt,
        "outDatetime": dt,
        "sourceUrl": window.location.href,
        "destinationUrl": "",
        "screenName": screenName,
        "os": browserInfo.os,
        "osVersion": browserInfo.osVersion,
        "browser": browserInfo.browser,
        "browserVersion": browserInfo.browserVersion,
        "screenResolution": "",
        "userId": userId,
        "accountNumber":  localStorage.getItem("AgencyNumber")||0,
        "country": "",
        "ipAddress": "",
        "device": "",
        "updatedBy": userId,
        "lastUpdated": dt,
        "sessionId": "",
        "moduleName": moduleName,
        "actionType": actionType,
        "isExternalTicketCreation": false,
        "customAttribute": {
            "source": 0,
            "actionRequired": 0,
            "customerNumber": localStorage.getItem("AgencyNumber")||0,
            "actionTypeCode": "",
            "actionSubject": actionSubject,
            "actionNotes": actionNotes,
            "actionPriority": 0,
            "actionStatus": 0,
            "serviceIssueCategoryID": "",
            "incidentServiceIssueCategoryID": "",
            "odataContractAccountKUT": "",
            "odataPremiseExternalIDKUT": "",
            "odataTriggerKUT": "",
            "email": "",
            "registrationStatus": 0
        }
    }
    const url =UserBehaviorAPI+TwoFactorAuthentication.SetUserBehaviour;
    
    console.log(request, 'request', url);
    RequestHelper.POST1(
        url,
        request,
        (res) => {
            if (res && res.status && res.status == 200) {
                console.log(res.data)
            } else {
                console.log(res.response, 'error')
            }
        }
    );
}
