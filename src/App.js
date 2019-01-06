import React, { Component } from 'react';
import Canvas from './canvas';
import storehash from './storehash';
import Web3 from 'web3';
import ipfs from './ipfs';
import RoastComponent from './RoastComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { image: "",
              roastToken: "",
         roastTokenInput: "",
                ipfsHash: "",
                 account: "",
                   error: "",
             imageSource: "" };

    this.onQRCamera = this.onQRCamera.bind(this);
    this.onQRCodeRead = this.onQRCodeRead.bind(this);
    this.onManualQRCodeSubmit = this.onManualQRCodeSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


    //deteremine who the provider is
    // const { currentProvider: cp } = window.web3
    // const isToshi = !!cp.isToshi
    // const isCipher = !!cp.isCipher
    // const isMetaMask = !!cp.isMetaMask
  }

  // "should do" from https://drive.google.com/file/d/1UU9_36keso1DbKKEck4DdO19Ap1FF0ov/view
  // function checkForWeb3 () {
  //   if (window.web3 && web3.currentProvider) {
  //     //we have a dapp
  //   }
  //   window.setTimeout(checkForWeb3, 100)
  // }
  // document.addEventListener('load', checkForWeb3, false)


  async componentDidMount() {
    //following only works on desktop
    //TODO: need to implement mobile
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          this.setState({ error: "no reason why" });
          this.setState({ account : window.ethereum.selectedAddress });
      } catch (error) {
          // User denied account access...
        this.setState({ error: "is error"});
      }
    }
  }

  /// Called when the input field uploads a file
  onQRCamera = (file) => {
    console.log(file);
    if (file) {
      console.log(file);
      this.setState({
        image: URL.createObjectURL(file)
      });
    }
  }

  ///  Called when the js-qr library reads a QR code in an image
  onQRCodeRead = (roastToken) => {
    this.setState({ roastToken: roastToken });
  }

  //manually entry of roast token
  handleChange(event) {
    this.setState({ roastTokenInput: event.target.value});
  }


  /// Called on manual form submittal of roast token id
  onManualQRCodeSubmit(e) {
    e.preventDefault()
    console.log("Submitting with account" + this.state.account);
    console.log(  this.state.roastTokenInput);
    this.setState({ roastToken: this.state.roastTokenInput });
  }

  render()
  {
    // console.log("we are rending app again");
    return(
      <div>
        <label className='qrcode-text-btn'>
          <input type='file' accept='image/*' capture='environment' onChange={e => this.onQRCamera(e.target.files[0])}></input>
        </label>
        <form onSubmit={this.onManualQRCodeSubmit}>
        <input type="text" className='qrcode-text' value={this.state.value} onChange={this.handleChange} />
        <input type='submit' value='Submit' />
        </form>
        <input type='text' defaultValue={this.state.ipfsHash} />
        <input type='text' defaultValue={this.state.account} />
        <input type='text' defaultValue={this.state.error} />
        <RoastComponent roastToken={this.state.roastToken} />
        <Canvas image={this.state.image} onQRCodeChange={this.onQRCodeRead} className='canvas'/>
      </div>
    )
  }
}

export default App;
