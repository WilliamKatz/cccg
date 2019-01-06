import React, { Component } from 'react';
import storehash from './storehash';
import Error from './Error';


export default class RoastedBy extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, roaster: "", error:  "" };
    this.fetchData = this.fetchData.bind(this);
    this.element = this.element.bind(this);

    this.fetchData(props.roastToken);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.roastToken !== prevProps.roastToken) {
      console.log(this.props.roastToken + "roastdataipfs compnent did update");
      this.setState({ roastToken: this.props.roastToken });
      this.fetchData(this.props.roastToken)
    }
  }

  /// Fetch IPFS hash from backend
  fetchData(roastToken) {
    storehash.methods.roastedBy(roastToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error == null) {
        this.setState({ roaster: result, error : "" });
      } else {
        this.setState({ roaster: "", error: "Please input a valid roast token id"});
      }
    }) //end storehash
  }

  element = () => {
    return this.state.error !== "" ?  <Error error={this.state.error} /> : <h5>Roasted by: {this.state.roaster}</h5>
  }

  render() { return (<div>{this.element()}</div>) }
}
