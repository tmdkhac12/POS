const socket = io({
    auth: {
        tableId: window.location.href.split('/')[5],
        role: "staff"
    }
})

// Nghe sự kiện đặt món của khách hàng 
socket.on("place order", async (tableId) => {
    if (window.location.pathname === "/nhanvien/") {
        const data = await tableHandler.updateCardTableStatus(tableId);
        alert(`${data.ban.ten_ban} vừa gọi món`);
    } else {
        const currentId = window.location.href.split('/')[5];
        if (currentId === tableId) {
            await cartHandler.renderOrders();
        }
    }
})

// Nghe sự kiện cập nhật của bếp 
socket.on("update order", async (tableId) => {
    if (window.location.pathname === "/nhanvien/") {
        const data = await tableHandler.updateCardTableStatus(tableId);
        alert(`Món ăn ở ${data.ban.ten_ban} vừa được bếp cập nhật trạng thái`);
    } else {
        const currentId = window.location.href.split('/')[5];
        if (currentId === tableId) {
            await cartHandler.renderOrders();
        }
    }
})

// Hàm gửi sự kiện 
function sendSocket() {
    const tableId = window.location.href.split('/')[5];
    socket.emit("update order", tableId);
}

function sendChangeTableSocket(oldId, newId) {
    socket.emit("change table", oldId, newId);
}