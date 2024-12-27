import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserList from "../../components/UserList/UserList.jsx";
import style from './MainPage.module.css';

const MainPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Получение пользователей
    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/users');
        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onSubmit = async (data) => {
        try {
            await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setMessage('Пользователь успешно создан');
            setShowModal(true);
            fetchUsers(); // Обновляем список пользователей
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:8000/users/${id}`, {
                method: 'DELETE',
            });
            setMessage('Пользователь удален');
            setShowModal(true);
            fetchUsers(); // Обновляем список пользователей
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })} placeholder="Имя" />
                {errors.name && <span>Это поле обязательно</span>}
                <input {...register('email', { required: true })} placeholder="Email" />
                {errors.email && <span>Это поле обязательно</span>}
                <input {...register('username', { required: true })} placeholder="Логин" />
                {errors.username && <span>Это поле обязательно</span>}
                <button type="submit">Создать пользователя</button>
            </form>

            {showModal && (
                <div className="modal">
                    <p>{message}</p>
                    <button onClick={() => setShowModal(false)}>Закрыть</button>
                </div>
            )}


            <UserList users={users} deleteUser={deleteUser} />
        </div>
    );
};

export default MainPage;