async function updateCardTableStatus(cardTableId) {
    const res = await fetch(`/api/bans/${cardTableId}`);
    const data = await res.json();

    if (data.ban.trang_thai === "Có khách") {
        const tableCard = document.querySelector(`.table-card[data-table-id="${cardTableId}"]`);
        tableCard.setAttribute("data-status", "occupied");
        tableCard.querySelector(".card-text").textContent = "Xem chi tiết";
    }

    return data;
}

function addQuantityControlsEvent(modal) {
    // Lấy các DOM 
    const decreaseBtn = modal.querySelector(".decrease-btn");
    const increaseBtn = modal.querySelector(".increase-btn");
    const input = modal.querySelector("input");

    // Bắt sự kiện không cho user nhập dấu '-'
    const notAllowedKey = ["-", "."];
    input.addEventListener("keydown", (e) => {
        if (notAllowedKey.includes(e.key)) {
            e.preventDefault();
        }
    })

    input.addEventListener("focusout", () => {
        if (input.value === "") {
            input.value = 1;
        }
    })

    decreaseBtn.addEventListener("click", () => {
        if (input.value > 1) {
            input.value--;
        }
    })

    increaseBtn.addEventListener("click", () => {
        input.value++;
    })
}