-- Active: 1732263881819@@127.0.0.1@3306@pos_quanlynhahang
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
  `ma_qr` varchar(100) DEFAULT NULL,
  `tenban` varchar(100) DEFAULT NULL,
  `trangthai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ban`
--

INSERT INTO `ban` (`id_Ban`, `ma_qr`, `tenban`, `trangthai`) VALUES
(1, 'QR001', 'Ban 1', 'Trong'),
(2, 'QR002', 'Ban 2', 'Co khach'),
(3, 'QR003', 'Ban 3', 'Trong'),
(4, 'QR004', 'Ban 4', 'Co khach'),
(5, 'QR005', 'Ban 5', 'Trong'),
(6, 'QR006', 'Ban 6', 'Co khach'),
(7, 'QR007', 'Ban 7', 'Trong'),
(8, 'QR008', 'Ban 8', 'Co khach'),
(9, 'QR009', 'Ban 9', 'Trong'),
(10, 'QR010', 'Ban 10', 'Co khach');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietorder`
--

CREATE TABLE `chitietorder` (
  `id` int(11) NOT NULL,
  `monan` int(11) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietorder`
--

INSERT INTO `chitietorder` (`id`, `monan`, `soluong`, `gia`) VALUES
(1, 1, 2, 30000.00),
(2, 2, 1, 35000.00),
(3, 3, 3, 20000.00),
(4, 4, 2, 25000.00),
(5, 5, 1, 40000.00),
(6, 6, 2, 30000.00),
(7, 7, 2, 30000.00),
(8, 8, 1, 25000.00),
(9, 9, 4, 10000.00),
(10, 10, 2, 40000.00),
(11, 1, 2, 30000.00),
(12, 2, 1, 35000.00),
(13, 3, 3, 20000.00),
(14, 4, 2, 25000.00),
(15, 5, 1, 40000.00),
(16, 6, 2, 30000.00),
(17, 7, 2, 30000.00),
(18, 8, 1, 25000.00),
(19, 9, 4, 10000.00),
(20, 10, 2, 40000.00);

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
  `Ngay` date DEFAULT NULL
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
  `id_ChiTietHoaDon` int(11) DEFAULT NULL,
  `id_order` int(11) DEFAULT NULL,
  `ChieuKhau` decimal(10,2) DEFAULT NULL,
  `ThanhTien` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`id_HoaDon`, `id_KhachHang`, `id_NhanVien`, `id_ChiTietHoaDon`, `id_order`, `ChieuKhau`, `ThanhTien`) VALUES
(1, 1, 1, NULL, 1, 50000.00, 250000.00),
(2, 2, 2, NULL, 2, 0.00, 350000.00),
(3, 3, 3, NULL, 3, 0.00, 200000.00),
(4, 4, 4, NULL, 4, 0.00, 150000.00),
(5, 5, 5, NULL, 5, 0.00, 250000.00),
(6, 6, 6, NULL, 6, 50000.00, 250000.00),
(7, 7, 7, NULL, 7, 0.00, 400000.00),
(8, 8, 8, NULL, 8, 0.00, 500000.00),
(9, 9, 9, NULL, 9, 0.00, 450000.00),
(10, 10, 10, NULL, 10, 0.00, 350000.00),
(12, 2, 2, NULL, 2, 0.00, 350000.00),
(13, 3, 3, NULL, 3, 0.00, 200000.00),
(14, 4, 4, NULL, 4, 0.00, 150000.00),
(15, 5, 5, NULL, 5, 0.00, 250000.00),
(16, 6, 6, NULL, 6, 50000.00, 250000.00),
(17, 7, 7, NULL, 7, 0.00, 400000.00),
(18, 8, 8, NULL, 8, 0.00, 500000.00),
(19, 9, 9, NULL, 9, 0.00, 450000.00),
(20, 10, 10, NULL, 10, 0.00, 350000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `id_khachhang` int(11) NOT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `Ten` varchar(100) DEFAULT NULL,
  `DiemTichLuy` int(11) DEFAULT NULL
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
  `Hinh` varchar(255) DEFAULT NULL
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
  `ChucVu` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `HoTen`, `NgaySinh`, `DiaChi`, `SDT`, `CCCD`, `ChucVu`) VALUES
