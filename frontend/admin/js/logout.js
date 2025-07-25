document.getElementById('confirmLogout').addEventListener('click', async function () {
    const res = await fetch("/api/login", {
        method: "DELETE"
    })
    const data = await res.json();
    
    alert(data.message);
    if (data.success) {
        window.location.href = "/login"; // Redirect to login page
    }

    bootstrap.Modal.getInstance(document.getElementById('logoutModal')).hide();
});