window.addEventListener('DOMContentLoaded', function () {
    NotificationHandler.init();
});

const NotificationHandler = {
    d_supportBtn: document.getElementById('support-btn'),

    init() {
        this._addSupportBtnEvent();
    },

    async sendOrderNotification(tableId) {
        try {
            const res = await fetch(`/api/notification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tableId: tableId,
                    category: "Gọi món",
                })
            });
            const data = await res.json();
            sendNotificationSocket(data.insertedId);
        } catch (error) {
            console.log(error);
        }
    },

    async sendPaymentNotification(tableId) {
        try {
            const res = await fetch(`/api/notification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tableId: tableId,
                    category: "Thanh toán",
                })
            });
            const data = await res.json();

            if (data.success) {
                alert("Đã gửi thông báo, sẽ có nhân viên đến hướng dẫn thanh toán!");
                sendNotificationSocket(data.insertedId);
            } else {
                alert("Lỗi khi gửi thông báo thanh toán. Vui lòng ra quầy thu ngân để thanh toán.");
            }
        } catch (error) {
            alert("Lỗi khi gửi thông báo thanh toán. Vui lòng ra quầy thu ngân để thanh toán.");
        }
    },

    _addSupportBtnEvent() {
        this.d_supportBtn.addEventListener("click", async () => {
            try {
                const tableId = window.location.href.split('/')[5]; // Get table ID from URL

                const notiRes = await fetch(`/api/notification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tableId: tableId,
                        category: "Hỗ trợ"
                    })
                });
                const notiData = await notiRes.json();

                if (notiData.success) {
                    // Thông báo thành công
                    alert("Đã gửi yêu cầu, sẽ có nhân viên đến hỗ trợ bạn!");
                    sendNotificationSocket(notiData.insertedId);
                } else {
                    alert("Lỗi khi gửi yêu cầu hỗ trợ. Vui lòng thử lại sau.");
                }
            } catch (error) {
                alert("Lỗi khi gửi yêu cầu hỗ trợ. Vui lòng thử lại sau.");
            }
        });
    }
};
