export const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);


export const GetMonthFromTwoDate = (fromDate, toDate) => {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    const months = [];
    for (let year = fromYear; year <= toYear; year++) {
        let month = year === fromYear ? fromMonth : 0;
        const monthLimit = year === toYear ? toMonth : 11;
        for (; month <= monthLimit; month++) {
            months.push({ year, month: Month[month] })
        }
    }
    return months;
}

export const GetDayForGraph = (start, end) => {
    var arr = new Array(),
        dt = new Date(start);

    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
}

export const GetHourForGraph = (interval) => {
    var x = interval; //minutes interval
    var times = []; // time array
    var tt = 0; // start time
    var ap = ['AM', 'PM']; // AM-PM

    for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = (tt % 60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }

    return times;

}

export const GetPreviousDayDate = (day) => {
    let dt = new Date();
    dt.setDate(dt.getDate() - day);
    return dt
}

export const GetNextDayDate = (day) => {
    let dt = new Date();
    dt.setDate(dt.getDate() + day);
    return dt
}


export const GetPreviousMonth = (month) => {
    var dt = new Date();
    dt.setMonth(dt.getMonth() - month);
    dt.setDate(1);
    return dt;
}

export const GetCurrentMonth = () => {
    return GetDayForGraph(firstDay, lastDay);
}

export const GetCurrentMonthDisableDate = () => {
    const currentMonth = GetDayForGraph(firstDay, lastDay);
    let disable = []
    currentMonth.forEach((d, i) => {
        if ([new Date(2020, 4, 12), new Date(2020, 4, 15),
        new Date(2020, 4, 20), new Date(2020, 4, 25)].findIndex(m => m.getDate() == d.getDate()) >= -1) {
            disable.push(d);
        }
    })

    return disable;
}


export const GetLastWeek = (week) => {
    let dt = new Date();
    const dayDiff = 6 - dt.getDay();
    const endDt = GetNextDayDate(6 - dt.getDay());
    const startDt = GetPreviousDayDate(27 - (endDt.getDate() - dt.getDate()));
    let _endDt = GetPreviousDayDate(27 - (endDt.getDate() - dt.getDate()));
    let weekArr = [];
    let count = 1;
    while (count <= week) {
        _endDt.setDate(_endDt.getDate() + 6);
        let week = `${startDt.toLocaleDateString()} - ${_endDt.toLocaleDateString()}`;
        _endDt.setDate(_endDt.getDate() + 1);
        startDt.setDate(startDt.getDate() + 7);
        weekArr.push({ week });
        count++;
    }
    return weekArr;
};

export const GetStartDateFromMonthAndYear = (month, year) => {
    const _month = Month.findIndex((m) => m == month);
    return new Date(year, _month, 1);
};

export const GetLastDateFromMonthAndYear = (month, year) => {
    const _month = Month.findIndex(m => m == month);
    return new Date(year, _month + 1, 0);
};

export const GetLastDate = () => {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const DateDiffTwoDate = (startDt, endDt) => {
    var Difference_In_Time = new Date(endDt).getTime() - new Date(startDt).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
};

Date.prototype.CustomISODate = function () {
    let dt = this.toLocaleDateString();
    if (dt) {
        const year = dt.split("/")[2],
            month = dt.split("/")[0],
            day = dt.split("/")[1];
        return `${year}-${day.length == 1 ? "0" + day : day}-${
            month.length == 1 ? "0" + month : month
            }T00:00:00`;
    } else {
        return new Date();
    }
};


Date.prototype.GreetingMessage = function () {
    var today = this;
    var curHr = today.getHours();
    let message;
    if (curHr < 12) {
        message = "Good Morning";
    } else if (curHr < 18) {
        message = "Good Afternoon";
    } else {
        message = "Good Evening";
    }
    return message;
};

