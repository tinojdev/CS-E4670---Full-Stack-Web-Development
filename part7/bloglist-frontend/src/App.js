import React from "react";
import { useState, useEffect } from "react";
import { setToken } from "./services/blogs";

import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import Notification from "./components/Notification";

const App = () => {
    const [user, setUser] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [isNotificationSuccess, setIsNotificationSuccess] = useState(false);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            // noteService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        if (user === null) setToken(null);
        else setToken(user.token);
    }, [user]);
    
    const addNotificationMessage = async (message, isSuccess = false) => {
        setNotificationMessage(message);
        setIsNotificationSuccess(isSuccess); 
        setTimeout(() => {
            setNotificationMessage(null);
        }, 4000);
    };

    return (
        <div>
            <Notification message={notificationMessage} isSuccess={isNotificationSuccess} />
            {user === null && <LoginForm setUser={setUser} addNotificationMessage={addNotificationMessage}/> }
            {user !== null && <LandingPage user={user} setUser={setUser} addNotificationMessage={addNotificationMessage} />}
        </div>
    );
};

export default App;
