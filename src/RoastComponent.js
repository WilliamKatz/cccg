import React, { Component } from 'react';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';
import RoastDataIPFSComponent from './RoastDataIPFSComponent.js';


export default class RoastComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken };
  }

  render() {
    return (
      <div>
        <RoastDataIPFSComponent roastToken={this.state.roastToken} />
      </div>
    )
  }
}
