window.addEventListener("DOMContentLoaded", () => {
    productPageHandler.addChangePageEvent();
    addProductHandler.init();
    updateProductHandler.init();
    deleteProductHandler.init();
    productSearchHandler.init(); 
})

const productPageHandler = {
    d_paginationContainer: document.querySelector("#products-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#products-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    // Methods
    addChangePageEvent(name = "") {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));
                const data = await this.getPage(page, name);
                (data.success ? this.renderMonAns(data.monAns) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");

                updateProductHandler.addUpdateBtnsOnClick();
                deleteProductHandler.addDeleteBtnsOnClick();
            })
        })
    },

    async getPage(page, name) {
        try {
            const respond = await fetch(`/api/monans?page=${page}&search=${name}`);
            const data = await respond.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async refreshCurrentPage() {
        // Fetch API lấy dữ liệu 
        const page = parseInt(this.d_activeBtn.getAttribute("data-page"));
        const data = await this.getPage(page, G_SEARCHKEY);
        (data.success ? this.renderMonAns(data.monAns) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updateProductHandler.addUpdateBtnsOnClick();
        deleteProductHandler.addDeleteBtnsOnClick();
    },

    renderMonAns(data) {
        const tableBody = document.querySelector("#monan-table tbody");
        tableBody.innerHTML = "";

        for (const element of data) {
            // Tạo HTML cho đơn giá 
            let donGiaHTML = "";

            if (element.don_gia !== element.don_gia_sau_khuyen_mai)
                donGiaHTML += `
                    <span class="text-decoration-line-through text-muted">${element.don_gia.toLocaleString("vi-VN")}đ</span>  
                    <span class="text-danger fw-bold">${element.don_gia_sau_khuyen_mai.toLocaleString("vi-VN")}đ</span>
                `;
            else 
                donGiaHTML += `
                    <span>${element.don_gia.toLocaleString("vi-VN")}đ</span>  
                `;

            // Nối vào body 
            tableBody.innerHTML += `
                <tr>
                    <td>${element.ma_mon_an}</td>
                    <td>${element.ten_mon_an}</td>
                    <td>
                        ${donGiaHTML}
                    </td>
                    <td>${element.ten_nhom}</td>
                    <td>
                        <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_mon_an}" data-name="${element.ten_mon_an}" data-price="${element.don_gia}" data-category="${element.ma_nhom}" data-discount="${element.ma_khuyen_mai ? element.ma_khuyen_mai : 0 }" data-img="${element.hinh_anh}">
                            <button class="btn btn-warning update-product-btn">Cập nhật</button>
                            <button class="btn btn-danger delete-product-btn">Xóa</button>
                        </div>
                    </td>
                </tr>
            `
        }
    },

    renderPagination(number, activeIndex) {
        const oldCount = this.ad_pageItemBtns.length;
        const newCount = Math.ceil(number / 8);

        if (newCount === oldCount)
            return;

        // 1. Xóa toàn bộ nội dung phân trang trước đó 
        this.d_paginationContainer.innerHTML = `
            <li class="page-item"><a class="page-link" href="#">Trang trước</a></li>
        `;

        // 2. Thêm các trang tương ứng 
        for (let i = 1; i <= newCount; i++) {
            this.d_paginationContainer.innerHTML += `
                <li class="page-item page-item-btn ${i == activeIndex ? "active" : ""}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
            `;
        }

        // 3. Thêm nút trang sau
        this.d_paginationContainer.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">Trang sau</a></li>
        `;
    }
}

const addProductHandler = {
    d_inputName: document.querySelector("#add-product-modal .input-name"),
    d_inputPrice: document.querySelector("#add-product-modal .input-price"),
    d_selectCategory: document.querySelector("#add-product-modal .select-category"),
    d_selectDiscount: document.querySelector("#add-product-modal .select-discount"),
    d_inputFile: document.querySelector("#add-product-modal .input-file"),

    d_addBtn: document.querySelector("#add-product-modal .save"),

    init() {
        this.d_addBtn.addEventListener("click", async () => {
            const name = this.d_inputName.value;
            const price = this.d_inputPrice.value;
            const categoryId = this.d_selectCategory.value;
            const discountId = this.d_selectDiscount.value;
            const file = this.d_inputFile.files[0];

            // Tạo form data để gửi hình ảnh lên server 
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("categoryId", categoryId);
            formData.append("discountId", discountId);
            formData.append("image", file);

            const res = await fetch("/api/monans", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-product-modal")).hide();

                if (G_SEARCHKEY) {
                    productSearchHandler.refreshSearch();
                    return;
                }

                const activeIndex = Math.ceil(data.countPhanLoai / 8);
                productPageHandler.renderPagination(data.numberOfMonAns, activeIndex);
                productPageHandler.refreshCurrentPage();
                productPageHandler.addChangePageEvent();
                document.querySelector("#add-product-modal form").reset();
            }

        })
    }
}

const updateProductHandler = {
    id: null,

    d_inputName: document.querySelector("#update-product-modal .input-name"),
    d_inputPrice: document.querySelector("#update-product-modal .input-price"),
    d_selectCategory: document.querySelector("#update-product-modal .select-category"),
    d_selectDiscount: document.querySelector("#update-product-modal .select-discount"),
    d_inputFile: document.querySelector("#update-product-modal .input-file"),

    d_labelImage: document.querySelector("#update-product-modal img"),
    d_updateBtn: document.querySelector("#update-product-modal .save"),

    // Getters
    get ad_updateBtns() {
        return document.querySelectorAll(".update-product-btn");
    },

    init() {
        this.addUpdateBtnsOnClick();

        // Thêm sự kiện cho nút cập nhật  
        this.d_updateBtn.addEventListener("click", async () => {
            const id = this.id;
            const name = this.d_inputName.value;
            const price = this.d_inputPrice.value;
            const categoryId = this.d_selectCategory.value;
            const discountId = this.d_selectDiscount.value;
            const file = this.d_inputFile.files[0];

            console.log({name, price, categoryId, discountId, id});


            // Tạo form data để gửi hình ảnh lên server 
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("categoryId", categoryId);
            formData.append("discountId", discountId);
            formData.append("image", file);

            const res = await fetch(`/api/monans/${this.id}`, {
                method: "PUT",
                body: formData
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-product-modal")).hide();
                productPageHandler.refreshCurrentPage();
                document.querySelector("#update-product-modal form").reset();
            }
        })
    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-product-modal")).show();

                // Lưu id lại để truy vấn 
                this.id = btn.closest("div").getAttribute("data-id");

                const name = btn.closest("div").getAttribute("data-name");
                const price = btn.closest("div").getAttribute("data-price");
                const categoryId = btn.closest("div").getAttribute("data-category");
                const discountId = btn.closest("div").getAttribute("data-discount");
                const imgName = btn.closest("div").getAttribute("data-img");

                this.d_inputName.value = name;
                this.d_inputPrice.value = price;
                this.d_selectCategory.value = categoryId;
                this.d_selectDiscount.value = discountId; 
                this.d_inputFile.value = "";

                this.d_labelImage.setAttribute("src", `/dishes/${imgName}`);
            })
        })
    }
}

const deleteProductHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-product-modal .yes"),
    d_labelName: document.querySelector("#delete-product-modal .product-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-product-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch(`/api/monans/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-product-modal")).hide();

                if (G_SEARCHKEY) {
                    productSearchHandler.refreshSearch();
                    return;
                }
                
                const activeIndex = Math.ceil(data.countPhanLoai / 8);
                productPageHandler.renderPagination(data.numberOfMonAns, activeIndex);
                productPageHandler.refreshCurrentPage();
                productPageHandler.addChangePageEvent();
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-product-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}

const productSearchHandler = {
    d_searchInput: document.querySelector("#search-product-form input"),
    d_searchForm: document.querySelector("#search-product-form"),

    // Methods
    init() {
        this.d_searchForm.addEventListener("submit", () => {
            this.search();
        })
    },

    refreshSearch() {
        this.d_searchInput.value = "";
        this.search();        
    },

    async search() {
        // 1. Lấy keyword tìm kiếm 
        G_SEARCHKEY = this.d_searchInput.value;

        // 2. Gọi API lấy danh sách dữ liệu 
        const page = 1;
        const data = await productPageHandler.getPage(page, G_SEARCHKEY);
        console.log(data);

        // 3. Thêm phân trang cho dữ liệu và render dữ liệu mặc định ở trang 1 
        const activeIndex = 1;
        productPageHandler.renderPagination(data.total, activeIndex);
        productPageHandler.renderMonAns(data.monAns);

        // 4. Thêm sự kiện chuyển trang cho dữ liệu 
        productPageHandler.addChangePageEvent(G_SEARCHKEY);

        // 5. Thêm sự kiện cho các nút update/delete 
        updateProductHandler.addUpdateBtnsOnClick();
        deleteProductHandler.addDeleteBtnsOnClick();
    }
}