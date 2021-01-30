import React from "react";
import { MultiSelect } from "react-sm-select";
import "react-sm-select/dist/styles.css";
import Checkbox from '@material-ui/core/Checkbox';
import { Circle } from 'react-preloaders';
import RequestHelper from '../../common/RequestHelper';
import { ServiceAccountAPI } from '../../core/URLConfig';
import UserContextModel from './../../store/UserContextModel';

class PortfolioSelect extends React.Component {
    static contextType = UserContextModel
    constructor(props) {
        super(props);
        this.BindGridData = this.BindGridData.bind(this);
        this.state = {
            options: [],
            selectedPortfolio: [],
            loading: false,
        }

        this.multiselectRef = React.forwardRef();
        this.InvokeEvent = this.InvokeEvent.bind(this);

    }

    componentDidMount() {
        const _context = this.context;
        if (_context.userId && _context.userId) {
            // this.BindGridData();
        }
        if (this.props.value != undefined || (this.props.value && this.props.value.length > 0)) {
            alert(this.props.value)
        }
    }

    BindGridData() {
        const self = this;
        const _context = this.context;
        const url = PortfolioApiLink['GetPortfolio'] + _context.userId + "&CustomerNo=" + _context.customerNo + "&Flag=" + (_context.experience === "LANL" ? 'L' : 'B');
        RequestHelper.GET(url, (res) => {
            const { StatusCode, data } = res;
            if (status) {
                if (StatusCode == StatusCodeEnum.OK && data.Result && data.Result.length > 0) {
                    var JsonDataArray = [];
                    var defaultPortfolio = [];
                    data.Result.map(function (item, index) {
                        var Value = item.portfolioID.toString();// + '@' + item.portfolioName;
                        var Label = item.portfolioName;
                        var JsonData = {
                            value: Value,
                            label: Label,
                            checked: false
                        }
                        JsonDataArray.push(JsonData);
                        if (defaultPortfolio.length <= 0)
                            defaultPortfolio.push(Value);
                    });
                    self.setState({
                        options: JsonDataArray,
                        selectedPortfolio: defaultPortfolio
                    });

                    if (self.props.showPortfolio)
                        self.props.showPortfolio(JsonDataArray.length > 0 ? true : false);
                }
                else {
                    if (self.props.showPortfolio)
                        self.props.showPortfolio(false);
                }
                self.setState({ loading: false });
            } else {
                if (res.response && res.response.data) {
                    console.log("error", res.response.data.Message)
                }
            }
        });
    }

    OnPortfolioChange(value) {
        if (this.props.selectedPortfolio != undefined) {
            let _selectedPortfolio = this.props.selectedPortfolio.filter(m => m.accessType == 1);
            if (_selectedPortfolio && _selectedPortfolio.length >= 2 && this.alreadyExist(value)) {
                this.multiselectRef.current.customSelect(this.props.currentPortfolio.selectedAccessIds.map(m => m.entityId))
                this.props.GetSelectedPortfolio(-1);
            } else {
                this.InvokeEvent(value);
            }
        } else {
            this.InvokeEvent(value);
        }

    }

    InvokeEvent(value) {

        if (this.props.filterServiceAcc != undefined) {
            this.setState({ selectedPortfolio: value });
            this.props.filterServiceAcc(value);
        }
        if (this.props.GetSelectedPortfolio != undefined) {
            this.setState({ selectedPortfolio: value });
            this.props.GetSelectedPortfolio(value);
        }
    }

    alreadyExist = (value) => {

        const preSelectedValues = this.props.selectedPortfolio.filter(m => m.accessType == 1).map(m => m.selectedAccessIds.map(m => m.entityId));
        const searchStr = value.length > 0 ? value[value.length - 1] : null;
        return preSelectedValues.toString().includes(searchStr);
    }

    render() {
        const { classes, mode } = this.props;
        if (this.props.value != undefined || (this.props.value && this.props.value.length > 0)) {
            this.state.selectedPortfolio = this.props.value;
        }

        const Option = ({ value, checked, option, isSingle }) => (
            <div className="Option__renderer">
                {!isSingle && <Checkbox type="checkbox" defaultChecked={checked}
                    tabIndex="-1" value={option.value} color="primary" />}
                <span className="Option__label"> {option.label} </span>
            </div>
        );

        if (this.state.loading) {
            return (
                <Circle color={'#005984'} bgColor={'rgba(255,255,255,0.8)'} customLoading={this.state.loading} />
            )
        } else {
            return (
                <MultiSelect resetable
                    enableSearch={this.state.options.length > 5 ? true : false}
                    ref={this.multiselectRef}
                    stopClickPropagation={true}
                    tag={this.props.tag}
                    id={this.props.id}
                    resetTo={[]}
                    options={this.state.options}
                    value={this.state.selectedPortfolio}
                    onChange={this.OnPortfolioChange.bind(this)}
                    Option={Option}
                    className="PopUpMultiSelect" searchMorePlaceholder="Search Portfolios"
                    valuePlaceholder="Portfolio" mode={mode || "list"} hasSelectAll selectAllLabel="Select All Portfolios"
                //filterOptions={this.filterOptions} 
                />

            );
        }
    }
}

export default PortfolioSelect;
