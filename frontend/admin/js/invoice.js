window.addEventListener("DOMContentLoaded", () => {
    addChangePageInvoice();
})

function addChangePageInvoice() {
    const pageItemBtns = document.querySelectorAll("#invoice-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}