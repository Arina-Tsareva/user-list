const API_URL = "http://localhost:5000/users";

export async function getUsers() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function addUser(user) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return res.json();
}

export async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function updateUser(id, updatedUser) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
    });
    return res.json();
}