(1, 'Nguyen Thi Minh', '1985-04-12', 'Ha Noi', '0903456789', '123456789012', 'Quan ly'),
(2, 'Tran Van Hoa', '1990-01-15', 'Hai Phong', '0905678910', '234567890123', 'Phuc vu'),
(3, 'Le Thi Hong', '1995-08-25', 'Da Nang', '0906789101', '345678901234', 'Bep truong'),
(4, 'Pham Van Kien', '1988-03-10', 'Hue', '0907891011', '456789012345', 'Phuc vu'),
(5, 'Bui Thi Lan', '1992-11-21', 'Can Tho', '0908910112', '567890123456', 'Thu ngan'),
(6, 'Ngo Quoc Tuan', '1996-09-17', 'Quang Nam', '0909101123', '678901234567', 'Phuc vu'),
(7, 'Hoang Van Duong', '1987-07-05', 'Nghe An', '0901123456', '789012345678', 'Quan ly'),
(8, 'Do Thi Mai', '1998-06-18', 'Nam Dinh', '0901234567', '890123456789', 'Thu ngan'),
(9, 'Tran Thi Thao', '1994-04-22', 'Ha Noi', '0902345678', '901234567890', 'Bep truong'),
(10, 'Le Van Phat', '1989-02-02', 'TP HCM', '0903456789', '012345678901', 'Phuc vu'),
(11, 'Nguyen Thi Minh', '1985-04-12', 'Ha Noi', '0903456789', '123456789012', 'Quan ly'),
(12, 'Tran Van Hoa', '1990-01-15', 'Hai Phong', '0905678910', '234567890123', 'Phuc vu'),
(13, 'Le Thi Hong', '1995-08-25', 'Da Nang', '0906789101', '345678901234', 'Bep truong'),
(14, 'Pham Van Kien', '1988-03-10', 'Hue', '0907891011', '456789012345', 'Phuc vu'),
(15, 'Bui Thi Lan', '1992-11-21', 'Can Tho', '0908910112', '567890123456', 'Thu ngan'),
(16, 'Ngo Quoc Tuan', '1996-09-17', 'Quang Nam', '0909101123', '678901234567', 'Phuc vu'),
(17, 'Hoang Van Duong', '1987-07-05', 'Nghe An', '0901123456', '789012345678', 'Quan ly'),
(18, 'Do Thi Mai', '1998-06-18', 'Nam Dinh', '0901234567', '890123456789', 'Thu ngan'),
(19, 'Tran Thi Thao', '1994-04-22', 'Ha Noi', '0902345678', '901234567890', 'Bep truong'),
(20, 'Le Van Phat', '1989-02-02', 'TP HCM', '0903456789', '012345678901', 'Phuc vu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `id_hoadon` int(11) NOT NULL,
  `id_ban` int(11) DEFAULT NULL,
  `trangthai` varchar(50) DEFAULT NULL,
  `tien` decimal(10,2) DEFAULT NULL,
  `thoigiandat` datetime DEFAULT NULL,
  `id_KhachHang` int(11) DEFAULT NULL,
  `thoigianhoantat` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`id_hoadon`, `id_ban`, `trangthai`, `tien`, `thoigiandat`, `id_KhachHang`, `thoigianhoantat`) VALUES
