window.addEventListener("DOMContentLoaded", () => {
    addChangePageProduct();
})

function addChangePageProduct() {
    const pageItemBtns = document.querySelectorAll("#products-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}