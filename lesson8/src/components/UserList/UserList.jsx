import React from 'react';

const UserList = ({ users, deleteUser }) => {
    return (
        <div>
            <h2>Список пользователей</h2>
            {users.length === 0 ? (
                <p>Список пуст</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Логин</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;