import React from 'react';

const ColourSelector =(props) => {
     const {hex, onColourSelectorChange} =  props;
        return (
            <div>
                <input type ="color" Value ={hex} onChange = {(event) => onColourSelectorChange(event.target.value)}/>
            </div>
            
        );  
//     static defaultProps = {
//         hex: "#f4424b"   
}

export default ColourSelector;

