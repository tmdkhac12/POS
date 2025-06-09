window.addEventListener("DOMContentLoaded", () => {
    addChangePageDiscount();
})

function addChangePageDiscount() {
    const pageItemBtns = document.querySelectorAll("#discount-pagination .page-item-btn")
    
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

                const respond = await fetch(`/api/khuyenmais?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderDiscounts(data.khuyenMais) : alert(data.message));
            } catch (error) {
                console.log(error);
            }

            // Cập nhật trạng thái active của btn
            pageItemBtns.forEach(item => item.classList.remove("active"))
            btn.classList.add("active");
        })
    })
}

function renderDiscounts(data) {
    const tableBody = document.querySelector("#discount-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_khuyen_mai}</td>
                <td>${element.ten_khuyen_mai}</td>
                <td>${element.giam_theo_phan_tram ? element.giam_theo_phan_tram + "%" : ""}</td>
                <td>${element.giam_theo_tien ? element.giam_theo_tien.toLocaleString("vi-VN") + "đ" : ""}</td>
                <td>${element.ngay_bat_dau + " 00:00:00"}</td>
                <td>${element.ngay_ket_thuc}</td>
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