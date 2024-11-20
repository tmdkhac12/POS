# POS (Point of Sale)
POS (Point of Sale) là một hệ thống quản lý bán hàng được thiết kế đặc biệt cho các nhà hàng, quán ăn, quán bida,... Với giao diện thân thiện và các tính năng mạnh mẽ, hệ thống này giúp tối ưu hóa quy trình quản lý đơn hàng cũng như quản lý thu chi cho người sử dụng từ đó phục vụ khách hàng và quản lý được tối ưu hóa và hiệu quả hơn.


## Mục lục
- [Giới thiệu](#giới-thiệu)
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)

## Giới thiệu
Hệ thống POS (Point of Sale) của dự án này là một hệ thống quản lý nhà hàng bán thức ăn nhanh, được thiết kế nhằm tối ưu hóa quy trình quản lý đơn hàng và phục vụ khách hàng. Hệ thống cung cấp các giao diện thân thiện và trực quan cho khách hàng, nhân viên và bếp.

## Tính năng chính
- **Đặt món ăn**: Khách hàng sử dụng máy tính bảng để chọn và đặt món một cách nhanh chóng.  
- **Quản lý đơn hàng**: Theo dõi danh sách các món ăn đã đặt, trạng thái thực hiện, và thông tin theo từng bàn.  
- **Phân quyền**:
  - **Khách hàng**: Chỉ có quyền đặt món.  
  - **Nhân viên**: Chỉ có quyền xem trạng thái món ăn.  
  - **Bếp**: Có quyền đánh dấu món ăn là "Đã hoàn thành".  
  - **Admin**: Có quyền xem doanh thu cũng như thống kê doanh thu của nhà hàng, thêm xóa sửa các món ăn. 
- **Giao diện tách biệt**:
  - `fastfoodpos.com/khachhang` dành cho khách hàng.  
  - `fastfoodpos.com/bep` dành cho bếp.  
  - `fastfoodpos.com/nhanvien` dành cho nhân viên. 
  - `fastfoodpos.com/admin` dành cho người quản trị.  
- **Quản lý món ăn**: Chủ nhà hàng có thể thêm, sửa, hoặc xóa món ăn qua giao diện quản trị.

## Công nghệ sử dụng
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 4.  
- **Backend**: Node.js, Express.js.  
- **Ứng dụng**: Web Application.

## Cấu trúc thư mục
```
POS/
├── backend/
│   ├── configs/        # Chứa các files cấu hình cho server và các modules 
│   ├── database/       # Chứa thư các files khởi tạo database 
│   ├── routes/         # Chứa các files định tuyến và API cho các routes 
│   └── .env            # Chứa các biến môi trường cần thiết
│   └── server.js       # File chính tạo server 
├── frontend/
│   ├── admin/          # Chứa giao diện admin 
│   ├── bep/            # Chứa giao diện bếp  
│   ├── nhanvien/       # Chứa giao diện nhân viên
│   ├── khachhang/      # Chứa giao diện khách hàng
├── .env.example 
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```  

## Hướng dẫn cài đặt

### 1. Cài đặt Node.JS
Nếu máy tính của bạn đã có Node.JS, có thể bỏ qua phần này và đến với phần tiếp theo, nếu chưa có thì [cài đặt NodeJS](#https://nodejs.org/en) theo hướng dẫn sau nhé  

### 2. Cài đặt dự án 
Đầu tiên, bạn cần clone repository về máy tính của mình:
```
# Clone dự án 
git clone https://github.com/tmdkhac12/POS.git

# Move vào thư mục dự án 
cd POS

# Cài đặt các thư viện phụ thuộc 
npm install 
```

### 3. Cấu hình file .env
Dự án sử dụng các biến môi trường để lưu trữ thông tin nhạy cảm, do đó tôi không thể public file **_.env_**, vì thế bạn hãy tự cấu hình nó theo hướng dẫn sau nhé:

- Tạo file .env: `cp .env.example ./backend/.env`
- Mở file .env và cấu hình các thông số phù hợp
```
PORT=your_port
DATABASE_URL=your_db_url
```

### 4. Khởi chạy server backend
Chạy lệnh sau để khởi chạy server backend:
```
npm run dev 
```

### 5. Truy cập ứng dụng
Sau khi server khởi động thành công, bạn có thể truy cập ứng dụng qua trình duyệt tại:
`http://localhost:<port>/<frontend_module_name>` (truyền các tham số tương ứng mà bạn đã cấu hình trong .env). Ví dụ trong trường hợp của tôi:  
- Truy cập `http://localhost:3000/nhanvien` để vào giao diện nhân viên.
- Truy cập `http://localhost:3000/khachhang` để vào giao diện khách hàng.
- Truy cập `http://localhost:3000/bep` để vào giao diện của bếp.
- Truy cập `http://localhost:3000/admin` để vào giao diện người quản trị.
