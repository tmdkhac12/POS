fetchOrderDetails(1, "occupied");
checkOrdersStatus(document.querySelector("#order-list"), document.querySelector("#table-1"));

document.querySelectorAll('.table-card').forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        const tableId = this.getAttribute('data-table');
        const tableStatus = this.getAttribute('data-status');

        // Xóa trạng thái active của tất cả các bàn
        document.querySelectorAll('.table-card').forEach(c => c.classList.remove('active-table'));
        this.classList.add('active-table');

        // Cập nhật tiêu đề bàn
        document.getElementById('table-title').textContent = `Bàn ${tableId} - Tầng 1`;

        // Gọi API để lấy chi tiết món ăn của bàn nếu bàn đang được chọn thì không gọi.
        fetchOrderDetails(tableId, tableStatus);
    });
});

function fetchOrderDetails(tableId, tableStatus) {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Xóa danh sách món hiện tại

    if (tableStatus === 'occupied') {
        // Giả lập dữ liệu món ăn cho bàn đang sử dụng
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

        orders.forEach(order => {
            const orderItem = `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong class="item-name">${order.name}</strong><br>
              Số lượng: ${order.quantity} x ${order.price.toLocaleString()}}
            </div>
            <div class="status-dropdown">
              <div class="dropdown">
                <button class="btn status-received dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Đã nhận
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" data-status="received">Đã nhận</a></li>
                  <li><a class="dropdown-item" href="#" data-status="processing">Đang chế biến</a></li>
                  <li><a class="dropdown-item" href="#" data-status="completed">Hoàn thành</a></li>
                </ul>
              </div>
            </div>
          </li>`;
            orderList.innerHTML += orderItem;
        });

        // Thêm sự kiện cho dropdown
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const status = this.getAttribute('data-status');
                const dropdownButton = this.closest('.dropdown').querySelector('.btn');
                const itemName = this.closest('.list-group-item').querySelector('.item-name');
                const tableCard = document.querySelector(`#table-${tableId}`);

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
                checkOrdersStatus(orderList, tableCard);
            });
        });
    } else {
        // Hiển thị thông báo bàn trống
        orderList.innerHTML = '<li class="list-group-item text-center text-muted">Bàn này chưa có đơn hàng.</li>';
    }

    // Thay thế bằng API thực tế nếu cần
    // console.log(`Lấy chi tiết món ăn cho Bàn ${tableId}`);
}

function checkOrdersStatus(d_orderList, d_tableCard) {
    const allCompleted = Array.from(d_orderList.querySelectorAll('.item-name'))
        .every(name => name.classList.contains('completed-item'));

    if (!allCompleted) {
        d_tableCard.classList.add('pending');
        d_tableCard.querySelector('.emptyHeader').innerHTML = `
        <p class="card-text m-0 font-weight-light">Đang sử dụng</p>
        <i class="fa fa-clock"></i>
        <a href="#" class="stretched-link">
            <i style="font-size:16px" class="fa fas fa-chevron-right"></i>
        </a>
        `;
    } else {
        d_tableCard.classList.remove('pending');
        d_tableCard.querySelector('.emptyHeader').innerHTML = `
        <p class="card-text m-0 font-weight-light">Đang sử dụng</p>
        <a href="#" class="stretched-link">
            <i style="font-size:16px" class="fa fas fa-chevron-right"></i>
        </a>
        `;
    }
}