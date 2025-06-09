window.addEventListener("DOMContentLoaded", () => {
    addChangePageCustomer();
})

function addChangePageCustomer() {
    const pageItemBtns = document.querySelectorAll("#customer-pagination .page-item-btn")
    
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

                const respond = await fetch(`/api/khachhangs?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderKhachHangs(data.khachHangs) : alert(data.message));
            } catch (error) {
                console.log(error);
            }

            // Cập nhật trạng thái active của btn
            pageItemBtns.forEach(item => item.classList.remove("active"))
            btn.classList.add("active");
        })
    })
}

function renderKhachHangs(data) {
    const tableBody = document.querySelector("#khachhang-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_khach_hang}</td>
                <td>${element.ten_khach_hang}</td>
                <td>${element.so_dien_thoai}</td>
                <td>${element.tong_chi_tieu.toLocaleString('vi-VN')}</td>
                <td>${element.tien_tich_luy.toLocaleString('vi-VN')}</td>
                <td>${element.cap_bac}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-success">Xem</button>
                        <button class="btn btn-warning">Cập nhật</button>
                        <button class="btn btn-danger">Xóa</button>
                    </div>
                </td>
            </tr>
        `
    }
}