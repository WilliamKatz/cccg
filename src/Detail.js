import React, { Component } from 'react';
import RoastDataIPFSComponent from './RoastDataIPFSComponent';
import RoastedBy from "./RoastedBy";


export default class Detail extends Component {

  constructor (props) {
    super(props);
    this.state = { roastToken: props.roastToken, greenToken: props.greenToken };
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
        <RoastedBy roastToken={this.state.roastToken}/>
        <RoastDataIPFSComponent roastToken={this.state.roastToken}/>
      </div>
    )
  }
}
