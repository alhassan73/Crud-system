var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var products = document.getElementById("products");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var indexOfProduct = 0;
var alert1 = document.getElementById("alert1");
var alert2 = document.getElementById("alert2");
var alert3 = document.getElementById("alert3");
var alert4 = document.getElementById("alert4");
var info = document.getElementById("info");
var productsContainer = [];

if (localStorage.getItem("product") !== null) {
  productsContainer = JSON.parse(localStorage.getItem("product"));
  display();
}
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDesc.value,
  };
  if (productName.value === "") {
    alert1.classList.remove("d-none");
    setTimeout(function () {
      alert1.classList.add("d-none");
    }, 5000);
  } else if (productPrice.value === "") {
    alert2.classList.remove("d-none");
    setTimeout(function () {
      alert2.classList.add("d-none");
    }, 5000);
  } else if (productCategory.value === "") {
    alert3.classList.remove("d-none");
    setTimeout(function () {  
      alert3.classList.add("d-none");
    }, 5000);
  } else if (productDesc.value === "") {
    alert4.classList.remove("d-none");
    setTimeout(function () {
      alert4.classList.add("d-none");
    }, 5000);
  } else {
    productsContainer.push(product);
    localStorage.setItem("product", JSON.stringify(productsContainer));
    display();
    alert1.classList.add("d-none");
    alert2.classList.add("d-none");
    alert3.classList.add("d-none");
    alert4.classList.add("d-none");
  }
}
function handleEnterkey(event) {
  if (event.key === "Enter") {
    addProduct();
  }
}
productName.addEventListener("keydown", handleEnterkey);
function display() {
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    container += ` <tr>
    <td><span>#</span>${i + 1}</td>
    <td>${productsContainer[i].name}</td>
    <td>${productsContainer[i].price}<span> EGP</span></td>
    <td>${productsContainer[i].category}</td>
    <td>${productsContainer[i].description}</td>
    <td class = "d-flex flex-wrap  gap-2 justify-content-center"><button class="btn btn-outline-warning " onclick ="setData(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-outline-danger " onclick = "deleteProduct(${i})"><i class="fa-solid fa-xmark"></i></button></td>
  </tr>`;
  }
  products.innerHTML = container;
}
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  if (localStorage.getItem("product") !== null) {
    localStorage.clear();
    localStorage.setItem("product", JSON.stringify(productsContainer));
  }
  display();
  unsetData();
}
function searchProduct() {
  var text = searchInput.value;
  var container = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(text.toLowerCase())) {
      container += ` <tr>
      <td><span>#</span>${i + 1}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}<span> EGP</span></td>
      <td>${productsContainer[i].category}</td>
      <td>${productsContainer[i].description}</td>
      <td class = "d-flex flex-wrap  gap-2 justify-content-center"><button class="btn btn-outline-warning " onclick ="setData(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn btn-outline-danger " onclick = "deleteProduct(${i})"><i class="fa-solid fa-xmark"></i></button></td>
    </tr>`;
    }
  }
  products.innerHTML = container;
}
function setData(index) {
  indexOfProduct = index;
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCategory.value = productsContainer[index].category;
  productDesc.value = productsContainer[index].description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
function unsetData() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  searchInput.value = "";
}
function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDesc.value,
  };
  productsContainer.splice(indexOfProduct, 1, product);
  localStorage.setItem("product", JSON.stringify(productsContainer));
  display();
  unsetData();
}
