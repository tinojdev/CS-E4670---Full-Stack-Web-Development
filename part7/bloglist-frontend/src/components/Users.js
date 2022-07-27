import React from "react";
import {Link} from "react-router-dom";

const Users = ({users}) => {
    

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,i) => <UserTableRow key={i} user={user} />)} 
                </tbody>
            </table>
        </div>
    );
};

const UserTableRow = ({user}) => {
    return (
        <tr>
            <td><Link to={`/users/${user.id}`} > {user.name} </Link> </td>
            <td>{user.blogs.length}</td>
        </tr>
    );
};

export default Users;

