import { GridSearchColumn } from "../common/GridSearchColumn";

const RowsPerPageOptions = [5, 10, 25]

const Desc = (a, b, orderBy) => {
  
    var formattedA;
    var formattedB;

    if (orderBy == "PledgeValue") {

        formattedA = a[orderBy] ? parseInt(a[orderBy]) : a[orderBy];
        formattedB = b[orderBy] ? parseInt(b[orderBy]) : b[orderBy];

        if (formattedB < formattedA) {
            return -1;
        }
        if (formattedB > formattedA) {
            return 1;
        }

        return 0;

        // if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
        //     return -1;
        // }
        // if (parseInt(b[orderBy]) >parseInt(a[orderBy])) {
        //     return 1;
        // }
        // return 0;
    } else if (orderBy == "PledgeDate" || orderBy == "ExpiryDate") {
        formattedA = a[orderBy] ? new Date(a[orderBy]) : a[orderBy];
        formattedB = b[orderBy] ? new Date(b[orderBy]) : b[orderBy];

        if (formattedB < formattedA) {
            return -1;
        }
        if (formattedB > formattedA) {
            return 1;
        }

        return 0;
    }

    else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

const StableSort = (array, cmp) => {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const GetSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => Desc(a, b, orderBy) : (a, b) => -Desc(a, b, orderBy);
}

const CustomDesc = (a, b, orderBy) => {
  
    var formattedA;
    var formattedB;

    // if (orderBy !== "status") {
    //     formattedA = a[orderBy] ? a[orderBy].toLocaleLowerCase() : a[orderBy];
    //     formattedB = b[orderBy] ? b[orderBy].toLocaleLowerCase() : b[orderBy];
    // } else 
    
    if (orderBy == "PledgeValue") {
        formattedA = a[orderBy] ? parseInt(a[orderBy]) : a[orderBy];
        formattedB = b[orderBy] ? parseInt(b[orderBy]) : b[orderBy];
    }
    else if (orderBy == "PledgeDate" || orderBy == "ExpiryDate") {
        formattedA = a[orderBy] ? new Date(a[orderBy]) : a[orderBy];
        formattedB = b[orderBy] ? new Date(b[orderBy]) : b[orderBy];

        if (formattedB < formattedA) {
            return -1;
        }
        if (formattedB > formattedA) {
            return 1;
        }

        return 0;
    }
    else {
        formattedA = a[orderBy] ;
        formattedB =  b[orderBy];
    }

    if (formattedB < formattedA) {
        return -1;
    }
    if (formattedB > formattedA) {
        return 1;
    }

    return 0;
}

const CustomGetSorting = (order, orderBy) => {

    if (orderBy == 'Status') {
        return order === 'desc' ? (a, b) => Desc(a, b, orderBy) : (a, b) => -Desc(a, b, orderBy);
    }
    else {
        return order === 'desc' ? (a, b) => CustomDesc(a, b, orderBy) : (a, b) => -Desc(a, b, orderBy);
    }
}

const SearchGrid = (Data, SearchText, GridType) => {
    return Data.filter(function (item) {
        var IsMatched = false;
        GridSearchColumn[GridType].forEach(function (element, i) {
            if (item[element] != undefined) {
                var index = (item[element] == null || item[element] == undefined ? -1 : (item[element].toString().toLowerCase().indexOf(SearchText.toLowerCase())));
                if (index >= 0) {
                    if (index >= 0) {
                        IsMatched = true;
                        return false;
                    }
                }
            }
        })
        if (IsMatched)
            return item;
    });
}

export {
    SearchGrid,
    GetSorting,
    CustomGetSorting,
    StableSort,
    Desc,
    RowsPerPageOptions
}