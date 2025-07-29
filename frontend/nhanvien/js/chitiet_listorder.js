window.addEventListener("DOMContentLoaded", () => {
    cartHandler.init();
    foodCardHandler.init();
    updateModalHandler.init();
    tableHandler.init();
})

const cartHandler = {
    d_cartContainer: document.querySelector("#cart-container"),
    d_updateModal: document.querySelector("#update-modal"),

    // Getters
    get ad_cartItems() {
        return document.querySelectorAll(".cart-item");
    },

    get ad_updateItemBtns() {
        return document.querySelectorAll(".update-item");
    },

    get ad_removeItemBtns() {
        return document.querySelectorAll(".remove-item");
    },

    init() {
        this.renderOrders();
    },

    // Methods
    addUpdateItemsOnClick() {
        this.ad_updateItemBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // 1. Đổ dữ liệu cho modal 
                const orderId = btn.closest("li").querySelector(".cart-item-controls").getAttribute("data-order-id");
                const imgPath = btn.closest("li").querySelector("img").getAttribute("src");
                const header = btn.closest("li").querySelector("img").getAttribute("alt");
                const price = btn.closest("li").querySelector(".price").textContent;
                const quantity = btn.closest("li").querySelector(".cart-item-controls .quantity").textContent;
                const note = btn.closest("li").querySelector(".cart-item-details .note")?.textContent || "";
                updateModalHandler.dumpData(orderId, imgPath, header, price, quantity, note);

                // 2. Show modal chi tiết món 
                bootstrap.Modal.getOrCreateInstance(this.d_updateModal).show();
            })
        })
    },

    addRemoveItemsOnClick() {
        this.ad_removeItemBtns.forEach(btn => {
            btn.addEventListener("click", async () => {
                if (confirm("Bạn có chắc chắn muốn xóa món ăn khỏi đơn hàng?")) {
                    // 1. Lấy mã order cần xóa 
                    const orderId = btn.closest("li").querySelector(".cart-item-controls").getAttribute("data-order-id");

                    // 2. Gọi API xóa order
                    const res = await fetch(`/api/current-order/${orderId}`, {
                        method: "DELETE"
                    })
                    const data = await res.json();

                    // 3. Render danh sách order và cập nhật trạng thái bàn 
                    if (data.success) {
                        await this.renderOrders();
                        await tableHandler.updateTableStatus("Trống");

                        sendSocket();
                    } else {
                        alert(data.message);
                    }
                }
            })
        })
    },

    async renderOrders() {
        try {
            const tableId = window.location.href.split('/')[5];

            // API lấy danh sách orders của bàn 
            const res = await fetch(`/api/current-order/table/${tableId}`);
            const data = await res.json();

            this.d_cartContainer.innerHTML = "";
            const orders = data.orders;

            for (let i = 0; i < orders.length; i++) {
                const obj = this._getObj(orders[i].ma_mon_an);

                const imgPath = obj.hinh_anh;
                const name = obj.ten_mon_an;
                const noteHTML = this._getNoteHTML(orders[i].ghi_chu);
                const statusHTML = this._getStatusHTML(orders[i].trang_thai);

                const li = `
                    <li class="list-group-item cart-item d-flex">
                        <img src="/dishes/${imgPath}" alt="${name}">
                        <div class="cart-item-details">
                            <p><span class="text-danger">${i + 1}. </span>${name}</p>
                            <p class="text-danger mt-2 price" data-price="${orders[i].don_gia_ap_dung}">${orders[i].don_gia_ap_dung.toLocaleString("vi-VN")}đ</p>
                            ${noteHTML}
                            ${statusHTML}
                        </div>
                        <div class="cart-item-controls me-2" data-order-id="${orders[i].ma_order}">
                            <p class="m-0">Số lượng</p>
                            <span class="quantity text-danger my-2">${orders[i].so_luong}</span>
                        </div>
                        <button type="button" class="update-item btn border-0 text-muted p-2 mx-2">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="remove-item btn border-0 text-danger p-2">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </li>
                `

                this.d_cartContainer.innerHTML += li;
            }

            this._updateTotal();
            this.addUpdateItemsOnClick();
            this.addRemoveItemsOnClick();
        } catch (error) {
            console.error(error);
        }
    },

    _getStatusHTML(status) {
        if (status === 'Chờ xác nhận') return `<span class="position-absolute top-0 end-0 badge bg-secondary">Chờ xác nhận</span>`;
        if (status === 'Đã nhận') return `<span class="position-absolute top-0 end-0 badge bg-info">Đã nhận</span>`;
        if (status === 'Đang chế biến') return `<span class="position-absolute top-0 end-0 badge bg-warning">Đang chế biến</span>`;
        if (status === 'Hoàn thành') return `<span class="position-absolute top-0 end-0 badge bg-success">Hoàn thành</span>`;

        return ''; // Nếu status không khớp
    },

    _getNoteHTML(note) {
        if (note) {
            return `<p class="pe-2">Ghi Chú: <span class="fw-lighter fst-italic note">${note}</span></p>`;
        }
        return "";
    },

    _getObj(maMon) {
        for (const arr of NavItemsHandler.a_foodData) {
            const obj = arr.find(item => item.ma_mon_an === maMon);

            if (obj) {
                return obj;
            }
        }
        return null;
    },

    _updateTotal() {
        let s = 0;

        this.ad_cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector(".quantity").textContent);
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));

            s += price * quantity;
        })

        document.querySelector("#total-price-label").textContent = s.toLocaleString("vi-VN") + "đ";
    }
}

