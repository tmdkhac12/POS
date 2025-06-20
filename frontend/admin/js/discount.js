window.addEventListener("DOMContentLoaded", () => {
    discountPageHandler.addChangePageDiscount();
    addDiscountHandler.init();
    updateDiscountHandler.init();
    deleteDiscountHandler.init();
})

const discountPageHandler = {
    d_paginationContainer: document.querySelector("#discount-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#discount-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    addChangePageDiscount() {
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
                (data.success ? this.renderDiscounts(data.khuyenMais) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");

                updateDiscountHandler.addUpdateBtnsOnClick();
                deleteDiscountHandler.addDeleteBtnsOnClick();
            })
        })
    },

    async getPage(page) {
        try {
            const respond = await fetch(`/api/khuyenmais?page=${page}`);
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
        (data.success ? this.renderDiscounts(data.khuyenMais) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updateDiscountHandler.addUpdateBtnsOnClick();
        deleteDiscountHandler.addDeleteBtnsOnClick();
    },

    renderDiscounts(data) {
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
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_khuyen_mai}" data-name="${element.ten_khuyen_mai}" data-percent="${element.giam_theo_phan_tram ? element.giam_theo_phan_tram : 0}" data-money="${element.giam_theo_tien ? element.giam_theo_tien : 0}" data-start="${element.ngay_bat_dau}" data-end="${element.ngay_ket_thuc.split(" ")[0]}">
                        <button class="btn btn-warning update-discount-btn">Cập nhật</button>
                        <button class="btn btn-danger delete-discount-btn">Xóa</button>
                    </div>
                </td>
            </tr>
        `
        }
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
        this.addChangePageDiscount();
    },
}

const addDiscountHandler = {
    d_inputName: document.querySelector("#add-discount-modal .input-name"),
    d_inputPercent: document.querySelector("#add-discount-modal .input-percent"),
    d_inputMoney: document.querySelector("#add-discount-modal .input-money"),
    d_inputStart: document.querySelector("#add-discount-modal .input-start"),
    d_inputEnd: document.querySelector("#add-discount-modal .input-end"),

    ad_radio: document.querySelectorAll("#add-discount-modal input[name='loaiKhuyenMai']"),
    d_addBtn: document.querySelector("#add-discount-modal .save"),

    init() {
        this.addRadioBtnsEvent();

        this.d_addBtn.addEventListener("click", async () => {
            const name = this.d_inputName.value;
            const percent = this.d_inputPercent.value;
            const money = this.d_inputMoney.value;
            const start = this.d_inputStart.value;
            const end = this.d_inputEnd.value;

            const res = await fetch("/api/khuyenmais", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, percent, money, start, end })
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-discount-modal")).hide();
                discountPageHandler.renderPagination(data.numberOfKhuyenMais);
                discountPageHandler.refreshCurrentPage();
                document.querySelector("#add-discount-modal form").reset();
            }
        })
    },

    addRadioBtnsEvent() {
        this.ad_radio.forEach(radio => {
            radio.addEventListener("change", () => {
                const value = radio.value;
                const percentContainer = document.querySelector("#add-discount-modal .percent-container");
                const moneyContainer = document.querySelector("#add-discount-modal .money-container");

                if (value === "percent") {
                    percentContainer.classList.remove("d-none");
                    moneyContainer.classList.add("d-none");
                    moneyContainer.querySelector("input").value = "";
                } else {
                    moneyContainer.classList.remove("d-none");
                    percentContainer.classList.add("d-none");
                    percentContainer.querySelector("input").value = "";
                }
            })
        })
    }
}

const updateDiscountHandler = {
    id: null,
    percent: null,
    money: null,

    d_inputName: document.querySelector("#update-discount-modal .input-name"),
    d_inputPercent: document.querySelector("#update-discount-modal .input-percent"),
    d_inputMoney: document.querySelector("#update-discount-modal .input-money"),
    d_inputStart: document.querySelector("#update-discount-modal .input-start"),
    d_inputEnd: document.querySelector("#update-discount-modal .input-end"),

    ad_radio: document.querySelectorAll("#update-discount-modal input[name='loaiKhuyenMai1']"),
    d_updateBtn: document.querySelector("#update-discount-modal .save"),

    // Getters
    get ad_updateBtns() {
        return document.querySelectorAll(".update-discount-btn");
    },

    init() {
        this.addRadioBtnsEvent();
        this.addUpdateBtnsOnClick();

        this.d_updateBtn.addEventListener("click", async () => {
            const name = this.d_inputName.value;
            const percent = this.d_inputPercent.value;
            const money = this.d_inputMoney.value;
            const start = this.d_inputStart.value;
            const end = this.d_inputEnd.value;
            const option = Array.from(this.ad_radio).find(r => r.checked).value;

            // console.log({ name, percent, money, start, end, option });

            const res = await fetch(`/api/khuyenmais/${this.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, percent, money, start, end, option })
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-discount-modal")).hide();
                discountPageHandler.refreshCurrentPage();
            }
        })
    },

    addRadioBtnsEvent() {
        this.ad_radio.forEach(radio => {
            radio.addEventListener("change", () => {
                const value = radio.value;
                const percentContainer = document.querySelector("#update-discount-modal .percent-container");
                const moneyContainer = document.querySelector("#update-discount-modal .money-container");

                if (value === "percent") {
                    percentContainer.classList.remove("d-none");
                    moneyContainer.classList.add("d-none");
                    moneyContainer.querySelector("input").value = this.money;
                } else {
                    moneyContainer.classList.remove("d-none");
                    percentContainer.classList.add("d-none");
                    percentContainer.querySelector("input").value = this.percent;
                }
            })
        })
    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-discount-modal")).show();

                // Lưu id lại để truy vấn 
                this.id = btn.closest("div").getAttribute("data-id");
                this.percent = btn.closest("div").getAttribute("data-percent") !== '0' ? btn.closest("div").getAttribute("data-percent") : null;
                this.money = btn.closest("div").getAttribute("data-money") !== '0' ? btn.closest("div").getAttribute("data-money") : null;

                const name = btn.closest("div").getAttribute("data-name");
                const start = btn.closest("div").getAttribute("data-start");
                const end = btn.closest("div").getAttribute("data-end");

                // Thay đổi ô input tương ứng
                const percentContainer = document.querySelector("#update-discount-modal .percent-container");
                const moneyContainer = document.querySelector("#update-discount-modal .money-container");
                if (this.money) {
                    moneyContainer.classList.remove("d-none");
                    percentContainer.classList.add("d-none");
                    this.ad_radio[0].checked = false;
                    this.ad_radio[1].checked = true;
                } else {
                    percentContainer.classList.remove("d-none");
                    moneyContainer.classList.add("d-none");
                    this.ad_radio[0].checked = true;
                    this.ad_radio[1].checked = false;
                }

                this.d_inputName.value = name;
                this.d_inputPercent.value = this.percent;
                this.d_inputMoney.value = this.money;
                this.d_inputStart.value = start;
                this.d_inputEnd.value = end;

            })
        })
    }
}

const deleteDiscountHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-discount-modal .yes"),
    d_labelName: document.querySelector("#delete-discount-modal .discount-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-discount-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch(`/api/khuyenmais/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-discount-modal")).hide();
                discountPageHandler.renderPagination(data.numberOfKhuyenMais);
                discountPageHandler.refreshCurrentPage();
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-discount-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}