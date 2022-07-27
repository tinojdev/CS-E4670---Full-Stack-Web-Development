import React from "react";
import {Link} from "react-router-dom";

const NavigationMenu = (props) => {
    const padding = {
        padding: 5,
    };
    
    return (
        <div style={{marginBottom: 50, padding: 10  , backgroundColor: "lightgrey"}}> 
            <Link style={padding} to="/">Blogs</Link> 
            <Link style={padding} to="/users">Users</Link> 
            <h4 style={{display: "inline"}}>Logged in as {props.user.username} <button onClick={() => props.handleLogout()}>Logout</button></h4>
        </div>
    );
};

export default NavigationMenu;