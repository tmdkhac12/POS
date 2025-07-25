const loginForm = document.querySelector(".login-page");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    try {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const res = await fetch("/api/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username, password
            })
        });

        const data = await res.json();
        if (data.success) {
            alert("Đăng nhập thành công!");

            // Redirect to the matching page
            const roleId = data.roleId;
            if (roleId === 1) {
                window.location.href = "/admin";
            } else if (roleId === 2) {
                window.location.href = "/nhanvien";
            } else if (roleId === 3) {
                window.location.href = "/bep";
            } 
        } else {
            alert(data.message || "Đăng nhập thất bại!");
        }
    } catch (error) {
        console.log(error);
    }
});