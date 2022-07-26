import React from "react";
import  {connect} from "react-redux";
import { addFilterText } from "../reducers/filterSlice";

const Filter = (props) => {

    const handleChange = (event) => {
        props.addFilterText(event.target.value);
    };
    
    const style = {
        marginBottom: 10
    };

    return (
        <div style={style}>
      filter <input onChange={handleChange} />
        </div>
    );
};


export default connect(null, {addFilterText})(Filter);