import { get_data_from_products } from "./Get_Data";
import products from "./components/products";
const html_produtcs_total = document.getElementById("produtcs-total");
let field_form = document.querySelector("form");
let numerofproducts = document.querySelector(".num-of-products");
const OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
const WishList = JSON.parse(localStorage.getItem("data-wishList")) || [];
const cart = document.querySelector(".num-orders");
const Wishcart = document.querySelector(".num-whish-order");
const product_category = new URLSearchParams(location.search).get("category");

field_form.addEventListener("focusin", () => {
  field_form.querySelector("img").classList.replace("scale-80", "scale-100");
});
field_form.addEventListener("focusout", () => {
  field_form.querySelector("img").classList.replace("scale-100", "scale-80");
});

get_data_from_products().then((data) => {
  const total_products = Object.values(data);
  if (product_category == null) {
    numerofproducts.innerHTML = total_products.length;
    html_produtcs_total.innerHTML = total_products
      .map((item) => {
        let itemWish = WishList.find((c) => c.id === item.id);
        return products(item, itemWish === undefined ? -1 : itemWish.id);
      })
      .join("");
  } else {
    numerofproducts.innerHTML = total_products
      .filter((item) => item.category === product_category)
      .map((x) => x).length;
    html_produtcs_total.innerHTML = total_products
      .filter((item) => item.category === product_category)
      .map((item) => {
        let itemWish = WishList.find((c) => c.id === item.id);
        return products(item, itemWish === undefined ? -1 : itemWish.id);
      })
      .join("");
  }
});
let show_modal = (id) => {
  document.body.classList.add("overflow-y-hidden");
  id.classList.replace("left-250", "left-0");
};
let hid_modal = (id) => {
  document.body.classList.remove("overflow-y-hidden");
  id.classList.replace("left-0", "left-250");
};
let Total_Orders = () => {
  cart.innerHTML = OrdersCart.map((x) => x.quantity).reduce((a, c) => a + c, 0);
  Wishcart.innerHTML = WishList.length;
};
let add_to_cart = (id) => {
  let item = OrdersCart.find((x) => x.id === id);
  get_data_from_products().then((product) => {
    let search = product.find((x) => x.id === id);
    if (!item) {
      OrdersCart.push({
        id: id,
        quantity: 1,
        color: search.color[0].split("-").splice(0, 1).join(""),
        size: search.size[0],
      });
    }
  });
  localStorage.setItem("data", JSON.stringify(OrdersCart));
  Total_Orders();
};
let add_to_wishList = (id) => {
  let item = WishList.findIndex((x) => x.id === id);
  if (item === -1) {
    WishList.push({
      id: id,
    });
    document.getElementById(`btn-wish-${id}`).ariaLabel = "Added";
  } else {
    WishList.splice(item, 1);
    document.getElementById(`btn-wish-${id}`).ariaLabel = "Add To Wislist";
  }
  localStorage.setItem("data-wishList", JSON.stringify(WishList));
  Total_Orders();
};
let get_value = (search_id) => {
  let search_value = document.querySelector(`#${search_id}`).value;
  get_data_from_products().then((product) => {
    let regEx = new RegExp(search_value, "gi");
    html_produtcs_total.innerHTML = product
      .filter((p) => p.name.match(regEx))
      .map((x) => {
        let itemWish = WishList.find((c) => c.id === x.id);
        return products(x, itemWish === undefined ? -1 : itemWish.id);
      })
      .join("");
  });
};
Total_Orders();
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.add_to_cart = add_to_cart;
window.add_to_wishList = add_to_wishList;
window.get_value = get_value;
