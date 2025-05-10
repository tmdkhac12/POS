document.getElementById('confirmLogout').addEventListener('click', function () {
    alert('Bạn đã đăng xuất');
    const modal = bootstrap.Modal.getInstance(document.getElementById('logoutModal'));
    modal.hide();
});