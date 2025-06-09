window.addEventListener("DOMContentLoaded", () => {
    addChangePageInvoice();
})

function addChangePageInvoice() {
    const pageItemBtns = document.querySelectorAll("#invoice-pagination .page-item-btn")
    
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

                const respond = await fetch(`/api/hoadons?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderInvoices(data.hoaDons) : alert(data.message));
            } catch (error) {
                console.log(error);
            }

            // Cập nhật trạng thái active của btn
            pageItemBtns.forEach(item => item.classList.remove("active"))
            btn.classList.add("active");
        })
    })
}

function renderInvoices(data) {
    const tableBody = document.querySelector("#invoice-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_hoa_don}</td>
                <td>${element.ten_khach_hang}</td>
                <td>${element.so_dien_thoai}</td>
                <td>${element.tong_tien.toLocaleString("vi-VN") + "đ"}</td>
                <td>${element.thoi_gian_tao}</td>
                <td>${element.hinh_thuc_thanh_toan}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-success">Xem</button>
                    </div>
                </td>
            </tr>
        `
    }
}