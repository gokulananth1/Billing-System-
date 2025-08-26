window.onload = () => {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const accordion = document.getElementById("salesAccordion");

  // Group by date
  const grouped = sales.reduce((acc, s) => {
    acc[s.date] = acc[s.date] || [];
    acc[s.date].push(s);
    return acc;
  }, {});

  accordion.innerHTML = Object.keys(grouped).map((date, idx) => {
    const customers = grouped[date].map((c, i) => `
      <div class="card mb-2 p-3 shadow-sm rounded">
        <h6>👤 ${c.customerName} (${c.customerMobile})</h6>
        <ul>${c.items.map(it => `<li>${it.name} - ${it.quantity} × ₹${it.price} = ₹${it.total}</li>`).join("")}</ul>
      </div>`).join("");

    return `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}">
            📅 ${date}
          </button>
        </h2>
        <div id="collapse${idx}" class="accordion-collapse collapse">
          <div class="accordion-body">${customers}</div>
        </div>
      </div>`;
  }).join("");
};

// Reset
document.getElementById("resetSales").addEventListener("click", () => {
  if (confirm("Reset all sales?")) {
    localStorage.removeItem("sales");
    location.reload();
  }
});

// Download Excel
document.getElementById("downloadSales").addEventListener("click", () => {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const rows = [["Customer", "Mobile", "Date", "Item", "Qty", "Price", "Total"]];
  sales.forEach(s => {
    s.items.forEach(i => {
      rows.push([s.customerName, s.customerMobile, s.date, i.name, i.quantity, i.price, i.total]);
    });
  });
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
  XLSX.writeFile(wb, "SalesReport.xlsx");
});
