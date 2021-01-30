import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-sm-select";
import "react-sm-select/dist/styles.css";
import Checkbox from '@material-ui/core/Checkbox';


class MultipleSelect extends React.Component {
  state = {
    options: [{ value: "123 Park Ave, Unit 1(33312111)", label: "123 Park Ave, Unit 1(33312111)" }, 
			  { value: "121 Park Ave, Unit 2(33312111)", label: "123 Park Ave, Unit 2(33312111)" },
			  { value: "121 Park Ave, Unit 3(33312111)", label: "123 Park Ave, Unit 3(33312111)" },
			  { value: "121 Park Ave, Unit 4(33312111)", label: "123 Park Ave, Unit 4(33312111)" },
			  { value: "121 Park Ave, Unit 5(33312111)", label: "123 Park Ave, Unit 5(33312111)" },
			  { value: "121 Park Ave, Unit 6(33312111)", label: "123 Park Ave, Unit 6(33312111)" },
			  { value: "121 Park Ave, Unit 7(33312111)", label: "123 Park Ave, Unit 7(33312111)" }],
  };
  render() {
    const { classes } = this.props;
	const Option = ({checked, option, isSingle}) => (
  <div className="Option__renderer">
    {!isSingle && <Checkbox type="checkbox" defaultChecked={checked} tabIndex="-1" value={this.state.value} color="primary"  />}
	 <span className="Option__label"> {option.label} </span>
  </div>
);
    return (
      <MultiSelect resetable enableSearch
        maxOptionsToRender={5}
        options={this.state.options}
        value={this.state.value}
        onChange={value => this.setState({ value })}
		Option={Option} className="PopUpMultiSelect" searchMorePlaceholder="Search Accounts"
		valuePlaceholder="Accounts" mode="counter" maxOptionsToRender="10" hasSelectAll selectAllLabel="Select All Accounts"
      />
    );
  }
}

export default MultipleSelect;
