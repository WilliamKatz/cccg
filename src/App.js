import React, { Component } from 'react';
import Canvas from './canvas';
import Web3 from 'web3';
import Detail from './Detail';
import Error from './Error';
import './index.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { image: "",
                   roastToken: "",
                   greenToken: "0",
                   roastTokenInput: "10007",
                   ipfsHash: "",
                   account: "",
                   error: "",
                   imageSource: "",
                   mode: "scanner" };

    this.onQRCamera = this.onQRCamera.bind(this);
    this.onQRCodeRead = this.onQRCodeRead.bind(this);
    this.onManualQRCodeSubmit = this.onManualQRCodeSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scannerDiv = this.scannerDiv.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.detailDiv = this.detailDiv.bind(this);


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
          this.setState({ account : window.ethereum.selectedAddress });
      } catch (error) {
          // User denied account access...
        this.setState({ error: "Please provide access to ethereum wallet address to proceed"});
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
    this.setState({ roastTokenInput: roastToken });
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
    this.setState({ roastToken: this.state.roastTokenInput, mode: "details" });
  }

  scannerDiv() {
      return this.state.mode === "scanner" ? <div className='scanner'>
      <label className='qrcode-text-btn'>
      <input type='file' accept='image/*' capture='environment' onChange={e => this.onQRCamera(e.target.files[0])}></input>
      </label>
      <form onSubmit={this.onManualQRCodeSubmit}>
      <input type="text" className='qrcode-text' value={this.state.roastTokenInput} onChange={this.handleChange} />
      <input type='submit' value='Submit' />
      </form>
      </div> : null
  }

  scanAgainDiv() {
      return this.state.mode !== "scanner" ? <button onClick={this.toggleMode}>Scan another</button> : null
  }

  toggleMode() {
    this.setState({ mode: this.state.mode === "scanner" ? "details" : "scanner" })
  }

  detailDiv() {
    return this.state.mode === "scanner" ? null : <Detail roastToken={this.state.roastToken} greenToken={this.state.greenToken}/>
  }

  render()
  {
    // console.log("we are rending app again");
    return(
      <div>
        <Error error={this.state.error} />
        <div> {this.scanAgainDiv()} </div>
        <div> {this.scannerDiv()} </div>
        <div className='details'> {this.detailDiv()} </div>
        <Canvas image={this.state.image} onQRCodeChange={this.onQRCodeRead} className='canvas'/>
      </div>
    )
  }
}

export default App;

// might be how to get from coinbase wallet
//let account = store.state.web3.coinbase
// store.state.contractInstance().balanceOf(account, { gas: 0 }, (error, result) => {
//   let polledBalance = result.toNumber() // Coinbase Wallet chokes here but Meta Mask is fine
//   ...
// })
