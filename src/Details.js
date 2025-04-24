import { get_data_from_products } from "./Get_Data";
import showDetails from "./components/showDetails";
//
const productId = parseInt(new URLSearchParams(location.search).get("p"));
let contentDetails = document.querySelector("#details");
let OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
let WishList = JSON.parse(localStorage.getItem("data-wishList")) || [];
const cart = document.querySelector(".num-orders");
const Wishcart = document.querySelector(".num-whish-order");
let name_product = document.querySelector(".p-name");
//
let show_modal = (id) => {
  document.body.classList.add("overflow-y-hidden");
  id.classList.replace("left-250", "left-0");
};
let hid_modal = (id) => {
  document.body.classList.remove("overflow-y-hidden");
  id.classList.replace("left-0", "left-250");
};
get_data_from_products().then((product) => {
  let search = product.find((x) => x.id === productId);
  let item = OrdersCart.find((x) => x.id === search.id);
  let quantity = item ? (item.quantity !== undefined ? item.quantity : 1) : 1;
  let itemWish = WishList.find((x) => x.id === search.id);
  name_product.innerHTML = search.name;
  console.log();
  contentDetails.innerHTML = showDetails(
    search,
    quantity,
    itemWish === undefined ? -1 : itemWish
  );
});
contentDetails.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    contentDetails.querySelectorAll("img")[0].src = e.target.src;
  }
});
let Total_Orders = () => {
  cart.innerHTML = OrdersCart.map((x) => x.quantity).reduce((a, c) => a + c, 0);
  Wishcart.innerHTML = WishList.length;
};

let getItem = (id, color_item, size_item) => {
  let color_value = document
    .querySelector(`.${color_item}`)
    .dataset.color.split("-")
    .splice(0, 1)
    .join("");
  let size_value = document.querySelector(`.${size_item}`).dataset.size;
  let value = parseInt(document.getElementById(`prod-${id}`).value);
  let item = OrdersCart.find((x) => x.id === id);
  if (!item) {
    OrdersCart.push({
      id: id,
      quantity: value,
      color: color_value,
      size: size_value,
    });
  } else {
    item.quantity = value;
  }
  localStorage.setItem("data", JSON.stringify(OrdersCart));
  Total_Orders();
};
let add_to_wishLis = (id) => {
  get_data_from_products().then((product) => {
    let item = WishList.findIndex((x) => x.id === id);
    let search = product.find((x) => x.id === id);
    if (item === -1) {
      WishList.push({
        id: id,
        color: search.color[0].split("-").splice(0, 1).join(""),
        size: search.size[0],
      });
    } else {
      WishList.splice(item, 1);
    }
    document
      .querySelector(`#btn-wish-det-${id} i`)
      .classList.toggle("text-red-500");
    localStorage.setItem("data-wishList", JSON.stringify(WishList));
    Total_Orders();
  });
};
let get_color = (index, id) => {
  Object.values(
    document.getElementById(`index-c-${index}`).parentElement.children
  ).forEach((li) => {
    li.classList.remove("color-option");
  });
  document.getElementById(`index-c-${index}`).classList.add("color-option");
  let color_value = document
    .getElementById(`index-c-${index}`)
    .dataset.color.split("-")
    .splice(0, 1)
    .join("");
  choose_color(color_value, id);
};
let get_size = (index, id) => {
  Object.values(
    document.getElementById(`index-s-${index}`).parentElement.children
  ).forEach((li) => {
    li.classList.remove("active-option");
  });
  document.getElementById(`index-s-${index}`).classList.add("active-option");
  let size_value = document.getElementById(`index-s-${index}`).dataset.size;
  choose_size(size_value, id);
};

let choose_color = (color_item, id) => {
  let item = OrdersCart.find((x) => x.id === id);
  if (item === undefined) return;
  if (item) {
    return (item.color = color_item);
  }
};
let choose_size = (size_item, id) => {
  let item = OrdersCart.find((x) => x.id === id);
  if (item === undefined) return;
  if (item) {
    return (item.size = size_item);
  }
};
Total_Orders();
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.getItem = getItem;
window.add_to_wishLis = add_to_wishLis;
window.get_color = get_color;
window.get_size = get_size;
