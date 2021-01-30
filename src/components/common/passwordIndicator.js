import React from "react";

export function validatePasswordIndicator(event, isCheck, id) {
    var pswd = "";
    if (isCheck == true)
        pswd = document.getElementById(id).value;
    else
        pswd = event.target.value;
    addValidInvalid(pswd);
    check_strength(pswd, isCheck != true ? event.target.id : id);
}

var upperCase = new RegExp('[A-Z]');
var lowerCase = new RegExp('[a-z]');
var numbers = new RegExp('[0-9]');
var specialchars = new RegExp('^[@$!%*#?& ~^()=<>,;:\'\"[\]{}|\/+-_.]*$');
var securitylevel = "0";

function check_strength(thisval, thisid) {
    var characters = 0; var capitalletters = 0; var loweletters = 0; var number = 0; var special = 0;var specialNumber=0;
    var element = document.getElementsByClassName('strengthdiv_progress')[0];
    switch (securitylevel) {
        case "0":
            if (thisval.length >= 8) { characters = 1; } else { characters = -1; }
            if (thisval.match(upperCase)) { capitalletters = 1; } else { capitalletters = 0; }
            if (thisval.match(lowerCase)) { loweletters = 1; } else { loweletters = 0; }
            if (thisval.match(numbers)) { specialNumber = 2; } else { specialNumber = 0; }
            if (checkForSpecialCharAllowed(thisval)) {
                if (checkForSpecialCharNotAllowed(thisval)) {
                    specialNumber = 2;
                }
                else {
                    specialNumber = 0;
                    color = "#AF0220";
                    width = '30%';
                    text = "Invalid Password.";
                    element.innerHTML = '<div class="strength_meter"><div data-meter="' + thisid + '"></div><div class="pro_wrapper" style="border:0"><div style="height:8px;float:left;border-radius:14px;width:100%;background-color:transparent;" data-meter-progress="' + thisid + '"><div id="myBar" style="height:8px;float:left;border-radius:14px;width:' + width + ';background-color:' + color + ';"></div></div></div><span style="color:' + color + ';">' + text + '</span></div></div>';
                    return false;
                }
            }
            else { special = 0; }
            break;
        
    }
    var total = characters + capitalletters + loweletters + specialNumber;
    if (!thisval.length) { total = -1; }

    get_total(total, thisid, thisval.length);

}

function get_total(total, thisid, len) {
    var element = document.getElementsByClassName('strengthdiv_progress')[0];
    if (len >= 1) {
        element.style.display = "block";
    }
    var i = 4;
    switch (securitylevel) {
        case "1": i = 3; break;
        case "0": i = 4; break;
        case "2": i = 1; break;
    }
    var text = ""; var width = ""; var color = "";

    if (total <= i || len < 8) {
        color = "#AF0220";
        width = '30%';
        text = "Invalid Password.";
    }

    else if (total >= i) {
        if (len >= 11 && len < 14) {
            color = "#0096C4";
            text = "Strong Password ";
            width = '90%';
        }
        else if (len >= 14 && len <= 100) {
            if (total >= 4) {
                width = '100%'; color = "#00FFFF";
                text = "Very Strong Password ";
            }
            else {
                color = "#0096C4";
                text = "Strong Password ";
                width = '90%';
            }
        }
        else if (len >= 8 && len < 11) {
            width = '60%'; color = "#AF0220";
            text = "Weak Password ";
        }

        else {
            color = "#AF0220"; width = '30%';
            text = "Invalid Password.";
        }
    }
    element.innerHTML = '<div class="strength_meter"><div data-meter="' + thisid + '"></div><div class="pro_wrapper" style="border:0"><div style="height:8px;float:left;border-radius:14px;width:100%;background-color: transparent;" data-meter-progress="' + thisid + '"><div id="myBar" style="height:9px;float:left;border-radius:14px;width:' + width + ';background-color:' + color + ';"></div></div></div><span id="txtpasswordInfo" style="color: #222221;font-weight: normal;font-size: 12px;margin-top: 18px;display: block;margin-bottom: 10px;">' + text + '</span></div></div>';
}


function hidePwIndctrDiv(obj) {

    if (obj != undefined) {
        document.getElementById("pswd_info").style.display = "none";
    }
}

function showPwIndctrDiv(obj) {
    document.getElementById("pswd_info").style.display = "block";
}

function RemoveAddClass(element, removeClass, addClass) {
    var aElement = document.getElementById(element)
    aElement.classList.remove(removeClass)
    aElement.classList.add(addClass)
}
function addValidInvalid(pswd) {

    try {
        if (pswd.length < 8) {
            RemoveAddClass('length', 'valid', 'invalid');
        }
        else {
            RemoveAddClass('length', 'invalid', 'valid');
        }
        //validate letter
        if (pswd.match(/[a-z]/)) {
            RemoveAddClass("letter", "invalid", "valid")
        } else {
            RemoveAddClass("letter", "valid", "invalid")
        }


        //validate capital letter
        if (pswd.match(/[A-Z]/)) {
            RemoveAddClass("capital", "invalid", "valid")
        } else {
            RemoveAddClass("capital", "valid", "invalid")
        }

        //validate Number or Special Chars

        if (pswd.match(/\d/) || checkForSpecialCharAllowed(pswd)) {
            if (checkForSpecialCharNotAllowed(pswd))
                RemoveAddClass("specialNumber", "invalid", "valid")
            else
                RemoveAddClass("specialNumber", "valid", "invalid")
        }else{
            RemoveAddClass("specialNumber", "valid", "invalid")
        }

    }
    catch (e) {
        console.log(e);
    }
}

var checkForSpecialCharNotAllowed = function (string) {
    var specialChars = "'¿§«»ω⊙¤°℃℉€¥£¢¡®©";
    for (var i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return false;
        }
    }
    return true;
};
var checkForSpecialCharAllowed = function (string) {

    var specialCharsAllowed = "@$!%*#?&~^()=<>,;:`\"[\]{}|\/+-_.";
    for (var i = 0; i < specialCharsAllowed.length; i++) {
        if (string.indexOf(specialCharsAllowed[i]) > -1) {
            return true;
        }
    }
    return false;
};




export function RenderPasswordIndicator(props) {
    return (
        <>
            <span id="pwdStrength" style={{ display: 'none' }}></span>
            <div id="pswd_info" class="pswd_info" style={{ display: props.ShowPasswordIndicator ? 'block' : 'none' }}>
                <div class="strengthdiv_progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                </div>
                <h5>Password must meet the following requirements:</h5>
                <ul>
                    <li id="length" class="invalid">Minimum 8 characters (32 maximum)</li>
                    <li id="letter" class="invalid">At least 1 lowercase letter</li>
                    <li id="capital" class="invalid">At least 1 uppercase letter</li>
                    <li id="specialNumber" class="invalid">At least 1 number OR special character</li>
                </ul>
            </div>
        </>
    )
}