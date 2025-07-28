window.addEventListener('DOMContentLoaded', () => {
    PaymentHandler.init();
});

const PaymentHandler = {

    d_customerPhoneForm: document.querySelector('#customer-phone'),
    d_paymentInfoForm: document.querySelector('#payment-info'),

    d_customerPhoneInput: document.querySelector('#customer-phone input'),
    d_customerNameInput: document.querySelector('#payment-info .customer-name'),
    d_customerAccuInput: document.querySelector('#payment-info .customer-accu'),
    d_customerUseInput: document.querySelector('#payment-info .customer-use'),

    d_addNewCustomerBtn: document.querySelector('#add-customer-modal .save'),
    
    init() {
        this._addActivePaymentMethods();
        this._addCustomerPhoneInputEvent();
        this._addUseMoneyInputEvent();

        this.addEventDisplayCustomerInfo();
        this.addEventAddNewCustomer();
        this.addPaymentEvent();
    },

    _addActivePaymentMethods() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
            });
        });
    },

    _validateCustomerPhone(phone) {
        const phoneRegex = /^\d{8,20}$/;
        return phoneRegex.test(phone);
    },

    _addCustomerPhoneInputEvent() {
        this.d_customerPhoneInput.addEventListener('input', () => { 
            this.d_customerUseInput.disabled = true;
            this.d_customerUseInput.value = '';
            this.d_customerNameInput.value = '';
            this.d_customerAccuInput.value = '';
        }); 

        this.d_customerPhoneInput.addEventListener("keydown", (e) => {
            const notAllowedKey = ["-", ".", "e"];
            if (notAllowedKey.includes(e.key)) {
                e.preventDefault();
            }
        });
    },

    _addUseMoneyInputEvent() {
        this.d_customerUseInput.addEventListener("input", () => { 
            const total = parseFloat(document.querySelector("p[data-total]").getAttribute("data-total"));
            const accu = parseFloat(this.d_customerAccuInput.getAttribute("data-accu"));

            let usedMoney = parseFloat(this.d_customerUseInput.value) || 0;
            if (usedMoney > accu) {
                alert("Số tiền sử dụng không thể lớn hơn tiền tích lũy");
                usedMoney = accu;
                this.d_customerUseInput.value = accu;
            }

            const paymentMoney = total - usedMoney;
            
            if (paymentMoney > 0) {
                document.querySelector(".discount").textContent = usedMoney.toLocaleString("vi-VN") + "đ";
                document.querySelector(".final-price").textContent = paymentMoney.toLocaleString("vi-VN") + "đ";
            } else {
                document.querySelector(".discount").textContent = total.toLocaleString("vi-VN") + "đ";
                document.querySelector(".final-price").textContent = "0đ";
            }
        });

        this.d_customerUseInput.addEventListener("keydown", (e) => {
            const notAllowedKey = ["-", "."];
            if (notAllowedKey.includes(e.key)) {
                e.preventDefault();
            }
        });
    },

    addEventDisplayCustomerInfo() {
        this.d_customerPhoneForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Lấy giá trị số điện thoại từ input
            const phone = this.d_customerPhoneInput.value;

            // Kiểm tra định dạng số điện thoại
            if (!this._validateCustomerPhone(phone)) {
                alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
                return;
            }

            // Gửi yêu cầu đến API để lấy thông tin khách hàng
            try {
                const response = await fetch(`/api/khachhangs/phone/${phone}`);
                const data = await response.json();

                if (data.success) {
                    // Hiển thị thông tin khách hàng
                    if (data.khachHang) {
                        this.d_customerUseInput.disabled = false;
                        this.d_customerNameInput.value = data.khachHang.ten_khach_hang;
                        this.d_customerAccuInput.value = data.khachHang.tien_tich_luy.toLocaleString("vi-VN");
                        this.d_customerAccuInput.setAttribute("data-accu", data.khachHang.tien_tich_luy);
                    } else {
                        alert("Không tìm thấy khách hàng với số điện thoại này.");
                    }
                } else {
                    alert(data.message || "Đã xảy ra lỗi khi lấy thông tin khách hàng.");
                }
            } catch (error) {
                alert("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        });
    },

    addEventAddNewCustomer() {
        this.d_addNewCustomerBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            // Lấy giá trị từ các input
            const name = document.querySelector('.input-name').value.trim();
            const phone = document.querySelector('.input-phone').value.trim();
            const total = 0;
            const accu = 0;
            const rank = "copper";

            // Kiểm tra các trường bắt buộc
            if (!name || !phone) {
                alert("Vui lòng điền đầy đủ thông tin khách hàng.");
                return;
            }

            // Gửi yêu cầu đến API để thêm khách hàng mới
            try {
                const response = await fetch('/api/khachhangs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, phone, total, accu, rank })
                });
                const data = await response.json();

                alert(data.message);

                if (data.success) {
                    this.d_customerPhoneInput.value = phone;
                    this.d_customerNameInput.value = name;
                    this.d_customerAccuInput.value = accu.toLocaleString("vi-VN");

                    bootstrap.Modal.getInstance(document.querySelector('#add-customer-modal')).hide();
                }
            } catch (error) {
                alert("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        });
    },

    addPaymentEvent() {
        document.querySelector("#payment-btn").addEventListener("click", async () => {
            const tableId = parseInt(window.location.href.split("/")[5]);
            const phone = this.d_customerPhoneInput.value;
            const usedMoney = parseFloat(this.d_customerUseInput.value) || 0;
            const paymentMethod = document.querySelector(".payment-method.selected").getAttribute("data-method");

            const res = await fetch("/api/hoadons/payment", {
                headers: {
                    "Content-Type": "application/json"
                }, 
                method: "POST",
                body: JSON.stringify({ tableId, usedMoney, phone, paymentMethod })
            });
            const data = await res.json();

            alert(data.message);
            if (data.success) {
                sendSocket();
                window.location.href = "/nhanvien";
            }

        })
    }
}