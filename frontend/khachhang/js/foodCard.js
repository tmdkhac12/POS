window.addEventListener("DOMContentLoaded", () => {
    foodCardHandler.init();
})

const foodCardHandler = {
    id: null,
    imgPath: null,
    header: null,
    price: null,

    d_addToCartBtn: document.querySelector("#add-to-cart"),
    d_detailModal: document.querySelector("#detail-modal"),
    d_quantityControls: document.querySelector(".quantity-controls"),

    // Getters
    get ad_foodCards() {
        return document.querySelectorAll(".food-card");
    },

    init() {
        this.addFoodCardsOnClick();
        this.addQuantityControlsEvent();
        this.addToCartEvent();
    },

    // Methods
    addToCartEvent() {
        this.d_addToCartBtn.addEventListener("click", () => {
            // 1. Lấy thông tin món ăn từ Food Card và lưu vào 1 object 
            const maMon = parseInt(this.id);
            const tenMon = this.header;
            const hinhAnh = this.imgPath;
            const donGia = parseFloat(this.price);
            const soLuong = this.d_quantityControls.querySelector("input").value;
            const ghiChu = this.d_detailModal.querySelector("textarea").value;

            const o_foodInfo = { maMon, tenMon, hinhAnh, donGia, soLuong, ghiChu };

            // 2. Lưu món ăn vào localStorage và thêm vào giỏ hàng  
            cartHandler.addLocalStorage(o_foodInfo);
            cartHandler.loadCart();
            cartHandler.updateTotal();

            // 3. Show tab Đặt món nếu người dùng đang ở tab khác (Improve UX)
            bootstrap.Modal.getOrCreateInstance(document.querySelector("#detail-modal")).hide();
            bootstrap.Tab.getOrCreateInstance(document.querySelector("a[href='#dat-mon']")).show();
        })
    },

    addFoodCardsOnClick() {
        // Lấy các container của modal 
        const modalImg = this.d_detailModal.querySelector("img");
        const modalHeader = this.d_detailModal.querySelector("h4");
        const modalPrice = this.d_detailModal.querySelector("p");

        const quantityInput = this.d_quantityControls.querySelector("input");
        const noteInput = this.d_detailModal.querySelector("textarea");

        this.ad_foodCards.forEach(foodCard => {
            foodCard.addEventListener("click", () => {
                // Reset số lượng món và ghi chú 
                quantityInput.value = 1;
                noteInput.value = "";

                // Lấy dữ liệu của card vừa được click 
                this.id = foodCard.getAttribute("data-dish-id");
                this.imgPath = foodCard.querySelector("img").getAttribute("src");
                this.header = foodCard.querySelector(".card-title").getAttribute("title");
                this.price = foodCard.getAttribute("data-price");

                // Set dữ liệu cho modal 
                modalImg.setAttribute("src", this.imgPath);
                modalHeader.textContent = this.header;
                modalPrice.textContent = parseFloat(this.price).toLocaleString("vi-VN") + "đ";
            })
        })
    },

    addQuantityControlsEvent() {
        // Lấy các DOM 
        const decreaseBtn = this.d_quantityControls.querySelector(".decrease-btn");
        const increaseBtn = this.d_quantityControls.querySelector(".increase-btn");
        const input = this.d_quantityControls.querySelector("input");

        // Bắt sự kiện không cho user nhập dấu '-'
        const notAllowedKey = ["-", "."];
        input.addEventListener("keydown", (e) =>  {
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