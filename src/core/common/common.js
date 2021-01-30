import React from 'react'
import SessionAccessor from './sessionAccessor'
// import { toast } from 'react-toastify';
// import CircularProgress from '@material-ui/core/CircularProgress';
//import { logout } from "../../views/header/header";
// import { OpenCloseLogoutPopup } from '../../components/common/sessionExpired'
//import { appSettings } from '../../../public/appsettings'
import FormatDate from "./dateformat";
import { User } from './../../core/URLConfig';
// import ApiHelper from '../common/apiHelper'
import { isObjectEmpty } from './validate'
import axios from 'axios';
// import FileSaver from 'file-saver';
import { CheckIfNullOrEmpty } from './../../core/common/validate'
import RequestHelper from "./../../common/RequestHelper";
function DateDiff(date1, date2) {
    var diffMs = (date1 - date2);
    var diffDays = Math.floor(diffMs / 86400000);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.floor((diffMs % 86400000) / 60000);
    return { MilliSeconds: diffMs, Days: diffDays, Hour: diffHrs, Minutes: diffMins };
}
var t;
//export function SessionTracker() {
//    localStorage.setItem("IdleTime", new Date());
//    ClearSessionInterval();
//    t = setInterval(function () {
//        clearInterval(t);
//        document.getElementById("setLogPopupButton").click();
//    }, appSettings.Session.SessionTimeInMiliSecond);
//    window.onmousedown = CheckBrowserIdleTime;
//    window.onmousemove = CheckBrowserIdleTime;
//    window.onclick = CheckBrowserIdleTime;
//    window.onkeypress = CheckBrowserIdleTime;
//    window.onscroll = CheckBrowserIdleTime;
//    function ResetTimers() {
//        localStorage.setItem("IdleTime", new Date());
//    }
//    function ClearSessionInterval() {
//        clearInterval(t);
//    }
//    function CheckBrowserIdleTime() {
//        var idleTime = new Date(localStorage.getItem("IdleTime"));
//        var getDateDifference = DateDiff(new Date(), idleTime);
//        if (getDateDifference.MilliSeconds >= appSettings.Session.SessionTimeInMiliSecond) {
//            ClearSessionInterval();
//            if (document.getElementById("setLogPopupButton") != null)
//                document.getElementById("setLogPopupButton").click();
//        }
//        else {
//            ResetTimers();
//            ClearSessionInterval();
//            t = setInterval(function () {
//                clearInterval(t);
//                document.getElementById("setLogPopupButton").click();
//            }, appSettings.Session.SessionTimeInMiliSecond);
//        }
//    }
//}

export function GenerateBanner(props, bannerIndex) {
    var pageName = props.pageName != undefined ? props.pageName : "";
    var banners = [];
    banners = JSON.parse(localStorage.getItem("Banners"));
    if (banners) {
        const filBans = banners.filter(bans => bans.PageName == pageName && bans.BannerIndex == bannerIndex);
        if (filBans && filBans.length > 0) {
            var elms = document.querySelector("[BannerIndex='" + bannerIndex + "']");
            if (elms)
                elms.attributes["href"].value = filBans[0].RedirectURL;

            return <a href={filBans[0].RedirectURL} target="_blank"><img src={filBans[0].ImagePath} className="rightbannerimg" alt="faqbanner" /></a>
        }
    }

}

//export function SetSessions(data) {
//    SessionAccessor.UserID = data.user.id;
//    SessionAccessor.Name = data.user.userName;
//    SessionAccessor.Email = data.user.email;
//    SessionAccessor.FirstName = data.user.firstName;
//    SessionAccessor.MiddleName = data.user.middleName != null ? data.user.middleName : "";
//    SessionAccessor.LastName = data.user.lastName;
//    SessionAccessor.TwoFactorAuthenticated = data.customAttribute.twoFactorAuthenticate;
//    SessionAccessor.MobileNumber = data.customAttribute.phoneNumber;
//    SessionAccessor.FullName = (SessionAccessor.FirstName + " " + (SessionAccessor.MiddleName != null ? SessionAccessor.MiddleName : "") + " " + SessionAccessor.LastName);
//}

//export function GetSessions() {


//    var user = {};
//    user.UserID = SessionAccessor.UserID;
//    user.Name = SessionAccessor.Name;
//    user.Email = SessionAccessor.Email;
//    return user;
//}

