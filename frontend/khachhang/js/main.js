var menu = document.querySelector('.category_heading')
menu.onclick = function() {
    document.querySelector('.grid_menu').style.display = 'block';
    document.querySelector('.grid_ordered').style.display = 'none';
}

var cart = document.querySelector('.cart_wrapper');
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