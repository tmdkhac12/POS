-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2025 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `ban`
--

CREATE TABLE `ban` (
  `ma_ban` int(11) NOT NULL,
  `ten_ban` varchar(255) DEFAULT NULL,
  `trang_thai` enum('Trống','Có khách') DEFAULT 'Trống',
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ban`
--

INSERT INTO `ban` (`ma_ban`, `ten_ban`, `trang_thai`, `is_deleted`) VALUES
(1, 'Bàn 1', 'Trống', 0),
(2, 'Bàn 2', 'Trống', 0),
(3, 'Bàn 3', 'Trống', 0),
(4, 'Bàn 4', 'Trống', 0),
(5, 'Bàn 5', 'Trống', 0),
(6, 'Bàn 6', 'Có khách', 0),
(7, 'Bàn 7', 'Trống', 0),
(8, 'Bàn 8', 'Trống', 0),
(9, 'Bàn 9', 'Trống', 0),
(10, 'Bàn 10', 'Có khách', 0),
(11, 'Bàn 11', 'Có khách', 0),
(12, 'Bàn 12', 'Trống', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `ma_chi_tiet` int(11) NOT NULL,
  `ma_mon_an` int(11) DEFAULT NULL,
  `ma_hoa_don` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `thanh_tien` double DEFAULT NULL,
  `gia_mon_an` double DEFAULT NULL,
  `thoi_gian_dat` datetime DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currentorder`
--

CREATE TABLE `currentorder` (
  `ma_order` int(11) NOT NULL,
  `ma_mon_an` int(11) DEFAULT NULL,
  `ma_ban` int(11) DEFAULT NULL,
  `don_gia_ap_dung` double DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `thoi_gian_dat` datetime DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL,
  `trang_thai` enum('Đã nhận','Đang chế biến','Hoàn thành') DEFAULT 'Đã nhận'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Mã món ăn, mã bàn có tham chiếu';

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `ma_hoa_don` int(11) NOT NULL,
  `thoi_gian_tao` datetime DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `tien_tich_duoc` double DEFAULT NULL,
  `tien_da_dung` double DEFAULT NULL,
  `hinh_thuc_thanh_toan` enum('Chuyển khoản','Tiền mặt','Thẻ') DEFAULT NULL,
  `ma_khach_hang` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`ma_hoa_don`, `thoi_gian_tao`, `tong_tien`, `tien_tich_duoc`, `tien_da_dung`, `hinh_thuc_thanh_toan`, `ma_khach_hang`) VALUES
(1, '2025-05-01 10:15:00', 120000, 2400, 0, 'Tiền mặt', 1),
(2, '2025-05-02 12:30:00', 85000, 1700, 0, 'Chuyển khoản', 3),
(3, '2025-05-03 15:45:00', 200000, 4000, 10000, 'Thẻ', 5),
(4, '2025-05-04 09:00:00', 95000, 1900, 0, 'Tiền mặt', 2),
(5, '2025-05-05 18:20:00', 150000, 3000, 5000, 'Thẻ', 4),
(6, '2025-05-06 13:10:00', 130000, 2600, 0, 'Chuyển khoản', 6),
(7, '2025-05-07 14:50:00', 175000, 3500, 0, 'Tiền mặt', 7),
(8, '2025-05-08 11:25:00', 220000, 4400, 20000, 'Thẻ', 8),
(9, '2025-05-09 17:40:00', 99000, 1980, 0, 'Tiền mặt', 9),
(10, '2025-05-10 08:30:00', 89000, 1780, 0, 'Chuyển khoản', 10),
(11, '2025-05-11 16:00:00', 145000, 2900, 0, 'Thẻ', 3),
(12, '2025-05-12 10:10:00', 110000, 2200, 0, 'Tiền mặt', 5),
(13, '2025-05-13 19:20:00', 98000, 1960, 0, 'Thẻ', 6),
(14, '2025-05-14 12:00:00', 205000, 4100, 15000, 'Chuyển khoản', 1),
(15, '2025-05-15 13:30:00', 175000, 3500, 0, 'Tiền mặt', 2);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `ma_khach_hang` int(11) NOT NULL,
  `ten_khach_hang` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `tong_chi_tieu` double DEFAULT NULL,
  `tien_tich_luy` double DEFAULT NULL,
  `cap_bac` enum('Đồng','Bạc','Vàng','Kim Cương') DEFAULT 'Đồng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Đồng: 2%, Bạc: 3%, Vàng: 5%, Kim Cương: 7%';

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`ma_khach_hang`, `ten_khach_hang`, `so_dien_thoai`, `tong_chi_tieu`, `tien_tich_luy`, `cap_bac`) VALUES
(1, 'Nguyễn Minh Khoa', '0901234567', 1500000, 30000, 'Đồng'),
(2, 'Trần Ngọc Bích', '0912345678', 3200000, 96000, 'Bạc'),
(3, 'Lê Hoàng Long', '0923456789', 5600000, 280000, 'Vàng'),
(4, 'Phạm Thanh Huyền', '0934567890', 11000000, 770000, 'Kim Cương'),
(5, 'Hoàng Nhật Nam', '0945678901', 800000, 16000, 'Đồng'),
(6, 'Đinh Mai Chi', '0956789012', 2500000, 75000, 'Bạc'),
(7, 'Vũ Đức Thịnh', '0967890123', 4000000, 200000, 'Vàng'),
(8, 'Ngô Khánh Linh', '0978901234', 700000, 14000, 'Đồng'),
(9, 'Bùi Tuấn Kiệt', '0989012345', 10000000, 700000, 'Kim Cương'),
(10, 'Đoàn Ánh Tuyết', '0990123456', 3000000, 90000, 'Bạc');

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `ma_khuyen_mai` int(11) NOT NULL,
  `giam_theo_phan_tram` int(11) DEFAULT NULL,
  `giam_theo_tien` double DEFAULT NULL,
  `ngay_bat_dau` datetime DEFAULT NULL,
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `ten_khuyen_mai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khuyenmai`
--

