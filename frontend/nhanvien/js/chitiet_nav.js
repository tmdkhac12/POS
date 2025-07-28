document.addEventListener("DOMContentLoaded", () => {
    NavItemsHandler.init();

    ScrollBarHandler.init();

    addPaymentBtnEvent();
})

const NavItemsHandler = {
    menuContainer: document.querySelector("#menu-container"),
    foodItemsContainer: document.querySelector("#food-items"),

    a_foodData: JSON.parse(document.querySelector("#dishes-data-json").textContent),

    init() {
        // Display first group foods
        this.displayFoodItems(this.a_foodData[0]);

        // Add active class for first button 
        const firstButton = document.querySelector(".menu-btn");
        firstButton.classList.add("active");

        // Add nav item onclick event handler  
        const buttons = document.querySelectorAll('.menu-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Thêm active vào button được click
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Lấy index của thẻ đang được chọn
                let index = parseInt(btn.getAttribute("data-index"));
                this.displayFoodItems(this.a_foodData[index]);

                // Thêm sự kiện show detail cho card  
                foodCardHandler.addFoodCardsOnClick();
            });
        });
    },

    displayFoodItems(items) {
        this.foodItemsContainer.innerHTML = ''; // Xóa nội dung cũ

        for (let i = 0; i < items.length; i++) {
            let priceHTML = ``;

            if (items[i].don_gia !== items[i].don_gia_sau_khuyen_mai) {
                priceHTML += `
                    <div>
                        <p class="text-decoration-line-through text-muted text-center m-0">${items[i].don_gia.toLocaleString("vi-VN")}đ</p>
                        <p class="card-text text-danger text-center fw-bold price">${items[i].don_gia_sau_khuyen_mai.toLocaleString("vi-VN")}đ</p>
                    </div>
                `
            } else {
                priceHTML += `
                    <p class="card-text text-center m-0 fw-bold price">${items[i].don_gia.toLocaleString("vi-VN")}đ</p>
                `
            }

            const card = `
                <div class="col-3 d-flex food-card-item">
                    <div class="card shadow-sm flex-fill" data-bs-toggle="modal" data-bs-target="#detail-modal" data-dish-id="${items[i].ma_mon_an}">
                        <img class="card-img-top" src="/dishes/${items[i].hinh_anh}" alt="${items[i].ten_mon_an}">
                        <div class="card-body">
                            <p class="card-text m-0 text-center">${items[i].ten_mon_an}</p>
                            ${priceHTML}
                        </div>
                    </div>
                </div>
            `

            this.foodItemsContainer.innerHTML += card;
        }
    }
}

const ScrollBarHandler = {
    menuContainer: document.querySelector("#menu-container"),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),

    init() {
        // Thêm xử lý sự kiện cho các button 
        prevBtn.addEventListener('click', () => this.scrollMenu('left'));
        nextBtn.addEventListener('click', () => this.scrollMenu('right'));

        // Cập nhật trạng thái nút khi cuộn bằng chuột hoặc touchpad
        this.menuContainer.addEventListener('scroll', () => {
            this.updateButtonState();
        });

        // Cập nhật khi mới load trang 
        this.updateButtonState();
    },

    scrollMenu(direction) {
        const scrollAmount = 100; // Độ dịch chuyển mỗi lần click (có thể điều chỉnh)

        if (direction === 'left') {
            this.menuContainer.scrollLeft -= scrollAmount;
        } else {
            this.menuContainer.scrollLeft += scrollAmount;
        }

        // Cập nhật trạng thái nút
        this.updateButtonState();
    },

    updateButtonState() {
        const maxScroll = this.menuContainer.scrollWidth - this.menuContainer.clientWidth - 15;
        this.prevBtn.disabled = this.menuContainer.scrollLeft <= 0;
        this.nextBtn.disabled = this.menuContainer.scrollLeft >= maxScroll;
    }
}

function addPaymentBtnEvent() {
    const d_paymentBtn = document.querySelector('#payment-btn');
    d_paymentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const tableId = window.location.href.split('/')[5];
        window.location.href = '/nhanvien/payment/' + tableId;
    });
}