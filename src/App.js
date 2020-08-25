import React from 'react';
import QRCode from "qrcode.react";
import moment from "moment";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      datetime_to_epoch: BigInt("621355968000000000"),
      datetime: "637297196350000000",
      ticket_number: 15396826,
      human_date: "07/07/2020 11:53:55",
      data: "",
      encoded_data: ""
    }

    this.setTicketNumber = this.setTicketNumber.bind(this);
    this.setDateTime = this.setDateTime.bind(this);
    this.setHumanDate = this.setHumanDate.bind(this);
    this.setData = this.setData.bind(this);
    this.setEncodedData = this.setEncodedData.bind(this);
  }  

  setTicketNumber(e) {
    this.setState({ticket_number: e.target.value}, this.setData);
  }

  setDateTime(e) {
    var new_timestamp = (BigInt(e.target.value) - BigInt(this.state.datetime_to_epoch.toString())) / BigInt(10000);
    var toast = moment(Number(new_timestamp)).add(10, 'hours').format("DD/MM/YYYY hh:mm:ss");

    console.log(new_timestamp);
    console.log(toast);

    this.setState({
      datetime: e.target.value,
      human_date: toast
    }, this.setData);
  }

  setHumanDate(e) {
    var timestamp = moment(e.target.value, "DD/MM/YYYY hh:mm:ss").add(2, 'hours').valueOf();
    var new_datetime = (BigInt(this.state.datetime_to_epoch.toString()) + (BigInt(timestamp) * BigInt(10000))).toString();

    console.log(new_datetime);
    console.log(e.target.value);

    this.setState({
      human_date: e.target.value,
      datetime: new_datetime
    }, this.setData);
  }

  setData() {
    this.setState({
      data: this.state.ticket_number +":"+ this.state.datetime.toString()
    }, this.setEncodedData);
  }

  setEncodedData() {
    this.setState({
      encoded_data: btoa(this.state.data)
    });
  }

  render() {
    return <div>
      <QRCode value={btoa(this.state.ticket_number +":"+ this.state.datetime.toString())} />
      <p>
        <b>Ticket number:</b> <input type="text" onChange={this.setTicketNumber} value={this.state.ticket_number} /><br />
        <b>DateTime:</b> <input type="text" onChange={this.setDateTime} value={BigInt(this.state.datetime).toString()} /><br />
        <b>Human Date:</b> <input type="text" onChange={this.setHumanDate} value={this.state.human_date.toString()} /><br />
        <b>Data:</b> {this.state.ticket_number +":"+ this.state.datetime.toString()}<br />
        <b>Encoded Data:</b> {this.state.encoded_data}<br />
      </p>
    </div>;
  }
}  

export default App;