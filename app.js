document.addEventListener('DOMContentLoaded', () => {

    // Helper function to show errors
    const showError = (formId, message) => {
        const errorDiv = document.querySelector(`#${formId} .error-message`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    };

    // ----- Login Flow -----
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button');

            try {
                submitBtn.textContent = 'Gözləyin...';
                submitBtn.disabled = true;

                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save user info to local storage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    showError('loginForm', data.error || 'Giriş uğursuz oldu.');
                }
            } catch (err) {
                showError('loginForm', 'Serverlə əlaqə qurmaq mümkün olmadı.');
                console.error(err);
            } finally {
                submitBtn.textContent = 'Daxil Ol';
                submitBtn.disabled = false;
            }
        });
    }

    // ----- Register Flow -----
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = registerForm.querySelector('button');

            try {
                submitBtn.textContent = 'Gözləyin...';
                submitBtn.disabled = true;

                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Registration successful, redirect to login
                    alert('Qeydiyyat uğurla tamamlandı. İndi daxil ola bilərsiniz.');
                    window.location.href = 'index.html';
                } else {
                    showError('registerForm', data.error || 'Qeydiyyatda xəta baş verdi.');
                }
            } catch (err) {
                showError('registerForm', 'Serverlə əlaqə qurmaq mümkün olmadı.');
                console.error(err);
            } finally {
                submitBtn.textContent = 'Qeydiyyatı Tamamla';
                submitBtn.disabled = false;
            }
        });
    }

    // ----- Dashboard Flow -----
    const welcomeUser = document.getElementById('welcomeUser');
    const logoutBtn = document.getElementById('logoutBtn');

    if (welcomeUser && logoutBtn) {
        // Check if user is logged in
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            // Not logged in, redirect to login page
            window.location.href = 'index.html';
            return;
        }

        const user = JSON.parse(userStr);
        welcomeUser.textContent = `Salam, ${user.username}`;

        // Logout logic
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }

});
