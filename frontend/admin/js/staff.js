window.addEventListener("DOMContentLoaded", () => {
    addChangePageStaff();
})

function addChangePageStaff() {
    const pageItemBtns = document.querySelectorAll("#staff-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Kiểm tra trạng thái btn, nếu active thì không gọi API 
            const isActive = btn.classList.contains("active");
            if (isActive) {
                return;
            }

            // Fetch API lấy dữ liệu 
            try {
                const page = parseInt(btn.getAttribute("data-page"));

                const respond = await fetch(`/api/taikhoans?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderTaiKhoans(data.taiKhoans) : alert(data.message));
            } catch (error) {
                console.log(error);
            }

            // Cập nhật trạng thái active của btn
            pageItemBtns.forEach(item => item.classList.remove("active"))
            btn.classList.add("active");
        })
    })
}

function renderTaiKhoans(data) {
    const tableBody = document.querySelector("#taikhoan-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_tai_khoan}</td>
                <td>${element.username}</td>
                <td>${getName(element.ma_nhom_quyen)}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-warning">Cập nhật</button>
                        <button class="btn btn-danger">Xóa</button>
                    </div>
                </td>
            </tr>
        `
    }
}

function getName(maNhomQuyen) {
    if (maNhomQuyen === 1) {
        return "Admin";
    } else if (maNhomQuyen === 2) {
        return "Nhân Viên";
    } else if (maNhomQuyen === 3) {
        return "Bếp";
    }
}