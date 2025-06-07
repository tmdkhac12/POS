window.addEventListener("DOMContentLoaded", () => {
    addChangePageCategory();
})

function addChangePageCategory() {
    const pageItemBtns = document.querySelectorAll("#category-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}