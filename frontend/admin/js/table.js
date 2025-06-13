window.addEventListener("DOMContentLoaded", () => {
    tablePageHandler.addChangePageTable();
    addTableHandler.init();
    updateTableHandler.init();
    deleteTableHandler.init();
})

const tablePageHandler = {
    d_paginationContainer: document.querySelector("#table-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#table-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    // Methods
    addChangePageTable() {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));
                const data = await this.getPage(page);
                (data.success ? this.renderBans(data.bans) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.updateBtnStatus(btn);

                // Cập nhật chức năng của các nút update, delete 
                updateTableHandler.addUpdateBtnsOnClick();
                deleteTableHandler.addDeleteBtnsOnClick();
            })
        })
    },

    updateBtnStatus(btn) {
        this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
        btn.classList.add("active");
    },

    async getPage(page) {
        try {
            const respond = await fetch(`/api/bans?page=${page}`);
            const data = await respond.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async refreshCurrentPage() {
        // Fetch API lấy dữ liệu 
        const page = parseInt(this.d_activeBtn.getAttribute("data-page"));
        const data = await this.getPage(page);
        (data.success ? this.renderBans(data.bans) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updateTableHandler.addUpdateBtnsOnClick();
        deleteTableHandler.addDeleteBtnsOnClick();
    },

    renderPagination(number) {
        const oldCount = this.ad_pageItemBtns.length;
        const newCount = Math.ceil(number / 8);

        if (newCount === oldCount)
            return;

        // 1. Xóa toàn bộ nội dung phân trang trước đó 
        this.d_paginationContainer.innerHTML = `
            <li class="page-item"><a class="page-link" href="#">Trang trước</a></li>
            <li class="page-item page-item-btn" data-page="1"><a class="page-link" href="#">1</a></li>
        `;

        // 2. Thêm các trang tương ứng 
        for (let i = 2; i <= newCount; i++) {
            if (i === newCount) {
                this.d_paginationContainer.innerHTML += `
                    <li class="page-item page-item-btn active" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
                `;
            } else {
                this.d_paginationContainer.innerHTML += `
                    <li class="page-item page-item-btn" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
                `;
            }
        }

        // 3. Thêm nút trang sau
        this.d_paginationContainer.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">Trang sau</a></li>
        `;

        // 4. Thêm sự kiện chuyển trang
        this.addChangePageTable();
    },

    renderBans(data) {
        const tableBody = document.querySelector("#ban-table tbody");
        tableBody.innerHTML = "";

        for (const element of data) {
            tableBody.innerHTML += `
            <tr>
                <td>${element.ma_ban}</td>
                <td>${element.ten_ban}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center" data-name="${element.ten_ban}" data-id="${element.ma_ban}">
                        <button class="btn btn-warning update-table-btn">Cập nhật</button>
                        <button class="btn btn-danger delete-table-btn">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        }
    }
}

const addTableHandler = {
    d_inputName: document.querySelector("#add-table-modal .input-name"),
    d_addBtn: document.querySelector("#add-table-modal .save"),

    // Methods 
    init() {
        this.d_addBtn.addEventListener("click", () => {
            this.addTable();
        })
    },

    async addTable() {
        // 1. Lấy tên bàn cần thêm
        const name = this.d_inputName.value;

        // 2. Gọi API thêm bàn
        try {
            const res = await fetch("/api/bans/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });

            const data = await res.json();

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-table-modal")).hide();
                alert(data.message);
                tablePageHandler.renderPagination(data.numberOfBans);
                tablePageHandler.refreshCurrentPage();
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const updateTableHandler = {
    d_inputName: document.querySelector("#update-table-modal .input-name"),
    d_saveBtn: document.querySelector("#update-table-modal .save"),

    id: null,

    // Getters
    get ad_updateBtns() {
        return document.querySelectorAll(".update-table-btn");
    },

    // Methods 
    init() {
        // Thêm sự kiện khi click btn cập nhật 
        this.addUpdateBtnsOnClick();

        // Gọi API sửa thông tin khi click Save 
        try {
            this.d_saveBtn.addEventListener("click", async () => {
                const newName = this.d_inputName.value;
                const id = this.id;

                const res = await fetch("/api/bans", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        newName,
                        id
                    })
                })

                const data = await res.json();

                if (data.success) {
                    alert(data.message);
                    bootstrap.Modal.getOrCreateInstance(document.getElementById("update-table-modal")).hide();
                    tablePageHandler.refreshCurrentPage();
                }

            })
        } catch (error) {
            console.log(error);
        }

    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-table-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_inputName.value = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}

const deleteTableHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-table-modal .yes"),
    d_labelName: document.querySelector("#delete-table-modal .table-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-table-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch("/api/bans", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "DELETE",
                body: JSON.stringify({
                    id
                })
            });

            const data = await res.json();

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-table-modal")).hide();
                alert(data.message);
                tablePageHandler.renderPagination(data.numberOfBans);
                tablePageHandler.refreshCurrentPage();
            } else {
                alert(data.message);
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-table-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}