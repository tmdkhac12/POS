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
        const buttons = document.querySelectorAll('.menu-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Thêm active vào button được click
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Lấy index của thẻ đang được chọn
                let index = parseInt(btn.getAttribute("data-index"));
                this.displayFoodItems(this.a_foodData[index]);

                // Cập nhật label cho nav item đang chọn
                this.updateSelectingLabel();

                // Thêm sự kiện add to cart cho các món ăn 
                foodCardHandler.addToCartHandler();
            });
        });

        // Add add to card event onclick handler 
        foodCardHandler.addToCartHandler();
    },

    updateSelectingLabel() {
        const navItemSelected = document.querySelector(".menu-btn.active");
        const navItemLabel = document.querySelector("#nav-item-label");

        navItemLabel.textContent = navItemSelected.querySelector("h6").textContent;
    },

    displayFoodItems(items) {
        this.foodItemsContainer.innerHTML = ''; // Xóa nội dung cũ

        for (let i = 0; i < items.length; i++) {
            const card = `
                <div class="col-4 fw-bold">
                    <div class="food-card shadow border border-1" data-dish-id="${items[i].ma_mon_an}" data-price="${items[i].don_gia}">
                        <img src="/dishes/${items[i].hinh_anh}">

                        <div class="card-body p-3">
                            <h5 class="card-title" title="${items[i].ten_mon_an}"><span class="text-danger">${i + 1}. </span>${items[i].ten_mon_an}</h5>

                            <div class="d-flex justify-content-between align-items-center">
                                <p class="card-text text-danger m-0">${items[i].don_gia.toLocaleString("vi-VN")}đ</p>
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
    }
}

const ScrollBarHandler = {
    menuContainer: null,
    prevBtn: null,
    nextBtn: null,

    init() {
        this.menuContainer = document.querySelector("#menuContainer");
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

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
