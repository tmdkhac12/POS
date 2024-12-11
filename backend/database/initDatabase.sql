-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 02, 2024 lúc 04:31 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlynhahang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ban`
--

CREATE TABLE `ban` (
  `id_Ban` int(11) NOT NULL,
  `tenban` varchar(100) DEFAULT NULL,
  `trangthai` ENUM('Trong', 'Co khach') DEFAULT 'Trong',
  PRIMARY KEY (`id_Ban`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ban`
--

INSERT INTO `ban` (`id_Ban`, `tenban`, `trangthai`) VALUES
(1, 'Ban 1', 'Trong'),
(2, 'Ban 2', 'Co khach'),
(3, 'Ban 3', 'Trong'),
(4, 'Ban 4', 'Co khach'),
(5, 'Ban 5', 'Trong'),
(6, 'Ban 6', 'Co khach'),
(7, 'Ban 7', 'Trong'),
(8, 'Ban 8', 'Co khach'),
(9, 'Ban 9', 'Trong'),
(10, 'Ban 10', 'Co khach'),
(11, 'Ban 11', 'Trong'),
(12, 'Ban 12', 'Co khach'),
(13, 'Ban 13', 'Trong'),
(14, 'Ban 14', 'Co khach'),
(15, 'Ban 15', 'Trong'),
(16, 'Ban 16', 'Co khach'),
(17, 'Ban 17', 'Trong'),
(18, 'Ban 18', 'Co khach'),
(19, 'Ban 19', 'Trong'),
(20, 'Ban 20', 'Co khach'),
(21, 'Ban 21', 'Trong'),
(22, 'Ban 22', 'Co khach'),
(23, 'Ban 23', 'Trong'),
(24, 'Ban 24', 'Co khach');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhgia`
--

CREATE TABLE `danhgia` (
  `id_Khachhang` int(11) DEFAULT NULL,
  `id_Danhgia` int(11) NOT NULL,
  `id_HoaDon` int(11) DEFAULT NULL,
  `DiemDanhGia` int(11) DEFAULT NULL,
  `BinhLuan` text DEFAULT NULL,
  `Ngay` date DEFAULT NULL,
  PRIMARY KEY (`id_Danhgia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `danhgia`
--

