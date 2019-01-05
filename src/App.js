import React, { Component } from 'react';
import Canvas from './canvas';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { image: "", codeString: "" };

    this.onQRCamera = this.onQRCamera.bind(this);
    this.onQRCodeRead = this.onQRCodeRead.bind(this);
  }

  onQRCamera = (file) => {
    console.log(file);
    if (file) {
      this.setState({
        image: URL.createObjectURL(file)
      });
    }
  }

  onQRCodeRead = (codeString) => {
    this.setState({ codeString: codeString });
    console.log(codeString);
  }

  render()
  {
    return(
      <div>
        <div class='center'>
        <label className='qrcode-text-btn'>
          <input type='file' accept='image/*' capture='environment' onChange={e => this.onQRCamera(e.target.files[0])}></input>
        </label>
        <div display='block'><input type='text' className='qrcode-text' defaultValue={this.state.codeString}></input></div>
        <button>Search</button>
        </div>
        <Canvas image={this.state.image} onQRCodeChange={this.onQRCodeRead} className='canvas'/>
      </div>
    )
  }
}

export default App;


/*
<input type=text class=qrcode-text
><label class=qrcode-text-btn>
   <input type=file
         accept="image/*"
         capture=environment
         tabindex=-1>
</label>
*/
