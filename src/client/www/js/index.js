document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Pour empêcher le formulaire de se soumettre de manière traditionnelle
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Assurez-vous que l'adresse correspond à votre endpoint d'inscription
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Gérer la réponse du serveur
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Pour empêcher le formulaire de se soumettre de manière traditionnelle
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Assurez-vous que l'adresse correspond à votre endpoint de connexion
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Gérer la réponse du serveur, par exemple en stockant le token JWT
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
