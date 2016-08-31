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
var numbersDict = {};


$(document).ready(function() {
  $("div[id='13']").addClass("div-selected");
});

export default class BuyBox extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedValue: 13,
      selectedPlan: "#1",
      comboValue: 1
    };
  }

  render() {
    const licenses = this._getLicenses();
    const options = this._getOptions();
    return (
      <div className="container buy-box">
        <RadioGroup className="radio-group" name="licenses" selectedValue={this.state.selectedValue} 
        onChange={this._handleChange.bind(this)}>
          {licenses}
        </RadioGroup>

        <hr />
        <br />
        <div className="col-md-6 col-sm-6 div-num">Number of licenses:</div>
        <div className="com-md-6 col-sm-6 div-select-num"><select id="numbers" className="form-control" value={this.state.comboValue} 
        onChange={this._handleComboChange.bind(this)}>
        {options}</select></div>
        <br />
        <br />
        <br />
        <hr />
        <br />
        <div className="div-buy">
          <span className="total">TOTAL: <span className="totalsum">${this._totalUS()}</span></span><span className="currency">US</span>
          <br />
          <br />
          <button className="btn">BUY NOW</button>
          <br />
          <br />
          <br />
          <span className="bottom-selected-plan">Selected plan: {this.state.selectedPlan}</span>
        </div>
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
    $("div[id='"+this.state.selectedValue+"']").removeClass("div-selected");
    this.setState({ selectedPlan: numbersDict[value] })
    this.setState({ selectedValue: value })
    
    $("div[id='"+value+"']").addClass("div-selected");
  }

  _getLicenses() {
    return licenseList.map((license) => {
      numbersDict[license.perLicense] = license.number;
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
      <div id={this.props.perLicense} className="div-selected-plan">
        <Radio className="license-plan" value={this.props.perLicense} />
        <span className="license-plan"> LICENSE PLAN {this.props.number}</span> 
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