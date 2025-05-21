
document.addEventListener("DOMContentLoaded", () => {
    preOrderHandler.init();
})

const preOrderHandler = {
    d_cartItemsContainer: document.getElementById('cart-items'),
    d_orderedCartItemsContainer: document.querySelector("#ordered-cart-items"),

    get a_cartItems() {
        return document.querySelectorAll("#cart-items .cart-item");
    },

    init() {
        // Thêm 4 item mẫu 
        this.addCartItems(4);

        // Xử lý sự kiện xác nhận đặt món.  
        document.querySelector("#confirm-btn").addEventListener("click", () => {
            if (confirm("Bạn có chắc muốn gọi những món trên?")) {
                // 1. Lưu lại các item clone trước khi xóa
                const clonedItems = this.a_cartItems;

                this.d_cartItemsContainer.innerHTML = "";

                clonedItems.forEach(item => {
                    this.d_orderedCartItemsContainer.appendChild(item.cloneNode(true));
                });

                // Chuyển qua tab các món đã đặt 
                const tabTrigger = document.querySelector('[data-bs-toggle="tab"][href="#mon-da-dat"]');
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();

                // Cập nhật tổng tiền trên đặt món và các món đã đặt.
                this.updateTotal();
                orderedCartHandler.updateTotal();
            }
        });
    },

    addCartItems(number) {
        for (let i = 0; i < number; i++) {
            this.d_cartItemsContainer.innerHTML += `
                <li class="list-group-item cart-item d-flex">
                    <img src="https://picsum.photos/150/100?random=${i}" alt="Pasta">
                    <div class="cart-item-details">
                        <p><span class="text-danger">${i + 1}. </span> Pasta</p>
                        <p class="text-danger mt-2 price" price="30000">30.000đ</p>
                        <small>(Đơn giá đã tính VAT = 30.000đ)</small> 
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrease-btn" data-id="3">-</button>
                        <span>1</span>
                        <button class="increase-btn text-danger border-danger" data-id="3">+</button>
                    </div>
                    <button type="button" class="remove-item btn border-0 text-danger p-2">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </li>
            `;
        }

        this.updateTotal();
    },

    updateTotal() {
        let total = 0;

        this.a_cartItems.forEach(item => {
            total += parseInt(item.querySelector(".price").getAttribute("price"));
        });

        document.querySelector("#pre-cart-total").innerHTML = formatCurrency(total);
    }
};


function formatCurrency(value) {
    return value.toLocaleString('vi-VN') + 'đ';
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('Kr ', '').replace(',', '.'));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        const cartItem = `
        <li class="list-group-item cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <p>${index + 1}. ${item.name}</p>
            <div class="cart-item-options">${item.options}</div>
            <p>Kr ${itemTotal.toFixed(2)}</p>
            <small>(Incl. tax 10% = Kr ${(itemTotal * 0.1).toFixed(2)})</small>
          </div>
          <div class="cart-item-controls">
            <button class="decrease-btn" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-id="${item.id}">+</button>
          </div>
        </li>
      `;
        cartItemsContainer.innerHTML += cartItem;
    });

    const tax = total * 0.1;
    const grandTotal = total + tax;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `Kr ${grandTotal.toFixed(2)}`;
    document.querySelector('.cart-total small').textContent = `(Incl. tax 10% = Kr ${tax.toFixed(2)})`;

    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const item = cart.find(cartItem => cartItem.id === id);
            item.quantity += 1;
            updateCart();
        });
    });
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const item = cart.find(cartItem => cartItem.id === id);
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== id);
            }
            updateCart();
        });
    });
}

const orderedCartHandler = {
    get a_orderedCartItems() {
        return document.querySelectorAll("#ordered-cart-items .cart-item");
    },

    updateTotal() {
        let total = 0;

        this.a_orderedCartItems.forEach(item => {
            total += parseInt(item.querySelector(".price").getAttribute("price"));
        });

        document.querySelector("#ordered-cart-total").innerHTML = formatCurrency(total);
    }
}