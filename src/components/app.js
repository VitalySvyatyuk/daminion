import React from 'react';

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

console.log(typeof(numberOfLicenses[0]));

export default class BuyBox extends React.Component {
  render() {
    const licenses = this._getLicenses();
    const options = this._getOptions();
    return (
      <div className="container buy-box">
        <form>
          {licenses}
          <hr />
          Number of licenses: <select>{options}</select>
          <hr />
          <input type="submit" value="BUY NOW" />
          <p>Selected plan:</p> 
        </form>
      </div>
    );
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
        <input type="radio" />{this.props.number}
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