import React from 'react';
import {RadioGroup, Radio} from "react-radio-group";
import { render } from 'react-dom';


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

var numbers = numberOfLicenses[0]['num'];
var total = licenseList[0]['perLicense'] * numbers;


export default class BuyBox extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedValue: 13,
      comboValue: 1
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
        <div className="col-md-6 div-num">Number of licenses:</div>
        <div className="com-md-6 div-select-num"><select id="numbers" value={this.state.comboValue} 
        onChange={this._handleComboChange.bind(this)}>
        {options}</select></div>
        <hr />
        TOTAL: ${this._totalUS()} US
        <br />
        <button>BUY NOW</button>
        Selected plan:
      </div>
    );
  }

  _totalUS() {
    return (
      this.state.selectedValue * this.state.comboValue
    )
  }

  _handleComboChange(event) {
    this.setState({ comboValue: event.target.value })
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
        <Radio className="bebas" value={this.props.perLicense} />
        LICENSE PLAN {this.props.number}
        <span className="per-license">${this.props.perLicense} per license</span>
      </div>
    );
  }
}


class Option extends React.Component {
  render() {
    return (
      <option value={this.props.option}>{this.props.option}</option>
    )
  }
}

var app = document.getElementById('app');
render(<BuyBox />, app);