(1, 1, 'Da thanh toan', 300000.00, '2024-10-15 12:30:00', 1, '2024-10-15 13:00:00'),
(2, 2, 'Dang xu ly', 350000.00, '2024-10-16 18:00:00', 2, NULL),
(3, 3, 'Da thanh toan', 200000.00, '2024-10-17 11:45:00', 3, '2024-10-17 12:15:00'),
(4, 4, 'Dang xu ly', 150000.00, '2024-10-18 14:20:00', 4, NULL),
(5, 5, 'Da thanh toan', 250000.00, '2024-10-19 17:00:00', 5, '2024-10-19 17:30:00'),
(6, 6, 'Dang xu ly', 300000.00, '2024-10-20 13:15:00', 6, NULL),
(7, 7, 'Da thanh toan', 400000.00, '2024-10-21 19:00:00', 7, '2024-10-21 19:45:00'),
(8, 8, 'Dang xu ly', 500000.00, '2024-10-22 15:00:00', 8, NULL),
(9, 9, 'Da thanh toan', 450000.00, '2024-10-23 20:30:00', 9, '2024-10-23 21:00:00'),
(10, 10, 'Dang xu ly', 350000.00, '2024-10-24 11:00:00', 10, NULL),
(11, 1, 'Da thanh toan', 300000.00, '2024-10-15 12:30:00', 1, '2024-10-15 13:00:00'),
(12, 2, 'Dang xu ly', 350000.00, '2024-10-16 18:00:00', 2, NULL),
(13, 3, 'Da thanh toan', 200000.00, '2024-10-17 11:45:00', 3, '2024-10-17 12:15:00'),
(14, 4, 'Dang xu ly', 150000.00, '2024-10-18 14:20:00', 4, NULL),
(15, 5, 'Da thanh toan', 250000.00, '2024-10-19 17:00:00', 5, '2024-10-19 17:30:00'),
(16, 6, 'Dang xu ly', 300000.00, '2024-10-20 13:15:00', 6, NULL),
(17, 7, 'Da thanh toan', 400000.00, '2024-10-21 19:00:00', 7, '2024-10-21 19:45:00'),
(18, 8, 'Dang xu ly', 500000.00, '2024-10-22 15:00:00', 8, NULL),
(19, 9, 'Da thanh toan', 450000.00, '2024-10-23 20:30:00', 9, '2024-10-23 21:00:00'),
(20, 10, 'Dang xu ly', 350000.00, '2024-10-24 11:00:00', 10, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ban`
--
ALTER TABLE `ban`
  ADD PRIMARY KEY (`id_Ban`);

--
-- Chỉ mục cho bảng `chitietorder`
--
ALTER TABLE `chitietorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `monan` (`monan`);

--
-- Chỉ mục cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD PRIMARY KEY (`id_Danhgia`),
  ADD KEY `id_Khachhang` (`id_Khachhang`),
  ADD KEY `id_HoaDon` (`id_HoaDon`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id_HoaDon`),
  ADD KEY `id_KhachHang` (`id_KhachHang`),
  ADD KEY `id_NhanVien` (`id_NhanVien`),
  ADD KEY `id_order` (`id_order`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`id_khachhang`);

--
-- Chỉ mục cho bảng `monan`
--
ALTER TABLE `monan`
  ADD PRIMARY KEY (`MaMonAn`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNV`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_hoadon`),
  ADD KEY `id_ban` (`id_ban`),
  ADD KEY `id_KhachHang` (`id_KhachHang`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ban`
--
ALTER TABLE `ban`
  MODIFY `id_Ban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `chitietorder`
--
ALTER TABLE `chitietorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  MODIFY `id_Danhgia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `id_HoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `id_khachhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `monan`
--
ALTER TABLE `monan`
  MODIFY `MaMonAn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `MaNV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `id_hoadon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietorder`
--
ALTER TABLE `chitietorder`
  ADD CONSTRAINT `chitietorder_ibfk_1` FOREIGN KEY (`monan`) REFERENCES `monan` (`MaMonAn`);

--
-- Các ràng buộc cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`id_Khachhang`) REFERENCES `khachhang` (`id_khachhang`),
  ADD CONSTRAINT `danhgia_ibfk_2` FOREIGN KEY (`id_HoaDon`) REFERENCES `hoadon` (`id_HoaDon`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`id_KhachHang`) REFERENCES `khachhang` (`id_khachhang`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`id_NhanVien`) REFERENCES `nhanvien` (`MaNV`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_hoadon`);

--
-- Các ràng buộc cho bảng `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_ban`) REFERENCES `ban` (`id_Ban`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_KhachHang`) REFERENCES `khachhang` (`id_khachhang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
