import React, { Component } from 'react';
import storehash from './storehash';
import Error from './Error';
import ipfs from './ipfs';


export default class GreenProofOfIdentity extends Component {

  constructor (props) {
    super(props);
    this.state = { imageSource: "", error:  "" };
    this.element = this.element.bind(this);
    this.convertUint8ArrayToImage = this.convertUint8ArrayToImage.bind(this);
    this.handleGreenProofOfIdentityIPFS = this.handleGreenProofOfIdentityIPFS.bind(this);
    this.getProofOfIdentityIPFSHash = this.getProofOfIdentityIPFSHash.bind(this);
    console.log(props.producer + "this is the producer id");
    // this.getProofOfIdentityIPFSHash(props.producer);
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.producer !== prevProps.producer) {
      console.log(this.props.producer + "producer compnent did update");
      this.getProofOfIdentityIPFSHash(this.props.producer);
    }
  }

  getProofOfIdentityIPFSHash = (producer) => {
    // Proof of Identity
    storehash.methods.getProofOfIdentity(producer).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.handleGreenProofOfIdentityIPFS(result);
      } else {
        this.setState({  error: "No proof of identity photo data"});
      }
    })
  }

  // Handle repspnse from BE for roastDataOnIPFS
  handleGreenProofOfIdentityIPFS = (ipfsHash) => {
    ipfs.get(ipfsHash, (err, files) => {
      if (err == null) {
        files.forEach((file) => {
          console.log(file);
          if (file.content != null) {
            this.setState({ imageSource: this.convertUint8ArrayToImage(file.content), error: "" });
          }
        }) // end for each
      } else {
        this.setState({ error: "Unable to fetch from IFPS" });
      }
    }) // end result
  } // end handleGreenProofOfIdentityIPFS

  /// Image blob helper function
  convertUint8ArrayToImage = (array) => {
    //THE FUCKING MAGIC!!!!!
    //https://github.com/ipfs/js-ipfs/issues/848
    var arrayBufferView = new Uint8Array( array );
    var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    console.log(imageUrl);
    return imageUrl;
  }

  element = () => {
    return this.state.error !== "" ?  <Error error={this.state.error} /> : <img src={this.state.imageSource} />
  }

  render() {
    return <img className='image' src={this.state.imageSource} />
  }
}
