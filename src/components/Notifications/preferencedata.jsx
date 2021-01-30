import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

// reference from https://codepen.io/Shamiul_Hoque/pen/LNavdZ //

const styles = theme => ({
  addButton: { display: 'flex', textTransform: 'uppercase' },
});

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        id: 1,
        category: 'Sporting Goods',
        price: '49.99',
        qty: 12,
        name: 'football'
      }
    ];

  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {

      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
  };
  render() {
    return (
      <div style={{ width: '100%' }}>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText} />
      </div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id} />)
    });
    return (
      <div style={{ width: '100%' }}>
        <table className="table ExpandedColumnTable">
          <tbody>
            {product}
          </tbody>
        </table>
        <Grid container spacing={24}>
          <Grid item lg={8} sm={8} xs={12}>
            <Button aria-label="click here to add more" color="secondary" onClick={this.props.onRowAdd} className={'PreferenceAddButton'}>
              <i class="material-icons">add</i>Add More</Button>
          </Grid>
          <Grid item lg={4} sm={4} xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button aria-label="click here to cancel" color="secondary" className="PreferenceSaveButton">Cancel</Button>
            <Button aria-label="click here to save" variant="contained" color="secondary" className="PreferenceSaveButton">save </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableText onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Text",
          value: this.props.product.PhoneNumber,
          id: this.props.product.id
        }} />
        <EditablePhoneNumber onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "PhoneNumber",
          value: this.props.product.Text,
          id: this.props.product.id
        }} />
        <EditablePortfolio onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Portfolio",
          value: this.props.product.Portfolio,
          id: this.props.product.id
        }} />
        <EditableAccounts onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Accounts",
          value: this.props.product.Accounts,
          id: this.props.product.id
        }} />
        <td className="del-cell">
          <IconButton aria-label="Delete" onClick={this.onDelEvent.bind(this)} value="X"  >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </td>
      </tr>
    );
  }
}

class EditablePhoneNumber extends React.Component {
  render() {
    return (
      <td>
        <TextField name={this.props.cellData.type} onChange={this.props.onProductTableUpdate}
          id={this.props.cellData.id}
          InputProps={{ disableUnderline: false }}
          label="Phone Number"
          className={'formfield'}
          variant="filled"
        />
      </td>
    );
  }
}

class EditableText extends React.Component {
  state = {
    Text: '',
  };
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <td>
        <FormControl variant="filled" className={'formfield'}>
          <InputLabel htmlFor="Text">Text</InputLabel>
          <Select
            value={this.state.Text} id={this.props.cellData.id}
            onChange={this.props.onProductTableUpdate} onChange={this.handleOnChange}

            input={<FilledInput name="Text" id="Text" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </td>
    );

  }
}

class EditablePortfolio extends React.Component {
  state = {
    Portfolio: '',
  };
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <td>
        <FormControl variant="filled" className={'formfield'}>
          <InputLabel htmlFor="Portfolio">Portfolio</InputLabel>
          <Select
            value={this.state.Portfolio} id={this.props.cellData.id}
            onChange={this.props.onProductTableUpdate} onChange={this.handleOnChange}
            input={<FilledInput name="Portfolio" id="Portfolio" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </td>
    );
  }
}

class EditableAccounts extends React.Component {
  state = {
    Accounts: '',
  };
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <td>
        <FormControl variant="filled" className={'formfield'}>
          <InputLabel htmlFor="Accounts">Accounts</InputLabel>
          <Select
            value={this.state.Accounts} id={this.props.cellData.id}
            onChange={this.props.onProductTableUpdate} onChange={this.handleOnChange}
            input={<FilledInput name="Accounts" id="Accounts" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </td>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);