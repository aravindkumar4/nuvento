import { ValidationTypeEnum } from "../core/Enum";

const isEmailAddress = (str) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
}

const isNumber = (str) => {
    const pattern = /^\d+$/;
    return pattern.test(str);
}


const CheckValidationOnSubmit = (state) => {
    let valid = true;
    for (const [key, value] of Object.entries(state)) {
        if (value.hasOwnProperty('error')) {
            value.error = value.value.length == 0;
            if (valid && value.value.length == 0) {
                valid = false;
            }
        }
    }
    return valid;
}

const InputValidation = ({ value, type="" }) => {
    let valid = true;
    if (value.length == 0) {
        return valid
    } else {
        switch (type) {
            case ValidationTypeEnum.OnlyNumber:
                valid = isNumber(value)
                break;

            default:
                break;
        }
        return valid;
    }
}

const scorePassword = (pass) => {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

   let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

const checkPassStrength = (pass) => {
    var score = scorePassword(pass);
    if (score > 80)
        return "strong";
    if (score > 60)
        return "good";
    if (score >= 30)
        return "weak";

    return "";
}

export {
    CheckValidationOnSubmit,
    InputValidation,
    isEmailAddress,
    checkPassStrength
}