INSERT INTO `danhgia` (`id_Khachhang`, `id_Danhgia`, `id_HoaDon`, `DiemDanhGia`, `BinhLuan`, `Ngay`) VALUES
(1, 1, 1, 5, 'Rat tot', '2024-10-15'),
(2, 2, 2, 4, 'Chat luong', '2024-10-16'),
(3, 3, 3, 3, 'Tam on', '2024-10-17'),
(4, 4, 4, 5, 'Xuat sac', '2024-10-18'),
(5, 5, 5, 4, 'Ngon', '2024-10-19'),
(6, 6, 6, 5, 'Ngon', '2024-10-20'),
(7, 7, 7, 3, 'Binh thuong', '2024-10-21'),
(8, 8, 8, 2, 'Khong ngon', '2024-10-22'),
(9, 9, 9, 5, 'Ngon', '2024-09-12'),
(10, 10, 10, 1, 'Nhan vien thai do', '2024-11-02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `id_HoaDon` int(11) NOT NULL,
  `id_KhachHang` int(11) DEFAULT NULL,
  `id_NhanVien` int(11) DEFAULT NULL,
  `id_order` int(11) DEFAULT NULL,
  `ChieuKhau` decimal(10,2) DEFAULT NULL,
  `ThanhTien` decimal(10,2) DEFAULT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `TrangThaiThanhToan` ENUM('da thanh toan', 'chua thanh toan') DEFAULT 'chua thanh toan',
  PRIMARY KEY (`id_HoaDon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`id_HoaDon`, `id_KhachHang`, `id_NhanVien`, `id_order`, `ChieuKhau`, `ThanhTien`, `TongTien`, `TrangThaiThanhToan`) VALUES
(1, 1, 1, 1, 5000.00, 50000.00, 45000.00, 'da thanh toan'),
(2, 2, 2, 2, 7000.00, 70000.00, 63000.00, 'chua thanh toan'),
(3, 3, 3, 3, 10000.00, 100000.00, 90000.00, 'da thanh toan'),
(4, 4, 4, 4, 8000.00, 80000.00, 72000.00, 'chua thanh toan'),
(5, 5, 5, 5, 6000.00, 60000.00, 54000.00, 'da thanh toan'),
(6, 6, 6, 6, 9000.00, 90000.00, 81000.00, 'chua thanh toan'),
(7, 7, 7, 7, 5000.00, 50000.00, 45000.00, 'da thanh toan'),
(8, 8, 8, 8, 7000.00, 70000.00, 63000.00, 'chua thanh toan'),
(9, 9, 9, 9, 10000.00, 100000.00, 90000.00, 'da thanh toan'),
(10, 10, 10, 10, 8000.00, 80000.00, 72000.00, 'chua thanh toan'),
(11, 11, 11, 11, 6000.00, 60000.00, 54000.00, 'da thanh toan'),
(12, 12, 12, 12, 9000.00, 90000.00, 81000.00, 'chua thanh toan'),
(13, 13, 13, 13, 5000.00, 50000.00, 45000.00, 'da thanh toan'),
(14, 14, 14, 14, 7000.00, 70000.00, 63000.00, 'chua thanh toan'),
(15, 15, 15, 15, 10000.00, 100000.00, 90000.00, 'da thanh toan'),
(16, 16, 16, 16, 8000.00, 80000.00, 72000.00, 'chua thanh toan'),
(17, 17, 17, 17, 6000.00, 60000.00, 54000.00, 'da thanh toan'),
(18, 18, 18, 18, 9000.00, 90000.00, 81000.00, 'chua thanh toan'),
(19, 19, 19, 19, 5000.00, 50000.00, 45000.00, 'da thanh toan'),
(20, 20, 20, 20, 7000.00, 70000.00, 63000.00, 'chua thanh toan');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `id_khachhang` int(11) NOT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `Ten` varchar(100) DEFAULT NULL,
  `DiemTichLuy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_khachhang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`id_khachhang`, `SDT`, `Ten`, `DiemTichLuy`) VALUES
(1, '0901234567', 'Nguyen Van A', 100),
(2, '0902234567', 'Le Thi B', 200),
(3, '0903234567', 'Tran Van C', 150),
(4, '0904234567', 'Pham Thi D', 50),
(5, '0905234567', 'Hoang Van E', 75),
(6, '0906234567', 'Bui Thi F', 120),
(7, '0907234567', 'Do Van G', 90),
(8, '0908234567', 'Phan Thi H', 110),
(9, '0909234567', 'Ngo Van I', 160),
(10, '0910234567', 'Vu Thi J', 140),
(11, '0901234567', 'Nguyen Van A', 100),
(12, '0902234567', 'Le Thi B', 200),
(13, '0903234567', 'Tran Van C', 150),
(14, '0904234567', 'Pham Thi D', 50),
(15, '0905234567', 'Hoang Van E', 75),
(16, '0906234567', 'Bui Thi F', 120),
(17, '0907234567', 'Do Van G', 90),
(18, '0908234567', 'Phan Thi H', 110),
(19, '0909234567', 'Ngo Van I', 160),
(20, '0910234567', 'Vu Thi J', 140);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monan`
--

CREATE TABLE `monan` (
  `MaMonAn` int(11) NOT NULL,
  `TenMonAn` varchar(100) DEFAULT NULL,
  `DonViTinh` varchar(20) DEFAULT NULL,
  `DonGia` decimal(10,2) DEFAULT NULL,
  `Mota` text DEFAULT NULL,
  `DanhMuc` varchar(50) DEFAULT NULL,
  `Hinh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MaMonAn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `monan`
--

INSERT INTO `monan` (`MaMonAn`, `TenMonAn`, `DonViTinh`, `DonGia`, `Mota`, `DanhMuc`, `Hinh`) VALUES
(1, 'Pho', 'To', 30000.00, 'Pho bo', 'Mon chinh', 'pho.jpg'),
(2, 'Bun Cha', 'To', 35000.00, 'Bun cha nuong', 'Mon chinh', 'buncha.jpg'),
(3, 'Ca phe', 'Ly', 20000.00, 'Ca phe den', 'Do uong', 'cafe.jpg'),
(4, 'Tra Dao', 'Ly', 25000.00, 'Tra dao tuoi', 'Do uong', 'tradao.jpg'),
(5, 'Nem Ran', 'Phan', 40000.00, 'Nem ran ha noi', 'Khai vi', 'nemran.jpg'),
(6, 'Chao Ga', 'To', 30000.00, 'Chao ga', 'Mon chinh', 'chaoga.jpg'),
(7, 'Tra Sua', 'Ly', 30000.00, 'Tra sua tran chau', 'Do uong', 'trasua.jpg'),
(8, 'Salad', 'Dia', 25000.00, 'Salad rau', 'Khai vi', 'salad.jpg'),
(9, 'Nuoc Ngot', 'Chai', 10000.00, 'Nuoc ngot cac loai', 'Do uong', 'nuocngot.jpg'),
(10, 'Com Tam', 'Dia', 40000.00, 'Com tam suon bi', 'Mon chinh', 'comtam.jpg'),
(11, 'Pho', 'To', 30000.00, 'Pho bo', 'Mon chinh', 'pho.jpg'),
(12, 'Bun Cha', 'To', 35000.00, 'Bun cha nuong', 'Mon chinh', 'buncha.jpg'),
(13, 'Ca phe', 'Ly', 20000.00, 'Ca phe den', 'Do uong', 'cafe.jpg'),
(14, 'Tra Dao', 'Ly', 25000.00, 'Tra dao tuoi', 'Do uong', 'tradao.jpg'),
(15, 'Nem Ran', 'Phan', 40000.00, 'Nem ran ha noi', 'Khai vi', 'nemran.jpg'),
(16, 'Chao Ga', 'To', 30000.00, 'Chao ga', 'Mon chinh', 'chaoga.jpg'),
(17, 'Tra Sua', 'Ly', 30000.00, 'Tra sua tran chau', 'Do uong', 'trasua.jpg'),
(18, 'Salad', 'Dia', 25000.00, 'Salad rau', 'Khai vi', 'salad.jpg'),
(19, 'Nuoc Ngot', 'Chai', 10000.00, 'Nuoc ngot cac loai', 'Do uong', 'nuocngot.jpg'),
(20, 'Com Tam', 'Dia', 40000.00, 'Com tam suon bi', 'Mon chinh', 'comtam.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNV` int(11) NOT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `CCCD` varchar(12) DEFAULT NULL,
  `ChucVu` ENUM('nhanvien', 'bep', 'admin') DEFAULT 'nhanvien',
  PRIMARY KEY (`MaNV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `HoTen`, `NgaySinh`, `DiaChi`, `SDT`, `CCCD`, `ChucVu`) VALUES
(1, 'Nguyen Thi Minh', '1985-04-12', 'Ha Noi', '0903456789', '123456789012', 'admin'),
(2, 'Tran Van Hoa', '1990-01-15', 'Hai Phong', '0905678910', '234567890123', 'nhanvien'),
(3, 'Le Thi Hong', '1995-08-25', 'Da Nang', '0906789101', '345678901234', 'bep'),
(4, 'Pham Van Kien', '1988-03-10', 'Hue', '0907891011', '456789012345', 'nhanvien'),
(5, 'Bui Thi Lan', '1992-11-21', 'Can Tho', '0908910112', '567890123456', 'nhanvien'),
(6, 'Ngo Quoc Tuan', '1996-09-17', 'Quang Nam', '0909101123', '678901234567', 'nhanvien'),
(7, 'Hoang Van Duong', '1987-07-05', 'Nghe An', '0901123456', '789012345678', 'nhanvien'),
(8, 'Do Thi Mai', '1998-06-18', 'Nam Dinh', '0901234567', '890123456789', 'nhanvien'),
(9, 'Tran Thi Thao', '1994-04-22', 'Ha Noi', '0902345678', '901234567890', 'bep'),
(10, 'Le Van Phat', '1989-02-02', 'TP HCM', '0903456789', '012345678901', 'nhanvien'),
(11, 'Nguyen Van Nam', '1985-04-12', 'Ha Noi', '0903456789', '123456789013', 'nhanvien'),
(12, 'Tran Thi Huong', '1990-01-15', 'Hai Phong', '0905678910', '234567890124', 'nhanvien'),
(13, 'Le Van Tuan', '1995-08-25', 'Da Nang', '0906789101', '345678901235', 'bep'),
(14, 'Pham Thi Mai', '1988-03-10', 'Hue', '0907891011', '456789012346', 'nhanvien'),
(15, 'Bui Van Duc', '1992-11-21', 'Can Tho', '0908910112', '567890123457', 'nhanvien'),
(16, 'Ngo Thi Lan', '1996-09-17', 'Quang Nam', '0909101123', '678901234568', 'nhanvien'),
(17, 'Hoang Thi Nga', '1987-07-05', 'Nghe An', '0901123456', '789012345679', 'bep'),
(18, 'Do Van Hung', '1998-06-18', 'Nam Dinh', '0901234567', '890123456780', 'nhanvien'),
(19, 'Tran Van Binh', '1994-04-22', 'Ha Noi', '0902345678', '901234567891', 'nhanvien'),
(20, 'Le Thi Hoa', '1989-02-02', 'TP HCM', '0903456789', '012345678902', 'nhanvien');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `id_ban` int(11) DEFAULT NULL,
  `trangthai` ENUM('da dat', 'da huy', 'da xac nhan', 'da xong') DEFAULT NULL,
  `tien` decimal(10,2) DEFAULT NULL,
  `thoigiandat` datetime DEFAULT NULL,
  `id_KhachHang` int(11) DEFAULT NULL,
  `thoigianhoantat` datetime DEFAULT NULL,
  PRIMARY KEY (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`id_order`, `id_ban`, `trangthai`, `tien`, `thoigiandat`, `id_KhachHang`, `thoigianhoantat`) VALUES
(1, 1, 'da xong', 300000.00, '2024-10-15 12:30:00', 1, '2024-10-15 13:00:00'),
(2, 2, 'da xac nhan', 350000.00, '2024-10-16 18:00:00', 2, NULL),
(3, 3, 'da xong', 200000.00, '2024-10-17 11:45:00', 3, '2024-10-17 12:15:00'),
(4, 4, 'da dat', 150000.00, '2024-10-18 14:20:00', 4, NULL),
(5, 5, 'da xong', 250000.00, '2024-10-19 17:00:00', 5, '2024-10-19 17:30:00'),
(6, 6, 'da xac nhan', 300000.00, '2024-10-20 13:15:00', 6, NULL),
(7, 7, 'da xong', 400000.00, '2024-10-21 19:00:00', 7, '2024-10-21 19:45:00'),
(8, 8, 'da dat', 500000.00, '2024-10-22 15:00:00', 8, NULL),
(9, 9, 'da xong', 450000.00, '2024-10-23 20:30:00', 9, '2024-10-23 21:00:00'),
(10, 10, 'da huy', 350000.00, '2024-10-24 11:00:00', 10, '2024-10-24 11:15:00'),
(11, 3, 'da xong', 275000.00, '2024-10-25 09:30:00', 11, '2024-10-25 10:15:00'),
(12, 5, 'da huy', 420000.00, '2024-10-25 12:45:00', 12, '2024-10-25 13:00:00'),
(13, 7, 'da xong', 380000.00, '2024-10-25 15:20:00', 13, '2024-10-25 16:00:00'),
(14, 2, 'da xac nhan', 195000.00, '2024-10-25 18:30:00', 14, NULL),
(15, 8, 'da dat', 290000.00, '2024-10-26 11:00:00', 15, NULL),
(16, 4, 'da xong', 445000.00, '2024-10-26 13:15:00', 16, '2024-10-26 14:00:00'),
(17, 1, 'da huy', 180000.00, '2024-10-26 16:45:00', 17, '2024-10-26 16:50:00'),
(18, 9, 'da xong', 520000.00, '2024-10-26 19:30:00', 18, '2024-10-26 20:15:00'),
(19, 6, 'da xac nhan', 310000.00, '2024-10-27 12:00:00', 19, NULL),
(20, 10, 'da dat', 265000.00, '2024-10-27 14:30:00', 20, NULL);

--
-- Cấu trúc bảng cho bảng `chitietorder`
--

CREATE TABLE `chitietorder` (
  `id` int(11) NOT NULL,
  `id_order` int(11) DEFAULT NULL,
  `MaMonan` int(11) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietorder`
--

INSERT INTO `chitietorder` (`id`, `id_order`, `MaMonan`, `soluong`, `gia`) VALUES
(1, 1, 1, 2, 30000.00),
(2, 2, 2, 1, 35000.00),
(3, 3, 3, 3, 20000.00),
(4, 4, 4, 2, 25000.00),
(5, 5, 5, 1, 40000.00),
(6, 6, 6, 2, 30000.00),
(7, 7, 7, 2, 30000.00),
(8, 8, 8, 1, 25000.00),
(9, 9, 9, 4, 10000.00),
(10, 10, 10, 2, 40000.00),
(11, 1, 1, 2, 30000.00),
(12, 2, 2, 1, 35000.00),
(13, 3, 3, 3, 20000.00),
(14, 4, 4, 2, 25000.00),
(15, 5, 5, 1, 40000.00),
(16, 6, 6, 2, 30000.00),
(17, 7, 7, 2, 30000.00),
(18, 8, 8, 1, 25000.00),
(19, 9, 9, 4, 10000.00),
(20, 10, 10, 2, 40000.00);

-- --------------------------------------------------------

-- Thêm các ràng buộc khóa ngoại
ALTER TABLE `danhgia`
ADD FOREIGN KEY (`id_Khachhang`) REFERENCES `khachhang` (`id_khachhang`),
ADD FOREIGN KEY (`id_HoaDon`) REFERENCES `hoadon` (`id_HoaDon`);

ALTER TABLE `hoadon`
ADD FOREIGN KEY (`id_KhachHang`) REFERENCES `khachhang` (`id_khachhang`),
ADD FOREIGN KEY (`id_NhanVien`) REFERENCES `nhanvien` (`MaNV`),
ADD FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`);

ALTER TABLE `order`
ADD FOREIGN KEY (`id_ban`) REFERENCES `ban` (`id_Ban`),
ADD FOREIGN KEY (`id_KhachHang`) REFERENCES `khachhang` (`id_khachhang`);

ALTER TABLE `chitietorder`
ADD FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`),
ADD FOREIGN KEY (`MaMonan`) REFERENCES `monan` (`MaMonAn`);
