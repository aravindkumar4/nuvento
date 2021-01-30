import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import { MDBRow, MDBCol, MDBContainer, MDBNavLink } from "mdbreact";
import Slide from "@material-ui/core/Slide";
import EditAutoPaymentDate from "./EditAutoPaymentDate";
import EditPaymentMethod from "./EditPaymentMethod";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import moment from "moment";
import ConfirmModelPopUp from "./../../shared/Views/CommonModelPopUp";
import {
    ModelPopUpSizeEnum,
    StatusCodeEnum,
    NotificationMessageTypeEnum,
    APIURLTypeEnum
} from "../../core/Enum";
import {
    GetSorting,
    CustomGetSorting,
    StableSort,
    SearchGrid,
    RowsPerPageOptions,
} from "../../core/GridFunction";

import Pagination from "./../../shared/Views/Table/TablePagination";
import Header from "../../shared/Views/Table/TableHeader";
import EnrollUnEnrollButton from "../../shared/Views/AutoPaymentButton";
import LogMenu from "../../shared/Views/LogMenu";
import { GridSearchTypeEnum } from "../../core/Enum";
import RequestHelper from "../../common/RequestHelper";
import RequestMiddleware from "../../common/RequestMiddleware";
import { Pledge, User } from "../../core/URLConfig";
import Loader from "../../shared/Views/Loader";
import NoDataFound from "../../shared/Views/Table/NoData";
import MessageBox from "../../shared/Views/MessageBox";
import ReactExport from "react-data-export";
import AccordionList from '../../components/Pledges/MakePledge/AccordionList';
import C4CService from "../Pledges/C4CService/C4CService";
import { SetUserBehaviour } from "../../core/services/setUserBehaviour";
import { PledgeCanceled } from "../../common/setBehaviourValue";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
//const DialogContent = withStyles((theme) => ({
//    root: {
//        padding: theme.spacing(2),
//    },
//}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

let counter = 0;
function createData(
    Customer,
    Account,
    PledgeValue,
    PledgeDate,
    ExpiryDate,
    Status,
    SmallText
) {
    counter += 1;
    return {
        counter,
        Customer,
        Account,
        PledgeValue,
        PledgeDate,
        ExpiryDate,
        Status,
        SmallText,
    };
}

//const rows = [
//    createData(
//        "Tatiana Santiago",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Alexandra Childress",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Jordan Porter",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Miranda Castillo",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Samantha Blanchard",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Cancelled",
//        "Second Row Information"
//    ),
//    createData(
//        "Shanika Gijsbert",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Inactive",
//        "Second Row Information"
//    ),
//    createData(
//        "Forrest Welch",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Theodor Lovrenc",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Xuan-Xi Ling",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Janice Yevgeny",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//    createData(
//        "Tatiana Santiago",
//        "12345678 Apple Seed St, Unit 1",
//        "$120.11",
//        "11/20/19",
//        "11/20/19",
//        "Active",
//        "Second Row Information"
//    ),
//];

// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

