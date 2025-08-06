window.addEventListener('DOMContentLoaded', function () {
    NotificationHandler.init();
});

const NotificationHandler = {
    currentPage: 1,
    isLoading: false,
    isEnd: false,

    d_notificationContainer: document.querySelector(".notification-list"),
    d_notificationBtn: document.getElementById('notificationBtn'),
    d_notificationDropdown: document.getElementById('notificationDropdown'),
    d_notificationBadge: document.querySelector('.notification-badge'),
    d_loadingIndicator: document.getElementById('loading'),

    get ad_notificationItems() {
        return document.querySelectorAll(".notification-item");
    },

    init() {
        this._addShowHideNotiBoxEvent();
        this._udpateNotificationsTime();
        this._addInfiniteScroll();
        this.ad_notificationItems.forEach(item => this.addMarkAsReadEvent(item));

        this.updateBadgeCount();
    },

    updateBadgeCount() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        this.d_notificationBadge.textContent = unreadCount;
        if (unreadCount === 0) {
            this.d_notificationBadge.style.display = 'none';
        } else {
            this.d_notificationBadge.style.display = 'flex';
        }
    },

    addMarkAsReadEvent(item) {
        const checkBtn = item.querySelector('.check-btn');
        if (checkBtn.classList.contains('checked')) {
            return; // Already marked as read
        }

        checkBtn.addEventListener("click", async () => {
            const id = parseInt(item.getAttribute("data-id"));

            // Fetch API to update status 
            const res = await fetch(`/api/notification/status/${id}`, {
                method: "PATCH",
            });
            const data = await res.json();

            if (data.success) {
                this.Util.changeCSSAsRead(item, checkBtn);
                this.updateBadgeCount();
            } else {
                alert(data.message || "Lỗi cập nhật thông báo");
            }
        })
    },

    async appendNotification(notificationId) {
        const res = await fetch(`/api/notification/${notificationId}`);
        const data = await res.json();

        if (data.success) {
            const notification = data.notification;
            const li = this.Util.getNotificationHTML(notification);

            this.d_notificationContainer.insertAdjacentHTML('afterbegin', li);
            this.addMarkAsReadEvent(this.d_notificationContainer.firstElementChild);
            this.updateBadgeCount();
        } else {
            alert(data.message || "Lỗi thêm thông báo");
        }
    },

    _addShowHideNotiBoxEvent() {
        // Toggle dropdown on button click
        this.d_notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.d_notificationDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.d_notificationBtn.contains(e.target) && !this.d_notificationDropdown.contains(e.target)) {
                this.d_notificationDropdown.classList.remove('show');
            }
        });
    },

    _udpateNotificationsTime() {
        this.ad_notificationItems.forEach(noti => {
            const notiTime = noti.getAttribute("data-time");
            const timeAgo = this.Util.formatTimeAgo(notiTime);
            noti.querySelector(`.notification-time`).textContent = timeAgo;
        });

        setInterval(() => {
            this.ad_notificationItems.forEach(noti => {
                const notiTime = noti.getAttribute("data-time");
                const timeAgo = this.Util.formatTimeAgo(notiTime);
                noti.querySelector(`.notification-time`).textContent = timeAgo;
            });
        }, 60000);
    },

    _addInfiniteScroll() {
        this.d_notificationContainer.addEventListener('scroll', async () => {
            if (this.isLoading || this.isEnd) {
                return;
            }

            const { scrollTop, scrollHeight, clientHeight } = this.d_notificationContainer;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                // Display loading indicator
                this.isLoading = true;
                this.d_loadingIndicator.style.display = 'block';

                const response = await fetch(`/api/notification?page=${this.currentPage + 1}`);
                const data = await response.json();

                if (data.success && data.notifications.length > 0) {
                    // Append new notifications
                    for (const notification of data.notifications) {
                        const li = this.Util.getNotificationHTML(notification);
                        this.d_loadingIndicator.insertAdjacentHTML('beforebegin', li);
                        this.addMarkAsReadEvent(this.d_loadingIndicator.previousElementSibling);
                    }

                    // Undisplay loading indicator and increase page
                    this.currentPage++;
                    this.isLoading = false;
                    this.d_loadingIndicator.style.display = 'none';
                    this.updateBadgeCount();
                } else {
                    this.isLoading = false;
                    this.d_loadingIndicator.style.display = 'none';

                    this.isEnd = true; // No more notifications to load
                }
            }
        })
    },

    Util: {
        formatTimeAgo(date) {
            const seconds = Math.floor((new Date() - new Date(date)) / 1000);
            if (seconds < 60) return 'Vừa xong';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes} phút trước`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours} giờ trước`;
            return `${Math.floor(hours / 24)} ngày trước`;
        },

        changeCSSAsRead(notiItem, checkBtn) {
            if (notiItem.classList.contains('unread')) {
                notiItem.classList.remove('unread');
                notiItem.classList.add('read');
                checkBtn.classList.add('checked');
            }
        },

        getNotificationHTML(o_notification) {
            return `
                <li class="notification-item ${o_notification.trang_thai === 0 ? "unread" : "read"}" data-id="${o_notification.ma_thong_bao}" data-time="${o_notification.thoi_gian_tao}">
                    <div class="notification-icon ${this.getNotificationTypeClass(o_notification.phan_loai)}">
                        <i class="${this.getNotificationIconClass(o_notification.phan_loai)}"></i>
                    </div>
                    <div class="notification-text">
                        <p class="notification-message">${o_notification.noi_dung}</p>
                        <span class="notification-time">${this.formatTimeAgo(o_notification.thoi_gian_tao)}</span>
                    </div>
                    <button class="check-btn ${o_notification.trang_thai === 1 ? "checked" : ""}">
                        <i class="bi bi-check"></i>
                    </button>
                </li>
            `;
        },

        getNotificationIconClass(type) {
            switch (type) {
                case "Gọi món":
                    return "bi bi-bag";
                case "Thanh toán":
                    return "bi bi-credit-card";
                case "Hỗ trợ":
                    return "bi bi-headset";
                default:
                    return "";
            }
        },

        getNotificationTypeClass(type) {
            switch (type) {
                case "Gọi món":
                    return "order";
                case "Thanh toán":
                    return "payment";
                case "Hỗ trợ":
                    return "support";
                default:
                    return "";
            }
        }
    },
}