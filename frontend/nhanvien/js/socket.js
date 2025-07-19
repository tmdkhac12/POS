const socket = io({
    auth: {
        tableId: window.location.href.split('/')[5],
        role: "staff"
    }
})

// Nghe sự kiện đặt món của khách hàng 
socket.on("place order", async () => {
    await cartHandler.renderOrders();
})

// Nghe sự kiện cập nhật của bếp 
socket.on("update order", async () => {
    await cartHandler.renderOrders();
})

// Hàm gửi sự kiện 
function sendSocket() {
    socket.emit("update order");
}