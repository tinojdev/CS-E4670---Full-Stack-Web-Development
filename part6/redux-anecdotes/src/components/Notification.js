import React from "react";
import { connect } from "react-redux";


const Notification = ({message}) => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1
    };
    return (
        <div style={style}>
            {message}
        </div>
    );
};
const mapStateToProps = (state) => {return {message: state.notification.message};};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;