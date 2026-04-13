// /admin/js/statistical.js
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filter-statistical-form');

  // Default: load data for the last 7 days
  const endDate = new Date("2025-05-16").toISOString().split('T')[0];
  const startDate = new Date("2025-05-01").toISOString().split('T')[0];

  document.getElementById('stat-startDate').value = startDate;
  document.getElementById('stat-endDate').value = endDate;

  loadStatistics(startDate, endDate);

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const startInput = document.getElementById('stat-startDate');
    const endInput = document.getElementById('stat-endDate');
    const startValue = startInput.value;
    const endValue = endInput.value;

    // Validation: Compare dates
    if (new Date(startValue) > new Date(endValue)) {
      alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      startInput.focus();
      return;
    }

    loadStatistics(startValue, endValue);
  });
});

let revenueChart = null;

async function loadStatistics(startDate, endDate) {
  try {
    const response = await fetch(`/api/hoadons/statistics?startDate=${startDate}&endDate=${endDate}`);
    const result = await response.json();

    if (result.success) {
      const { revenueData, topProducts, overview } = result.data;
      updateOverview(overview);
      updateProductsTable(topProducts);
      updateChart(revenueData, startDate, endDate);
    }
  } catch (error) {
    console.error("Fetch statistics error:", error);
  }
}

function updateOverview(overview) {
  document.getElementById('total-revenue').innerText = overview.totalRevenue.toLocaleString('vi-VN') + 'đ';
  document.getElementById('total-invoices').innerText = overview.totalInvoices;
  document.getElementById('top-product').innerText = overview.topProduct;
}

function updateProductsTable(products) {
  const tbody = document.querySelector('#top-products-table tbody');
  tbody.innerHTML = products.map(p => `
        <tr>
            <td class="text-start ps-3">${p.ten_mon_an}</td>
            <td>${p.totalQuantity}</td>
            <td class="text-end pe-3">${p.totalRevenue.toLocaleString('vi-VN')}đ</td>
        </tr>
    `).join('');
}

/**
 * Update Chart with logic for handling single day, long range, and empty data
 */
function updateChart(revenueData, startDate, endDate) {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  let labels = [];
  let data = [];

  const isSameDay = startDate === endDate;

  if (isSameDay) {
    // Nếu cùng ngày: Hiển thị nhãn là "0h", "1h",... "23h"
    labels = revenueData.map(d => `${d.hour}h`);
    data = revenueData.map(d => d.revenue);
  } else {
    // Nếu khác ngày: Hiển thị nhãn là "Ngày/Tháng"
    labels = revenueData.map(d => {
      const date = new Date(d.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });
    data = revenueData.map(d => d.revenue);
  }

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Doanh thu (VNĐ)',
        data,
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: data.length > 31 ? 0 : 3, // Ẩn điểm nếu quá nhiều dữ liệu
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            // Tự động ẩn bớt nhãn nếu quá dày
            maxTicksLimit: 12,
            autoSkip: true
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value.toLocaleString('vi-VN') + 'đ'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Doanh thu: ${context.parsed.y.toLocaleString('vi-VN')}đ`
          }
        }
      }
    }
  });
}