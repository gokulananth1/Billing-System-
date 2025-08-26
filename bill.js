window.onload = () => {
  const billData = JSON.parse(localStorage.getItem("lastBill")) || null;
  if (!billData) {
    document.querySelector(".bill-container").innerHTML = "<h4 class='text-center text-danger'>⚠ No Bill Found</h4>";
    return;
  }

  document.getElementById("billCustomer").textContent = billData.customerName;
  document.getElementById("billMobile").textContent = billData.customerMobile;
  document.getElementById("billDate").textContent = billData.date;

  let total = 0;
  const rows = billData.items.map(i => {
    total += i.total;
    return `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.total}</td></tr>`;
  }).join("");

  document.getElementById("billItems").innerHTML = rows;
  document.getElementById("billTotal").textContent = total;
};
