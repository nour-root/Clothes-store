import { get_data_from_products } from "./Get_Data";

let field_form = document.querySelector("form");
let OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
let WishList = JSON.parse(localStorage.getItem("data-wishList")) || [];
const tableCart = document.querySelector("#table-cart table tbody");
const btnCheckout = document.querySelector(".btn-checkout");
let Wishcart = document.querySelector(".num-whish-order");

let cartItems = () => {
  if (OrdersCart.length < 1) {
    btnCheckout.classList.add("disabled");
    btnCheckout
      .querySelector("a")
      .classList.add("pointer-events-none", "opacity-50", "cursor-not-allowed");
  } else {
    btnCheckout.classList.remove("disabled");
    btnCheckout
      .querySelector("a")
      .classList.remove(
        "pointer-events-none",
        "opacity-50",
        "cursor-not-allowed"
      );
  }
  get_data_from_products().then((data) => {
    tableCart.innerHTML = OrdersCart.map((i) => {
      let { id, quantity, color, size } = i;
      let search = data.find((x) => x.id === id);
      return `<tr>
                   <td class="flex justify-center items-center p-4">
                   <img src="${
                     search.image[0]
                   }" class="rounded-full" width="90" alt="">
                   </td>
                   <td class="p-4">
                   <span class="block">${search.name}</span>
                   <span>${color}</span>
                   <span>,</span>
                   <span>${size}</span>
                   </td>
                   <td class="p-4">$${
                     search.price > 100 ? search.price - 0.3 : search.price
                   }</td>
                   <td class="p-4">
                   <input oninput="quantity_value(${search.id})" id="q-${
        search.id
      }"  type="number" min="1" value="${quantity}"
                   class="w-19 py-2 pl-4 pr-3 focus:outline-0 rounded-xl border border-border" />
                   </td>
                   <td class="p-4" id="subtotal-p-${id}">$${
        search.price > 100
          ? (search.price - 0.3) * quantity
          : search.price * quantity
      }</td>
                  <td class="p-4">
                  <button id="${id}" type="button" onclick="delet(${id})" class="cursor-pointer">
                  <i class="fi fi-rs-trash text-xl text-red-500"></i>
                  </button>
                  </td>
              </tr>`;
    }).join("");
  });
};
field_form.addEventListener("focusin", () => {
  field_form.querySelector("img").classList.replace("scale-80", "scale-100");
});
field_form.addEventListener("focusout", () => {
  field_form.querySelector("img").classList.replace("scale-100", "scale-80");
});
let Total_Orders = () => {
  Wishcart.innerHTML = WishList.length;
};
let show_modal = (id) => {
  document.body.classList.add("overflow-y-hidden");
  id.classList.replace("left-250", "left-0");
};
let hid_modal = (id) => {
  document.body.classList.remove("overflow-y-hidden");
  id.classList.replace("left-0", "left-250");
};
let quantity_value = (id) => {
  let value = document.getElementById(`q-${id}`).value;
  let item = OrdersCart.find((x) => x.id === id);
  if (item) {
    item.quantity = parseInt(value);
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(OrdersCart));
};
let update = (id) => {
  let item = OrdersCart.find((x) => x.id === id);
  get_data_from_products().then((data) => {
    let search = data.find((x) => x.id === id);
    document.getElementById(`subtotal-p-${id}`).innerHTML =
      `$` +
      (search.price > 100 ? search.price - 0.3 : search.price) * item.quantity;
  });
  document.getElementById(`q-${id}`).innerHTML = item.quantity;
};
let delet = (id) => {
  OrdersCart = OrdersCart.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(OrdersCart));
  cartItems();
};
let get_value = (search_id) => {
  let search_value = document.querySelector(`#${search_id}`).value;
  get_data_from_products().then((product) => {
    let regEx = new RegExp(search_value, "gi");
    tableCart.innerHTML = product
      .filter((p) => p.name.match(regEx))
      .map((p) => {
        let item = OrdersCart.find((x) => x.id === p.id);
        if (item === undefined && p === undefined) return;
        if (item) {
          let { id, quantity, color, size } = item;
          return `<tr>
                   <td class="flex justify-center items-center p-4">
                   <img src="${
                     p.image[0]
                   }" class="rounded-full" width="90" alt="">
                   </td>
                   <td class="p-4">
                   <span class="block">${p.name}</span>
                   <span>${color}</span>
                   <span>,</span>
                   <span>${size}</span>
                   </td>
                   <td class="p-4">$${
                     p.price > 100 ? p.price - 0.3 : p.price
                   }</td>
                   <td class="p-4">
                   <input oninput="quantity_value(${p.id})" id="q-${
            p.id
          }"  type="number" min="1" value="${quantity}"
                   class="w-19 py-2 pl-4 pr-3 focus:outline-0 rounded-xl border border-border" />
                   </td>
                   <td class="p-4" id="subtotal-p-${id}">$${
            p.price > 100 ? (p.price - 0.3) * quantity : p.price * quantity
          }</td>
                  <td class="p-4">
                  <button id="${id}" type="button" onclick="delet(${id})" class="cursor-pointer">
                  <i class="fi fi-rs-trash text-xl text-red-500"></i>
                  </button>
                  </td>
              </tr>`;
        }
      })
      .join("");
  });
};
Total_Orders();
cartItems();
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.quantity_value = quantity_value;
window.delet = delet;
window.get_value = get_value;
