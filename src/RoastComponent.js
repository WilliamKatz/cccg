import React, { Component } from 'react';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';
import RoastDataIPFSComponent from './RoastDataIPFSComponent';
import RoastedBy from "./RoastedBy";


export default class RoastComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.roastToken !== prevProps.roastToken) {
      this.setState({ roastToken: this.props.roastToken });
    }
  }

  render() {
    console.log("rendering RoastComponent" + this.state.roastToken);
    return (
      <div>
        <RoastDataIPFSComponent roastToken={this.state.roastToken}/>
        <RoastedBy roastToken={this.state.roastToken}/>
      </div>
    )
  }
}
