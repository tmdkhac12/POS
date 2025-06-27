window.addEventListener("DOMContentLoaded", () => {
    invoicePageHandler.addChangePageEvent();
    viewInvoiceHandler.init();
    searchInvoiceHandler.init();
})

let G_STARTDATE, G_ENDDATE;

const invoicePageHandler = {
    d_paginationContainer: document.querySelector("#invoice-pagination"),
    
    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#invoice-pagination .page-item-btn");
    },

    // Methods
    addChangePageEvent(name = "", start = "", end = "") {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));
                const data = await this.getPage(page, name, start, end);
                (data.success ? this.renderInvoices(data.hoaDons) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");

                viewInvoiceHandler.addViewBtnsOnClick();
            })
        })
    },

    renderInvoices(data) {
        const tableBody = document.querySelector("#invoice-table tbody");
        tableBody.innerHTML = "";

        for (const element of data) {
            tableBody.innerHTML += `
            <tr>
                <td>${element.ma_hoa_don}</td>
                <td>${element.ten_khach_hang}</td>
                <td>${element.so_dien_thoai}</td>
                <td>${element.tong_tien.toLocaleString("vi-VN") + "đ"}</td>
                <td>${formatDatetime(element.thoi_gian_tao)}</td>
                <td>${element.hinh_thuc_thanh_toan}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_hoa_don}">
                        <button class="btn btn-success view-invoice-btn">Xem</button>
                    </div>
                </td>
            </tr>
        `
        }
    },

    async getPage(page, name, start, end) {
        try {
            const respond = await fetch(`/api/hoadons?page=${page}&search=${name}&start=${start}&end=${end}`);
            const data = await respond.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    renderPaginationAndEvent(number, activeIndex) {
        const newCount = Math.ceil(number / 8);

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

        // 4. Thêm sự kiện chuyển trang 
        this.addChangePageEvent(G_SEARCHKEY, G_STARTDATE, G_ENDDATE);
    },
}

const viewInvoiceHandler = {
    id: null,

    d_inputName: document.querySelector("#view-invoice-modal .input-name"),
    d_inputPhone: document.querySelector("#view-invoice-modal .input-phone"),
    d_inputTime: document.querySelector("#view-invoice-modal .input-time"),
    d_inputPayment: document.querySelector("#view-invoice-modal .input-payment"),
    d_tableBody: document.querySelector("#view-invoice-modal tbody"),

    // Getters
    get ad_viewBtns() {
        return document.querySelectorAll(".view-invoice-btn");
    },

    init() {
        this.addViewBtnsOnClick();
    },

    addViewBtnsOnClick() {
        this.ad_viewBtns.forEach(btn => {
            btn.addEventListener("click", async () => {
                this.id = btn.closest("div").getAttribute("data-id");
                const data = await this.getFullHoaDon(this.id);

                this.renderView(data.hoaDon, data.chiTiets);
                bootstrap.Modal.getOrCreateInstance(document.getElementById("view-invoice-modal")).show();
            })
        })
    },

    async getFullHoaDon(id) {
        try {
            const res = await fetch(`/api/hoadons/invoice-details/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    renderView(hoadon, chitiets) {
        this.d_inputName.value = hoadon.ten_khach_hang;
        this.d_inputPhone.value = hoadon.so_dien_thoai;
        this.d_inputTime.value = formatDatetime(hoadon.thoi_gian_tao);
        this.d_inputPayment.value = hoadon.hinh_thuc_thanh_toan;

        this.d_tableBody.innerHTML = "";
        for (const chitiet of chitiets) {
            this.d_tableBody.innerHTML += `
                <tr>
                    <td>
                        ${chitiet.ten_mon_an} <br>
                        <span class="note">${chitiet.ghi_chu ? chitiet.ghi_chu : ""}</span>
                    </td>
                    <td>${chitiet.gia_mon_an.toLocaleString("vi-VN")}</td>
                    <td>${chitiet.so_luong}</td>
                    <td>${chitiet.thanh_tien.toLocaleString("vi-VN")}</td>
                </tr>
            `
        }

        this.d_tableBody.innerHTML += `
            <tr>
                <td class="text-start fw-bold" colspan="3">Tổng tiền:</td>
                <td>${hoadon.tong_tien.toLocaleString("vi-VN")}</td>
            </tr>
        `
    }
}

const searchInvoiceHandler = {
    d_searchInput: document.querySelector("#search-invoice-form input"),
    d_startInput: document.querySelector("#search-invoice-form .startDate"),
    d_endInput: document.querySelector("#search-invoice-form .endDate"),
    d_searchForm: document.querySelector("#search-invoice-form"),

    // Methods
    init() {
        this.d_searchForm.addEventListener("submit", () => {
            this.search();
        })
    },

    refreshSearch() {
        this.d_searchInput.value = "";
        this.d_startInput.value = "";
        this.d_endInput.value = "";
        this.search();        
    },

    async search() {
        // 1. Lấy keyword tìm kiếm 
        G_SEARCHKEY = this.d_searchInput.value;
        G_STARTDATE = this.d_startInput.value;
        G_ENDDATE = this.d_endInput.value;

        // 2. Gọi API lấy danh sách dữ liệu 
        const page = 1;
        const data = await invoicePageHandler.getPage(page, G_SEARCHKEY, G_STARTDATE, G_ENDDATE);
        console.log(data);

        // 3. Thêm phân trang cho dữ liệu và render dữ liệu mặc định ở trang 1 
        const activeIndex = 1;
        invoicePageHandler.renderPaginationAndEvent(data.total, activeIndex);
        invoicePageHandler.renderInvoices(data.hoaDons);

        // 4. Thêm sự kiện cho các nút view
        viewInvoiceHandler.addViewBtnsOnClick();
    }
}

function formatDatetime(datetimeStr) {
    const [datePart, timePart] = datetimeStr.split(" ");
    const [year, month, day] = datePart.split("-");

    return timePart ? `${day}/${month}/${year} ${timePart}` : `${day}/${month}/${year}`;
}