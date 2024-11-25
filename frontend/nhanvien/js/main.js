let tableNumber = 1;

function addTableCard(container) {
    // Define a table
    const cardTable = document.createElement("div");
    cardTable.classList.add("col-2");

    // Add table content 
    cardTable.innerHTML = `
        <div class="card shadow-sm" id="${tableNumber}">
            <div class="card-header d-flex justify-content-between">
                <p class="card-text m-0 font-weight-light text-white">Bàn trống</p>
                <a href="/nhanvien/chitiet/${tableNumber}" class="stretched-link">
                    <i style="font-size:16px" class="fa text-white">&#xf142;</i>
                </a>
            </div>
            <div class="card-body py-5">
                <p class="card-text text-center font-weight-bolder text-white">Bàn ${tableNumber}</p>
            </div>
        </div>
    `;

    // Append it to container 
    container.append(cardTable);
    tableNumber++;
}

function addTableCards(number) {
    // Find tables container element 
    const tablesContainer = document.querySelector(".container-fluid .row");

    // Add each table into container 
    for (let i = 0; i < number; i++) {
        addTableCard(tablesContainer);        
    }
}
