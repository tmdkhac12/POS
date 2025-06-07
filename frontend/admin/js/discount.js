window.addEventListener("DOMContentLoaded", () => {
    addChangePageDiscount();
})

function addChangePageDiscount() {
    const pageItemBtns = document.querySelectorAll("#discount-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}