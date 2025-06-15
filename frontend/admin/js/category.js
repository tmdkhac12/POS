window.addEventListener("DOMContentLoaded", () => {
    categoryPageHandler.addChangePageCategory();
    addPhanLoaiHandler.init();
    updatePhanLoaiHandler.init();
    deletePhanLoaiHandler.init();
})

const categoryPageHandler = {
    d_paginationContainer: document.querySelector("#category-pagination"),

    // Getters
    get ad_pageItemBtns() {
        return document.querySelectorAll("#category-pagination .page-item-btn");
    },

    get d_activeBtn() {
        return Array.from(this.ad_pageItemBtns).find(item => item.classList.contains("active"));
    },

    // Methods
    addChangePageCategory() {
        this.ad_pageItemBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Kiểm tra trạng thái btn, nếu active thì không gọi API 
                const isActive = btn.classList.contains("active");
                if (isActive) {
                    return;
                }

                // Fetch API lấy dữ liệu 
                const page = parseInt(btn.getAttribute("data-page"));
                const data = await this.getPage(page);
                if (data.success ? this.renderPhanLoais(data.phanLoais) : alert(data.message));

                // Cập nhật trạng thái active của btn
                this.ad_pageItemBtns.forEach(item => item.classList.remove("active"))
                btn.classList.add("active");
            })
        })
    },

    async getPage(page) {
        try {
            const respond = await fetch(`/api/phanloais?page=${page}`);
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
        const data = await this.getPage(page);
        (data.success ? this.renderPhanLoais(data.phanLoais) : alert(data.message));

        // Cập nhật chức năng của các nút update, delete 
        updatePhanLoaiHandler.addUpdateBtnsOnClick();
        deletePhanLoaiHandler.addDeleteBtnsOnClick();
    },

    renderPagination(number) {
        const oldCount = this.ad_pageItemBtns.length;
        const newCount = Math.ceil(number / 8);

        if (newCount === oldCount)
            return;

        // 1. Xóa toàn bộ nội dung phân trang trước đó 
        this.d_paginationContainer.innerHTML = `
            <li class="page-item"><a class="page-link" href="#">Trang trước</a></li>
            <li class="page-item page-item-btn" data-page="1"><a class="page-link" href="#">1</a></li>
        `;

        // 2. Thêm các trang tương ứng 
        for (let i = 2; i <= newCount; i++) {
            if (i === newCount) {
                this.d_paginationContainer.innerHTML += `
                    <li class="page-item page-item-btn active" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
                `;
            } else {
                this.d_paginationContainer.innerHTML += `
                    <li class="page-item page-item-btn" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
                `;
            }
        }

        // 3. Thêm nút trang sau
        this.d_paginationContainer.innerHTML += `
            <li class="page-item"><a class="page-link" href="#">Trang sau</a></li>
        `;

        // 4. Thêm sự kiện chuyển trang
        this.addChangePageCategory();
    },

    renderPhanLoais(data) {
        const tableBody = document.querySelector("#phanloai-table tbody");
        tableBody.innerHTML = "";

        for (const element of data) {
            tableBody.innerHTML += `
            <tr>
                <td>${element.ma_nhom}</td>
                <td>${element.ten_nhom}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center" data-id="${element.ma_nhom}" data-name="${element.ten_nhom}" data-img="${element.hinh_anh}">
                        <button class="btn btn-warning update-category-btn">Cập nhật</button>
                        <button class="btn btn-danger delete-category-btn">Xóa</button>
                    </div>
                </td>
            </tr>
        `
        }
    }
}

const addPhanLoaiHandler = {
    d_inputName: document.querySelector("#add-category-modal .input-name"),
    d_inputFile: document.querySelector("#add-category-modal .input-file"),
    d_addBtn: document.querySelector("#add-category-modal .save"),

    init() {
        this.d_addBtn.addEventListener("click", async () => {
            const file = this.d_inputFile.files[0];
            const categoryName = this.d_inputName.value;

            // Tạo form data để gửi hình ảnh lên server 
            const formData = new FormData();
            formData.append("image", file);
            formData.append("categoryName", categoryName);

            const res = await fetch("/api/phanloais", {
                method: "POST",
                body: formData
            });
            
            const data = await res.json();

            alert(data.message);
            
            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("add-category-modal")).hide();
                categoryPageHandler.renderPagination(data.countPhanLoai);
                categoryPageHandler.refreshCurrentPage();
            }

        })
    }
}

const updatePhanLoaiHandler = {
    id: null,

    d_inputName: document.querySelector("#update-category-modal .input-name"),
    d_inputFile: document.querySelector("#update-category-modal .input-file"),
    d_imageLabel: document.querySelector("#update-category-modal .preview-image"),
    d_updateBtn: document.querySelector("#update-category-modal .save"),

    // Getters
    get ad_updateBtns () {
        return document.querySelectorAll(".update-category-btn");
    },

    // Methods
    init() {
        this.addUpdateBtnsOnClick();

        this.d_updateBtn.addEventListener("click" , async () => {
            const id = this.id;
            const categoryName = this.d_inputName.value;
            const file = this.d_inputFile.files[0];

            const formData = new FormData();
            formData.append("image", file);
            formData.append("categoryName", categoryName);

            const res = await fetch(`/api/phanloais/${id}`, {
                method: "PUT",
                body: formData
            })

            const data = await res.json();
            
            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-category-modal")).hide();
                categoryPageHandler.refreshCurrentPage();
            }
        })
    },

    addUpdateBtnsOnClick() {
        this.ad_updateBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("update-category-modal")).show();

                // Lưu id lại để truy vấn 
                this.id = btn.closest("div").getAttribute("data-id");
                
                const categoryName = btn.closest("div").getAttribute("data-name");
                const imageName = btn.closest("div").getAttribute("data-img");

                this.d_inputName.value = categoryName;
                this.d_inputFile.value = "";
                this.d_imageLabel.setAttribute("src", `/group/${imageName}`);
            })
        })
    }
}

const deletePhanLoaiHandler = {
    id: null,

    d_okBtn: document.querySelector("#delete-category-modal .yes"),
    d_labelName: document.querySelector("#delete-category-modal .category-name"),

    // Getters
    get ad_deleteBtns() {
        return document.querySelectorAll(".delete-category-btn");
    },

    // Methods
    init() {
        // Thêm sự kiện click cho nút Delete 
        this.addDeleteBtnsOnClick();

        // Thêm sự kiện cho nút xác nhận xóa 
        this.d_okBtn.addEventListener("click", async () => {
            const id = this.id;

            const res = await fetch(`/api/phanloais/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            alert(data.message);

            if (data.success) {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-category-modal")).hide();
                categoryPageHandler.renderPagination(data.countPhanLoai);
                categoryPageHandler.refreshCurrentPage();
            }
        })
    },

    addDeleteBtnsOnClick() {
        this.ad_deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                bootstrap.Modal.getOrCreateInstance(document.getElementById("delete-category-modal")).show();
                this.id = btn.closest("div").getAttribute("data-id");
                this.d_labelName.textContent = btn.closest("div").getAttribute("data-name");
            })
        })
    }
}