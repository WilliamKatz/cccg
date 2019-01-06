import React, { Component } from 'react';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';


export default class RoastDataIPFSComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, imageSource: ""};
    this.handleRoastDataIPFS = this.handleRoastDataIPFS.bind(this);
    this.convertUint8ArrayToImage = this.convertUint8ArrayToImage.bind(this);
    this.fetchRoastDataOnIPFS = this.fetchRoastDataOnIPFS.bind(this);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.roastToken !== prevProps.roastToken) {
      console.log(this.props.roastToken + "roastdataipfs compnent did update");
      this.fetchRoastDataOnIPFS(this.props.roastToken)
    }
  }

  /// Fetch IPFS hash from backend
  fetchRoastDataOnIPFS(roastToken) {
    // only call the backend when we get a roast token
    // TODO: get rid of magic number
    if (roastToken == '10007') {
      console.log("eth address " + window.ethereum.selectedAddress);
      storehash.methods.roastDataOnIPFS(roastToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
        this.handleRoastDataIPFS(error, result)
      }) //end storehash
    }
  }

  // Handle repspnse from BE for 'methods.roastDataOnIPFS'
  handleRoastDataIPFS = (error, result) => {
    console.log(error)
    console.log(result)
    if (error == null) {
      this.setState({ ipfsHash: result });
      console.log(result);
      ipfs.get(result, (err, files) => {
        files.forEach((file) => {
          console.log(file);
          if (file.content != null) {
            this.setState({ imageSource: this.convertUint8ArrayToImage(file.content) });
          }
        }) // end for each
      }) // end result
    } else {
      //TODO: show an error to user
      this.setState({ imageSource: "" });
    } // end error
  } // end handleRoastDataIPFS

  /// Image blob helper function
  convertUint8ArrayToImage = (array) => {
    //THE FUCKING MAGIC!!!!!
    //https://github.com/ipfs/js-ipfs/issues/848
    var arrayBufferView = new Uint8Array( array );
    var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    return imageUrl;
  }

  render() {
    return (
        <img className='image' onLoad={this.fetchRoastDataOnIPFS()} src={this.state.imageSource} />
    )
  }
}
