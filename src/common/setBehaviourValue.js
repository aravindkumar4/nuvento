
export const PledgeMade = {
    "Name": "Pledge History",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Pledge Made",
    "Event": "Agency Pledge Made",
    "EventDetails": "Contract Account: {Contract Account}; Pledge amount: <amount of pledge>; Funding Source:     { Funding Source }; Apply To: { Apply To }; Date / Time: { Date / Time } ",
    "Source": "SSA Web (all personas) = 4"
}
export const PledgeCanceled = {
    "Name": "Pledge History",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Pledge Canceled",
    "Event": "Agency Pledge Canceled",
    "EventDetails": "Contract Account: {Contract Account}; Pledge amount: <amount of pledge>; Funding Source: {Funding Source}; Apply To: {Apply To}; Date / Time: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const PledgeEdited = {
    "Name": "Pledge History",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Pledge Edited",
    "Event": "Agency Pledge Edited",
    "EventDetails": "Contract Account: {Contract Account}; Old Pledge amount: <amount of pledge>; New Amount: {New Amount}; Old Funding Source: {Funding Source}; New Funding Source: {New Funding Source}; Old Apply To: {Apply To}; New Apply To: {New Apply To}; Edit Date / Time: {Edit Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const RequestforQuoteLetter = {
    "Name": "Home",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Request for Quote Letter",
    "Event": "Agency Service Establishment Quote Letter",
    "EventDetails": "All Form Field Inputs from Request a Service Establishment Quote Letter page; Date / Time: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const UpdatePrimaryEmailAddress = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Update Primary Email Address",
    "Event": "Primary email updated",
    "EventDetails": "New Email: <new email>; Old Email: <old email>",
    "Source": "SSA Web (all personas) = 4"
}

export const UpdatePrimaryEmailAddressCSR = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "Update Primary Email Address",
    "Event": "Primary Email Updated",
    "EventDetails": "Username: {username}; New Email: <new email>; Old Email: <old email>",
    "Source": "SSA Web (all personas) = 4"
}

export const UpdatePrimaryContactNumber = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Update Primary Contact Number",
    "Event": "Primary contact number updated",
    "EventDetails": "New number: <new number>; Old number: <old number>",
    "Source": "SSA Web (all personas) = 4"
}

export const UpdateAlternateContactNumber = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Update Alternate Contact Number",
    "Event": "Alternate contact number updated",
    "EventDetails": "New number: <new number>; Old number: <old number>",
    "Source": "SSA Web (all personas) = 4"
}

export const FailedRegistration = {
    "Name": "Agency Account Registration",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Failed registration",
    "Event": "Failed registration",
    "EventDetails": "Date / Time: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}



export const UpdatePrimaryContactNumberCSR = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "Update Primary Contact Number",
    "Event": "Mobile Phone Number updated",
    "EventDetails": "Username: {username}; New number: <new number>; Old number: <old number>",
    "Source": "SSA Web (all personas) = 4"
}

export const UpdateSecondaryContactNumber = {
    "Name": "My Profile",
    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "Update Secondary Contact Number",
    "Event": "Landline Number Updated",
    "EventDetails": "Username: {username}; New number: <new number>; Old number: <old number>",
    "Source": "SSA Web (all personas) = 4"
}
export const CSRUnlockedUser = {

    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "CSR Unlocked User",
    "Event": "CSR Unlocked User",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const CSRlockedUser =
{
    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "CSR locked User",
    "Event": "CSR Locked User",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const PasswordRecoveryLinkSent = {
    "Name": "Forgot Username?",
    "Module": "Agency",
    "Initiated by": "CSR",
    "SSA Activity Use Case": "Password Recovery Link Sent",
    "Event": "CSR sent Password Recovery Link",
    "EventDetails": "Contract Account: {Contract Account}\nBP : {BP Number}",
    "Source": "SSA Web (all personas) = 4"
}
export const UserActivationSuccessfulUsingRegistrationLink =
{
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "User Activation Successful Using Registration Link",
    "Event": "Profile Activated Succesfully",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const LoginAttemptFailed =
{
    "Name": "Login",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Login attempt Failed",
    "Event": "Login Attempt Failed",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const LoginAttemptSuccessful =
{
    "Name": "Login",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Login attempt Successful",
    "Event": "Login Attempt Successful",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}

export const ForgotPasswordLinkSent =
{
    "Module": "Agency",
    "Name": "Login",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Forgot Password Link Sent",
    "Event": "Forgot Password Link Sent Successfully",
    "EventDetails": "Email: {Email}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const PasswordChangedSuccessful =
{
    "Name": "Login",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Password Changed - Successful",
    "Event": "Recovered Password Using Password Reset Link",
    "EventDetails": "Email: {Email}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const PasswordChangedFailed =
{
    "Module": "Agency",
    "Name": "Login",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Password Changed - Failed",
    "Event": "Password Recovery Failed",
    "EventDetails": "Email: {Email}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const ForgotUsername =
{
    "Module": "Agency",
    "Name": "Login",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Forgot Username",
    "Event": "Retrieved Username using Forgot Username flow",
    "EventDetails": "Email: {Email}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const ProfilePasswordChangeSuccessful =
{
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Profile Password Change - Successful",
    "Event": "Password Updated Successfully",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const ProfilePasswordChangeAttemptFailed =
{
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Profile Password Change Attempt Failed",
    "Event": "Password Update Failed",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const UsernameChangeAttemptFailed =
{
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Username Change Attempt Failed",
    "Event": "Username Update Failed",
    "EventDetails": "Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const UsernameChangeSuccessful =
{
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Username Change - Successful",
    "Event": "Username Updated Successfully",
    "EventDetails": "Old Username:{username}; New Username: {username}; DateTime: {Date / Time}",
    "Source": "SSA Web (all personas) = 4"
}
export const Logout =
{
    "Name": "Login",
    "Module": "Agency",
    "Initiated by": "Agency User Initiated",
    "SSA Activity Use Case": "Logout",
    "Event": "Logout",
    "EventDetails": "Email: {Email} ;  DateTime: {Date / Time};",
    "Source": "SSA Web (all personas) = 4"
}
