document.addEventListener("DOMContentLoaded", () => {
    cartHandler.init();
    orderedCartHandler.init();
    updateModalHandler.init();
})

const cartHandler = {
    d_cartItemsContainer: document.querySelector("#cart-items"),
    d_orderedCartItemsContainer: document.querySelector("#ordered-cart-items"),
    d_confirmBtn: document.querySelector("#confirm-btn"),

    get ad_cartItems() {
        return document.querySelectorAll("#cart-items .cart-item");
    },

    get ad_decreaseBtns() {
        return document.querySelectorAll(".cart-item-controls .decrease-btn");
    },

    get ad_increaseBtns() {
        return document.querySelectorAll(".cart-item-controls .increase-btn");
    },

    get ad_quantityInputs() {
        return document.querySelectorAll(".cart-item-controls input");
    },

    get ad_updateItemBtns() {
        return document.querySelectorAll(".update-item");
    },

    get ad_removeItemBtns() {
        return document.querySelectorAll(".remove-item");
    },

    get ao_cart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    },

    init() {
        this.loadCart();
        this.updateTotal();
        this._addConfirmOrderEvent();
    },

    addLocalStorage(o_foodInfo) {
        // 1. Lấy danh sách món từ localStorage 
        const ao_cart = this.ao_cart;

        // 2. Thêm món vào danh sách    
        ao_cart.push(o_foodInfo);

        // 3. Lưu lại vào localStorage 
        localStorage.setItem("cart", JSON.stringify(ao_cart));
    },

    updateLocalStorage(key, index, quantity = 1, note = "") {
        // 1. Lấy danh sách món từ localStorage 
        const ao_cart = this.ao_cart;

        // 2. Kiểm tra key 
        switch (key) {
            case 'increase':
                ao_cart[index].soLuong++;
                break;
            case 'decrease':
                if (ao_cart[index].soLuong > 1) {
                    ao_cart[index].soLuong--;
                }
                break;
            case 'change':
                ao_cart[index].soLuong = quantity;
                break;
            case 'update':
                ao_cart[index].soLuong = quantity;
                ao_cart[index].ghiChu = note;
                break;
            case 'remove':
                ao_cart.splice(index, 1);
                break;
            default:
                break;
        }

        // 3. Lưu lại vào localStorage 
        localStorage.setItem("cart", JSON.stringify(ao_cart));
    },

    loadCart() {
        const ao_cart = this.ao_cart;
        this.d_cartItemsContainer.innerHTML = "";

        for (let i = 0; i < ao_cart.length; i++) {
            const noteHTML = this._getNoteHTML(ao_cart[i].ghiChu);

            const li = `
                <li class="list-group-item cart-item d-flex">
                    <img src="${ao_cart[i].hinhAnh}" alt="${ao_cart[i].tenMon}">
                    <div class="cart-item-details">
                        <p><span class="text-danger">${i + 1}. </span> ${ao_cart[i].tenMon}</p>
                        <p class="text-danger mt-2 price" data-price="${ao_cart[i].donGia}">${ao_cart[i].donGia.toLocaleString("vi-VN")}đ</p>
                        ${noteHTML}
                    </div>
                    <div class="cart-item-controls" data-dish-id="${ao_cart[i].maMon}" data-index="${i}">
                        <button class="decrease-btn">-</button>
                        <input type="number" class="quantity border-0 text-center" min="1" value="${ao_cart[i].soLuong}" style="width: 30px">
                        <button class="increase-btn text-danger border-danger">+</button>
                    </div>
                    <button type="button" class="update-item btn border-0 text-muted p-2">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="remove-item btn border-0 text-danger p-2">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </li>
            `;

            this.d_cartItemsContainer.innerHTML += li;
        }

        // Cập nhật tổng tiền, thêm sự kiện cho các items  
        this.updateTotal();
        this._addCartItemsQuantityControlEvent();
        this._addUpdateCartItemsEvent();
        this._addRemoveCartItemsEvent();
    },

    updateTotal() {
        let total = 0;

        this.ad_cartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = item.querySelector(".quantity").value;
            total += price * quantity;
        });

        document.querySelector("#pre-cart-total").innerHTML = formatCurrency(total);
    },

    _addConfirmOrderEvent() {
        this.d_confirmBtn.addEventListener("click", async () => {
            if (confirm("Bạn có chắc muốn gọi những món trên?")) {
                // 1. Lấy thông tin các món ăn và đẩy vào orders
                const cart = this.ao_cart;
                const orders = [];

                for (const dish of cart) {
                    const maMon = dish.maMon;
                    const soLuong = dish.soLuong;
                    const ghiChu = dish.ghiChu;

                    orders.push({ maMon, soLuong, ghiChu });
                }

                const tableId = window.location.href.split('/')[5];

                // 2. Gọi API đặt món  
                const res = await fetch("/api/current-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        maBan: tableId,
                        orders
                    })
                })
                const data = await res.json();

                // 3. Cập nhật thông tin trên cart, orderedCart, xóa localStorage.
                if (data.success) {
                    this.updateTotal();
                    await orderedCartHandler.updateTableStatus("Có khách");
                    await orderedCartHandler.renderOrders();
                    localStorage.clear();
                    this.loadCart();
                    placeOrder();
                } else {
                    alert(data.message);
                }
            }
        });
    },

    _addCartItemsQuantityControlEvent() {
        // Thêm sự kiện giảm số lượng món 
        this.ad_decreaseBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.closest(".cart-item-controls").getAttribute("data-index"));
                this.updateLocalStorage("decrease", index);
                this.loadCart();
            })
        })

        // Thêm sự kiện tăng số lượng món 
        this.ad_increaseBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.closest(".cart-item-controls").getAttribute("data-index"));
                this.updateLocalStorage("increase", index);
                this.loadCart();
            })
        })

        // Thêm sự kiện thay đổi ô input số lượng
        this.ad_quantityInputs.forEach(input => {
            input.addEventListener("keydown", (event) => {
                if (event.key === "." || event.key === "-") {
                    event.preventDefault();
                }
            })

            input.addEventListener("focusout", () => {
                if (input.value === "") {
                    input.value = 1;
                }

                const index = parseInt(input.closest(".cart-item-controls").getAttribute("data-index"));
                this.updateLocalStorage("change", index, input.value);
                this.loadCart();
            })
        })
    },

    _addUpdateCartItemsEvent() {
        this.ad_updateItemBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // 1. Show modal chi tiết món 
                bootstrap.Modal.getOrCreateInstance(document.querySelector("#update-modal")).show();

                // 2. Đổ dữ liệu cho modal 
                const imgPath = btn.closest("li").querySelector("img").getAttribute("src");
                const header = btn.closest("li").querySelector("img").getAttribute("alt");
                const price = btn.closest("li").querySelector(".price").textContent;
                const quantity = btn.closest("li").querySelector(".cart-item-controls input").value;
                const note = btn.closest("li").querySelector(".cart-item-details .note")?.textContent || "";
                const index = parseInt(btn.previousElementSibling.getAttribute("data-index"));

                updateModalHandler.dumpData(index, imgPath, header, price, quantity, note);
            })
        })
    },

    _addRemoveCartItemsEvent() {
        this.ad_removeItemBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (confirm("Bạn có chắc muốn xóa món này?")) {
                    const index = parseInt(btn.closest("li").querySelector(".cart-item-controls").getAttribute("data-index"));
                    this.updateLocalStorage("remove", index);
                    this.loadCart();
                }
            })
        })
    },

    _getNoteHTML(note) {
        if (note) {
            return `<p class="pe-2">Ghi Chú: <span class="fw-lighter fst-italic note">${note}</span></p>`
        }
        return "";
    },

};

