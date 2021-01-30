import React from "react";
import { MultiSelect } from "react-sm-select";
import "react-sm-select/dist/styles.css";
import Checkbox from '@material-ui/core/Checkbox';
import { ServiceAccountAPI } from '../../core/URLConfig';
import RequestHelper from '../../common/RequestHelper';
import UserContextModel from './../../store/UserContextModel';
import { StatusCodeEnum } from "../../core/Enum";

// import { AccountDataStoreObject } from '../Shared/DataStore/PayBillDataStore';

class AccountSelect extends React.Component {
    static contextType = UserContextModel
    constructor(props) {
        super(props);
        this.BindAccountList = this.BindAccountList.bind(this);
        this.BindAccountListOnPortfolio = this.BindAccountListOnPortfolio.bind(this);
        this.resetAccount = this.resetAccount.bind(this);
        this.state = {
            options: [],
            selectedAccount: [],
            IsSingleSelection: false
        };
        this.multiselectRef = React.forwardRef();
    }

    componentDidMount() {
        const _context = this.context;
        if (_context.customerNo && _context.userId) {
            this.BindAccountList();
        }
        if (this.props.IsSingleSelection != undefined) {
            this.setState({ IsSingleSelection: this.props.IsSingleSelection });
        }
        else {
            this.setState({ IsSingleSelection: false });
        }
    }

    BindAccountList() {
        var self = this;
        const _context = this.context;
        let url = `${ServiceAccountAPI.GetUserAccount}${_context.userId}`;
        RequestHelper.GET(url, (res) => {
            const { StatusCode, Result } = res;
            if (StatusCode) {
                if (StatusCode == StatusCodeEnum.OK && Result && Result.length > 0) {
                    console.log("Account List successfully fetched");
                    var JsonDataArray = [];
                    Result.map(function (item, index) {
                        var JsonData = {
                            value: item.utilityAccountNumber,
                            label: item.utilityAccountNumber
                        }
                        JsonDataArray.push(JsonData);
                    });
                    if (
                        this.props.isDefaultAccount != undefined &&
                        this.props.isDefaultAccount == false
                    ) {
                        self.setState({
                            options: JsonDataArray,
                            selectedAccount: this.props.selectAccount
                        });
                    } else {
                        self.setState({
                            options: JsonDataArray,
                            selectedAccount:
                            Result[0] !== undefined && Result.length > 0
                                    ? [Result[0].utilityAccountNumber]
                                    : [],
                        });
                    }
                    if (self.props.hideAccount) {
                        self.props.hideAccount(Result.length > 9);
                    }
                    if (self.props.showAccount) {
                        self.props.showAccount(JsonDataArray.length > 0 ? true : false);
                    }
                }
                else {
                    console.log("Account List Unsuccessfully fetched or no data");
                }
            } else {
                if (res.response && res.response.data) {
                    console.log("error", res.response.data.Message)
                }
            }
        })
    }

    OnAccountChange(value) {
        if (this.props.selectedAccount != undefined) {
            let _selectedAccount = this.props.selectedAccount.filter(m => m.accessType == 2);
            if (_selectedAccount && _selectedAccount.length >= 2 && this.alreadyExist(value)) {
                this.multiselectRef.current.customSelect(this.props.currentAccount.selectedAccessIds.map(m => m.entityId))
                this.props.GetSelectedAccount(-1);
            } else {
                this.InvokeAccount(value);
            }
        } else {
            this.InvokeAccount(value);
        }
    }

    InvokeAccount = (value) => {
        if (this.props.GetSelectedAccount != undefined) {
            this.props.GetSelectedAccount(value);
        }
    }

    alreadyExist = (value) => {
        const preSelectedValues = this.props.selectedPortfolio.filter(m =>
            m.accessType == 2).map(m => m.selectedAccessIds.map(m => m.entityId));
        const searchStr = value.length > 0 ? value[value.length - 1] : null;
        return preSelectedValues.toString().includes(searchStr);
    }

    BindAccountListOnPortfolio(SelectedPortfolio) {
        var self = this;
        const _context = self;
        var Accounts = [];
        if (SelectedPortfolio.length > 0) {
            var portfolioArray = SelectedPortfolio.map(x => x.split("@")[0])
            var ServiceAccountJson = {
                PortfolioId: portfolioArray,
                CustomerNo: _context.customerNo
            }
            RequestHelper.POST(ServiceAccountAPI.GetAccountListByPortfolioId, ServiceAccountJson, () => {
                const { StatusCode, Result } = res;
                if (StatusCode) {
                    if (StatusCode == StatusCodeEnum.OK) {
                        var JsonDataArray = [];
                        for (var i = 0; i < res.Result.length; i++) {
                            for (var j = 0; j < res.Result[i].length; j++) {
                                var accountNo = res.Result[i][j].contractAccountNumber;
                                var result = JsonDataArray.filter(function (el) {
                                    return el.value == accountNo
                                });
                                if (result.length <= 0) {
                                    var JsonData = {
                                        value: res.Result[i][j].contractAccountNumber,
                                        label: res.Result[i][j].nickName + '@' + res.Result[i][j].serviceAddress + '@' + res.Result[i][j].contractAccountNumber + '@' + res.Result[i][j].zipCode + '@' + JSON.stringify(res.Result[i][j]),
                                    }
                                    JsonDataArray.push(JsonData);
                                    Accounts.push(accountNo);
                                }
                            }
                        }
                        self.setState({
                            options: JsonDataArray,
                        });
                        if (self.props.hideAccount) {
                            self.props.hideAccount(res.Result.length > 9);
                        }
                        if (self.props.showAccount)
                            self.props.showAccount(JsonDataArray.length > 0 ? true : false);
                        return Accounts;
                    } else {
                        if (self.props.showAccount)
                            self.props.showAccount(false);

                        return Accounts;
                    }
                } else {
                    if (res.response && res.response.data) {
                        console.log("error", res.response.data.Message)
                    }
                }
            })
        }
        else {
            self.BindAccountList();
            self.setState({
                selectedAccount: []
            });
            return Accounts;
        }
    }

    resetAccount() {
        this.setState({
            selectedAccount: [],
        });
    }

    render() {
        console.log(this.state);
        if (this.props.selectedAccount != undefined || (this.props.selectedAccount && this.props.selectedAccount.length > 0)) {
            this.state.selectedAccount = this.props.selectedAccount;
        }
        const { classes, mode } = this.props;
        const Option = ({ checked, option, isSingle }) => (
            <div className="Option__renderer">
                {!this.state.IsSingleSelection && mode !== 'single' && <Checkbox type="checkbox" defaultChecked={checked} tabIndex="-1" value={this.state.value} color="primary" />}
                <div className="Option__label_Header">
                    <span className="Option__label">{option.label} </span>
                    {/* <span className="Option__label">{option.label.split("@")[1]} </span>
                    <span className="Option__label">{option.label.split("@")[2]}</span> */}

                </div>
            </div>
        );
        return (
            <MultiSelect
                resetable
                enableSearch={this.state.options.length > 3 ? true : false}
                tag={this.props.tag}
                ref={this.multiselectRef}
                id={this.props.id}
                
                options={this.state.options}
                value={this.state.selectedAccount}
                onChange={this.OnAccountChange.bind(this)}
                Option={Option} className="PopUpMultiSelect" searchMorePlaceholder="Search Accounts"
                valuePlaceholder="Accounts" mode={mode || "counter"} hasSelectAll={!this.state.IsSingleSelection} selectAllLabel="Select All Accounts"
            />
        );
    }
}

export default AccountSelect;
