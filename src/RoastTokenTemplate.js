import React, { Component } from 'react';
import storehash from './storehash';
import Error from './Error';


export default class GreenTokenFarmName extends Component {

  constructor (props) {
    super(props);
    this.state = { greenToken: props.greenToken, farmName: "", error:  "" };
    this.fetchData = this.fetchData.bind(this);
    this.element = this.element.bind(this);
    this.fetchData(props.greenToken);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.greenToken !== prevProps.greenToken) {
      console.log(this.props.greenToken + "roastdataipfs compnent did update");
      this.setState({ greenToken: this.props.greenToken });
      this.fetchData(this.props.greenToken);
    }
  }

  /// Fetch data from BE
  fetchData(greenToken) {
    storehash.methods.farmName(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ farmName: result, error: "" });
      } else {
        this.setState({ farmName: "", error: "No farm name"});
      }
    }) //end storehash
  }

  element = () => {
    return this.state.error !== "" ?  <Error error={this.state.error} /> : <h5>Farm name: {this.state.farmName}</h5>
  }

  render() {
    return (<div>{this.element()}</div>)
  }
}