const headCells = [
    { id: "Customer", numeric: false, disablePadding: false, label: "Customer Name" },
    { id: "Account", numeric: false, disablePadding: false, label: "Account" },
    { id: "PledgeValue", numeric: false, disablePadding: false, label: "Pledge Amount" },
    {
        id: "PledgeDate",
        numeric: false,
        disablePadding: false,
        label: "Pledge Date",
    },
    { id: "ExpiryDate", numeric: false, disablePadding: false, label: "Exp Date" },
    { id: "Status", numeric: false, disablePadding: false, label: "Status" },
    { id: "Blank", numeric: true, disablePadding: false, label: " " },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [success, setSuccess] = React.useState();
    const handleonClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(true);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        color="secondary"
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
            {localStorage.getItem("RoleType") !== "Viewer" &&
                <div className="autopbuttonarea pledges_btn">
                    {numSelected > 0 ? (
                        <Button
                            component={paypledgepopup}
                            variant="contained"
                            color="secondary"
                            className="autopayenable"
                        >
                            ({numSelected}) PAY
                        </Button>
                    ) : (
                            <MDBNavLink
                                to="#"
                                variant="contained"
                                color="secondary"
                                disabled
                                className="autopaydisable"
                            >
                                PAY
                            </MDBNavLink>
                        )}
                </div>
            }
            <Snackbar
                className="snackbarmain"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={success}
                autoHideDuration={6000}
                onClose={handleonClose}
                ContentProps={{
                    "aria-describedby": "message-id",
                }}
                message={
                    <span id="message-id">
                        You have successfully unenrolled {numSelected} accounts from Auto
            Pay.
          </span>
                }
                action={[
                    <Button
                        aria-label="click here to close"
                        key="undo"
                        className="close"
                        color="secondary"
                        size="small"
                        onClick={handleonClose}
                    >
                        CLOSE
          </Button>,
                ]}
            />
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    tabRow: {
        backgroundColor: "#efefef !important",
    },
    ButtonOutlined: {
        padding: "8px 35px",
        textTransform: "uppercase",
        fontSize: "0.875rem",
        lineHeight: "1.75",
        borderRadius: 4,
        color: theme.palette.secondary.main,
        "&:hover": {
            color: '#098169',
            backgroundColor: 'transparent'
        },
    },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const paypledgepopup = (props) => {
    localStorage.setItem("EditData", JSON.stringify(props.editData));

    return (
        <Link
            to={{ pathname: "/editPledge" }}
            {...props}
        />
    );
};

const fundingSourceOptionList = [
    'ACAA - Arizona Community Action Association',
    'ACAA (HEAF) - Home Energy Assistance Fund',
    'ACAA (URRD) - Utility Repair Replacement and Deposit program',
    'CalWORKs - California Work Opportunity and Responsibility to Kids',
    'CSBG - Community Services Block Grant',
    'HUD - Dept. of Housing & Urban Development',
    'LIHEAP (EAP) - Energy Assistance Program',
    'LIHEAP (ECIP) - Energy Crisis Intervention Program',
    'LIHEAP (HEAP) - Home Energy Assistance Program',
    'LIHEAP - Low Income Home Energy Assistance Program',
    'LIHEAP Supplemental - Low Income Home Energy Assistance Program Supplemental',
    'STCS - Short Term Crisis Services',
    'SWG Energy Share',
    'SWG Low Income Bill Assistance',
    'TANF - Temporary Assistance for Needy Families',
    'UEC - Universal Energy Charge',
    'Veterans Affairs/Administration',
    'CARES ACT funding',
    'LIHEAP supplemental COVID 19',
    'SWG LIEC',
    'SWG Energyshare (ESHARE)',
    'Other',
    'None'
];


export default function EnhancedTable(props) {
    //
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const messageRef = useRef(null);
    const logMenuRef = useRef();

    //Table Operations
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");// React.useState("Customer");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dataCount, setDataCount] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState([]);//filtered data with search results in the current page
    const [searchData, setSearchData] = useState([]);//data of current page
    const [customerLookupPopUp, setCustomerLookupPopUp] = useState(false);

    const [searchText, setSearchText] = React.useState("");

    const [columnProperity, setColumnProperity] = React.useState("");



    //const [detailPopUp, setViewDetailOpen] = useState(false);
    //const [cancelPopUp, setCancelPopUp] = useState(false);
    //const [customerDetail, setCustomerDetail] = useState({});
    const [excelData, setExelData] = useState([]);

    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    const [isInitialLoaded, setIsInitialLoaded] = useState(false);

    useEffect(() => {
        //

        if (props.message && props.message.text) {
            const type = props.message.isSuccess
                ? NotificationMessageTypeEnum.Success
                : NotificationMessageTypeEnum.Error;

            messageRef.current.showMessage(
                props.message.text,
                type
            );

            props.resetMessage(true);
        }

        if (!hasBeenCalled) {
            if (data.length == 0) {
                gridBindOnInIt();

            } else {
                setLoading(false);
            }

            setHasBeenCalled(true);
        }
    }, [data]);



    const customerLookupPopUpClose = () => {
        setCustomerLookupPopUp(false);
    };

    const gridBindOnInIt = (pageNo, pageCount, isPaging) => {

        var skipCount = (page) * rowsPerPage;
        var rowsCount = rowsPerPage;

        if ((pageNo || pageNo === 0) && pageCount) {
            skipCount = (pageNo) * pageCount;
            rowsCount = pageCount;
        }
        setLoading(true);

        // Call is only to get the rows count
        const request1 = {
            agency: localStorage.getItem("AgencyNumber"),//"1100003905"
            // agency: "1100003905",
            contractAccountNumber: "",
            dateFrom: "",
            dateTo: ""
        };



        RequestHelper.POST(
            Pledge.GetAllCountAgencyPledgeHistory,
            APIURLTypeEnum.Default,
            request1,
            (res) => {
                if (res && res.data && res.data.status.code == StatusCodeEnum.OK) {
                    setDataCount(res.data.data.count);

                    gridBind(0, rowsCount, res.data.data.count);
                    // excelbinddata(res.data.data.count);
                }

            }
        );
    };

    const validaData = (data) => {
        if (data.length > 1) {
            return true;
        } else if (data.length == 1) {
            const dt = data[0];
            if (dt.msgType == 'E') {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    const excelbinddata = (count) => {

        var skipCount = 0;
        var rowsCount = count;

        // if ((pageNo || pageNo === 0) && pageCount) {
        //     skipCount = (pageNo) * pageCount;
        //     rowsCount = pageCount;
        // }
        setLoading(true);
        //

        const request1 = {
            agency: localStorage.getItem("AgencyNumber"),//"1100003905"
            contractAccountNumber: "",
            dateFrom: "",
            dateTo: ""
        };

        const request2 = {
            agency: localStorage.getItem("AgencyNumber"),//"1100003905"
            contractAccountNumber: "",
            dateFrom: "",
            dateTo: "",
            skip: skipCount,
            count: rowsCount
        };


        RequestHelper.MultiPOST(
            Pledge.GetAllCountAgencyPledgeHistory,
            Pledge.GetAgencyPledgeHistory,
            APIURLTypeEnum.Default,
            request1,
            request2,
            (responses) => {

                const res = responses.responseTwo;
                if (res && res.data && res.data.status.code == StatusCodeEnum.OK) {
                    let result = [];

                    if (res.data.data.length == 0 || !validaData(res.data.data)) {
                        //setLoading(false);
                    } else {
                        const _res = res.data.data;

                        result = _res.map((m, index) => {
                            return {
                                Id: index,
                                Customer: formattedName(m.name),
                                Account: forMattedAddress(m.serAddress) + " (" + m.contractAccount + ")",
                                PledgeValue: m.amount.toString().CurrencyFormat(),
                                PledgeDate: m.createdOn ? formatDate(m.createdOn.YYYYDDMMFormatTODate()).displayDate : '',
                                ExpiryDate: m.expiration ? formatDate(m.expiration.YYYYDDMMFormatTODate()).displayDate : '', //new Date(m.expiration).CustomDateFormat(),
                                Status: m.status,
                                SmallText: "",
                                FundingSource: m.fundingSource,
                                AppliedTo: m.appliedTo,
                                CreatedBy: m.createdBy,
                                CreatedAt: m.createdAt,
                                CreatedOn: m.createdOn,
                                AccountNumber: m.contractAccount
                            };
                        });

                        setExelData(result);
                        setExelData([]);
                    }
                }

                setLoading(false);
            }
        );
    };

    const gridBind = (pageNo, pageCount, totalCount, sortBy = '', sortOrder = '') => {
        var skipCount = (page) * rowsPerPage;
        var rowsCount = rowsPerPage;


        if ((pageNo || pageNo === 0) && pageCount) {
            skipCount = (pageNo) * pageCount;
            rowsCount = pageCount;
        }

        if (totalCount) {
            if (totalCount <= pageCount) {
                skipCount = 0;
            } else {
                // skipCount = totalCount - (skipCount + rowsCount);
                skipCount = pageNo * rowsPerPage;
            }
        } else {
            if (dataCount - (skipCount + rowsCount) >= 0) {
                skipCount = dataCount - (skipCount + rowsCount);
            } else if (dataCount < rowsCount) {
                skipCount = 0;
                rowsCount = dataCount;
            } else {
                //skipCount = dataCount - skipCount;
                rowsCount = dataCount - skipCount;
            }
        }
        skipCount = pageNo * rowsPerPage;

        setLoading(true);

        RequestHelper.POST(
            Pledge.GetAgencyPledgeHistory,
            APIURLTypeEnum.Default,
            {
                agency: localStorage.getItem("AgencyNumber"),//"1100003905"
                // agency: "1100003905",
                contractAccountNumber: "",
                dateFrom: "",
                dateTo: "",
                skip: skipCount,
                count: rowsCount,
                orderBy: maintainOrder(sortBy, sortOrder, rowsCount, skipCount, page)
            },
            (res) => {
                onGridDataCallBack(res);
                setLoading(false);
            }
        );
    };


    const maintainOrder = (sortBy, sortOrder, rowsCount, page) => {
        if ((sortBy == 'Status' || orderBy == 'Status')) {
            if (sortOrder) {

                if (rowsPerPage == 25) {
                    return sortOrder;
                    // return sortOrder == 'desc' ? "asc" : "desc";
                } else {
                    return sortOrder;
                    //return sortOrder == 'desc' ? "asc" : "desc";
                    // if (page > 0) {
                    //     return order == 'asc' ? "asc" : "desc";
                    // } else {
                    //     return order == 'desc' ? "asc" : "desc";
                    // }
                }
            } else {
                return sortOrder;
            }

        }


    }

    const formatDate = (date) => {

        if (date == '0000/00/00') {
            return { displayDate: '' };
        }
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;


        return { displayDate: [month, day, year].join('/') };
    }

    const formattedName = (name) => {

        if (name) {
            const splitName = name.split(' ');
            if (splitName && splitName.length > 1) {
                return splitName[1] + " " + splitName[0];
            } else {
                return splitName[0];
            }

        } else {
            return '';
        }

    }

    const forMattedAddress = (address) => {
        if (address) {
            var result = '';
            const stringArray = address.split(',');
            stringArray.forEach((element, index) => {
                result = result + element + (stringArray.length == index + 1 ? '' : ", ");
            });
            return result.replace('US', '');
        } else {
            return ''
        }
    }

    const onGridDataCallBack = (res) => {

        if (res && res.status == StatusCodeEnum.OK) {
            if (res.data && res.data.status.code == StatusCodeEnum.OK) {

                let result = [];

                if (res.data.data.length == 0 || !validaData(res.data.data)) {
                    //setLoading(false);
                } else {

                    
                    
                        const _res = res.data.data;


                        result = _res.map((m, index) => {
                            return {
                                Id: index,
                                Customer: formattedName(m.name),
                                Account: forMattedAddress(m.serAddress) + " (" + m.contractAccount + ")",
                                PledgeValue: m.amount.toString(),
                                PledgeDate: m.createdOn ? formatDate(m.createdOn.YYYYDDMMFormatTODate()).displayDate : '',
                                ExpiryDate: m.expiration ? formatDate(m.expiration.YYYYDDMMFormatTODate()).displayDate : '', //new Date(m.expiration).CustomDateFormat(),
                                Status: m.status == 'CANCELLED' ? 'CANCELED' : m.status,
                                SmallText: "",
                                FundingSource: m.fundingSource,
                                AppliedTo: m.appliedTo,//=='DEPOSIT'? 'Security Deposit': 'Utility Bill',
                                CreatedBy: m.createdBy,
                                CreatedAt: m.createdAt,
                                CreatedOn: m.createdOn,
                                AccountNumber: m.contractAccount,
                                UpdatedOn: m.changedOn ? formatDate(m.changedOn.YYYYDDMMFormatTODate()).displayDate : '',
                                UpdatedBy: m.changedBy
                            };
                        });
                        //setLoading(false);
                        setSearchData(result);
                        // setExelData(result);
                        if (!searchText) {
                            setData(result);
                        } else {
                            setData(result);
                            setSearchText("");
                        }
                    
                }
            } else {
                //setLoading(false);
            }
        } else {
            // messageRef.current.showMessage(
            //   res.response.data.status.message,
            //   NotificationMessageTypeEnum.Error
            // );
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setPage(0);
        setOrderBy(property);
        if (property == 'Status') {
            gridBind(0, rowsPerPage, false, 'Status', isAsc ? "desc" : "asc");
        }
    };
    const [detailPopUp, setViewDetailOpen] = useState(false);
    const [cancelPopUp, setCancelPopUp] = useState(false);
    const [customerDetail, setCustomerDetail] = useState({});

    const setFundingSource = (fs) => {
        if (fs) {
            let match = fundingSourceOptionList.find((v) => v.split('-')[0].trim() == fs.trim());
            if (!match)
                return fs;
            else
                return match;
        }
    }

    const handlePopUp = (type, data) => {
        logMenuRef.current.showAlert()
        switch (type) {
            case "Detail":
                {
                    setViewDetailOpen(true);
                    data.FundingSource = setFundingSource(data.FundingSource);
                    setCustomerDetail(data);
                }
                break;
            case "Cancel":
                {
                    setCustomerDetail(data);
                    setCancelPopUp(true);
                }
                break;
            case "CustomerLookUp":
                {
                    //setCustomerLookupPopUp(true);
                    getDataCustomerLookup(data);
                }
                break;
            default:
                break;
        }
    };

    const [customerLookUp, setCustomerLookUp] = useState([]);

    const getDataCustomerLookup = (data) => {
        setLoading(true);
        //const agencyData = JSON.parse(localStorage.getItem("UData"));
        let acctNum = "";
        let searchBy = "";

        if (RequestMiddleware.getConfigData(APIURLTypeEnum.UseMockData) === "true") {
            acctNum = "910000003159";
            searchBy = "Martin";
        } else {
            acctNum = data.AccountNumber;
            searchBy = data.Customer.split(" ")[1];// "Martin";// agencyData.userName;
        }

        RequestHelper.POST(
            Pledge.GetAgencyAccountLookup,
            APIURLTypeEnum.Default,
            {
                contractAccountNumber: acctNum,// "910000003159",data.AccountNumber
                searchBy: searchBy,//TODO:
                searchType: 1
            },
            (res) => {
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {
                            setLoading(false);
                            setCustomerLookUp(res.data.data);
                            setCustomerLookupPopUp(true);
                        } else {
                            setLoading(false);
                            setCustomerLookUp(res.data.data);
                        }
                    } else {
                        setLoading(false);
                    }
                } else {
                    messageRef.current.showMessage(
                        res.response.data.status.message,
                        NotificationMessageTypeEnum.Error
                    );
                    setLoading(false);
                }
            }
        );
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        gridBind(newPage, rowsPerPage, false, orderBy, order);

        //gridBind(0, rowsPerPage, false, 'Status', isAsc ? "desc" : "asc");
    };

    const handleOnClose = () => {
        setCancelPopUp(false);
        setViewDetailOpen(false);
    };

    const cancelPledge = (row, resp) => {
        console.log({ row });
        const agencyData = JSON.parse(localStorage.getItem("UData"));
        let text = `Pledging Agency: ${agencyData.agency[0].agencyName}; BP of Pledging Agency: ${agencyData.agency[0].agencyNumber}; Canceled pledge amount: ${row.PledgeValue.replace("$", "")}; SWG Customer Contract Account: ${row.AccountNumber}`;
        RequestHelper.POST(
            Pledge.AgencyPostPledge,
            APIURLTypeEnum.Default,
            {
                agency: localStorage.getItem("AgencyNumber"),
                contractAccountNumber: row.AccountNumber,
                action: "CANCEL",
                amount: row.PledgeValue.replace("$", ""),
                createdOn: row.CreatedOn,
                createdBy: row.CreatedBy,
                fundingSource: row.FundingSource,
                appliedTo: row.AppliedTo,

                updatedBy: localStorage.getItem("UserName"),
                createdAt: row.CreatedAt,
                agencyAdminName: resp ? resp.data.data.firstName + ' ' + resp.data.data.lastName : '',
                customerName: row.Customer,
                address: row.Account,
                agencyName: agencyData.agency[0].agencyName,
                userRole: agencyData.agency[0].role,
                userId: agencyData.userId.toString(),
                userName: agencyData.userName,
                email: resp ? resp.data.data.email : ''
            },
            (res) => {
                if (res && res.status == StatusCodeEnum.OK && res.data && res.data.status.code == StatusCodeEnum.OK && res.data.data.msgType === "Y") {

                    gridBindOnInIt();
                    excelbinddata();
                    messageRef.current.showMessage(
                        "Pledge is succesfully canceled.",
                        NotificationMessageTypeEnum.Success
                    );
                    setCancelPopUp(false);
                    setLoading(false);


                    SetUserBehaviour(PledgeCanceled.Name,
                        PledgeCanceled.Name,
                        PledgeCanceled.Name,
                        PledgeCanceled.Event,
                        PledgeCanceled.EventDetails.
                            replace("{Contract Account}", data.contractAccount).
                            replace("<amount of pledge>", row.PledgeValue).
                            replace("{Funding Source}", row.FundingSource).
                            replace("{Apply To}", row.AppliedTo).
                            replace("{Date / Time}", moment(new Date()).format('MM/DD/YYYY hh:mm A'))
                    );
                    //

                } else {
                    setCancelPopUp(false);
                    messageRef.current.showMessage(
                        "We're sorry. We are unable to process your pledge request at this time. Please try again later.",//res.response.data.status.message
                        NotificationMessageTypeEnum.Error
                    );
                    setLoading(false);
                }
            }
        );
    }

    const handleOnCancel = (row) => {
        setLoading(true);
        if (row.CreatedBy == "Agency Agent test 010") {
            cancelPledge(row, "");
        } else {
            const agencyData = JSON.parse(localStorage.getItem("UData"));
            let text = `Pledging Agency: ${agencyData.agency[0].agencyName}; BP of Pledging Agency: ${agencyData.agency[0].agencyNumber}; Canceled pledge amount: ${row.PledgeValue.replace("$", "")}; SWG Customer Contract Account: ${row.AccountNumber}`;
            var params = {
                AgencyName: agencyData.agency[0].agencyName,
                UserName: row.CreatedBy,
                IsAdmin: agencyData.agency[0].role === "Admin" ? true : false,
                UserId: agencyData.userId
            };
            RequestHelper.POST(User.GetUserInfo, APIURLTypeEnum.Agency, params, (resp) => {
                if (resp.status == 200 && resp.data) {
                    //
                    cancelPledge(row, resp);
                } else {
                    messageRef.current.showMessage(
                        "We're sorry. We are unable to process your pledge request at this time. Please try again later.",//res.response.data.status.message
                        NotificationMessageTypeEnum.Error
                    );
                    setCancelPopUp(false);
                    setLoading(false);
                }
            });
        }
        const customerDetail = customerDetail;
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        gridBind(0, parseInt(event.target.value, 10));

        // gridBind(newPage, rowsPerPage, false, orderBy,order);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const getSearchedValue = (val) => {
        switch (val) {
            case "CANCELLED":
                return "canceled";
            case "EXPIRED":
                return "expired";
            case "PAID":
                return "paid";
                break;
            case "PENDING":
                return "pending";
            default:
                return val;
        }
    };

    const handleOnSearch = (e, data) => {
        //
        setSearchText(e.target.value);

        performSearch(e.target.value, data);
    };

    const performSearch = (q, data) => {
        if (q.length == 0) {
            setData(searchData);
        } else {
            const searchData = SearchGrid(
                data,
                getSearchedValue(q),
                GridSearchTypeEnum.PledgeHistory
            );
            setData(searchData);
        }
    };

    const excelDataBinder = () => {
        excelbinddata(dataCount) || [];
    }

    const emptyRows = rowsPerPage - data.length;


    return (
        <React.Fragment>
            <MessageBox ref={messageRef} />
            {loading && (
                <Loader />
            )}
            <Paper className="responsiveTbl buttonsalign pledge-history pt-0" role="region" aria-label="pledge">

                <TableContainer className="table-responsive pledges-table">
                    <Table
                        className={`table mb-0 ${classes.table}`}
                        aria-labelledby="tableTitle"
                        aria-label="pledge table"
                    >
                        {(isInitialLoaded === false || data.length > 0) && (
                            <Header
                                checkboxEnable={false}
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                                headCells={headCells}
                            />
                        )}

                        {data.length == 0 && !loading &&
                            <NoDataFound />}

                        <TableBody >
                            {
                                StableSort(data, CustomGetSorting(order, orderBy))
                                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(index);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                                classes={{ selected: classes.tabRow }}
                                            >

                                                <TableCell
                                                    component="td"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    data-label="Customer"
                                                >
                                                    {row.Customer}
                                                </TableCell>
                                                <TableCell align="left" data-label="Account">
                                                    {row.Account}
                                                    <p className="smlltxt">{row.SmallText}</p>
                                                </TableCell>
                                                <TableCell align="center" data-label="Pledge">
                                                    {row.PledgeValue.CurrencyFormat()}
                                                </TableCell>
                                                <TableCell align="left" data-label="Pledge Date">
                                                    {row.PledgeDate}
                                                </TableCell>
                                                <TableCell align="left" data-label="Expiry">
                                                    {row.ExpiryDate}
                                                </TableCell>
                                                <TableCell align="left" data-label="Status">
                                                    {row.Status}
                                                </TableCell>
                                                <TableCell align="left" className="respMenu">
                                                    <LogMenu ref={logMenuRef}>
                                                        <React.Fragment>
                                                            {row.Status !== "PENDING" && (
                                                                <>
                                                                    <MenuItem
                                                                        onClick={() => handlePopUp("CustomerLookUp", row)}
                                                                    >
                                                                        Customer Details{" "}
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() => handlePopUp("Detail", row)}
                                                                    >
                                                                        Pledge Details
                                                                </MenuItem>
                                                                </>
                                                            )}

                                                            {row.Status == "PENDING" && (
                                                                <>
                                                                    <MenuItem
                                                                        onClick={() => handlePopUp("CustomerLookUp", row)}
                                                                    >
                                                                        Customer Details{" "}
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() => handlePopUp("Detail", row)}
                                                                    >
                                                                        Pledge Details
                                                                </MenuItem>
                                                                    {localStorage.getItem("RoleType") !== "Viewer" &&
                                                                        <MenuItem component={paypledgepopup} editData={row}>
                                                                            Edit
                                                                </MenuItem>
                                                                    }
                                                                    {localStorage.getItem("RoleType") !== "Viewer" &&
                                                                        <MenuItem onClick={() => handlePopUp("Cancel", row)}>
                                                                            Cancel
                                                                </MenuItem>
                                                                    }
                                                                </>
                                                            )}

                                                        </React.Fragment>
                                                    </LogMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            {(isInitialLoaded === false || (data.length > 0 && emptyRows > 0)) && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell style={{ border: '0', padding: '0' }} colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
                <Dialog fullScreen
                    open={customerLookupPopUp}
                    onClose={customerLookupPopUpClose}
                    TransitionComponent={Transition} classes={{ paperScrollPaper: 'dialogclass' }}
                >
                    <div className="gutterareapop Resgutterareapop">
                        <IconButton edge="start" color="inherit" onClick={customerLookupPopUpClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="container">
                        <Typography variant="h6" color="inherit" className="h6Heading">
                            Customer Details
                        </Typography>
                        <div className="row justify-content-md-center">
                            <div className="col-md-8 col-12">
                                <AccordionList data={customerLookUp} isEdit={true} />
                            </div>
                        </div>
                    </div>
                </Dialog>
                {data.length > 0 && (
                    <button aria-label="click here to download" onClick={excelDataBinder} className="download_tbllnk downloadPledgesLink">Download Pledges</button>
                )}
                {excelData.length > 0 ? (
                    <ExcelFile element={<button aria-label="click here to download" className="download_tbllnk downloadPledgesLink">Download Pledges</button>} hideElement={true}>
                        <ExcelSheet data={excelData} name="Pledge History" hideElement={excelData.length == 0} >
                            <ExcelColumn label="Customer Name" value="Customer" />
                            <ExcelColumn label="Account" value="Account" />
                            <ExcelColumn label="Pledge Amount" value="PledgeValue" />
                            <ExcelColumn label="Pledge Date" value="PledgeDate" />
                            <ExcelColumn label="Exp Date" value="ExpiryDate" />
                            <ExcelColumn label="Status" value="Status" />
                            <ExcelColumn label="Applied To" value="AppliedTo" />
                            <ExcelColumn label="Created By" value="CreatedBy" />
                            {/* <ExcelColumn label="Small Text" value="SmallText" /> */}
                            <ExcelColumn label="Funding Source" value="FundingSource" />
                        </ExcelSheet>
                    </ExcelFile>
                ) : null }
                {searchData.length > 0 && (
                    <Pagination
                        rowsPerPageOptions={RowsPerPageOptions}
                        component="div"
                        count={dataCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            "aria-label": "previous page",
                        }}
                        nextIconButtonProps={{
                            "aria-label": "next page",
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}

                {cancelPopUp && (
                    <ConfirmModelPopUp
                        open={cancelPopUp}
                        header="Are you sure you want to cancel this pledge?"
                        message="By choosing to cancel this pledge you will no longer be able to manage it from the agency portal."
                        onClose={handleOnClose}
                        btnCloseText="Close"
                        onConfirm={handleOnCancel}
                        customerDetail={customerDetail}
                        btnSuccessText="Yes, cancel pledge"
                        showControl
                        size={ModelPopUpSizeEnum.Small}
                    />
                )}
                {detailPopUp && (



                    <Dialog className="smallpopup popwidthdialog pledge-customer-deatils-modal w-100"
                        open={detailPopUp}

                        keepMounted
                        maxWidth='false'
                        onClose={handleOnClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"

                    > <DialogTitle id="alert-dialog-slide-title">
                            {"Pledge Details"}
                        </DialogTitle><div className="col-12">
                            <div className="row" Titl>
                                <div className="col-12 col-sm-6">
                                    <strong className="d-block"><b> Customer Name: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.Customer}</label>
                                </div>
                                <div className="col-12 col-sm-6 mt-3 mt-md-0">
                                    <strong className="d-block"><b> Status: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.Status}</label>
                                </div>
                            </div>


                            <div className="row mt-3">
                                <div className="col-12">
                                    <strong className="d-block"><b> Account: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.Account}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"><b> Pledge Amount: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.PledgeValue}</label>
                                </div>
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"><b> Pledge Date: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.PledgeDate}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"> <b>Exp Date: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.ExpiryDate}</label>
                                </div>
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"><b> Funding Source: </b></strong>
                                
                                    <label style={{ fontSize: '14px' }}>{customerDetail.FundingSource}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"><b> Agency User: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.CreatedBy}</label>
                                </div>
                                <div className="col-12 col-sm-6 mt-3">
                                    <strong className="d-block"><b> Applied To: </b></strong>
                                    <label style={{ fontSize: '14px' }}>{customerDetail.AppliedTo}</label>
                                </div>
                            </div>

                            <div className="row">
                                {
                                    customerDetail.UpdatedOn &&
                                    <div className="col-12 col-sm-6 mt-3">
                                        <strong className="d-block"><b> Updated By: </b></strong>
                                        <label style={{ fontSize: '14px' }}>{customerDetail.UpdatedBy}</label>
                                    </div>
                                }
                                {
                                    customerDetail.UpdatedOn &&
                                    <div className="col-12 col-sm-6 mt-3">
                                        <strong className="d-block"><b> Updated On: </b></strong>
                                        <label style={{ fontSize: '14px' }}>{customerDetail.UpdatedOn}</label>
                                    </div>
                                }

                            </div>
                        </div>
                        <DialogActions classes={{ root: 'actionbuttonarea', action: 'actionbutton' }}>
                            <Button className={classes.ButtonOutlined} aria-label="click here to close" onClick={handleOnClose} color="secondary">
                                Close
									</Button>
                        </DialogActions>
                    </Dialog>
                )}

            </Paper>

        </React.Fragment>
    );
}
