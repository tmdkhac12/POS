document.addEventListener("DOMContentLoaded", () => {
    NavItemsHandler.init();

    ScrollBarHandler.init();
})

const NavItemsHandler = {
    menuContainer: document.querySelector("#menuContainer"),
    foodItemsContainer: document.querySelector("#food-items"),

    a_foodData: JSON.parse(document.querySelector("#dishes-data-json").textContent),

    init() {
        this.displayFoodItems(this.a_foodData[0]);

        // Add active class for first button 
        const firstButton = document.querySelector(".menu-btn");
        firstButton.classList.add("active");
        this.updateSelectingLabel();

        // Add nav item onclick event handler  
        const navItems = document.querySelectorAll('.menu-btn');
        navItems.forEach(navItem => {
            navItem.addEventListener('click', () => {
                // Thêm active vào button được click
                navItems.forEach(b => b.classList.remove('active'));
                navItem.classList.add('active');

                // Lấy index của thẻ nav đang được chọn
                let index = parseInt(navItem.getAttribute("data-index"));
                this.displayFoodItems(this.a_foodData[index]);

                // Cập nhật label cho nav item đang chọn
                this.updateSelectingLabel();

                // Thêm sự kiện show detail cho các món ăn 
                foodCardHandler.addFoodCardsOnClick();
            });
        });
    },

    updateSelectingLabel() {
        const navItemSelected = document.querySelector(".menu-btn.active");
        const navItemLabel = document.querySelector("#nav-item-label");

        navItemLabel.textContent = navItemSelected.querySelector("h6").textContent;
    },

    displayFoodItems(items) {
        this.foodItemsContainer.innerHTML = ''; // Xóa nội dung cũ

        for (let i = 0; i < items.length; i++) {
            let priceHTML = this._getPriceHTML(items[i].don_gia, items[i].don_gia_sau_khuyen_mai);

            const card = `
                <div class="col-4 fw-bold d-flex">
                    <div class="food-card shadow border border-1 card flex-fill" data-dish-id="${items[i].ma_mon_an}" data-price="${items[i].don_gia_sau_khuyen_mai}" data-bs-toggle="modal" data-bs-target="#detail-modal">
                        <img src="/dishes/${items[i].hinh_anh}">

                        <div class="card-body p-3">
                            <h5 class="card-title" title="${items[i].ten_mon_an}"><span class="text-danger">${i + 1}. </span>${items[i].ten_mon_an}</h5>

                            <div class="d-flex justify-content-between align-items-center">
                                ${priceHTML}
                                <button class="add-to-cart">
                                    <i class="bi bi-cart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `

            this.foodItemsContainer.innerHTML += card;
        }
    },

    _getPriceHTML(originPrice, discountPrice) {
        if (originPrice !== discountPrice) {
            return `
                <div>
                    <span class="text-decoration-line-through text-muted">${originPrice.toLocaleString("vi-VN")}đ</span> <br>
                    <span class="card-text text-danger fw-bold">${discountPrice.toLocaleString("vi-VN")}đ</span>
                </div>
            `
        } else {
            return `
                <span class="card-text text-danger m-0">${originPrice.toLocaleString("vi-VN")}đ</span>
            `
        }
    }
}

const ScrollBarHandler = {
    menuContainer: document.querySelector("#menuContainer"),
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