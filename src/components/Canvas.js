
import React, { Component } from 'react';
import Title from './Title';
import ColourSelector from './ColourSelector';

const canvasStyles = {
    border: "5px solid black"
}

const divStyles = {
    margin: "3em"
}

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            hex:'#A20707',
            coords: null
        }
        // used to reference to the dom element
        // creating a refernce defining instance variable 
        this.canvasRef = React.createRef()
        this.context =null
        this.height = 600
        this.width = 600
    };

    setContext() {
        //same as const target = document.getElementById("target")
        this.context = this.canvasRef.current.getContext('2d');

        // setting up canvas element properties
        this.context.strokeStyle = this.state.hex 
        this.context.lineJoin = "round"
        this.context.lineWidth = 3

    }

    componentDidMount(){
        this.setContext()
    }

    componentDidUpdate(){
        this.setContext()
    }
    
    onColourSelectorChange = (newHex) => {
        this.setState({
            hex:newHex
        })
    }
   // sets coords when mouse moves 
   onCanvasMouseMove = (event) => {
       const x = event.nativeEvent.offsetX;
       const y = event.nativeEvent.offsetY;
       const coords = this.state.coords;
       if(x > 0 && x < this.width && y > 0 && y < this.height) {
           if(coords){

               //way to draw in canvas
               this.context.beginPath();
               this.context.moveTo(coords[0], coords[1]);
               this.context.lineTo(x, y);
               this.context.closePath();
               this.context.stroke();
               this.setState({ coords: [x,y]});
           }
       } else {
           this.setState({
               coords: null
           }) 
       }

    }
    // sets coords when mouse goes up the button
    onCanvasMouseUp = (event) => {
        this.setState({
            coords: null
        });
    }
    // sets coords when mouse goes downthe button
    onCanvasMouseDown = (event) => {
       const x = event.nativeEvent.offsetX;
       const y = event.nativeEvent.offsetY;
       this.setState({
           coords: [x, y]
       }) ;
    }

    render(){
        return(
            <div>
            <Title />
            <div style = {divStyles} >
            <ColourSelector hex ={this.state.hex} onColourSelectorChange = {this.onColourSelectorChange} />
            </div>
            <div style = {divStyles} >
            <canvas
                ref = {this.canvasRef}
                width = {this.width}
                height = {this.height}
                onMouseMove = {this.onCanvasMouseMove}
                onMouseDown = {this.onCanvasMouseDown}
                onMouseUp = {this.onCanvasMouseUp}
                style = {canvasStyles}
            />
            </div>
            </div>  
        );
    }
}


export default Canvas;