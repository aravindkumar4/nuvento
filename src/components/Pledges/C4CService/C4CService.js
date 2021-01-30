import RequestHelper from "../../../common/RequestHelper";
import { Pledge } from "../../../core/URLConfig";
import { StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum } from "../../../core/Enum";

class C4CService {

    static serviceEstablishmentQuoteLetterRequest = (text, callback) => {
        //
        const params = {
            "IncidentServiceIssueCategoryID": "SR_01_01_06",
            "ProcessingTypeCode": "SRRQ",
            "Name": "Agency Service Establishment Quote Letter",
            "DataOriginTypeCode": "4",
            "ServicePriorityCode": "3",
            "ServiceRequestUserLifeCycleStatusCode": "1",
            "BuyerPartyID": "",
            "ObjectServiceIssueCategoryID": "",
            "CauseServiceIssueCategoryID": "",
            "ActivityServiceIssueCategoryID": "",
            "ReportedPartyID": "",
            "ServiceIssueCategoryID": "SR_01_01",
            "ServiceRequestClassificationCode": "",
            "ServiceRequestTextCollection": [
                {
                    "TypeCode": "10004",
                    "LanguageCode": "EN",
                    "Text": text
                    //"Text": "Pledging Agency: ST VINCENT;\nBP of Pledging Agency: 1100003905;\nAgency User dibyesh_4 Dibyesh Lal;\ndibyesh.lal@smartenergywater.in;\nCustomer Name: RICHARD MARTIN\nDate Of Birth: 05-Feb-80\nAddress: 25669 Rockfellar Avenue, Las Vegas CA 92311\nlal.dibyesh@gmail.com"
                }
            ]
        };

        RequestHelper.POST(Pledge.CreateC4CTicket,
            APIURLTypeEnum.Default,
            params,
            (res) => {
                if (callback) {
                    callback(res);
                }
            });
    }

    static makePledgeRequest = (text, callback) => {
        //
        // Pledge Create
        const params = {
            "IncidentServiceIssueCategoryID": "IR_01_02_27",
            "ProcessingTypeCode": "ZIR",
            "Name": "Agency Pledge Made",
            "DataOriginTypeCode": "4",
            "ServicePriorityCode": "7",
            "ServiceRequestUserLifeCycleStatusCode": "6",
            "BuyerPartyID": "",
            "ObjectServiceIssueCategoryID": "",
            "CauseServiceIssueCategoryID": "",
            "ActivityServiceIssueCategoryID": "",
            "ReportedPartyID": "",
            "ServiceIssueCategoryID": "IR_01_02",
            "ServiceRequestClassificationCode": "",
            "ServiceRequestTextCollection": [
                {
                    "TypeCode": "10004",
                    "LanguageCode": "EN",
                    "Text": text
                    //"Text": "Pledging Agency: <name of agency>; BP of Pledging Agency: <agency BP>; Pledge amount: <amount of pledge>; SWG Customer Contract Account: {Contract Account}"
                }
            ]
        };

        RequestHelper.POST(Pledge.CreateC4CTicket,
            APIURLTypeEnum.Default,
            params,
            (res) => {
                if (callback) {
                    callback(res);
                }
            });
    }

    static cancelPledgeRequest = (text, callback) => {
        //
        // Pledge Cancelled
        const params = {
            "IncidentServiceIssueCategoryID": "IR_01_02_29",
            "ProcessingTypeCode": "SRRQ",
            "Name": "Agency Pledge Canceled",
            "DataOriginTypeCode": "4",
            "ServicePriorityCode": "1",
            "ServiceRequestUserLifeCycleStatusCode": "1",
            "BuyerPartyID": "",
            "ObjectServiceIssueCategoryID": "",
            "CauseServiceIssueCategoryID": "",
            "ActivityServiceIssueCategoryID": "",
            "ReportedPartyID": "",
            "ServiceIssueCategoryID": "IR_01_02",
            "ServiceRequestClassificationCode": "",
            "ServiceRequestTextCollection": [
                {
                    "TypeCode": "10004",
                    "LanguageCode": "EN",
                    "Text": text
                    //"Text": "Pledging Agency: <name of agency>; BP of Pledging Agency: <agency BP>; Cancelled pledge amount: <cancelled new amount of pledge>"
                }
            ]
        };

        RequestHelper.POST(Pledge.CreateC4CTicket,
            APIURLTypeEnum.Default,
            params,
            (res) => {
                if (callback) {
                    callback(res);
                }
            });
    }

    static editPledgeRequest = (text, callback) => {
        //
        // Pledge Edit
        const params = {
            "IncidentServiceIssueCategoryID": "IR_01_02_28",
            "ProcessingTypeCode": "ZIR",
            "Name": "Agency Pledge Edited",
            "DataOriginTypeCode": "4",
            "ServicePriorityCode": "7",
            "ServiceRequestUserLifeCycleStatusCode": "6",
            "BuyerPartyID": "",
            "ObjectServiceIssueCategoryID": "",
            "CauseServiceIssueCategoryID": "",
            "ActivityServiceIssueCategoryID": "",
            "ReportedPartyID": "",
            "ServiceIssueCategoryID": "IR_01_02",
            "ServiceRequestClassificationCode": "",
            "ServiceRequestTextCollection": [
                {
                    "TypeCode": "10004",
                    "LanguageCode": "EN",
                    "Text": text
                    //"Text": "Pledging Agency: <name of agency>; BP of Pledging Agency: <agency BP>; New pledge amount: <new amount of pledge>; Old Pledge amount: <old pledge amount>"
                }
            ]
        };

        RequestHelper.POST(Pledge.CreateC4CTicket,
            APIURLTypeEnum.Default,
            params,
            (res) => {
                if (callback) {
                    callback(res);
                }
            });
    }
}

export default C4CService;