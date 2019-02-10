import React, { Component } from 'react';
import RoastDataIPFSComponent from './RoastDataIPFSComponent';
import RoastedBy from "./RoastedBy";
import GreenDetail from "./GreenDetail";
import storehash from "./storehash";


export default class Detail extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, greenToken: props.greenToken, greenMethods: [storehash.methods.getCoffeeElevation] };
    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props): if we dont we cause an inifite loop
    if (this.props.roastToken !== prevProps.roastToken) {
      this.setState({ roastToken: this.props.roastToken });
    }
  }

  fetchData() {
    this.state.greenMethods[0](this.state.greenToken).call({ from: window.ethereum.selectedAddress }, (error, result) => {
      console.log(result);
    }) //end storehash
  }

  render() {
    console.log("rendering RoastComponent" + this.state.roastToken);
    return (
      <div>
          <h2>Roast Token: {this.state.roastToken}</h2>
          <RoastedBy roastToken={this.state.roastToken}/>
          <RoastDataIPFSComponent roastToken={this.state.roastToken}/>
          <h2>Green Token: {this.state.greenToken}</h2>
          <GreenDetail greenToken={this.state.greenToken} />
      </div>
    )
  }
}
