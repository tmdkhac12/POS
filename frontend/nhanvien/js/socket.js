const socket = io({
    auth: {
        tableId: window.location.href.split('/')[5],
        role: "staff"
    }
})

// Nghe sự kiện đặt món của khách hàng 
socket.on("place order", async (tableId) => {
    if (window.location.pathname === "/nhanvien/") {
        await updateCardTableStatus(tableId);
    } else {
        const currentId = window.location.href.split('/')[5];
        if (currentId === tableId) {
            await cartHandler.renderOrders();
        }
    }
})

// Nghe sự kiện cập nhật của bếp 
socket.on("update order", async (tableId) => {
    if (window.location.pathname !== "/nhanvien/") {
        const currentId = window.location.href.split('/')[5];
        if (currentId === tableId) {
            await cartHandler.renderOrders();
        }
    }
})

socket.on("payment", async (notificationId) => {
    await NotificationHandler.appendNotification(notificationId);
})

socket.on("notification", async (notificationId) => {
    await NotificationHandler.appendNotification(notificationId);
});

// Hàm gửi sự kiện 
function sendSocket() {
    const tableId = window.location.href.split('/')[5];
    socket.emit("update order", tableId);
}

function sendChangeTableSocket(oldId, newId) {
    socket.emit("change table", oldId, newId);
}