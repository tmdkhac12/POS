const socket = io({
    auth: {
        tableId: window.location.href.split('/')[5],
        role: "customer"
    }
})

// Nghe sự kiện cập nhật của nhân viên và bếp 
socket.on("update order", async () => {
    await orderedCartHandler.renderOrders();
})

// Nghe sự kiện chuyển bàn của nhân viên 
socket.on("change table", async () => {
    await orderedCartHandler.renderOrders();
})

// Hàm gửi sự kiện 
function placeOrder() {
    const tableId = window.location.href.split('/')[5];
    socket.emit("place order", tableId);
}