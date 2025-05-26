window.addEventListener("DOMContentLoaded", () => {
    loadOrdersHandler.init();

});

const loadOrdersHandler = {
    ad_tableCards: document.querySelectorAll('.table-card'),

    d_orderList: document.getElementById('order-list'),

    init() {
        // Xử lý sự kiện click vào table card. 
        this.ad_tableCards.forEach(card => {
            card.addEventListener('click', () => {
                // 1. Lấy id của bàn
                const tableId = card.getAttribute('data-table-id');
                const tableStatus = card.getAttribute("data-status");

                // 2. Cập nhật trạng thái active cho bàn được click 
                this.ad_tableCards.forEach(c => c.classList.remove('active-table'));
                card.classList.add('active-table');

                // 3. Cập nhật tiêu đề bàn
                document.getElementById('table-title').textContent = card.querySelector(".table-name").textContent;

                // Gọi API để lấy chi tiết món ăn của bàn nếu bàn đang được chọn thì không gọi.
                this.fetchOrderDetails(tableId, tableStatus);
            });
        });
    },

    fetchOrderDetails(tableId, tableStatus) {
        this.d_orderList.innerHTML = ''; // Xóa danh sách món hiện tại

        // Sau này sẽ fetch API để lấy orders 
        const orders = [
            { name: 'Trà Nóng (Hot Tea)', quantity: 2, price: 20000, total: 40000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Muffin Ốp-la (Egg McMuffin)', quantity: 1, price: 20000, total: 20000 },
            { name: 'Cà phê rang xay cổ điển (Premium Roast Coffee)', quantity: 1, price: 20000, total: 20000 }
        ];

        if (tableStatus === 'occupied') {
            // Giả lập dữ liệu món ăn cho bàn đang sử dụng
            orders.forEach(order => {
                const orderItem = `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong class="item-name">${order.name}</strong><br>
                            Số lượng: ${order.quantity} x ${order.price.toLocaleString()}}
                        </div>
                        <div class="status-dropdown">
                        <div class="dropdown">
                            <button class="btn status-received dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Đã nhận</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-status="received">Đã nhận</a></li>
                                <li><a class="dropdown-item" href="#" data-status="processing">Đang chế biến</a></li>
                                <li><a class="dropdown-item" href="#" data-status="completed">Hoàn thành</a></li>
                            </ul>
                        </div>
                        </div>
                    </li>
                `;

                this.d_orderList.innerHTML += orderItem;
            });

            // Thêm sự kiện cho dropdown
            this.addDropdownEvent();
        } else {
            // Hiển thị thông báo bàn trống
            this.d_orderList.innerHTML = '<li class="list-group-item text-center text-muted">Bàn này chưa có đơn hàng.</li>';
        }

    },

    addDropdownEvent() {
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const status = this.getAttribute('data-status');
                const dropdownButton = this.closest('.dropdown').querySelector('.btn');
                const itemName = this.closest('.list-group-item').querySelector('.item-name');
                const tableCard = document.querySelector(".active-table");

                // Cập nhật trạng thái và màu sắc của dropdown
                if (status === 'received') {
                    dropdownButton.textContent = 'Đã nhận';
                    dropdownButton.className = 'btn status-received dropdown-toggle';
                    itemName.classList.remove('completed-item');
                } else if (status === 'processing') {
                    dropdownButton.textContent = 'Đang chế biến';
                    dropdownButton.className = 'btn status-processing dropdown-toggle';
                    itemName.classList.remove('completed-item');
                } else if (status === 'completed') {
                    dropdownButton.textContent = 'Hoàn thành';
                    dropdownButton.className = 'btn status-completed dropdown-toggle';
                    itemName.classList.add('completed-item');
                }

                // Đóng dropdown sau khi chọn
                const dropdown = new bootstrap.Dropdown(dropdownButton);
                dropdown.hide();

                // Kiểm tra trạng thái của tất cả món ăn
                loadOrdersHandler.checkOrdersStatus(tableCard);
            });
        });
    },

    checkOrdersStatus(d_tableCard) {
        const allCompleted = Array.from(this.d_orderList.querySelectorAll('.item-name'))
            .every(name => name.classList.contains('completed-item'));

        if (!allCompleted) {
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
}