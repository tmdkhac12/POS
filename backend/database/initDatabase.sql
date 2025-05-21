-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2025 at 05:14 PM
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
  `trang_thai` enum('Trống','Có khách') DEFAULT 'Trống'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ban`
--

INSERT INTO `ban` (`ma_ban`, `ten_ban`, `trang_thai`) VALUES
(1, 'Bàn 1', 'Trống'),
(2, 'Bàn 2', 'Trống'),
(3, 'Bàn 3', 'Trống'),
(4, 'Bàn 4', 'Trống'),
(5, 'Bàn 5', 'Trống'),
(6, 'Bàn 6', 'Có khách'),
(7, 'Bàn 7', 'Trống'),
(8, 'Bàn 8', 'Trống'),
(9, 'Bàn 9', 'Trống'),
(10, 'Bàn 10', 'Có khách'),
(11, 'Bàn 11', 'Có khách');

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `ma_mon_an` int(11) NOT NULL,
  `ma_hoa_don` int(11) NOT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `gia_mon_an` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currentorder`
--

CREATE TABLE `currentorder` (
  `ma_mon_an` int(11) NOT NULL,
  `ma_ban` int(11) NOT NULL,
  `ten_mon_an` varchar(255) DEFAULT NULL,
  `don_gia` double DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `trang_thai` enum('Đã nhận','Đang chế biến','Hoàn thành') DEFAULT NULL
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
  `cap_bac` enum('Đồng','Bạc','Vàng','Kim Cương') DEFAULT NULL
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
  `ngay_ket_thuc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Khoai Tây Chiên', 20000, 'khoai_tay_chien.jpg', 1, NULL),
(2, 'Gà Rán Miếng', 30000, 'ga_ran_mieng.jpg', 1, NULL),
(3, 'Cánh Gà Chiên Nước Mắm', 35000, 'canh_ga_nuocmam.jpg', 1, NULL),
(4, 'Khoai Lang Chiên', 25000, 'khoai_lang_chien.jpg', 1, NULL),
(5, 'Nem Chiên', 30000, 'nem_chien.jpg', 1, NULL),
(6, 'Gà Xiên Nướng', 40000, 'ga_xien_nuong.jpg', 2, NULL),
(7, 'Bò Nướng Sa Tế', 50000, 'bo_nuong_sa_te.jpg', 2, NULL),
(8, 'Tôm Nướng Muối Ớt', 45000, 'tom_nuong_muoi_ot.jpg', 2, NULL),
(9, 'Rib BBQ Nướng', 55000, 'rib_bbq_nuong.jpg', 2, NULL),
(10, 'Rau Củ Nướng', 30000, 'rau_cu_nuong.jpg', 2, NULL),
(11, 'Coca-Cola Chai', 15000, 'coca_cola_chai.jpg', 3, NULL),
(12, 'Pepsi Lon', 15000, 'pepsi_lon.jpg', 3, NULL),
(13, 'Trà Đá', 10000, 'tra_da.jpg', 3, NULL),
(14, 'Nước Ép Cam', 20000, 'nuoc_ep_cam.jpg', 3, NULL),
(15, 'Sinh Tố Bơ', 25000, 'sinh_to_bo.jpg', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

CREATE TABLE `nhom` (
  `ma_nhom` int(11) NOT NULL,
  `ten_nhom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhom`
--

INSERT INTO `nhom` (`ma_nhom`, `ten_nhom`) VALUES
(1, 'Đồ Chiên'),
(2, 'Đồ Nướng'),
(3, 'Nước Ngọt');

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
  ADD PRIMARY KEY (`ma_hoa_don`,`ma_mon_an`),
  ADD KEY `ma_mon_an` (`ma_mon_an`);

--
-- Indexes for table `currentorder`
--
ALTER TABLE `currentorder`
  ADD PRIMARY KEY (`ma_ban`,`ma_mon_an`);

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
  MODIFY `ma_ban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `ma_hoa_don` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `ma_khach_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `ma_khuyen_mai` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `monan`
--
ALTER TABLE `monan`
  MODIFY `ma_mon_an` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `nhom`
--
ALTER TABLE `nhom`
  MODIFY `ma_nhom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `ma_tai_khoan` int(11) NOT NULL AUTO_INCREMENT;

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
