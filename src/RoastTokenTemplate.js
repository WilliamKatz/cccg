import React, { Component } from 'react';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';
import Error from './Error';


export default class  extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, error:  "" };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.roastToken !== prevProps.roastToken) {
      console.log(this.props.roastToken + "roastdataipfs compnent did update");
      this.setState({ roastToken: this.props.roastToken });
      this.fetchRoastDataOnIPFS(this.props.roastToken)
    }
  }

  /// Fetch IPFS hash from backend
  fetchData(roastToken) {
    storehash.methods.roastedBy(roastToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error == null) {
        this.setState({ roaster: result });
      } else {
        this.setState({ error: "Please input a valid roast token id"})
      }
    }) //end storehash
  }

  // element = () => {
  //   return this.state.error != "" ?  <Error error={this.state.error} /> : <img className='image' src={this.state.imageSource} />
  // }

  render() {
    return (
    )
  }
}
