Chi tiết phương pháp kiến trúc MVC :
    Model (Mô hình dữ liệu):
        + Quản lý logic nghiệp vụ và truy xuất dữ liệu từ cơ sở dữ liệu.
        + Mỗi thực thể trong hệ thống (ví dụ: MonAn, Ban, NhanVien, HoaDon, …) được ánh xạ thành các lớp dữ liệu tương ứng.
        + Chịu trách nhiệm xử lý các tác vụ liên quan đến nghiệp vụ, như lấy danh sách nhân viên, lấy danh sách bàn, hoặc ghi nhận lịch sử giao dịch của khách hàng.
    View (Giao diện người dùng):
        + Hiển thị thông tin tới người dùng thông qua giao diện web app, với các giao diện tương tác được tối ưu hóa cho khách hàng, nhân viên, nhà bếp, và quản lý.
        + Sử dụng công nghệ frontend như HTML, CSS, và JavaScript, tích hợp các framework hiện đại để tăng cường trải nghiệm người dùng.
        + Các thành phần giao diện được thiết kế linh hoạt theo từng nhu cầu của người sử dụng giao diện đó, bao gồm:
        + Giao diện đặt món và giỏ hàng cho khách hàng.
        + Giao diện theo dõi trạng thái bàn, đơn hàng, thanh toán cho nhân viên.
        + Giao diện cập nhật trạng thái món ăn cho nhà bếp.
        + Công cụ thống kê, báo cáo doanh thu và quản lý cửa hàng cho chủ cửa hàng .
    Controller (Bộ điều khiển):
        + Xử lý các yêu cầu từ người dùng, điều phối giữa View và Model.
        + Thực hiện lấy dữ liệu từ Model hiển thị cho View đồng thời đảm nhận thực hiện các tác vụ như nhận thông tin đặt hàng từ khách hàng, cập nhật trạng thái chế biến từ bếp, hoặc xử lý thanh toán từ nhân viên.
        + Controller sẽ giao tiếp với các lớp Service để xử lý nghiệp vụ trước khi trả kết quả cho View.

Mô hình MVC kết hợp cùng các công cụ và công nghệ hỗ trợ như:
    + Frontend: HTML, CSS, JavaScript, React/Angular.
    + Backend: Java (Spring Boot hoặc Framework tương đương), Node.js.
    + Cơ sở dữ liệu: MySQL/PostgreSQL để lưu trữ dữ liệu giao dịch và thông tin người dùng.
    + API giao tiếp: Sử dụng RESTful API để giao tiếp giữa frontend và backend.
Công cụ DevOps: Docker để triển khai container hóa, Git để quản lý mã nguồn, và CI/CD để tích hợp và triển khai liên tục.
giúp cho phần mềm có tính module hóa cao, Dễ dàng thay đổi hoặc nâng cấp một phần mà không ảnh hưởng đến toàn hệ thống, dễ dàng bảo trì, giúp xác định và sửa lỗi nhanh chóng, Làm tăng Khả năng mở rộng của phần mềm, có thể thêm chức năng hoặc cải thiện hiệu năng mà không phải thay đổi cấu trúc hệ thống, Đáp ứng yêu cầu phức tạp: Phù hợp với các yêu cầu nghiệp vụ đa dạng của hệ thống POS
