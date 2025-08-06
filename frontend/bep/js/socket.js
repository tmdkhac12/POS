const socket = io({
    auth: {
        tableId: GLOBAL.tableId,
        role: "kitchen"
    }
})

// Nghe sự kiện cập nhật món của nhân viên 
socket.on("update order", async (tableId) => {
    const currentTableId = GLOBAL.tableId;

    if (currentTableId === tableId) {
        await loadOrdersHandler.renderOrders(currentTableId);
    }

    tableHandler.updateTableStatus(tableId);
    tableHandler.updatePendingStatus(tableId);
})

// Nghe sự kiện chuyển bàn của nhân viên 
socket.on("change table", async (oldTableId, newTableId) => {
    const currentTableId = GLOBAL.tableId;

    if (currentTableId === newTableId || currentTableId === oldTableId) {
        await loadOrdersHandler.renderOrders(currentTableId);
    }

    tableHandler.updateTableStatus(oldTableId);
    tableHandler.updateTableStatus(newTableId);

    tableHandler.updatePendingStatus(oldTableId);
    tableHandler.updatePendingStatus(newTableId);
})

// Nghe sự kiện đặt món của khách hàng 
socket.on("place order", async (tableId) => {
    const currentTableId = GLOBAL.tableId;

    if (currentTableId === tableId) {
        await loadOrdersHandler.renderOrders(currentTableId);
    }

    tableHandler.updateTableStatus(tableId);
    tableHandler.updatePendingStatus(tableId);
})

// Hàm gửi sự kiện 
function sendSocket() {
    const tableId = GLOBAL.tableId;
    socket.emit("update order", tableId);
}

function updateCustomerRoom() {
    const tableId = GLOBAL.tableId;
    socket.emit("change room", tableId);
}