const exampleDishesData = [
    [
        { ma_mon_an: 1, ten_mon_an: 'Ramen Teriyaki', don_gia: 78000, hinh_anh: 'ramen_teriyaki.jfif', ma_nhom: 1, ma_khuyen_mai: null },
        { ma_mon_an: 2, ten_mon_an: 'Ramen Daidai', don_gia: 68000, hinh_anh: 'ramen_daidai.jpg', ma_nhom: 1, ma_khuyen_mai: null },
        { ma_mon_an: 3, ten_mon_an: 'Ramen Aka', don_gia: 58000, hinh_anh: 'ramen_aka.jfif', ma_nhom: 1, ma_khuyen_mai: null }

    ],
    [
        { ma_mon_an: 8, ten_mon_an: 'Cơm Cà Ri Thịt Heo Chiên Xù', don_gia: 138000, hinh_anh: 'rice_tonkatsu.jfif', ma_nhom: 2, ma_khuyen_mai: null },
        { ma_mon_an: 9, ten_mon_an: 'Cơm Cà Ri Cuộn Trứng', don_gia: 78000, hinh_anh: 'rice_egg.jfif', ma_nhom: 2, ma_khuyen_mai: null },
        { ma_mon_an: 10, ten_mon_an: 'Cơm Chiên Ichiban Dầu Gà', don_gia: 68000, hinh_anh: 'rice_ichiban.jfif', ma_nhom: 2, ma_khuyen_mai: null },
        { ma_mon_an: 11, ten_mon_an: 'Cơm Cà Ri Bò', don_gia: 94000, hinh_anh: 'rice_gyudon.jfif', ma_nhom: 2, ma_khuyen_mai: null }
    ]
]

const foodCardHandler = {
    d_cartItemsContainer: document.querySelector("#cart-items"),

    get ad_addToCartBtns() {
        return document.querySelectorAll(".add-to-cart");
    },

    addToCartHandler() {
        this.ad_addToCartBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // 1. Lấy Food Card chứa btn 
                const foodCard = btn.closest(".food-card");

                // 2. Lấy thông tin món ăn từ Food Card và lưu vào 1 object 
                const maMon = parseInt(foodCard.getAttribute("data-dish-id"));
                const tenMon = foodCard.querySelector(".card-title").getAttribute("title");
                const hinhAnh = foodCard.querySelector("img").getAttribute("src");
                const donGia = parseFloat(foodCard.getAttribute("data-price"));
                const soLuong = 1;

                const o_foodInfo = { maMon, tenMon, hinhAnh, donGia, soLuong };

                // 3. Lưu món ăn vào localStorage và thêm vào giỏ hàng  
                cartHandler.addLocalStorage(o_foodInfo);
                cartHandler.loadCart();
                cartHandler.updateTotal();

                // 4. Show tab Đặt món nếu người dùng đang ở tab khác (Improve UX)
                const tabTrigger = document.querySelector('[data-bs-toggle="tab"][href="#dat-mon"]');
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();
            })
        })
    }
}