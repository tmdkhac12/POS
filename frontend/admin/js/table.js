window.addEventListener("DOMContentLoaded", () => {
    addChangePageTable();
})

function addChangePageTable() {
    const pageItemBtns = document.querySelectorAll("#table-pagination .page-item-btn")
    
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

                const respond = await fetch(`/api/bans?page=${page}`); 
                const data = await respond.json();
                (data.success ? renderBans(data.bans) : alert(data.message));
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

function renderBans(data) {
    const tableBody = document.querySelector("#ban-table tbody");
    tableBody.innerHTML = "";

    for (const element of data) {
        tableBody.innerHTML += `
            <tr>
                <td>${element.ma_ban}</td>
                <td>${element.ten_ban}</td>
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