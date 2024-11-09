document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const sections = document.querySelectorAll(".hidden");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa class 'show' khỏi tất cả các section
      sections.forEach((s) => s.classList.remove("show"));

      // Lấy id từ thuộc tính href của link và chọn section tương ứng
      const id = link.getAttribute("href");
      const section = document.querySelector(id);

      // Thêm class 'show' vào section được nhấp vào
      section.classList.add("show");
    });
  });
});
