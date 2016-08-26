import React from 'react';
import {RadioGroup, Radio} from "react-radio-group";


var licenseList = [];
var numberOfLicenses = [];
$.ajax({
  async: false,
  type: 'GET',
  url: 'http://127.0.0.1:8080/data.json',
  dataType: 'json',
  success: function(data) {
    licenseList = data[0];
    numberOfLicenses = data[1];
  }
})


export default class BuyBox extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedValue: "#1"
    };
  }

  render() {
    const licenses = this._getLicenses();
    const options = this._getOptions();
    return (
      <div className="container buy-box">
        <RadioGroup name="licenses" selectedValue={this.state.selectedValue} 
        onChange={this._handleChange.bind(this)}>
          {licenses}
        </RadioGroup>

          <hr />
          Number of licenses: <select>{options}</select>
          <hr />
          TOTAL: $ US
          <p>Selected plan:</p> 
      </div>
    );
  }

  _handleChange(value) {
    this.setState({ selectedValue: value })
  }

  _getLicenses() {
    return licenseList.map((license) => {
      return (
        <License
          number={license.number} 
          perLicense={license.perLicense} 
          key={license.id} />
      );
    });
  }

  _getOptions() {
    return numberOfLicenses.map((numof) => {
      return (
        <Option
          option={numof.num}
          key={numof.id} />
      );
    });
  }

};


class License extends React.Component {
  render() {
    return (
      <div>
        <Radio value={this.props.number} />
        LICENSE PLAN {this.props.number}
        <span>${this.props.perLicense} per license</span>
      </div>
    );
  }
}


class Option extends React.Component {
  render() {
    return (
      <option>{this.props.option}</option>
    )
  }
}