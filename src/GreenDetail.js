import React, { Component } from 'react';
import storehash from './storehash';
import ipfs from './ipfs';
import Error from './Error';
import GreenProofOfIdentity from './GreenProofOfIdentity';


export default class GreenTokenFarmName extends Component {

  constructor (props) {
    super(props);

    this.state = { greenToken: props.greenToken,
                   farmName: "",
                   elevation: "",
                   countryOfOrigin: "",
                   description: "",
                   harvestDate: "",
                   producer: "",
                   producerLink: "",
                   proofOfIdentityHash: "",
                   proofOfPaymentLink: "",
                   proofOfPaymentTx: "",
                   error:  "" };
    this.fetchData = this.fetchData.bind(this);
    this.element = this.element.bind(this);
    this.handleRoastDataIPFS = this.handleRoastDataIPFS.bind(this);
    this.convertUint8ArrayToImage = this.convertUint8ArrayToImage.bind(this);
    this.fetchData(props.greenToken);
  }

  // async componentDidUpdate(prevProps) {
  // // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
  //   if (this.props.greenToken !== prevProps.greenToken) {
  //     console.log(this.props.greenToken + "roastdataipfs compnent did update");
  //     this.setState({ greenToken: this.props.greenToken });
  //     await this.fetchData(this.props.greenToken);
  //   }
  // }

  /// Fetch data from BE
  fetchData(greenToken) {

    //farm name
    storehash.methods.farmName(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ farmName: result, error: "" });
      } else {
        this.setState({ farmName: "", error: "No farm name"});
      }
    }) //end storehash

    // elevationMeters
    storehash.methods.getCoffeeElevation(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ elevation: result, error: "" });
      } else {
        this.setState({ elevation: "", error: "No elevation data"});
      }
    })

    // Country of Origin
    storehash.methods.getCountryOfOrigin(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ countryOfOrigin: result, error: "" });
      } else {
        this.setState({ countryOfOrigin: "", error: "No country of origin data"});
      }
    })

    // Green Coffee Desc.
    storehash.methods.getGreenCoffeeDescription(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ description: result, error: "" });
      } else {
        this.setState({ description: "", error: "No coffee description data"});
      }
    })

    // Harvest Date
    storehash.methods.getHarvestDate(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ harvestDate: result, error: "" });
      } else {
        this.setState({ harvestDate: "", error: "No harvest date data"});
      }
    })

    // Producer
    storehash.methods.getProducerOf(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ producer: result,
                        producerLink: 'https://etherscan.io/address/' + result,
                        error: "" });
      } else {
        this.setState({ producer: "", error: "No producer data"});
      }
    })

    // Proof of payment
    storehash.methods.getProofOfPaymentForGreen(greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      if (error === null) {
        this.setState({ proofOfPaymentLink: 'https://etherscan.io/tx/' + result,
                        proofOfPaymentTx: result,
                        error: "" });
      } else {
        this.setState({ proofOfPayment: "", error: "No proof of payment data"});
      }
    })
  }

  // Handle repspnse from BE for roastDataOnIPFS
  handleRoastDataIPFS = (error, result) => {
    if (error == null) {
      console.log(result);
      ipfs.get(result, (err, files) => {
        if (err == null) {
          files.forEach((file) => {
            console.log(file);
            if (file.content != null) {
              return this.convertUint8ArrayToImage(file.content);
            }
          }) // end for each
        } else {
          return null;
        }
      }) // end result
    } else {
      //TODO: show an error to user
      return null;
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
    return this.state.error !== "" ?  <Error error={this.state.error} /> :
     <table>
     <tbody>
      <tr>
        <td>Farm:</td><td>{this.state.farmName}</td>
      </tr>
      <tr>
       <td>Elevation(ft):</td><td>{this.state.elevation}</td>
      </tr>
      <tr>
       <td>Country of Origin:</td><td>{this.state.countryOfOrigin}</td>
      </tr>
      <tr>
       <td>Description:</td><td>{this.state.description}</td>
      </tr>
      <tr>
        <td>Harvest Date (MMYY):</td><td>{this.state.harvestDate}</td>
      </tr>
      <tr>
        <td>Producer:</td><td><a href={this.state.producerLink} target='_blank'>{this.state.producer}</a></td>
      </tr>
      <tr>
        <td>Proof of payment:</td><td><a href={this.state.proofOfPaymentLink} target='_blank'>{this.state.proofOfPaymentTx}</a></td>
      </tr>
      <tr>
        <td>Proof of identity:</td><td><GreenProofOfIdentity producer={this.state.producer}/></td>
      </tr>
      </tbody>
    </table>
  }

  render() {
    return (
      <table>
       <tbody>
        <tr>
          <td>Farm:</td><td>{this.state.farmName}</td>
        </tr>
        <tr>
         <td>Elevation(ft):</td><td>{this.state.elevation}</td>
        </tr>
        <tr>
         <td>Country of Origin:</td><td>{this.state.countryOfOrigin}</td>
        </tr>
        <tr>
         <td>Description:</td><td>{this.state.description}</td>
        </tr>
        <tr>
          <td>Harvest Date (MMYY):</td><td>{this.state.harvestDate}</td>
        </tr>
        <tr>
          <td>Producer:</td><td><a href={this.state.producerLink} target='_blank'>{this.state.producer}</a></td>
        </tr>
        <tr>
          <td>Proof of payment:</td><td><a href={this.state.proofOfPaymentLink} target='_blank'>{this.state.proofOfPaymentTx}</a></td>
        </tr>
        <tr>
          <td>Proof of identity:</td><td><GreenProofOfIdentity producer={this.state.producer}/></td>
        </tr>
        </tbody>
      </table>
    )
  }
}
