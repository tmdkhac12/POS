

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
    
}

function loadFilterProduct(){    
    document.querySelector('.category_list').addEventListener('click',function(event){
        const category_all = this.querySelector('.category_item').textContent;        
        const category = event.target.textContent;                        
        fetch(`/khachhang/category?category=${category}&category_all=${category_all}`)
            .then((response) => response.json())
            .then(data => {
                renderProduct(data); //Hiển thị danh sách
            })
            .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
        document.querySelector('.category_item_active').classList.remove('category_item_active');
        event.target.classList.add('category_item_active');                
    })    
}

function fetchAndRenderProducts(){
    // Gọi API lấy dữ liệu món ăn
    fetch("/khachhang/monan")
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".product").querySelector(".grid__row");
        data.forEach(item => {
            //Load món ăn
            const productItem = `
                <div class="grid__column-2-4 ">                                    
                    <div class="product_item" id=${item.MaMonAn}>
                        <div class="product_item_img" style="background-image: url('images/${item.Hinh}');"></div>
                        <h4 class="product_item_name">${item.TenMonAn}</h4>
                        <div class="item_price">
                            <span class="price">${item.DonGia}đ</span>
                        </div>
                    </div>   
                </div>                                                    
            `;
            container.innerHTML += productItem;                                                
        });
        detailModal();
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
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
        loadFilterProduct();
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
}

//Gọi 2 hàm load
document.addEventListener('DOMContentLoaded',function(){
    fetchAndRenderProducts();
    fetchAndRenderCategory();
});







