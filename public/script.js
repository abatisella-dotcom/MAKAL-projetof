const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    const API_URL = window.location.origin;

    // Redireciona para a Home caso o usuário já esteja autenticado
    function verificarSessao() {
        const token = localStorage.getItem('jwt-token');
        if (token) {
            window.location.href = '/home.html';
        }
    }

    // Evento de envio do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.auth) {
                // Salva o Token e o nome do usuário no armazenamento do navegador
                localStorage.setItem('jwt-token', data.token);
                localStorage.setItem('jwt-username', data.username);
                
                // Redireciona para a página principal (Home)
                window.location.href = '/home.html';
            } else {
                loginMessage.textContent = data.message || 'Login falhou!';
                loginMessage.style.color = '#f43f5e';
            }
        } catch (error) {
            console.error('Erro no login:', error);
            loginMessage.textContent = 'Erro ao conectar ao servidor.';
            loginMessage.style.color = '#f43f5e';
        }
    });

    // Executa a checagem ao carregar a página
    verificarSessao();
