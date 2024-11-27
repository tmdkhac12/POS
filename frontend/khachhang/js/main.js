let menu = document.querySelector('.category_heading')
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

const detail_modal = document.querySelector('.detail_product');
const detail_close_btn = document.querySelector('.detail_close_icon');

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

// Open detail product item modal
const product_item = document.querySelectorAll('.product_item');
product_item.forEach(element => {
    element.addEventListener('click',function(){
        modal.style.display = 'flex';        
        detail_modal.style.display = 'flex';
    })
});

//Close detail product item modal
detail_close_btn.onclick = function(){
    modal.style.display = 'none';
    detail_modal.style.display = 'none';
}

//Close modal
window.onclick = function(event){
    if(event.target == document.querySelector('.modal_overlay')){        
        modal.style.display = 'none';
        pay_modal.style.display = 'none';
        detail_modal.style.display = 'none';
    }
}





