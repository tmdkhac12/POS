window.addEventListener("DOMContentLoaded", () => {
    accountPageHandler.addChangePageAccount();
    addAccountHandler.init();
    updateAccountHandler.init();
    deleteAccountHandler.init();
})

const accountPageHandler = {
    d_paginationContainer: document.querySelector("#account-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#account-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    // Methods
    addChangePageAccount() {
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
                (data.success ? this.renderTaiKhoans(data.taiKhoans) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");

                updateAccountHandler.addUpdateBtnsOnClick();
                deleteAccountHandler.addDeleteBtnsOnClick();
            })
        })
    },

    async getPage(page) {
        try {
            const respond = await fetch(`/api/taikhoans?page=${page}`);
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
        (data.success ? this.renderTaiKhoans(data.taiKhoans) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updateAccountHandler.addUpdateBtnsOnClick();
        deleteAccountHandler.addDeleteBtnsOnClick();
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
        this.addChangePageAccount();
    },

    renderTaiKhoans(data) {
        const tableBody = document.querySelector("#taikhoan-table tbody");
        tableBody.innerHTML = "";

        for (const element of data) {
            tableBody.innerHTML += `
            <tr>
                <td>${element.ma_tai_khoan}</td>
                <td>${element.username}</td>
                <td>${getName(element.ma_nhom_quyen)}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_tai_khoan}" data-username="${element.username}" data-role="${element.ma_nhom_quyen}">
                        <button class="btn btn-warning update-account-btn">Cập nhật</button>
                        <button class="btn btn-danger delete-account-btn">Xóa</button>
                    </div>
                </td>
            </tr>
        `
        }
    }
}

const addAccountHandler = {
    d_inputUsername: document.querySelector("#add-account-modal .input-username"),
    d_inputPassword: document.querySelector("#add-account-modal .input-password"),
    d_inputCfPassword: document.querySelector("#add-account-modal .input-cfpassword"),
    d_selectRole: document.querySelector("#add-account-modal .form-select"),

    d_addBtn: document.querySelector("#add-account-modal .save"),

    init() {
        this.d_addBtn.addEventListener("click", async () => {
            const username = this.d_inputUsername.value;
            const password = this.d_inputPassword.value;
            const confirmPassword = this.d_inputCfPassword.value;
            const roleId = this.d_selectRole.value;

            // console.log({name, password, confirmPassword, roleId});

            const res = await fetch("/api/taikhoans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password, confirmPassword, roleId})
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-account-modal")).hide();
                accountPageHandler.renderPagination(data.numberOfAccounts);
                accountPageHandler.refreshCurrentPage();
                document.querySelector("#add-account-modal form").reset();
            }
        })
    }
}

const updateAccountHandler = {
    id: null,

    d_inputUsername: document.querySelector("#update-account-modal .input-username"),
    d_inputPassword: document.querySelector("#update-account-modal .input-new-password"),
    d_selectRole: document.querySelector("#update-account-modal .form-select"),
    d_inputAdminPassword: document.querySelector("#update-account-modal .input-admin-password"),

    d_updateBtn: document.querySelector("#update-account-modal .save"),

    // Getters
    get ad_updateBtns() {
        return document.querySelectorAll(".update-account-btn");
    },

    init() {
        this.addUpdateBtnsOnClick();

        this.d_updateBtn.addEventListener("click", async () => {
            const adminUsername = "admin";
            const username = this.d_inputUsername.value;
            const newPassword = this.d_inputPassword.value;
            const adminPassword = this.d_inputAdminPassword.value;
            const roleId = this.d_selectRole.value;

            // console.log({username, newPassword, adminPassword, roleId});

            const res = await fetch(`/api/taikhoans/${this.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, newPassword, adminUsername, adminPassword, roleId })
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-account-modal")).hide();
                accountPageHandler.refreshCurrentPage();
            }
        })
    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-account-modal")).show();

                // Lưu id lại để truy vấn 
                this.id = btn.closest("div").getAttribute("data-id");

                const username = btn.closest("div").getAttribute("data-username");
                const roleValue = btn.closest("div").getAttribute("data-role");

                this.d_inputUsername.value = username;
                this.d_selectRole.value = roleValue;
            })
        })
    }
}

const deleteAccountHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-account-modal .yes"),
    d_labelName: document.querySelector("#delete-account-modal .account-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-account-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch(`/api/taikhoans/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-account-modal")).hide();
                accountPageHandler.renderPagination(data.numberOfAccounts);
                accountPageHandler.refreshCurrentPage();
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-account-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-username");
            })
        })
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