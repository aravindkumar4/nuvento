import React from "react";
import TextField from "@material-ui/core/TextField";
import { APITypeEnum, StatusCodeEnum, APIURLTypeEnum } from "../../core/Enum";
import RequestHelper from "../../common/RequestHelper";
import Loader from "../../shared/Views/Loader";

class AutoSearch extends React.Component {
    constructor(props) {
        super(props);
        this.SearchAddress = this.SearchAddress.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);

        this.state = {
            addressList: [],
            suggestions: [],
            text: "",
            loading: false,
        };
    }

    onTextChanged = (e) => {
        if (
            e.target.value != undefined &&
            e.target.value !== "" &&
            e.target.value.length >= 3
        ) {
            this.setState({ text: e.target.value });
            this.SearchAddress(e.target.value);
        } else {
            this.setState({ text: e.target.value, suggestions: [] });
            //   this.props.getAddressData("", "");
        }
    };

    SearchAddress(value) {
        const self = this;
        this.setState({ loading: true });

        const url = "GetPremiseIdsByAddress" ;
        const params = "?ServiceAddress=" + value;

        RequestHelper.GET(url, APIURLTypeEnum.Enterprise, params, (res) => {
                if (res && res.status == StatusCodeEnum.OK && res.data.data.length > 0) {
                    const data = res.data.data;
                    var JsonDataArray = [];

                    data.forEach(function (item, index) {
                        var JsonData = {
                            value: item.premiseNumber.toString(),
                            label: item.serviceAddress,
                            data: JSON.stringify(item),
                        };
                        JsonDataArray.push(JsonData);
                    });

                    self.setState({
                        options: JsonDataArray,
                        selectedMeter: [JsonDataArray[0].value],
                        suggestions: JsonDataArray,
                        loading: false,
                    });
                } 
             else {
                if (res.response && res.response.data) {
                    console.log("error", res.response.data.Message);
                }
                self.setState({ loading: false });
            }
        });
    }

    suggestionSelected(evt) {
        let id = evt.target.id;
        let name = evt.target.innerText;
        let object = evt.target.dataset;
        this.setState({ text: name, suggestions: [] });
        this.props.getAddressData(id, name, object);
    }

    renderSuggestions() {
        const suggestions = this.state.suggestions;
        if (suggestions == undefined || (suggestions && suggestions.length === 0)) {
            return null;
        }
        return (
            <div className="srchwrapper">
                <ul>
                    {suggestions.map((item) => (
                        <li
                            id={item.value}
                            data-object={item.data}
                            onClick={this.suggestionSelected}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render() {
        const { text } = this.state;
        return (
            <div className={"srchsecbox"}>
                {this.state.loading && <Loader />}
                <div className={"MapSearchBX"}>
                    <TextField
                        className={"searchaddnewproperty"}
                        label="Enter address"
                        value={text}
                        onChange={this.onTextChanged}
                        margin="normal"
                        id="automplete-1"
                        variant="filled"
                        inputProps={{
                            'aria-label':'Enter address'
                        }}
                    />
                    {/* <i class="material-icons searchicon">search</i> */}
                </div>
                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutoSearch;