INSERT INTO `khuyenmai` (`ma_khuyen_mai`, `giam_theo_phan_tram`, `giam_theo_tien`, `ngay_bat_dau`, `ngay_ket_thuc`, `ten_khuyen_mai`) VALUES
(1, 10, NULL, '2025-06-01 00:00:00', '2025-06-10 23:59:59', 'Sinh Nhật 2 Năm'),
(2, NULL, 15000, '2025-06-05 00:00:00', '2025-06-07 23:59:59', 'Flash Sale'),
(3, 5, NULL, '2025-07-01 00:00:00', '2025-07-31 23:59:59', 'Mừng Giáng Sinh'),
(4, NULL, 20000, '2025-08-10 00:00:00', '2025-08-15 23:59:59', 'Giảm Đồ Nướng'),
(5, 20, NULL, '2025-09-01 00:00:00', '2025-09-05 23:59:59', 'Đại Lễ 2/9');

-- --------------------------------------------------------

--
-- Table structure for table `monan`
--

CREATE TABLE `monan` (
  `ma_mon_an` int(11) NOT NULL,
  `ten_mon_an` varchar(255) DEFAULT NULL,
  `don_gia` double DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_nhom` int(11) DEFAULT NULL,
  `ma_khuyen_mai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monan`
--

INSERT INTO `monan` (`ma_mon_an`, `ten_mon_an`, `don_gia`, `hinh_anh`, `ma_nhom`, `ma_khuyen_mai`) VALUES
(1, 'Ramen Teriyaki', 78000, 'ramen_teriyaki.jfif', 1, NULL),
(2, 'Ramen Daidai', 68000, 'ramen_daidai.jpg', 1, NULL),
(3, 'Ramen Aka', 58000, 'ramen_aka.jfif', 1, NULL),
(4, 'Ramen Shiro', 78000, 'ramen_shiro.jpg', 1, NULL),
(5, 'Ramen Kuro', 68000, 'ramen_kuro.png', 1, NULL),
(6, 'Ramen Tonkatsu', 98000, 'ramen_tonkatsu.jpg', 1, NULL),
(7, 'Ramen Cao Cấp', 103000, 'ramen_caocap.jpg', 1, NULL),
(8, 'Cơm Cà Ri Bò', 65000, 'rice_currybeef.jfif', 2, NULL),
(9, 'Cơm Cà Ri Gà', 75000, 'rice_currychicken.png', 2, NULL),
(10, 'Cơm Trứng Cuộn', 55000, 'rice_egg.jfif', 2, NULL),
(11, 'Cơm Bò', 68000, 'rice_gyudon.jfif', 2, NULL),
(12, 'Cơm Ichiban', 78000, 'rice_ichiban.jfif', 2, NULL),
(13, 'Cơm Thịt Heo Chiên Xù ', 78000, 'rice_tonkatsu.jfif', 2, NULL),
(14, 'Tôm Chiên Xù', 88000, 'fried_shrimp.jfif', 3, NULL),
(15, 'Bánh Xèo', 58000, 'banhxeo.jfif', 3, NULL),
(16, 'Takoyaki', 35000, 'takoyaki.jfif', 3, NULL),
(17, 'Trà đá', 10000, 'tra_da.jfif', 4, NULL),
(18, '7up', 25000, '7up.jfif', 4, NULL),
(19, 'Pepsi', 25000, 'pepsi.jfif', 4, NULL),
(20, 'Coca', 25000, 'coca.jfif', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

CREATE TABLE `nhom` (
  `ma_nhom` int(11) NOT NULL,
  `ten_nhom` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhom`
--

INSERT INTO `nhom` (`ma_nhom`, `ten_nhom`, `hinh_anh`, `is_deleted`) VALUES
(1, 'Ramen', 'ramen.jfif', 0),
(2, 'Cơm', 'rice.jfif', 0),
(3, 'Món chiên', 'fried.jfif', 0),
(4, 'Đồ uống', 'juice.avif', 0);

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `ma_tai_khoan` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `hashPassword` varchar(255) DEFAULT NULL,
  `ma_nhom_quyen` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Mã nhóm quyền 1: Admin, 2: Nhân Viên, 3: Bếp';

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`ma_tai_khoan`, `username`, `hashPassword`, `ma_nhom_quyen`) VALUES
(1, 'admin', NULL, 1),
(2, 'nhanvien', NULL, 2),
(3, 'bep', NULL, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ban`
--
ALTER TABLE `ban`
  ADD PRIMARY KEY (`ma_ban`);

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`ma_chi_tiet`),
  ADD KEY `ma_mon_an` (`ma_mon_an`),
  ADD KEY `ma_hoa_don` (`ma_hoa_don`);

--
-- Indexes for table `currentorder`
--
ALTER TABLE `currentorder`
  ADD PRIMARY KEY (`ma_order`),
  ADD KEY `ma_mon_an` (`ma_mon_an`),
  ADD KEY `ma_ban` (`ma_ban`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`ma_hoa_don`),
  ADD KEY `ma_khach_hang` (`ma_khach_hang`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`ma_khach_hang`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`ma_khuyen_mai`);

--
-- Indexes for table `monan`
--
ALTER TABLE `monan`
  ADD PRIMARY KEY (`ma_mon_an`),
  ADD KEY `ma_nhom` (`ma_nhom`),
  ADD KEY `ma_khuyen_mai` (`ma_khuyen_mai`);

--
-- Indexes for table `nhom`
--
ALTER TABLE `nhom`
  ADD PRIMARY KEY (`ma_nhom`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`ma_tai_khoan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ban`
--
ALTER TABLE `ban`
  MODIFY `ma_ban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  MODIFY `ma_chi_tiet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currentorder`
--
ALTER TABLE `currentorder`
  MODIFY `ma_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `ma_hoa_don` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `ma_khach_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `ma_khuyen_mai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `monan`
--
ALTER TABLE `monan`
  MODIFY `ma_mon_an` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `nhom`
--
ALTER TABLE `nhom`
  MODIFY `ma_nhom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `ma_tai_khoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `chitiethoadon_ibfk_1` FOREIGN KEY (`ma_mon_an`) REFERENCES `monan` (`ma_mon_an`),
  ADD CONSTRAINT `chitiethoadon_ibfk_2` FOREIGN KEY (`ma_hoa_don`) REFERENCES `hoadon` (`ma_hoa_don`);

--
-- Constraints for table `currentorder`
--
ALTER TABLE `currentorder`
  ADD CONSTRAINT `currentorder_ibfk_1` FOREIGN KEY (`ma_mon_an`) REFERENCES `monan` (`ma_mon_an`),
  ADD CONSTRAINT `currentorder_ibfk_2` FOREIGN KEY (`ma_ban`) REFERENCES `ban` (`ma_ban`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khachhang` (`ma_khach_hang`);

--
-- Constraints for table `monan`
--
ALTER TABLE `monan`
  ADD CONSTRAINT `monan_ibfk_1` FOREIGN KEY (`ma_nhom`) REFERENCES `nhom` (`ma_nhom`),
  ADD CONSTRAINT `monan_ibfk_2` FOREIGN KEY (`ma_khuyen_mai`) REFERENCES `khuyenmai` (`ma_khuyen_mai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
