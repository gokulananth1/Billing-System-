const items = [];
document.getElementById("saleDate").value = new Date().toLocaleDateString();

document.getElementById("toggleAddItem").addEventListener("click", () => {
  document.getElementById("addItemContainer").classList.toggle("hidden");
});

// Add item
document.getElementById("addItem").addEventListener("click", () => {
  const name = document.getElementById("itemName").value;
  const qty = parseInt(document.getElementById("itemQuantity").value);
  const price = parseFloat(document.getElementById("itemPrice").value);

  if (!name || qty <= 0 || price <= 0) return alert("Enter valid item details!");

  const total = qty * price;
  items.push({ name, quantity: qty, price, total });

  document.getElementById("itemsTable").innerHTML = items.map(i =>
    `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.total}</td></tr>`
  ).join("");

  const grandTotal = items.reduce((a, b) => a + b.total, 0);
  document.getElementById("grandTotal").textContent = grandTotal;

  document.getElementById("itemName").value = "";
  document.getElementById("itemQuantity").value = "";
  document.getElementById("itemPrice").value = "";
});

// Complete sale
document.getElementById("completeSale").addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value;
  const customerMobile = document.getElementById("customerMobile").value;
  const date = document.getElementById("saleDate").value;

  if (!customerName || !customerMobile || items.length === 0) {
    alert("Please enter all details and items!");
    return;
  }

  const sale = { customerName, customerMobile, date, items };
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));
  localStorage.setItem("lastBill", JSON.stringify(sale));

  window.location.href = "bill.html";
});
