const socket = io({
    auth: {
        tableId: loadOrdersHandler.tableId,
        role: "kitchen"
    }
})

// Nghe sự kiện cập nhật của nhân viên 
socket.on("update order", async () => {
    await loadOrdersHandler.renderOrders();
})

// Nghe sự kiện đặt món của khách hàng 
socket.on("place order", async () => {
    await loadOrdersHandler.renderOrders();
})

// Hàm gửi sự kiện 
function sendSocket() {
    socket.emit("update order");
}

function updateCustomerRoom() {
    const tableId = loadOrdersHandler.tableId;
    socket.emit("change room", tableId);
}