const path = require("path");
const connection = require("../configs/connection");
const { get } = require("http");
const multer = require("multer");

const getHomePage = function (req, res) {
  res.sendFile(path.join(__dirname, "../../frontend/admin/abc.html"));
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Tạo tên file duy nhất
  },
});
const upload = multer({ storage });
const getAllProduct = function (req, res) {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Mỗi trang sẽ hiển thị 10 sản phẩm
  const offset = (page - 1) * limit; // Tính toán offset

  // Truy vấn để lấy các sản phẩm theo limit, offset và sắp xếp theo MaMonAn
  const query = `SELECT * FROM monan ORDER BY MaMonAn LIMIT ? OFFSET ?`;
  connection.query(query, [limit, offset], (err, result) => {
    if (err) {
      console.log("Error fetching data: ", err);
      return res.status(500).send("Server Error");
    }

    // Truy vấn để lấy tổng số sản phẩm từ bảng (COUNT)
    connection.query(
      "SELECT COUNT(*) AS total FROM monan",
      (err, countResult) => {
        if (err) {
          console.log("Error fetching total count: ", err);
          return res.status(500).send("Server Error");
        }

        const totalProducts = countResult[0].total; // Lấy tổng số sản phẩm
        const totalPages = Math.ceil(totalProducts / limit); // Tính tổng số trang
        console.log("Total products: ", totalProducts);
        console.log(result);

        // Trả về dữ liệu cho client (EJS view)
        res.render("admin/sanpham", {
          products: result,
          currentPage: page,
          totalPages: totalPages,
        });
      }
    );
  });
};
const addProduct = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res
        .status(500)
        .json({ success: false, message: "Upload thất bại." });
    }

    const { TenMonAn, DonViTinh, DonGia, Mota, DanhMuc } = req.body;
    const Hinh = req.file ? req.file.filename : null; // Lưu tên file thay vì đường dẫn đầy đủ

    const query =
      "INSERT INTO monan (TenMonAn, DonViTinh, DonGia, Mota, DanhMuc, Hinh) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [TenMonAn, DonViTinh, DonGia, Mota, DanhMuc, Hinh],
      (err, result) => {
        if (err) {
          console.error("Error adding product:", err);
          return res
            .status(500)
            .json({ success: false, message: "Thêm sản phẩm thất bại." });
        }

        res
          .status(200)
          .json({ success: true, message: "Thêm sản phẩm thành công." });
      }
    );
  });
};
const deleteProduct = (req, res) => {
  const { MaMonAn } = req.params; // Lấy MaMonAn từ URL

  // Truy vấn để xóa món ăn với MaMonAn
  const query = "DELETE FROM monan WHERE MaMonAn = ?";
  connection.query(query, [MaMonAn], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res
        .status(500)
        .json({ success: false, message: "Xóa sản phẩm thất bại." });
    }

    res
      .status(200)
      .json({ success: true, message: "Sản phẩm đã được xóa thành công." });
  });
};
const searchProduct = (req, res) => {
  const keyword = req.query.q || ""; // Lấy từ khóa từ query params
  const query = `
    SELECT * FROM monan 
    WHERE TenMonAn LIKE ? OR Mota LIKE ?
  `;
  const searchValue = `%${keyword}%`;

  connection.query(query, [searchValue, searchValue], (err, results) => {
    if (err) {
      console.error("Error searching products:", err);
      return res.status(500).json({ success: false, message: "Lỗi server." });
    }
    res.status(200).json({ success: true, data: results });
  });
};
const getAllEmployees = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM nhanvien ORDER BY HoTen ASC LIMIT ? OFFSET ?";
  connection.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).send("Server Error");
    }

    connection.query(
      "SELECT COUNT(*) AS total FROM nhanvien",
      (err, countResult) => {
        if (err) {
          console.error("Error counting employees:", err);
          return res.status(500).send("Server Error");
        }

        const totalEmployees = countResult[0].total;
        const totalPages = Math.ceil(totalEmployees / limit);
        res.render("admin/nhanvien", {
          employees: results,
          currentPage: page,
          totalPages: totalPages,
        });
      }
    );
  });
};
const getAllEvaluations = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  // Truy vấn JOIN giữa bảng danhgia và khachhang
  const query = `
    SELECT danhgia.id_Danhgia, khachhang.Ten, danhgia.DiemDanhGia, danhgia.BinhLuan, danhgia.Ngay
    FROM danhgia
    INNER JOIN khachhang ON danhgia.id_khachhang = khachhang.id_khachhang
    ORDER BY danhgia.Ngay DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(query, [limit, offset], (err, evaluations) => {
    if (err) {
      console.error("Error fetching evaluations:", err);
      return res.status(500).send("Server Error");
    }

    // Truy vấn lấy tổng số đánh giá
    connection.query(
      "SELECT COUNT(*) AS total FROM danhgia",
      (err, countResult) => {
        if (err) {
          console.error("Error counting evaluations:", err);
          return res.status(500).send("Server Error");
        }

        const totalEvaluations = countResult[0].total;
        const totalPages = Math.ceil(totalEvaluations / limit);

        // Trả về dữ liệu cho view EJS
        res.render("admin/danhgia", {
          evaluations: evaluations,
          currentPage: page,
          totalPages: totalPages,
        });
      }
    );
  });
};
const getRevenueData = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
  const limit = 10; // Mỗi trang hiển thị 10 hóa đơn
  const offset = (page - 1) * limit; // Tính toán offset

  // Truy vấn JOIN giữa bảng hoadon và khachhang
  const query = `
    SELECT hoadon.id_HoaDon, 
           khachhang.Ten AS TenKhachHang, 
           hoadon.ChieuKhau, 
           hoadon.ThanhTien, 
           hoadon.TongTien, 
           hoadon.TrangThaiThanhToan, 
           khachhang.DiemTichLuy
    FROM hoadon
    INNER JOIN khachhang ON hoadon.id_KhachHang = khachhang.id_khachhang
    ORDER BY hoadon.id_HoaDon DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(query, [limit, offset], (err, revenues) => {
    if (err) {
      console.error("Error fetching revenues:", err);
      return res.status(500).send("Server Error");
    }

    // Truy vấn lấy tổng số hóa đơn
    connection.query(
      "SELECT COUNT(*) AS total FROM hoadon",
      (err, countResult) => {
        if (err) {
          console.error("Error counting revenues:", err);
          return res.status(500).send("Server Error");
        }

        const totalRevenues = countResult[0].total;
        const totalPages = Math.ceil(totalRevenues / limit);

        // Trả về dữ liệu cho view EJS
        res.render("admin/doanhthu", {
          revenues: revenues,
          currentPage: page,
          totalPages: totalPages,
        });
      }
    );
  });
};

module.exports = {
  getHomePage,
  getAllProduct,
  addProduct,
  deleteProduct,
  searchProduct,
  getAllEmployees,
  getAllEvaluations,
  getRevenueData,
};
