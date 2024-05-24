document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const overlay = document.getElementById('overlay');
    const signInModal = document.getElementById('sign-in-modal');
    const signInForm = document.getElementById('sign-in-form');
    
    signInBtn.addEventListener('click', () => {
        signInModal.classList.add('active');
        overlay.classList.add('active');
    });
    
    overlay.addEventListener('click', () => {
        signInModal.classList.remove('active');
        overlay.classList.remove('active');
    });

    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('sign-in-username').value;
        const password = document.getElementById('sign-in-password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();

            if (response.ok) {
                alert('Sign in successful!');
                signInModal.classList.remove('active');
                overlay.classList.remove('active');
                document.getElementById('username').textContent = username;
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
