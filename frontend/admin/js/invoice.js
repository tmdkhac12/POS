window.addEventListener("DOMContentLoaded", () => {
    invoicePageHandler.addChangePageInvoice();
    viewInvoiceHandler.init();
})

const invoicePageHandler = {
    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#invoice-pagination .page-item-btn");
    },

    // Methods
    addChangePageInvoice() {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));

                const respond = await fetch(`/api/hoadons?page=${page}`);
                const data = await respond.json();
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
                <td>${element.thoi_gian_tao}</td>
                <td>${element.hinh_thuc_thanh_toan}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_hoa_don}">
                        <button class="btn btn-success view-invoice-btn">Xem</button>
                    </div>
                </td>
            </tr>
        `
        }
    }
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
        this.d_inputTime.value = hoadon.thoi_gian_tao;
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