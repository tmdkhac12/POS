document.addEventListener("DOMContentLoaded", () => {
    cartHandler.loadCart();
    cartHandler.updateTotal();

    cartHandler.init();
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
        // Sự kiện xác nhận đặt món.  
        this.d_confirmBtn.addEventListener("click", () => {
            if (confirm("Bạn có chắc muốn gọi những món trên?")) {
                // 1. Chuyển các món trong cart qua orderedCart  
                this.ad_cartItems.forEach(item => {
                    this.d_orderedCartItemsContainer.appendChild(item.cloneNode(true));
                });

                this.d_cartItemsContainer.innerHTML = "";

                // 2. Chuyển qua tab các món đã đặt 
                bootstrap.Tab.getOrCreateInstance(document.querySelector("a[href='#mon-da-dat']")).show();

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
            let noteHTML = "";

            if (ao_cart[i].ghiChu) {
                noteHTML += `
                    <p class="pe-2">Ghi Chú: <span class="fw-lighter fst-italic note">${ao_cart[i].ghiChu}</span></p> 
                `
            }

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

        // Cập nhật tổng tiền 
        this.updateTotal();

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

        // Thêm sự kiện chỉnh sửa món ăn
        this.ad_updateItemBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // 1. Show modal chi tiết món 
                bootstrap.Modal.getOrCreateInstance(document.querySelector("#update-modal")).show();

                // 2. Đổ dữ liệu cho modal 
                const imgPath = btn.closest("li").querySelector("img").getAttribute("src");
                const header = btn.closest("li").querySelector("img").getAttribute("alt");
                const quantity = btn.closest("li").querySelector(".cart-item-controls input").value;
                const note = btn.closest("li").querySelector(".cart-item-details .note")?.textContent || "";
                const index = parseInt(btn.previousElementSibling.getAttribute("data-index"));
                console.log(index);

                updateModalHandler.dumpData(index, imgPath, header, quantity, note);
            })
        })

        // Thêm sự kiện xóa món ăn khỏi giỏ hàng 
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

    updateTotal() {
        let total = 0;

        this.ad_cartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = item.querySelector(".quantity").value;
            total += price * quantity;
        });

        document.querySelector("#pre-cart-total").innerHTML = formatCurrency(total);
    }
};

const orderedCartHandler = {
    get ad_orderedCartItems() {
        return document.querySelectorAll("#ordered-cart-items .cart-item");
    },

    updateTotal() {
        let total = 0;

        this.ad_orderedCartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".price").getAttribute("data-price"));
            const quantity = item.querySelector(".quantity").value;
            total += price * quantity;
        });

        document.querySelector("#ordered-cart-total").innerHTML = formatCurrency(total);
    }
}

const updateModalHandler = {
    index: null,

    d_updateModal: document.querySelector("#update-modal"),

    init() {
        this.addQuantityControlsEvent();
        this.addSaveBtnOnClick();
    },

    dumpData(index, img, header, quantity, note) {
        this.index = index;

        this.d_updateModal.querySelector("img").setAttribute("src", img);
        this.d_updateModal.querySelector("h4").textContent = header;
        this.d_updateModal.querySelector("input").value = quantity;
        this.d_updateModal.querySelector("textarea").value = note;
    },

    addSaveBtnOnClick() {
        this.d_updateModal.querySelector("#save").addEventListener("click", () => {
            const newQuantity = this.d_updateModal.querySelector("input").value;
            const newNote = this.d_updateModal.querySelector("textarea").value;

            cartHandler.updateLocalStorage("update", this.index, newQuantity, newNote);
            cartHandler.loadCart();
            bootstrap.Modal.getOrCreateInstance(this.d_updateModal).hide();
        })
    },

    addQuantityControlsEvent() {
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
