// Hiển thị form "Thêm Món Ăn"
document.getElementById("btn-add-product").addEventListener("click", () => {
  document.getElementById("add-product-form").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

// Đóng form khi nhấn "Hủy"
document.getElementById("cancel-add-product").addEventListener("click", () => {
  document.getElementById("add-product-form").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

// Đóng form khi click ra ngoài overlay
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("add-product-form").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

// Gửi dữ liệu sản phẩm đến server
document
  .getElementById("product-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn form reload trang
    const formData = new FormData(this);

    try {
      const response = await fetch("/admin/sanpham", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Thêm sản phẩm thành công!");
        location.reload(); // Reload trang sau khi thêm thành công
      } else {
        alert("Thêm sản phẩm thất bại: " + result.message);
      }
    } catch (error) {
      console.log("Error adding product:", error);
      console.error("Error adding product:", error);
      alert("Lỗi trong quá trình thêm sản phẩm.");
    }
  });
document.querySelectorAll(".btn-delete").forEach((button) => {
  button.addEventListener("click", async function () {
    const MaMonAn = this.getAttribute("data-id");

    // Xác nhận xóa sản phẩm
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa món ăn này?");
    if (!confirmDelete) return;

    try {
      // Gửi yêu cầu xóa tới server
      const response = await fetch(`/admin/sanpham/${MaMonAn}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        alert("Sản phẩm đã được xóa thành công!");
        location.reload(); // Reload trang để cập nhật danh sách sản phẩm
      } else {
        alert("Xóa sản phẩm thất bại: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Lỗi trong quá trình xóa sản phẩm.");
    }
  });
});
