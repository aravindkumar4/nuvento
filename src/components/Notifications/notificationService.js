import axios from 'axios';

export const getUserMessages = (params, callback) => {

    var uriParams =
    {
        "searchString": params.searchString,
        "status": params.status,
        "categories": params.categories,
        "index": 0,
        "pageLength": 0,
        "mode": (params.mode != undefined && params.mode != null) ? params.mode : 0
    }
    var uri = "https://d2.smartcmobile.net/SWG-NOTIFICATION-DEV-API/api/1/Notification/GetMessagesByUserId?userId=121";
    // UserNotification.GetMessagesByUserId + "?userId=" + SessionAccessor.UserID;
    new ApiHelper().putNoAsync(uri, uriParams, "Notification")
        .then(resp => {
            callback(resp, true, params.status);
        }).catch((error) => {
            callback(error, false, params.status);
        });
}

//Used to update notification status
export const updateMessageStatus = (messageId, status, callback, isUnreadClick) => {
    var params =
    {
        "messageId": messageId,
        "status": status
    }

    var uri = "https://d2.smartcmobile.net/SWG-NOTIFICATION-DEV-API/api/1/Notification/UpdateMessageStatus?userId=121";
    // UserNotification.UpdateMessageStatus + "?userId=" + SessionAccessor.UserID;
    new ApiHelper().putNoAsync(uri, params, "Notification")
        .then(resp => {
            callback(resp, true, status, isUnreadClick);
        }).catch((error) => {
            callback(error, false, status, isUnreadClick);
        });
}

class ApiHelper {
    putNoAsync(url, parms) {
        return axios.put(url, parms);
    }
}
