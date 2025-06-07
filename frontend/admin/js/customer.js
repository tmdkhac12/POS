window.addEventListener("DOMContentLoaded", () => {
    addChangePageCustomer();
})

function addChangePageCustomer() {
    const pageItemBtns = document.querySelectorAll("#customer-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}