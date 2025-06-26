window.addEventListener("DOMContentLoaded", () => {
    customerPageHandler.addChangePageEvent();
    addKhachHangHandler.init();
    updateKhachHangHandler.init();
    deleteKhachHangHandler.init();
    customerSearchHandler.init();
})

const customerPageHandler = {
    d_paginationContainer: document.querySelector("#customer-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#customer-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    // Methods
    addChangePageEvent(name = "") {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));
                const data = await this.getPage(page, name);
                (data.success ? this.renderKhachHangs(data.khachHangs) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");

                // Cập nhật chức năng của các nút update, delete 
                updateKhachHangHandler.addUpdateBtnsOnClick();
                deleteKhachHangHandler.addDeleteBtnsOnClick();
            })
        })
    },

    async getPage(page, name) {
        try {
            const respond = await fetch(`/api/khachhangs?page=${page}&search=${name}`);
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
        const data = await this.getPage(page, G_SEARCHKEY);
        (data.success ? this.renderKhachHangs(data.khachHangs) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updateKhachHangHandler.addUpdateBtnsOnClick();
        deleteKhachHangHandler.addDeleteBtnsOnClick();
    },

    renderKhachHangs(data) {
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
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_khach_hang}" data-name="${element.ten_khach_hang}" data-phone="${element.so_dien_thoai}" data-total="${element.tong_chi_tieu}" data-accu="${element.tien_tich_luy}" data-rank="${element.cap_bac}">
                        <button class="btn btn-warning update-customer-btn">Cập nhật</button>
                        <button class="btn btn-danger delete-customer-btn">Xóa</button>
                    </div>
                </td>
            </tr>
        `
        }
    },

    renderPagination(number, activeIndex) {
        const oldCount = this.ad_pageItemBtns.length;
        const newCount = Math.ceil(number / 8);

        if (newCount === oldCount)
            return;

        // 1. Xóa toàn bộ nội dung phân trang trước đó 
        this.d_paginationContainer.innerHTML = `
            <li class="page-item"><a class="page-link" href="#">Trang trước</a></li>
        `;

        // 2. Thêm các trang tương ứng 
        for (let i = 1; i <= newCount; i++) {
            this.d_paginationContainer.innerHTML += `
                <li class="page-item page-item-btn ${i == activeIndex ? "active" : ""}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
            `;
        }

        // 3. Thêm nút trang sau
        this.d_paginationContainer.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">Trang sau</a></li>
        `;
    },
}

const addKhachHangHandler = {
    d_inputName: document.querySelector("#add-customer-modal .input-name"),
    d_inputPhone: document.querySelector("#add-customer-modal .input-phone"),
    d_inputTotal: document.querySelector("#add-customer-modal .input-total"),
    d_inputAccu: document.querySelector("#add-customer-modal .input-accu"),
    d_selectRank: document.querySelector("#add-customer-modal .form-select"),

    d_addBtn: document.querySelector("#add-customer-modal .save"),

    init() {
        this.d_addBtn.addEventListener("click", async () => {
            const name = this.d_inputName.value;
            const phone = this.d_inputPhone.value;
            const total = this.d_inputTotal.value;
            const accu = this.d_inputAccu.value;
            const rank = this.d_selectRank.value;

            const res = await fetch("/api/khachhangs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, total, accu, rank })
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-customer-modal")).hide();

                if (G_SEARCHKEY) {
                    customerSearchHandler.refreshSearch();
                    return;
                }

                const activeIndex = Math.ceil(data.countPhanLoai / 8);
                customerPageHandler.renderPagination(data.numberOfKhachHangs, activeIndex);
                customerPageHandler.refreshCurrentPage();
                customerPageHandler.addChangePageEvent();
                document.querySelector("#add-customer-modal form").reset();
            }
        })
    }
}

const updateKhachHangHandler = {
    id: null,

    d_inputName: document.querySelector("#update-customer-modal .input-name"),
    d_inputPhone: document.querySelector("#update-customer-modal .input-phone"),
    d_inputTotal: document.querySelector("#update-customer-modal .input-total"),
    d_inputAccu: document.querySelector("#update-customer-modal .input-accu"),
    d_selectRank: document.querySelector("#update-customer-modal .form-select"),

    d_updateBtn: document.querySelector("#update-customer-modal .save"),

    // Getters
    get ad_updateBtns() {
        return document.querySelectorAll(".update-customer-btn");
    },

    // Methods
    init() {
        this.addUpdateBtnsOnClick();

        this.d_updateBtn.addEventListener("click", async () => {
            const id = this.id;

            const name = this.d_inputName.value;
            const phone = this.d_inputPhone.value;
            const total = this.d_inputTotal.value;
            const accu = this.d_inputAccu.value;
            const rank = this.d_selectRank.value;

            const res = await fetch(`/api/khachhangs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, total, accu, rank })
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-customer-modal")).hide();
                customerPageHandler.refreshCurrentPage();
            }
        })
    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-customer-modal")).show();

                // Lưu id lại để truy vấn 
                this.id = btn.closest("div").getAttribute("data-id");

                const name = btn.closest("div").getAttribute("data-name");
                const phone = btn.closest("div").getAttribute("data-phone");
                const total = btn.closest("div").getAttribute("data-total");
                const accu = btn.closest("div").getAttribute("data-accu");
                const rank = btn.closest("div").getAttribute("data-rank");

                this.d_inputName.value = name;
                this.d_inputPhone.value = phone;
                this.d_inputTotal.value = total;
                this.d_inputAccu.value = accu;

                for (let i = 0; i < this.d_selectRank.options.length; i++) {
                    if (this.d_selectRank.options[i].text === rank) {
                        this.d_selectRank.selectedIndex = i;
                        break;
                    }
                }
            })
        })
    }
}

const deleteKhachHangHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-customer-modal .yes"),
    d_labelName: document.querySelector("#delete-customer-modal .customer-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-customer-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch(`/api/khachhangs/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-customer-modal")).hide();

                if (G_SEARCHKEY) {
                    customerSearchHandler.refreshSearch();
                    return;
                }

                const activeIndex = Math.ceil(data.countPhanLoai / 8);
                customerPageHandler.renderPagination(data.numberOfKhachHangs, activeIndex);
                customerPageHandler.refreshCurrentPage();
                customerPageHandler.addChangePageEvent();
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-customer-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}

const customerSearchHandler = {
    d_searchInput: document.querySelector("#search-customer-form input"),
    d_searchForm: document.querySelector("#search-customer-form"),

    // Methods
    init() {
        this.d_searchForm.addEventListener("submit", () => {
            this.search();
        })
    },

    refreshSearch() {
        this.d_searchInput.value = "";
        this.search();        
    },

    async search() {
        // 1. Lấy keyword tìm kiếm 
        G_SEARCHKEY = this.d_searchInput.value;

        // 2. Gọi API lấy danh sách dữ liệu 
        const page = 1;
        const data = await customerPageHandler.getPage(page, G_SEARCHKEY);
        console.log(data);

        // 3. Thêm phân trang cho dữ liệu và render dữ liệu mặc định ở trang 1 
        const activeIndex = 1;
        customerPageHandler.renderPagination(data.total, activeIndex);
        customerPageHandler.renderKhachHangs(data.khachHangs);

        // 4. Thêm sự kiện chuyển trang cho dữ liệu 
        customerPageHandler.addChangePageEvent(G_SEARCHKEY);

        // 5. Thêm sự kiện cho các nút update/delete 
        updateKhachHangHandler.addUpdateBtnsOnClick();
        deleteKhachHangHandler.addDeleteBtnsOnClick();
    }
}