import { Domain, APIUrl, CISAPIUrl, ENTAPIUrl, AgencyAPIUrl, AccountMgmtAPI, UsageAPIUrl, NotificationAPIUrl, UserMgmtAPI, UserManagementAPI, EntAccountAPIUrl, UseMockData, BillPDFAPIUrl,CSPServiceAPIUrl } from '../core/Config'
import { APIURLTypeEnum } from '../core/Enum';

class RequestMiddleware {
    static urlRequest(url, apiType) {

        switch (apiType) {
            case APIURLTypeEnum.CIS:
                return `${CISAPIUrl}${url}`;

            case APIURLTypeEnum.Default:
                return `${APIUrl}${url}`;

            case APIURLTypeEnum.Enterprise:
                return `${ENTAPIUrl}${url}`;

            case APIURLTypeEnum.Agency:
                return `${AgencyAPIUrl}${url}`;

            case APIURLTypeEnum.AccountMgmt:
                return `${AccountMgmtAPI}${url}`;

            case APIURLTypeEnum.Usage:
                return `${UsageAPIUrl}${url}`;

            case APIURLTypeEnum.Notification:
                return `${NotificationAPIUrl}${url}`;

            case APIURLTypeEnum.UserMgmt:
                return `${UserMgmtAPI}${url}`;

            case APIURLTypeEnum.UserManagement:
                return `${UserManagementAPI}${url}`;

            case APIURLTypeEnum.EntAccount:
                return `${EntAccountAPIUrl}${url}`;

            case APIURLTypeEnum.BillPDF:
                return `${BillPDFAPIUrl}${url}`;
            case APIURLTypeEnum.CSPService:
                return `${CSPServiceAPIUrl}${url}`;

            default:
            case APIURLTypeEnum.SAP:
                return `${APIUrl}${url}`;
        }
    }

    static getConfigData = (type) => {
        switch (type) {
            case APIURLTypeEnum.UseMockData:
                return `${UseMockData}`;

            default:
                return '';
        }

    }
}

export default RequestMiddleware;   