export function MaskPhoneNumber(number) {
    var maskedNumber = number;
    if (maskedNumber && maskedNumber.length > 0) {
        maskedNumber = maskedNumber.replace(/[^0-9]/g, '')
    }
    if (maskedNumber && maskedNumber.length >= 1 && maskedNumber.length <= 3)
        return MaskStep1(maskedNumber);
    if (maskedNumber && maskedNumber.length > 3 && maskedNumber.length <= 6) {
        var step1res = MaskStep1(maskedNumber.substring(0, 3))
        var step2res = MaskStep2(maskedNumber.substring(3, 6))
        return step1res + step2res;
    }
    if (maskedNumber && maskedNumber.length > 6 && maskedNumber.length <= 10) {
        var step1res = MaskStep1(maskedNumber.substring(0, 3))
        var step2res = MaskStep2(maskedNumber.substring(3, 6))
        var step3res = MaskStep3(maskedNumber.substring(6, maskedNumber.length))
        return step1res + step2res + step3res;
    }
    return maskedNumber;
}

export function MaskSocialSecurityNumber(number) {
    var maskedNumber = number;
    if (maskedNumber && maskedNumber.length > 0) {
        maskedNumber = maskedNumber.replace(/[^0-9]/g, '')
    }
    if (maskedNumber.length >= 1 && maskedNumber.length <= 3)
        return MaskStep1(maskedNumber);
    if (maskedNumber.length > 3 && maskedNumber.length <= 5) {
        var step1res = MaskStep1(maskedNumber.substring(0, 3))
        var step2res = "-" + maskedNumber.substring(3, 5);
        return step1res + step2res;
    }
    if (maskedNumber.length > 5 && maskedNumber.length <= 9) {
        var step1res = MaskStep1(maskedNumber.substring(0, 3))
        var step2res = "-" + maskedNumber.substring(3, 5) + "-";
        var step3res = maskedNumber.substring(6, maskedNumber.length) + ")";
        return step1res + step2res + step3res;
    }
    return maskedNumber;
}

export function UnMaskPhoneNumber(number) {
    var output = number.replace(new RegExp(/[^\d]/, 'g'), ''); // Remove every non-digit character
    return output;
}

function MaskStep1(number) {
    return '' + number;
}
function MaskStep2(number) {
    return '-' + number;
}
function MaskStep3(number) {
    return '-' + number;
}

export function MaskTaxID(value) {
    var maskedNumber = value;
    if (maskedNumber && maskedNumber.length > 0) {
        maskedNumber = maskedNumber.replace(/[^0-9]/g, '')
    }
    if (maskedNumber.length > 2 && maskedNumber.length <= 9)
        return maskedNumber.substring(0, 2) + '-' + maskedNumber.substring(2, maskedNumber.length);
    return maskedNumber;
}

export function FormatCardNumber(number, isAdd) {
    number = UnMaskPhoneNumber(number);
    var formatCardNumber = "";
    if (number.length > 0) {
        var data = number.split('')
        var counter = 0;
        for (var x = 0; x < number.length; x++) {
            if (x == 0) {
                formatCardNumber += "("
            }
            if (counter == 4) {
                formatCardNumber += "-";
                formatCardNumber += data[x];
                counter = 0;
            } else {
                formatCardNumber += data[x];
            }
            counter++;
        }
        if (formatCardNumber.length == 20 && isAdd == true) {
            formatCardNumber += ")";
        }
    }
    return formatCardNumber;
}

export function GetFormattedDataWithVisibleLast4Char(value) {
    value = UnMaskPhoneNumber(value);
    if (value != null & value != undefined)
        return value.replace(/\d(?=\d{4})/g, "*");
    else
        return value;
}

export const isGUID = (uuid) => {
    let value = "" + uuid;
    value = value.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    return value !== null
}


