//const { response } = require("express");

let menu = document.querySelector('.category')
menu.onclick = function() {
    document.querySelector('.grid_menu').style.display = 'block';
    document.querySelector('.grid_ordered').style.display = 'none';
}

let cart = document.querySelector('.cart_wrapper');
cart.addEventListener('click',function(event){
    if(event.target.closest('.cart_list') == null){
        document.querySelector('.grid_menu').style.display = 'none';
        document.querySelector('.grid_ordered').style.display = 'block';
    }
})

document.querySelector('.btn_view-cart').onclick = function() {
    document.querySelector('.grid_menu').style.display = 'none';
    document.querySelector('.grid_ordered').style.display = 'block';
} 

// Modal pay
const modal = document.querySelector('.modal');

const pay_modal = document.querySelector('.pay_form');
const pay_close_btn = document.querySelector('.close_icon');
const pay_open_btn = document.querySelector('.pay_btn');    

//Open pay modal
pay_open_btn.onclick = function() {
    modal.style.display = 'flex';
    pay_modal.style.display = 'block';
}
//Close pay modal
pay_close_btn.onclick = function() {
    modal.style.display = 'none';
    pay_modal.style.display = 'none';
}

//Close modal
window.onclick = function(event){
    if(event.target == document.querySelector('.modal_overlay')){        
        modal.style.display = 'none';
        pay_modal.style.display = 'none';
        document.querySelector('.detail_product').style.display = 'none';
    }
}

//Hiển thị chi tiết sản phẩm
function detailModal(){        
    const modal = document.querySelector('.modal');
    const detail_modal = document.querySelector('.detail_product');
    const detail_close_btn = document.querySelector('.detail_close_icon');
    const product_item = document.querySelectorAll('.product_item');
    product_item.forEach(element => {
        element.addEventListener('click',async function(){
            const productID = this.id;            

            try{                
                const response = await fetch(`/khachhang/monan/${productID}`);
                                
                if(!response.ok){
                    throw new Error("Lỗi khi tải chi tiết sản phẩm");
                }
                const product = await response.json();

                //Cập nhật nội dung chi tiết sản phẩm
                document.querySelector('.item_name').textContent = product.TenMonAn;
                document.querySelector('.item_description').textContent = product.Mota;
                document.querySelector('.item_price_detail').textContent = product.DonGia + 'đ';
                document.querySelector('.item_img').src = `images/${product.Hinh}`;

                //Chức năng thêm bớt số lượng
                const reduceBtn = document.querySelector('.reduce_btn_detail');
                const addBtn = document.querySelector('.add_btn_detail');
                const quantity = document.querySelector('.item_quantity');
                reduceBtn.onclick = function() {
                    if(parseInt(quantity.value) != 1){
                        quantity.value = parseInt(quantity.value) - 1;
                    }                        
                }
                addBtn.onclick = function() {
                    quantity.value = parseInt(quantity.value) + 1;                       
                }        

                // Open detail product item modal
                modal.style.display = 'flex';        
                detail_modal.style.display = 'flex';
            } catch(error){
                console.error(error.message);
                //alert("Không thể tải chi tiết sản phẩm.");
            }

        });
    });

    //Close detail product item modal
    detail_close_btn.onclick = function(){
        modal.style.display = 'none';
        detail_modal.style.display = 'none';
    }        
}

//Lọc sản phẩm theo danh mục
function renderProduct(product){
    const productList = document.querySelector('.product').querySelector('.grid__row');    
    productList.innerHTML = product
    .map(
        (item) =>
            `<div class="grid__column-2-4 ">                                    
                <div class="product_item" id=${item.MaMonAn}>
                    <div class="product_item_img" style="background-image: url('images/${item.Hinh}');"></div>
                    <h4 class="product_item_name">${item.TenMonAn}</h4>
                    <div class="item_price">
                        <span class="price">${item.DonGia}đ</span>
                    </div>
                </div>   
            </div>`
    )
    .join('');
    detailModal();
}

//Hàm hiển thị trang khi phân trang
function renderPage(currentPage, totalPages,category,priceSort){    
    const currPageDisplay = document.querySelector('.page_current');
    currPageDisplay.textContent = currentPage;    
    const totalPageDisplay = document.querySelector('.total_page');
    totalPageDisplay.textContent = totalPages;
    //Cập nhật trạng thái nút prev
    const prevBtn = document.querySelector('.page_prev');
    if(currentPage == 1){
        prevBtn.disable = true;
        prevBtn.classList.add('page_btn_disable');
    }
    else{
        prevBtn.disable = false;
        prevBtn.classList.remove('page_btn_disable');
        prevBtn.onclick = () => fetchData(category,priceSort,currentPage - 1);
    }
    //Cập nhật trạng thái nút next
    const nextBtn = document.querySelector('.page_next');
    if(currentPage == totalPages){
        nextBtn.disable = true;
        nextBtn.classList.add('page_btn_disable');
    }
    else{
        nextBtn.disable = false;
        nextBtn.classList.remove('page_btn_disable');
        nextBtn.onclick = () => fetchData(category,priceSort,currentPage + 1);
    }
}

