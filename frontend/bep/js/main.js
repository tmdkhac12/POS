window.addEventListener("DOMContentLoaded", async () => {
    loadOrdersHandler.init();
});

const loadOrdersHandler = {
    tableId: document.querySelector('.table-card').getAttribute("data-table-id"),

    ad_tableCards: document.querySelectorAll('.table-card'),

    d_ordersContainer: document.getElementById('order-list'),
    d_saveBtn: document.querySelector("#save-button"),

    a_foodData: JSON.parse(document.querySelector("#dishes-data-json").textContent),

    // Getters 
    get ad_statusBtns() {
        return document.querySelectorAll(".status-btn");
    },

    get ad_cartItems() {
        return document.querySelectorAll(".list-group-item");
    },

    init() {
        this.addTableCardsOnClick();
        this.addSaveBtnOnClick();

        // Render orders và add active card 
        this.renderOrders(this.tableId);
        document.querySelector(".table-card").classList.add("active-table");
        this.updateTablesStatus();
    },

    // Methods
    async renderOrders(tableId) {
        try {
            // Gọi API lấy danh sách orders theo bàn 
            this.d_ordersContainer.innerHTML = "";
            const res = await fetch(`/api/current-order/${tableId}`);
            const data = await res.json();
            const orders = data.orders;

            // Render orders 
            if (orders.length === 0) {
                this.d_ordersContainer.innerHTML = '<li class="list-group-item text-center text-muted">Bàn này chưa có đơn hàng.</li>';
                return;
            }

            for (const order of orders) {
                const obj = this._getObj(order.ma_mon_an);

                const name = obj.ten_mon_an;
                const noteHTML = this._getNoteHTML(order.ghi_chu);
                const statusHTML = this._getStatusHTML(order.trang_thai);

                const orderItem = `
                    <li class="list-group-item d-flex flex-column" data-order-id="${order.ma_order}">
                        <div class="d-flex justify-content-between align-items-center">
                            <strong class="text-danger">${name}</strong>
                            ${statusHTML}
                        </div>
                        <div class="order-details">
                            <div>
                                <p class="m-0" style="font-size: 0.8rem"><strong>Số lượng:</strong> ${order.so_luong}</p>
                                ${noteHTML}
                            </div>
                        </div>
                        <div class="btn-group btn-group-sm mt-2 gap-2" data-status="${order.trang_thai}">
                            <button type="button" class="btn btn-outline-info status-btn">Đã nhận</button>
                            <button type="button" class="btn btn-outline-warning status-btn">Đang chế biến</button>
                            <button type="button" class="btn btn-outline-success status-btn">Hoàn thành</button>
                        </div>
                        <span class="unsaved-indicator text-danger fw-bold">*</span>
                    </li>
                `;

                this.d_ordersContainer.innerHTML += orderItem;
            }

            this.addStatusBtnsOnClick();
        } catch (error) {
            console.log(error);
        }
    },

    async updateTablesStatus() {
        const res = await fetch("/api/current-order/occupied-table-orders-status");
        const data = await res.json();

        for (const table of data.results) {
            const tableId = table.ma_ban;
            const isAllCompleted = table.orders.every(order => order.trang_thai === "Hoàn thành");

            const d_tableCard = document.querySelector(`.table-card[data-table-id="${tableId}"]`)
            
            if (!isAllCompleted) {
                d_tableCard.classList.add('pending');
                d_tableCard.querySelector('.card-header').innerHTML = `
                    <p class="card-text m-0 font-weight-light">Đang sử dụng</p>
                    <i class="fa fa-clock"></i>
                    <a href="#" class="stretched-link">
                        <i style="font-size:16px" class="fa fas fa-chevron-right"></i>
                    </a>
                `;
            } else {
                d_tableCard.classList.remove('pending');
                d_tableCard.querySelector('.card-header').innerHTML = `
                    <p class="card-text m-0 font-weight-light">Đang sử dụng</p>
                    <a href="#" class="stretched-link">
                        <i style="font-size:16px" class="fa fas fa-chevron-right"></i>
                    </a>
                `;
            }
        }
    },

    addStatusBtnsOnClick() {
        this.ad_statusBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const oldStatus = btn.closest("div").getAttribute("data-status");
                const newStatus = btn.textContent;
                const newHTMLBadge = this._getStatusHTML(newStatus);

                // Thay đổi badge
                btn.closest("li").querySelector(".badge").outerHTML = newHTMLBadge;

                // Thêm dấu * 
                if (newStatus !== oldStatus) {
                    btn.closest("li").querySelector(".unsaved-indicator").style.display = "block";
                } else {
                    btn.closest("li").querySelector(".unsaved-indicator").style.display = "none";
                }
            })
        })
    },

    addTableCardsOnClick() {
        this.ad_tableCards.forEach(card => {
            card.addEventListener('click', () => {
                // 1. Lấy id của bàn
                this.tableId = card.getAttribute('data-table-id');

                // 2. Cập nhật trạng thái active cho bàn được click 
                this.ad_tableCards.forEach(c => c.classList.remove('active-table'));
                card.classList.add('active-table');

                // 3. Cập nhật tiêu đề bàn
                document.getElementById('table-title').textContent = card.querySelector(".table-name").textContent;

                // 4. Gọi API để lấy chi tiết món ăn của bàn
                this.renderOrders(this.tableId);
            });
        });
    },

    addSaveBtnOnClick() {
        this.d_saveBtn.addEventListener("click", async () => {
            const orders = [];

            this.ad_cartItems.forEach(item => {
                const orderId = item.getAttribute("data-order-id");
                const status = item.querySelector(".badge").textContent;

                orders.push({ orderId, status });
            })

            const res = await fetch("/api/current-order/status", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ orders })
            })
            const data = await res.json();

            if (data.success) {
                await this.renderOrders(this.tableId);
                await this.updateTablesStatus();
            } else {
                alert(data.message);
            }
        })
    },

    _getObj(maMon) {
        for (const arr of this.a_foodData) {
            const obj = arr.find(item => item.ma_mon_an === maMon);

            if (obj) {
                return obj;
            }
        }
        return null;
    },

    _getNoteHTML(note) {
        if (note) {
            return `<p class="m-0 text-muted fst-italic">Ghi Chú: <span class="text-dark">${note}</span></p>`;
        }
        return "";
    },

    _getStatusHTML(status) {
        if (status === 'Chờ xác nhận') return `<span class="badge bg-secondary">Chờ xác nhận</span>`;
        if (status === 'Đã nhận') return `<span class="badge bg-info">Đã nhận</span>`;
        if (status === 'Đang chế biến') return `<span class="badge bg-warning">Đang chế biến</span>`;
        if (status === 'Hoàn thành') return `<span class="badge bg-success">Hoàn thành</span>`;

        return ''; // Nếu status không khớp
    },
}