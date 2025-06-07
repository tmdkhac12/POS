window.addEventListener("DOMContentLoaded", () => {
    addChangePageStaff();
})

function addChangePageStaff() {
    const pageItemBtns = document.querySelectorAll("#staff-pagination .page-item-btn")
    
    pageItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageItemBtns.forEach(item => {
                item.classList.remove("active");
            })

            btn.classList.add("active");
        })
    })
}