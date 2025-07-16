document.getElementById('confirmLogout').addEventListener('click', function () {
    alert('Bạn đã đăng xuất');
    bootstrap.Modal.getInstance(document.getElementById('logoutModal')).hide();
});