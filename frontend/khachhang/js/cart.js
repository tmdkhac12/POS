document.addEventListener("DOMContentLoaded", () => {
    cartHandler.loadCart();
    cartHandler.updateTotal();

    cartHandler.init();
})

const cartHandler = {
    d_cartItemsContainer: document.querySelector("#cart-items"),
    d_orderedCartItemsContainer: document.querySelector("#ordered-cart-items"),
    d_confirmBtn: document.querySelector("#confirm-btn"),

    get ad_cartItems() {
        return document.querySelectorAll("#cart-items .cart-item");
    },

    get ad_decreaseBtns() {
        return document.querySelectorAll(".decrease-btn");
    },

    get ad_increaseBtns() {
        return document.querySelectorAll(".increase-btn");
    },

    get ad_removeItemBtns() {
        return document.querySelectorAll(".remove-item");
    },

    get ao_cart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    },

    init() {
        // Xử lý sự kiện xác nhận đặt món.  
        this.d_confirmBtn.addEventListener("click", () => {
            if (confirm("Bạn có chắc muốn gọi những món trên?")) {
                // 1. Chuyển các món trong cart qua orderedCart  
                this.ad_cartItems.forEach(item => {
                    this.d_orderedCartItemsContainer.appendChild(item.cloneNode(true));
                });

                this.d_cartItemsContainer.innerHTML = "";

                // 2. Chuyển qua tab các món đã đặt 
                const tabTrigger = document.querySelector('[data-bs-toggle="tab"][href="#mon-da-dat"]');
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();

                // 3. Cập nhật tổng tiền trên cart, orderedCart, xóa localStorage.
                this.updateTotal();
                orderedCartHandler.updateTotal();
                localStorage.clear();
            }
        });
    },

    addLocalStorage(o_foodInfo) {
        // 1. Lấy danh sách món từ localStorage 
        const ao_cart = this.ao_cart;

        // 2. Kiểm tra món đã tồn tại trong danh sách vừa lấy chưa 
        const existIndex = ao_cart.findIndex((item) => {
            return item.maMon === o_foodInfo.maMon;
        })

        // 3. Nếu chưa thì thêm món, nếu rồi thêm số lượng 
        if (existIndex === -1) {
            ao_cart.push(o_foodInfo);
        } else {
            ao_cart[existIndex].soLuong++;
        }

        // 4. Lưu lại vào localStorage 
        localStorage.setItem("cart", JSON.stringify(ao_cart));
    },

    updateLocalStorage(key, maMon) {
        // 1. Lấy danh sách món từ localStorage 
        const ao_cart = this.ao_cart;

        // 2. Lấy index của món ăn trong localStorage  
        const index = ao_cart.findIndex((item) => {
            return item.maMon === maMon;
        });

        // 3. Kiểm tra key 
        if (key === "increase") {
            ao_cart[index].soLuong++;
        } else if (key === "decrease") {
            if (ao_cart[index].soLuong <= 1) {
                return;
            }

            ao_cart[index].soLuong--;
        } else if (key === "remove") {
            ao_cart.splice(index, 1);
        }

        // 4. Lưu lại vào localStorage 
        localStorage.setItem("cart", JSON.stringify(ao_cart));
    },

    loadCart() {
        const ao_cart = this.ao_cart;
        this.d_cartItemsContainer.innerHTML = "";

        for (let i = 0; i < ao_cart.length; i++) {
            const li = `
                <li class="list-group-item cart-item d-flex">
                    <img src="${ao_cart[i].hinhAnh}" alt="${ao_cart[i].tenMon}">
                    <div class="cart-item-details">
                        <p><span class="text-danger">${i + 1}. </span> ${ao_cart[i].tenMon}</p>
                        <p class="text-danger mt-2 price" data-price="${ao_cart[i].donGia}">${ao_cart[i].donGia.toLocaleString("vi-VN")}đ</p>
                        <small>(Đơn giá đã tính VAT = ${ao_cart[i].donGia.toLocaleString("vi-VN")}đ)</small> 
                    </div>
                    <div class="cart-item-controls" data-dish-id="${ao_cart[i].maMon}">
                        <button class="decrease-btn">-</button>
                        <span class="quantity" data-quantity="${ao_cart[i].soLuong}">${ao_cart[i].soLuong}</span>
                        <button class="increase-btn text-danger border-danger">+</button>
                    </div>
                    <button type="button" class="remove-item btn border-0 text-danger p-2">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </li>
            `;

            this.d_cartItemsContainer.innerHTML += li;
        }

        // Xử lý sự kiện giảm số lượng món 
        this.ad_decreaseBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const maMon = parseInt(btn.closest(".cart-item-controls").getAttribute("data-dish-id"));
                this.updateLocalStorage("decrease", maMon);
                this.loadCart();
                this.updateTotal();
            })
        })

        // Xử lý sự kiện tăng số lượng món 
        this.ad_increaseBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const maMon = parseInt(btn.closest(".cart-item-controls").getAttribute("data-dish-id"));
                this.updateLocalStorage("increase", maMon);
                this.loadCart();
                this.updateTotal();
            })
        })

        // Xử lý sự kiện xóa món ăn khỏi giỏ hàng 
        this.ad_removeItemBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if(confirm("Bạn có chắc muốn xóa món này?")) {
                    const maMon = parseInt(btn.previousElementSibling.getAttribute("data-dish-id"));
                    this.updateLocalStorage("remove", maMon);
                    this.loadCart();
                    this.updateTotal();
                }
            })
        })
    },

    updateTotal() {
        let total = 0;

        this.ad_cartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".quantity").getAttribute("data-quantity"));
            total += price * quantity;
        });

        document.querySelector("#pre-cart-total").innerHTML = formatCurrency(total);
    }
};

const orderedCartHandler = {
    get a_orderedCartItems() {
        return document.querySelectorAll("#ordered-cart-items .cart-item");
    },

    updateTotal() {
        let total = 0;

        this.a_orderedCartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".quantity").getAttribute("data-quantity"));
            total += price * quantity;
        });

        document.querySelector("#ordered-cart-total").innerHTML = formatCurrency(total);
    }
}

function formatCurrency(value) {
    return value.toLocaleString('vi-VN') + 'đ';
}