//tìm kiếm
function fetchAndSendInput(input){
    fetch(`/khachhang/search?input=${input}`)
    .then(response => response.json())
    .then(data => {
        renderProduct(data);
        document.querySelector('.category_item_active').classList.remove('category_item_active');
        document.querySelector('.select_input_label').textContent = 'Giá';
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
}
function fetchData(category,priceSort,page=1){
    fetch(`/khachhang/category?category=${category}&priceSort=${priceSort}&page=${page}`)
            .then((response) => response.json())
            .then(data => {
                renderProduct(data.product); //Hiển thị danh sách
                renderPage(data.currentPage,data.totalPages,category,priceSort); //Hiển thị trang                
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
}

//Load sản phẩm khi tìm kiếm
function searchProduct(){    
    document.querySelector('.search_input').addEventListener('keydown',function(event) {
        if(event.key == 'Enter'){
            const input = this.value;            
            fetchAndSendInput(input);
        }
    })
    document.querySelector('.search_btn').addEventListener('click',function() {
        const input = document.querySelector('.search_input').value;
        console.log(input);
        fetchAndSendInput(input);
    })
}

//Load sản phẩm khi lọc
function loadFilterProduct(){    
    let category = 'Tất cả';
    let priceSort = 'MaMonAn ASC';
    let currentPage = 1;
    //Lọc theo danh mục
    document.querySelector('.category_list').addEventListener('click',function(event){              
        category = event.target.textContent; 
        const active = document.querySelector('.category_item_active');
        if(active) active.classList.remove('category_item_active');
        event.target.classList.add('category_item_active');                
        fetchData(category,priceSort,currentPage);
    })
    
    //Lọc theo giá
    document.querySelector(".select_input_list").addEventListener('click',function(event) {
        document.querySelector('.select_input_label').textContent = event.target.textContent;
        if(event.target.textContent == 'Giá : Thấp đến cao') priceSort = 'DonGia ASC';
        else if(event.target.textContent == 'Giá : Cao đến thấp') priceSort = 'DonGia DESC';        
        fetchData(category,priceSort,currentPage);
    })
}

async function addToOrder(MaMonAn) {
    const id_order = 1; // Giả sử ID hóa đơn hiện tại là 1
    const soluong = 1; // Mặc định số lượng là 1

    try {
        const response = await fetch('/api/khachhang/order/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_order, MaMonAn, soluong }),
        });

        if (response.ok) {
            alert('Món ăn đã được thêm vào hóa đơn!');
            loadOrderDetails(id_order); // Cập nhật chi tiết hóa đơn
        } else {
            throw new Error('Lỗi khi thêm món vào hóa đơn!');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function loadOrderDetails(id_order) {
    try {
        const orderDetails = await fetch(`/api/khachhang/order/details?id_order=${id_order}`).then(res => res.json());
        const orderContainer = document.querySelector('.grid_ordered .ordered_list');

        if (!orderDetails || orderDetails.length === 0) {
            orderContainer.innerHTML = '<p>Hóa đơn hiện tại không có món ăn nào.</p>';
            return;
        }

        orderContainer.innerHTML = orderDetails.map(item => `
            <div class="ordered_item">
                <img src="images/${item.Hinh}" alt="${item.TenMonAn}" class="ordered_item_img">
                <div class="ordered_item_content">
                    <h5 class="ordered_item_name">${item.TenMonAn}</h5>
                    <div class="ordered_item_price">${item.gia}đ x ${item.soluong}</div>
                    <button class="btn ordered_item_remove" onclick="removeFromOrder(${id_order}, ${item.MaMonAn})">Hủy món</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Lỗi khi tải chi tiết hóa đơn:', error);
    }
}

async function removeFromOrder(id_order, MaMonAn) {
    try {
        const response = await fetch(`/api/khachhang/order/remove/${id_order}/${MaMonAn}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Món ăn đã được xóa khỏi hóa đơn!');
            loadOrderDetails(id_order); // Cập nhật chi tiết hóa đơn
        } else {
            throw new Error('Lỗi khi xóa món khỏi hóa đơn!');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function checkoutOrder() {
    const id_order = 1; // Giả sử ID hóa đơn hiện tại là 1

    try {
        const response = await fetch('/api/khachhang/order/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_order }),
        });

        if (response.ok) {
            alert('Thanh toán thành công!');
            loadOrderDetails(id_order); // Làm mới danh sách chi tiết hóa đơn
        } else {
            throw new Error('Lỗi khi thanh toán!');
        }
    } catch (error) {
        console.error(error.message);
    }
}


//Load danh mục khi mở trang
function fetchAndRenderCategory(){
    // Gọi API lấy dữ liệu danh mục
    fetch("/khachhang/monan")
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".category_list");
        let existItem = [];
        data.forEach(item => {
            if(!existItem.includes(item.DanhMuc)){
                //Tạo cấu trúc html
                const productItem = `<li class="category_item">${item.DanhMuc}</li>`;
                container.innerHTML += productItem;                                                
                existItem.push(item.DanhMuc);                                                    
            }
        });             
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
}

// Tải danh sách món ăn
function loadMenu() {
    fetch('/api/khachhang/monan')
        .then((response) => response.json())
        .then((data) => {
            const menuContainer = document.querySelector('.grid_menu .product .grid__row');
            menuContainer.innerHTML = ''; // Xóa nội dung cũ
            data.forEach((item) => {
                const productHTML = `
                    <div class="product_item">
                        <img src="${item.image_url}" alt="${item.TenMonAn}" class="product_item_img">
                        <h4 class="product_item_name">${item.TenMonAn}</h4>
                        <div class="product_item_price">${item.Gia}đ</div>
                        <button class="btn product_add_btn" onclick="addToOrder(${item.MaMonAn})">Đặt món</button>
                    </div>
                `;
                menuContainer.innerHTML += productHTML;
            });
        })
        .catch((error) => console.error('Lỗi khi tải menu:', error));
}

//Gọi các hàm load
document.addEventListener('DOMContentLoaded',function(){
    fetchAndRenderCategory();    
    loadFilterProduct();
    searchProduct();
    addToOrder();
    loadOrderDetails();
    removeFromOrder();
    checkoutOrder();
    loadMenu()
    fetchData('Tất cả','MaMonAn ASC',1)
});







