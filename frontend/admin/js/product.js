window.addEventListener("DOMContentLoaded", () => {
    addChangePageProduct();
})

function addChangePageProduct() {
    const pageItemBtns = document.querySelectorAll("#products-pagination .page-item-btn")
    
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

                const respond = await fetch(`/api/monans?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderMonAns(data.monAns) : alert(data.message));
            } catch (error) {
                console.log(error);
            }

            // Cập nhật trạng thái active của btn
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}

function renderMonAns(data) {
    const tableBody = document.querySelector("#monan-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_mon_an}</td>
                <td>${element.ten_mon_an}</td>
                <td>${element.don_gia.toLocaleString("vi-VN")}đ</td>
                <td>${element.ten_nhom}</td>
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