const table1Data = {
    items: [
        { name: "Hamburger", quantity: 4, price: 55000 },
        { name: "Gà Rán", quantity: 2, price: 35000 },
        { name: "Pasta", quantity: 1, price: 90000 },
    ]
}

function showModalForTable(tableData) {
    // Get Shared Modal 
    const sharedModal = document.getElementById("sharedModal");

    // Clear Modal Body & List Food 
    const listGroup = sharedModal.querySelector(".modal-body .list-group");
    listGroup.innerHTML = ``;

    let totalPrice = 0;

    // Duyệt qua từng món ăn của 1 bàn, thêm thông tin từng món ăn vào Modal Body  
    tableData.items.forEach(element => {
        let foodName = element.name;
        let quantity = element.quantity;
        let price = element.price;

        const listGroupItem = document.createElement("li");
        listGroupItem.classList.add("list-group-item", "list-group-item-action");
        listGroupItem.innerHTML = `
            <div class="food-info d-flex justify-content-between">
                <p>${foodName}</p>
                <span class="badge badge-light badge-pill">${quantity}</span>
            </div>
            <div class="price">
                <p class="text-danger font-weight-bolder font-italic">${price.toLocaleString()}</p>
            </div>
        `;

        listGroup.append(listGroupItem);
        totalPrice += price * quantity;
    });

    // Set Total Price 
    const modalFooter = sharedModal.querySelector(".modal-footer");
    modalFooter.innerHTML = `
        <h4>Tổng Tiền: </h4>
        <h4 class="text-danger font-weight-bolder font-italic">${totalPrice.toLocaleString()}</h4>
    `;

    // Open Modal 
    $(sharedModal).modal("show");
}