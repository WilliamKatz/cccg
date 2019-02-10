import React, { Component } from 'react';
import storehash from './storehash';
import ipfs from './ipfs';
import Error from './Error';
import './index.css';


export default class RoastDataIPFSComponent extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, imageSource: "", error:  "" };
    this.handleRoastDataIPFS = this.handleRoastDataIPFS.bind(this);
    this.convertUint8ArrayToImage = this.convertUint8ArrayToImage.bind(this);
    this.fetchRoastDataOnIPFS = this.fetchRoastDataOnIPFS.bind(this);
    this.element = this.element.bind(this);

    this.fetchRoastDataOnIPFS(props.roastToken);
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
  fetchRoastDataOnIPFS(roastToken) {
    // only call the backend when we get a roast token
    // TODO: get rid of magic number
    console.log("fetch");
    if (typeof(roastToken) === 'string' && String(roastToken).length === 5) {
      console.log("eth address " + window.ethereum.selectedAddress);
      storehash.methods.roastDataOnIPFS(roastToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
        this.handleRoastDataIPFS(error, result)
      }) //end storehash
    } else {
      this.setState({ error: "Please input a valid roast token id"})
    }
  }

  // Handle repspnse from BE for roastDataOnIPFS
  handleRoastDataIPFS = (error, result) => {
    console.log(error)
    console.log(result)
    if (error == null) {
      console.log(result);
      ipfs.get(result, (err, files) => {
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
    } else {
      //TODO: show an error to user
      this.setState({ imageSource: "", error: "handleRoastDataIPFS" });
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

  element = () => {
    // eslint-disable-next-line
    return this.state.error !== "" ?  <Error error={this.state.error} /> : <img className='image' src={this.state.imageSource} />
  }

  render() {
    return (
      <div>
      {this.element()}
      </div>
    )
  }
}
