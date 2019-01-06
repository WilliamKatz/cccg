import React, { Component } from 'react';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';


export default class RoastDataIPFSComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, imageSource: "" };
    this.handleRoastDataIPFS = this.handleRoastDataIPFS.bind(this);
    this.convertUint8ArrayToImage = this.convertUint8ArrayToImage.bind(this);
  }

  componentDidMount() {
    storehash.methods.roastDataOnIPFS(this.state.roastToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      this.handleRoastDataIPFS(error, result)
    }) //end storehash
  }

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
        })// end for each
      }) // end result
    } else {
      //TODO: show an error to user
    }// end error
  } // end handleRoastDataIPFS

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
      <img className='image' src={this.state.imageSource} />
    )
  }
}
