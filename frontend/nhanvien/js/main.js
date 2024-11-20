let tableNumber = 1;

function addTableCard() {
    document.write(`
        <div class="col-2">
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between bg-secondary">
                    <p class="card-text m-0 font-weight-light text-white-50">Xem chi tiết</p>
                    <a href="#" class="stretched-link">
                        <i style="font-size:16px" class="fa text-white">&#xf142;</i>
                    </a>
                </div>
                <div class="card-body py-5">
                    <p class="card-text text-center font-weight-bolder">Bàn ${tableNumber}</p>
                </div>
            </div>
        </div>    
    `);

    tableNumber++;
}

function addOnClickCardsEvent() {
    const tableCards = document.querySelectorAll(".card-header a.stretched-link");

    for (let i = 0; i < tableCards.length; i++) {
        tableCards[i].addEventListener("click", function() {
            showModalForTable(table1Data);
        })
    }
}