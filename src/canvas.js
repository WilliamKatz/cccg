import React from 'react';
import './index.css';
import jsQR from "jsqr";

class Canvas extends React.Component {

  componentDidMount() {
    const imageElement = this.refs.image
    imageElement.onload = () => {
      

      //3.5 is a scaling factor that reduces the time it takes to find a qr code
      const width = imageElement.naturalWidth/3.5
      const height = imageElement.naturalHeight/3.5
    
      //get the doc's canvas and set the width and height
      const canvas = this.refs.canvas
      canvas.width = width
      canvas.height = height
    
      //get the context and draw the image at 0,0
      const canvasCtx = canvas.getContext('2d')
      canvasCtx.drawImage(imageElement, 0, 0, width, height)
    
      const imgData = canvasCtx.getImageData(0, 0, width, height)
      const imgArray = new Uint8Array(imgData.data);

      const code = jsQR(imgArray, width, height);
      if (code) {
        this.props.onQRCodeChange(code.data);
      } else {
        this.props.onQRCodeChange("No QR Code found");
      }
    }
  }


  render() {
      return(
        <div>
          <canvas ref="canvas" className="hidden" />
          <img ref="image" src={this.props.image} alt="canvas" className="hidden" />
        </div>
      )
    }
}
export default Canvas