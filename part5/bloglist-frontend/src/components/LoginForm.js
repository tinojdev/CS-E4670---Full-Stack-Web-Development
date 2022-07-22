import React, {useState} from "react";
import loginService from "../services/login";


const LoginForm = ({setUser, addNotificationMessage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const user = await loginService.login({
                username, password,
            });
            setUser(user);
            setUsername("");
            setPassword("");
            window.localStorage.setItem(
                "loggedBlogAppUser", JSON.stringify(user)
            ); 
            addNotificationMessage("You have been succesfully logged in!", true);
            
        } catch (exception) {
            addNotificationMessage("Wrong credentials", false);
        }
    };


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <h3>Username</h3>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <h3>Password</h3>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;