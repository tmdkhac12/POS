const cartItemsContainer = document.getElementById('cart-items');

document.addEventListener("DOMContentLoaded", () => {
    addCartItems(4);
})

function addCartItems(number) {
    for (let i = 0; i < number; i++) {
        cartItemsContainer.innerHTML += `
            <li class="list-group-item cart-item d-flex">
                <img src="https://picsum.photos/150/100?random=3" alt="Pasta">
                <div class="cart-item-details">
                    <p><span class="text-danger">1. </span> Pasta</p>
                    <p class="text-danger mt-2">30.000đ</p>
                </div>
                <div class="cart-item-controls">
                    <button class="decrease-btn" data-id="3">-</button>
                    <span>1</span>
                    <button class="increase-btn text-danger border-danger" data-id="3">+</button>
                </div>
            </li>
        `;
    }
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

function formatCurrency(value) {
    return value.toLocaleString('vi-VN') + 'đ';
}

document.querySelector("#confirm-btn").addEventListener("click", () => {

    if(confirm("Bạn có chắc muốn gọi những món trên?")) {
        const a_cartItems = document.querySelectorAll("#cart-items .cart-item");
        cartItemsContainer.innerHTML = "";
    
        const d_orderedCartItemsContainer = document.querySelector("#ordered-cart-items");
        Array.from(a_cartItems).forEach(item => {
            d_orderedCartItemsContainer.appendChild(item.cloneNode(true));
        });
    }
    
})