document.addEventListener("DOMContentLoaded", () => {
    LoadNavItems.init();

    ScrollBarHandler.init();
})

const LoadNavItems = {
    groups: null,
    menuContainer: null,

    init() {
        this.initAtt();

        // Load nav items data 
        this.groups.forEach(item => {
            this.menuContainer.innerHTML += `
                <button class="menu-btn">
                    <img src="${item.image}" alt="">
                    <h6 class="mb-0 mt-2">${item.name}</h6>
                </button>
            `;
        })

        // Add active class for first button 
        const firstButton = document.querySelector(".menu-btn");
        firstButton.classList.add("active");
        
        // Add nav item onclick event handler  
        const buttons = document.querySelectorAll('.menu-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Xóa active khỏi tất cả button
                buttons.forEach(b => b.classList.remove('active'));
                // Thêm active vào button được click
                btn.classList.add('active');
            });
        });
    },

    initAtt() {
        this.menuContainer = document.querySelector("#menuContainer");

        this.groups = [
            { name: "Cupcake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            { name: "Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            { name: "Hot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            { name: "Cold", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            { name: "Coca", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Beef", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Beef1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Beef2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Beef3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" },
            // { name: "Beef4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfauCI-G5IZ5foSvbWbYNpgHqXFGeKJ8QtA&s" }
        ];
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
