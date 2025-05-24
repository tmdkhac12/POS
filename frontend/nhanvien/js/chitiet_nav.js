document.addEventListener("DOMContentLoaded", () => {
    NavItemsHandler.init();

    ScrollBarHandler.init();
})

const NavItemsHandler = {
    menuContainer: document.querySelector("#menu-container"),
    foodItemsContainer: document.querySelector("#food-items"),

    a_foodData: JSON.parse(document.querySelector("#dishes-data-json").textContent),

    init() {
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

            });
        });
    },

    displayFoodItems(items) {
        this.foodItemsContainer.innerHTML = ''; // Xóa nội dung cũ

        for (let i = 0; i < items.length; i++) {
            const card = `
                <div class="col-3 d-flex food-card-item">
                    <div class="card shadow-sm flex-fill">
                        <img class="card-img-top" src="/nhanvien/images/dishes/${items[i].hinh_anh}">
                        <div class="card-body">
                            <p class="card-text m-0 text-center">${items[i].ten_mon_an}</p>
                            <p class="card-text m-0 text-center fw-bold" data-price="${items[i].don_gia}">${items[i].don_gia.toLocaleString("vi-VN")}</p>
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
