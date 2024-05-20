document.addEventListener('DOMContentLoaded', () => {
    const isAddUserPage = document.getElementById('registerForm') !== null;
    const isListUsersPage = document.getElementById('userTable') !== null;
    if (isAddUserPage) {
        // Form submission handler
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const nama = document.getElementById('nama').value;
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value;
            const user = { "nama": nama, "role": role, "pass": password };
            try {
                const response = await fetch('https://express-api-ten-lilac.vercel.app/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                if (!response.ok) {
                    throw new Error('Failed to submit data');
                }
                form.reset();
                alert('User added successfully!');
                window.location.href = 'tabelUser.html';
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
    async function fetchUsers() {
        try {
            const response = await fetch('https://express-api-ten-lilac.vercel.app/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.Nama}</td>
                    <td>${user.Password}</td>
                    <td>${user.role}</td>
                `;
                userTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    if (isListUsersPage) {
        fetchUsers()
        setInterval(fetchUsers, 10000);
    }
});