export var getJSON = function (url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {

        var status = xhr.status;

        if (status == 200) {
            callback(xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};


//export const BrowserDeviceId = `||${window.BrowserInfo.browser}||${window.BrowserInfo.browserMajorVersion}||${window.BrowserInfo.os}||${window.BrowserInfo.osVersion}||`;

//export const OSVerion = window.BrowserInfo.osVersion;


//export const Client = 'Web';
//export const OS = () => {
//    const browserInfo = window.browserInfo;
//    return browserInfo.os;
//}

//export const SetIPAddress = (callback) => {
//    if (!SessionAccessor.IPAddress)
//        getJSON("https://api.ipify.org?format=json",
//            function (data) {
//                SessionAccessor.IPAddress = data.ip;
//                SetBrowserDeviceID(callback);
//            })
//    else if (!SessionAccessor.BrowserDeviceID)
//        SetBrowserDeviceID();
//}

//export const SetBrowserDeviceID = (callback) => {
//    const url = Users.getLocationByIP.format([SessionAccessor.IPAddress])
//    new ApiHelper().get(url).then(resp => {
//        if (resp.data.status.code == 200) {
//            SessionAccessor.BrowserDeviceID = `${BrowserDeviceId}${resp.data.data.region}||`;
//        } else {
//            console.log(resp);
//            SessionAccessor.BrowserDeviceID = "";
//        }
//        callback(true)
//    }).catch((error) => {
//        callback(false);
//    });
//}

export const GetDottedValue = (value) => {
    if (value && value.length > 0) {
        var resp = "";
        for (var i = 0; i <= value.length; i++) {
            resp += "*";
        }
        return resp;
    }
    return "";
}

//export const Loader = (enable)=>{
//    const enableLoader = enable ? true : false;
//    return(
//        <>
//        {enableLoader && <div className='custom-loader'><CircularProgress className="SpinnCirc" size={50} thickness={3} /></div>}
//        </>
//    )
//}

export function Loader(isShow) {
    isShow ? (document.getElementById("showLoader") !== null ? document.getElementById("showLoader").click() : false)
        : (document.getElementById("hideLoader") !== null ? document.getElementById("hideLoader").click() : false)
}

export function HandleCustomerParms(payload, parm) {
    var key = '';
    switch (parm) {
        case 'firstName':
            key = payload.Payload['customerData'].firstName;
            break;
        case 'middleName':
            key = payload.Payload['customerData'].middleName;
            break;
        case 'lastName':
            key = payload.Payload['customerData'].lastName;
            break;
        case 'emailAddress':
            key = payload.Payload['customerData'].emailAddress;
            break;
        case 'primaryPhone':
            key = payload.Payload['customerData'].primaryPhone;
            break;
        case 'secondaryPhone':
            key = payload.Payload['customerData'].secondaryPhone;
            break;
        case 'careOf':
            key = payload.Payload['customerData'].careOf;
            break;
    }
    return key;
}

export function tConvert(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 0) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
}

export function formatDate(date) {
    if (date == '' || date == null || date.length != 8)
        return;
    else {
        var year = date.substring(0, 4);
        var month = date.substring(4, 6);
        var day = date.substring(6, 8);

        return month + '/' + day + '/' + year;
    }
}

export function getFromToDates(from, to) {
    if (from == '' || from == null || from.length != 8 || to == '' || to == null || to.length != 8)
        return { fromDate: new Date(), toDate: new Date() };
    var fromDate = formatDate(from);
    var toDate = formatDate(to);
    return { fromDate: new Date(fromDate), toDate: new Date(toDate) };
}

export const FormatAddress = (item) => {
    if (item) {
        var addItem = (item.address1 == null ? "" : item.address1 + ", ") + (item.address2 == null ? "" : item.address2 + ", ") + (item.city == null ? "" : item.city + ", ") + (item.state == null ? "" : item.state + " ") + (item.postalCode == null ? " " : item.postalCode);
        return addItem.replace(/,,/g, ",").replace(/, ,/g, ",")
    }

}

export const FormatServiceAddress = (isFormat, item) => {
    if (isFormat && item) {
        var addItem = (item.houseNumber == null ? "" : item.houseNumber + " ") + (item.street == null ? "" : item.street + ", ") + (item.city == null ? "" : item.city + ", ") + (item.region == null ? "" : item.region + " ") + (item.postalCode == null ? " " : item.postalCode);
        return addItem.replace(/,,/g, ",").replace(/, ,/g, ",")
    }
}

export const Convert = {
    ToInt: function (value) {
        if (value !== undefined && value !== "" && value != null) {
            value = TrimWhiteSpace(value);
            isNaN(value) ? value = "0" : value = value.toString().trim().replace("$", "").replace(" ", "");
            return parseInt(value);
        }
        return 0;
    },
    ToString: function (value) {
        if (value !== undefined && value !== "" && value != null) {
            return value.toString().trim();
        }
        return "";
    },
    ToFloat: function (value) {
        if (value !== undefined && value !== "" && value != null) {
            value = TrimWhiteSpace(value);
            isNaN(value) ? value = "0" : value = value.toString().trim().replace("$", "").replace(" ", "");
            return parseFloat(value);
        }
        return 0;
    },
    //ToFloatWithDecmialPlace: function (value, fixedTo) {
    //    if (fixedTo !== undefined && fixedTo !== 0 && fixedTo != null) {
    //        value = TrimWhiteSpace(value);
    //        let fixedToZeros = new Array(fixedTo).fill(0);
    //        let strFixedZeros = "";
    //        fixedToZeros.map(item => {
    //            strFixedZeros += this.ToString(item)
    //        })

    //        isNaN(value) ? value = "0" : value = value.toString().trim().replace("$", "").replace(" ", "");
    //        if (value == "0")
    //            return value + "." + strFixedZeros
    //        else
    //            return parseFloat(parseFloat(value).toFixed(fixedTo));
    //    }
    //    else if (appSettings.Settings.DecimalPlace !== undefined && appSettings.Settings.DecimalPlace !== 0 && value != null) {
    //        value = TrimWhiteSpace(value);
    //        isNaN(value) ? value = "0" : value = value.toString().trim().replace("$", "").replace(" ", "");
    //        return parseFloat(parseFloat(value).toFixed(appSettings.Settings.DecimalPlace));
    //    }
    //    else if (value !== undefined && value !== "" && value != null) {
    //        return parseFloat(value).toFixed(2);
    //    }
    //    return 0.00;
    //},
    ToDateTime: function (value) {
        if (value !== undefined && value !== "" && value != null) {
            return new Date(value);
        } else {
            return new Date('0001', '1', '1');
        }
    },
    ToDateTimeWithFormat: function (value, format) {
        if (value !== undefined && value !== "" && value != "Invalid Date" && value != null) {
            return FormatDate(new Date(value), format);
        }
        return value;
    },
    ToBoolean: function (value) {
        if (value !== undefined && value != null && value !== "" && (value === 1 || value === 0 || value === "0" || value === "1" || value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
            switch (value) {
                case "1":
                case 1:
                case "true":
                    return true;
                case "0":
                case 0:
                case "false":
                    return false;
            }
            return "Invalid value";
        }
    },
    ToLowerCase: function (value) {
        if (value !== undefined && value !== null) {
            return value.toString().trim().toLowerCase();
        } else {
            return "";
        }
    },
    ToNewDateTime: function (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }
};

export function TrimLeadingZero(s) {
    return s.replace(/^0+/, '');
}

export function TrimWhiteSpace(x) {
    if (x !== undefined) {
        return x.toString().replace(/^\s+|\s+$/gm, '').replace(/ +/g, "").replace(/,/g, '');
    }
    return x;
}

export function GetCCExpiryYears(currentMonth) {
    var currentYear = new Date().getFullYear()
    var yearSelection = [];
    var yearStart = 0;
    var yearEnd = 10;

    if (currentMonth != undefined && currentMonth != null) {
        if (currentMonth < new Date().getMonth() + 1) {
            yearStart = 1;
        }
    }
    for (var i = yearStart; i < yearEnd; i++) {
        yearSelection.push(currentYear + i)
    }
    return yearSelection;
}

export function GetCCExpiryMonths(selectedYear) {

    var currentYear = new Date().getFullYear()
    var monthSelection = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var monthNameSelection = [
        { 'label': 'January', 'key': '01' },
        { 'label': 'February', 'key': '02' },
        { 'label': 'March', 'key': '03' },
        { 'label': 'April', 'key': '04' },
        { 'label': 'May', 'key': '05' },
        { 'label': 'June', 'key': '06' },
        { 'label': 'July', 'key': '07' },
        { 'label': 'August', 'key': '08' },
        { 'label': 'September', 'key': '09' },
        { 'label': 'October', 'key': '10' },
        { 'label': 'November', 'key': '11' },
        { 'label': 'December', 'key': '12' }]
    if (selectedYear == undefined || selectedYear == null || selectedYear > currentYear) {
        return monthNameSelection;
    } else {
        var monthNameTemp = [];

        monthSelection = monthSelection.splice(new Date().getMonth(), 12 - new Date().getMonth());
        var aa = monthSelection.map((option, Index) => (
            monthNameSelection.filter(x => x.key == option)[0] != undefined ?
                monthNameTemp.push(monthNameSelection.filter(x => x.key == option)[0]) : ""
        ));

        monthNameSelection = monthNameTemp;
        return monthNameSelection;
    }
}

export function GetAppoinmentTimeSlot(appoinmentSlot, timeSlots) {
    if (isObjectEmpty(appoinmentSlot) || timeSlots.length <= 0)
        return;
    var slot = timeSlots.filter(x =>
        x.appointmentDate == appoinmentSlot.orderDate && x.orderType == appoinmentSlot.orderType
    )
    return slot;
}

export function AutoMapper(obj1, obj2) {
    if (obj1 != null && obj2 != null) {
        for (var key in obj1) {
            obj1[key] = obj2[key]
        }
    }
    return obj1;
}

export function UpdateNotificationCount(count) {
    if (count != undefined && !isNaN(count) && Number(count) == 0) {
        count = "";
    }
    if (count === "") {
        document.getElementById("NotificationUnreadCount") !== null ? document.querySelector('#NotificationUnreadCount span').style.display = "none" : false
    }
    else {
        document.getElementById("NotificationUnreadCount") !== null ?
            document.querySelector('#NotificationUnreadCount span').innerText = count : false;
        document.querySelector('#NotificationUnreadCount span').style.display = "";
    }
}

export function MaskPostalCode(number) {
    var maskedNumber = number;
    if (maskedNumber && maskedNumber.length > 0) {
        maskedNumber = maskedNumber.replace(/[^0-9]/g, '')
    }
    if (maskedNumber.length > 5)
        return maskedNumber.substring(0, 5) + '-' + maskedNumber.substring(5, maskedNumber.length);
    return maskedNumber;
}

// export function DownloadFile(fileUrl, fileName) {

//     // const FileDownload = require('js-file-download');
//     // axios.get(fileUrl)
//     //    .then((response) => {
//     //       
//     //         FileDownload(response.data, fileName);
//     //    }).catch((error) => {
//     //       
//     // });

//     axios({
//         url: fileUrl,
//         method: 'GET',
//         responseType: 'blob', // important
//     }).then((response) => {
//         let blob = new Blob([response.data], { type: "application/xml; charset=utf-8" });
//         FileSaver.saveAs(blob, fileName);
//     });

// }

export function getDateFormat() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var miliSeconds = date.getUTCMilliseconds()
    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;
    if (hour < 10)
        hour = '0' + hour;
    if (minutes < 10)
        minutes = '0' + minutes;
    if (seconds < 10)
        seconds = '0' + seconds;
    var dateTime = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.${miliSeconds}`;
    return dateTime;
}

export function GetFullName(firstName, middleName, lastName) {
    return (firstName + " " + (!CheckIfNullOrEmpty(middleName) ? middleName : "") + " " + lastName);
}

export const GetStateByCountry = (country, isOnlyState) => {
    if (localStorage.getItem("States")) {
        var states = JSON.parse(localStorage.getItem("States"));
        if (isOnlyState) {
            return states.filter(x => x.countryCode == "USA");
        }
        else if (!CheckIfNullOrEmpty(country))
            return states.filter(x => x.countryCode == country);
    }
    return null;
}

export const SetStates = (states) => {
    localStorage.setItem("States", JSON.stringify(states));
}

export const SetCountries = (countries) => {
    localStorage.setItem("Countries", JSON.stringify(countries));
}

export const GetCountry = () => {
    if (localStorage.getItem("Countries"))
        return JSON.parse(localStorage.getItem("Countries"));
    return null;
}

export const SetIPAddress = (callback) => {
    if (!SessionAccessor.IPAddress)
        getJSON("https://api.ipify.org?format=json",
            function (data) {
                
                SessionAccessor.IPAddress = data.ip;
                //SetBrowserDeviceID();
            })


}

export const SetBrowserDeviceID = (callback) => {
    const url = User.GetLocationByIP.format([SessionAccessor.IPAddress])

    RequestHelper.GET1(
        url,
        (resp) => {
            if (resp.data.status.code == 200) {
                SessionAccessor.BrowserDeviceID = `${BrowserDeviceId}${resp.data.data.region}||`;
                SessionAccessor.Country = resp.data.data.country;
            } else {
                console.log(resp);
                SessionAccessor.BrowserDeviceID = "";
            }
        });
   
}