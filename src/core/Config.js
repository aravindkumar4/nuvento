const Domain =  JSON.parse(window['runConfig'].Domain)
const CISAPIUrl = JSON.parse(window['runConfig'].CISAPIUrl)
const APIUrl = JSON.parse(window['runConfig'].APIUrl)
const ENTAPIUrl = JSON.parse(window['runConfig'].ENTAPIUrl)
const AgencyAPIUrl = JSON.parse(window['runConfig'].AgencyAPIUrl)
const AccountMgmtAPI = JSON.parse(window['runConfig'].AccountMgmtAPI)
const UsageAPIUrl = JSON.parse(window['runConfig'].UsageAPIUrl)
const NotificationAPIUrl = JSON.parse(window['runConfig'].NotificationAPIUrl)
const UseMockData = JSON.parse(window['runConfig'].UseMockData)
const UserMgmtAPI = JSON.parse(window['runConfig'].UserMgmtAPI)
const UserManagementAPI = JSON.parse(window['runConfig'].UserManagementAPI)
const EntAccountAPIUrl = JSON.parse(window['runConfig'].EntAccountAPI)
const BillPDFAPIUrl = JSON.parse(window['runConfig'].BillPdfAPI)
const CSPServiceAPIUrl = JSON.parse(window['runConfig'].CSPServiceAPIUrl)
const UserBehaviorAPI = JSON.parse(window['runConfig'].UserBehaviorAPI)
export {
    Domain,
    APIUrl,
    CISAPIUrl, 
    ENTAPIUrl,
    AgencyAPIUrl,
    AccountMgmtAPI,
    UsageAPIUrl,
    NotificationAPIUrl,
    UserMgmtAPI,
    UserManagementAPI,
    EntAccountAPIUrl,
    UseMockData,
    BillPDFAPIUrl,
    CSPServiceAPIUrl,
    UserBehaviorAPI
}