import React from "react";
import {useParams} from "react-router-dom";

const User = ({users}) => {
    const id = useParams().id;
    const user = users.find(user => user.id === id);

    if (!user) return <p>Fetching</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs:</h4>
            <ul>
                {user.blogs.map((blog, i) => <li key={i}>{blog.title}</li>)}
            </ul>
        </div>
    );
};

export default User;