const orderedCartHandler = {
    d_orderedCartContainer: document.querySelector("#ordered-cart-items"),
    d_paymentBtn: document.querySelector("#payment-btn"),

    // Getters
    get ad_orderedCartItems() {
        return document.querySelectorAll("#ordered-cart-items .cart-item");
    },

    init() {
        this.renderOrders();
        this._addPaymentBtnEvent();
    },

    // Methods
    async renderOrders() {
        try {
            const tableId = window.location.href.split('/')[5];
            const res = await fetch(`/api/current-order/table/${tableId}`);
            const data = await res.json();

            this.d_orderedCartContainer.innerHTML = "";
            const orders = data.orders;

            if (orders.length > 0) {
                bootstrap.Tab.getOrCreateInstance(document.querySelector("a[href='#mon-da-dat']")).show();
            }

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
                        </div>
                        <div class="cart-item-quantity me-2" data-order-id="${orders[i].ma_order}">
                            <span class="quantity text-danger my-2" data-quantity=${orders[i].so_luong}>${orders[i].so_luong}x</span>
                        </div>
                        <div class="cart-item-status">
                            ${statusHTML}
                        </div>
                    </li>
                `

                this.d_orderedCartContainer.innerHTML += li;
            }

            this._updateTotal();
        } catch (error) {
            console.error(error);
        }
    },

    _updateTotal() {
        let total = 0;

        this.ad_orderedCartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".quantity").getAttribute("data-quantity"));
            total += price * quantity;
        });

        document.querySelector("#ordered-cart-total").innerHTML = formatCurrency(total);
    },

    _getNoteHTML(note) {
        if (note) {
            return `<p class="pe-2">Ghi Chú: <span class="fw-lighter fst-italic note">${note}</span></p>`;
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

    _getObj(maMon) {
        for (const arr of NavItemsHandler.a_foodData) {
            const obj = arr.find(item => item.ma_mon_an === maMon);

            if (obj) {
                return obj;
            }
        }
        return null;
    },

    async updateTableStatus(status) {
        if (this.ad_orderedCartItems.length === 0) {
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

    _addPaymentBtnEvent() {
        this.d_paymentBtn.addEventListener("click", () => {
            if (confirm("Bạn có chắc muốn gọi nhân viên để thanh toán?")) {
                sendPaymentSocket();
                alert("Đã gửi thông báo, sẽ có nhân viên đến hướng dẫn thanh toán!");
            }
        })
    }
}

const updateModalHandler = {
    index: null,

    d_updateModal: document.querySelector("#update-modal"),

    init() {
        this._addQuantityControlsEvent();
        this._addSaveBtnOnClick();
    },

    dumpData(index, img, header, price, quantity, note) {
        this.index = index;

        this.d_updateModal.querySelector("img").setAttribute("src", img);
        this.d_updateModal.querySelector("h4").textContent = header;
        this.d_updateModal.querySelector("p").textContent = price;
        this.d_updateModal.querySelector("input").value = quantity;
        this.d_updateModal.querySelector("textarea").value = note;
    },

    _addSaveBtnOnClick() {
        this.d_updateModal.querySelector("#save").addEventListener("click", () => {
            const newQuantity = this.d_updateModal.querySelector("input").value;
            const newNote = this.d_updateModal.querySelector("textarea").value;

            cartHandler.updateLocalStorage("update", this.index, newQuantity, newNote);
            cartHandler.loadCart();
            bootstrap.Modal.getOrCreateInstance(this.d_updateModal).hide();
        })
    },

    _addQuantityControlsEvent() {
        // Lấy các DOM 
        const decreaseBtn = this.d_updateModal.querySelector(".decrease-btn");
        const increaseBtn = this.d_updateModal.querySelector(".increase-btn");
        const input = this.d_updateModal.querySelector("input");

        // Bắt sự kiện không cho user nhập dấu '-'
        const notAllowedKey = ["-", "."];
        input.addEventListener("keydown", (e) => {
            if (notAllowedKey.includes(e.key)) {
                e.preventDefault();
            }
        })

        decreaseBtn.addEventListener("click", () => {
            if (input.value > 1) {
                input.value--;
            }
        })

        increaseBtn.addEventListener("click", () => {
            input.value++;
        })
    }
}

function formatCurrency(value) {
    return value.toLocaleString('vi-VN') + 'đ';
}