const updateModalHandler = {
    orderId: null,

    d_updateModal: document.querySelector("#update-modal"),

    init() {
        addQuantityControlsEvent(this.d_updateModal);
        this.addSaveBtnOnClick();
    },

    dumpData(orderId, img, header, price, quantity, note) {
        this.orderId = orderId;

        this.d_updateModal.querySelector("img").setAttribute("src", img);
        this.d_updateModal.querySelector("h4").textContent = header;
        this.d_updateModal.querySelector(".price").textContent = price;
        this.d_updateModal.querySelector("input").value = quantity;
        this.d_updateModal.querySelector("textarea").value = note;
    },

    addSaveBtnOnClick() {
        this.d_updateModal.querySelector("#save").addEventListener("click", async () => {
            // Lấy thông tin mới
            const orderId = this.orderId;
            const newQuantity = parseInt(this.d_updateModal.querySelector("input").value);
            const newNote = this.d_updateModal.querySelector("textarea").value.trim();

            // Gọi API cập nhật 
            const res = await fetch(`/api/current-order/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newQuantity, newNote })
            })
            const data = await res.json();

            // Xử lý sau cập nhật 
            if (data.success) {
                cartHandler.renderOrders();
                sendSocket();
            } else {
                alert(data.message);
            }
            bootstrap.Modal.getOrCreateInstance(this.d_updateModal).hide();
        })
    },
}

const foodCardHandler = {
    id: null,

    d_addToCartBtn: document.querySelector("#add-to-cart"),
    d_detailModal: document.querySelector("#detail-modal"),
    d_quantityControls: document.querySelector(".quantity-controls"),

    // Getters
    get ad_foodCards() {
        return document.querySelectorAll(".food-card-item .card");
    },

    init() {
        this.addFoodCardsOnClick();
        addQuantityControlsEvent(this.d_detailModal);
        this.addToCartEvent();
    },

    // Methods
    addToCartEvent() {
        this.d_addToCartBtn.addEventListener("click", async () => {
            // 1. Lấy thông tin món ăn cần thêm  
            const maMon = parseInt(this.id);
            const maBan = parseInt(window.location.href.split('/')[5]);
            const soLuong = parseInt(this.d_quantityControls.querySelector("input").value);
            const ghiChu = this.d_detailModal.querySelector("textarea").value;

            // 2. Gọi API thêm món ăn 
            const res = await fetch("/api/current-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    maBan,
                    orders: [
                        { maMon, soLuong, ghiChu }
                    ]
                })
            });
            const data = await res.json();

            // 3. Gọi API cập nhật trạng thái bàn và render danh sách món 
            if (data.success) {
                await tableHandler.updateTableStatus("Có khách");
                await cartHandler.renderOrders();
                sendSocket();
            } else {
                alert(data.message);
            }

            // Ẩn modal 
            bootstrap.Modal.getOrCreateInstance(this.d_detailModal).hide();
        })
    },

    addFoodCardsOnClick() {
        // Lấy các container của modal 
        const modalImg = this.d_detailModal.querySelector("img");
        const modalHeader = this.d_detailModal.querySelector("h4");
        const modalPrice = this.d_detailModal.querySelector("p");

        const quantityInput = this.d_quantityControls.querySelector("input");
        const noteInput = this.d_detailModal.querySelector("textarea");

        this.ad_foodCards.forEach(foodCard => {
            foodCard.addEventListener("click", () => {
                // Reset số lượng món và ghi chú 
                quantityInput.value = 1;
                noteInput.value = "";

                // Lấy dữ liệu của card vừa được click 
                this.id = foodCard.getAttribute("data-dish-id");
                const imgPath = foodCard.querySelector("img").getAttribute("src");
                const header = foodCard.querySelector("img").getAttribute("alt");
                const price = foodCard.querySelector(".card-body .price").textContent;

                // Set dữ liệu cho modal 
                modalImg.setAttribute("src", imgPath);
                modalHeader.textContent = header;
                modalPrice.textContent = price;
            })
        })
    },
}

const tableHandler = {
    init() {
        this.addChangeTableEvent();
    },

    addChangeTableEvent() {
        document.querySelector("#confirm-change-table").addEventListener("click", async () => {
            if (cartHandler.ad_cartItems.length < 1) {
                alert("Không thể chuyển bàn trống!");
                bootstrap.Modal.getOrCreateInstance(document.querySelector("#change-table-modal")).hide();
                return;
            }

            // 1. Lấy thông tin bàn muốn chuyển 
            const oldTableId = window.location.href.split('/')[5];
            const newTableId = document.querySelector("#change-table-modal select").value;

            // 2. Gọi API chuyển bàn  
            const res = await fetch("/api/current-order/move-table", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ oldTableId, newTableId })
            });
            const data = await res.json();

            // 3. Render lại orders và cập nhật trạng thái bàn             
            alert(data.message);
            if (data.success) {
                await cartHandler.renderOrders();
                sendChangeTableSocket(oldTableId, newTableId);
                bootstrap.Modal.getOrCreateInstance(document.querySelector("#change-table-modal")).hide();
            }
        })
    },

    async updateTableStatus(status) {
        if (cartHandler.ad_cartItems.length === 0) {
            const tableId = window.location.href.split('/')[5];

            const res = await fetch(`/api/bans/${tableId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            })
            const data = await res.json();

            if (!data.success) {
                alert(data.message);
            }
        }
    },
}