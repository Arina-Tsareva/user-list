"use client";
import { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser, updateUser } from "../services/api";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleAddUser(e) {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = await addUser({ name, email });
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  }

  async function handleDeleteUser(id) {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    if (!editingUser) return;

    const updatedUser = await updateUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email,
    });

    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  }

  return (
    <div className={styles.container}>
      <h1>Список пользователей</h1>

      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className={styles.form}>
        <input
          type="text"
          placeholder="Имя"
          className={styles.input}
          value={editingUser ? editingUser.name : name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setName(e.target.value)
          }
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={editingUser ? editingUser.email : email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setEmail(e.target.value)
          }
        />
        <button type="submit" className={editingUser ? styles.updateButton : styles.addButton}>
          {editingUser ? "Обновить" : "Добавить"}
        </button>
      </form>

      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userItem}>
            {user.name} ({user.email})
            <div className={styles.buttons}>
              <button onClick={() => setEditingUser(user)} className={styles.updateButton}>
                ✏️
              </button>
              <button onClick={() => handleDeleteUser(user.id)} className={styles.deleteButton}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
