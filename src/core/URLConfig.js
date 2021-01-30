const Pledge = {
    GetAgencyPledgeHistory: "agency/GetAgencyPledgeHistory",
    GetAllCountAgencyPledgeHistory: "agency/GetAllCountAgencyPledgeHistory",
    AgencyPostPledge: "agency/AgencyPostPledge",
    GetAgencyAccountLookup: "agency/GetAgencyAccountLookup",
    GetAgencyLookup: "agency/GetAgencyLookup",
    GetCurrentBillDetail: "account/GetCurrentBillDetail",
    GetBillingHistory: "account/GetBillingHistory",
    GetBillPaymentHistory: "account/GetBillPaymentHistory",
    CreateC4CTicket: "c4cticket/CreateRequest",
    BillPDF: "account/GetBill"
}

const User = {
    ResetPassword :'User/ResetPassword',
    ForgotUsername :  'User/forgotUsername',
    ForgotPassword :'User/forgotPassword',
    GetUserInfo : "User/GetUserInfo",
    GetLocationByIP: "users/getLocationByIP/{0}",
}

const TwoFactorAuthentication = {
    IsLegacyUserCheck: "user/IsLegacyUserCheck?userName=",
    GetUserTwoFactorAuthentication: "users/GetUserTwoFactorAuthentication/",
    CreateUserTwoFactorAuthenticationToken: "users/CreateUserTwoFactorAuthenticationToken/",
    VerifyUserTwoFactorAuthenticationToken: "users/VerifyUserTwoFactorAuthenticationToken/",
    ResentUserTwoFactorAuthenticationToken: "users/ResentUserTwoFactorAuthenticationToken/",
    SetUserBehaviour:"UserBehaviour/SetUserBehaviour"
}


export {
    Pledge,
    User,
    TwoFactorAuthentication
}