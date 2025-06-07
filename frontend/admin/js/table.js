window.addEventListener("DOMContentLoaded", () => {
    addChangePageTable();
})

function addChangePageTable() {
    const pageItemBtns = document.querySelectorAll("#table-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}