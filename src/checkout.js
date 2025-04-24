import { get_data_from_products } from "./Get_Data";

let checkoutForm = document.querySelector("#checkoutForm");
let OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
let orderSummary = document.querySelector(".order-summary");
let subtotal = document.querySelector("#sub-total");
//
let show_modal = (id) => {
  document.body.classList.add("overflow-y-hidden");
  id.classList.replace("left-250", "left-0");
};
let hid_modal = (id) => {
  document.body.classList.remove("overflow-y-hidden");
  id.classList.replace("left-0", "left-250");
};
checkoutForm.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  let confirm_order = document.querySelector(".confirm-order");
  document.body.style.overflowY = "hidden";
  document.querySelector(".overlay").style.display = "block";
  confirm_order.classList.replace("scale-0", "scale-100");
  OrdersCart = [];
  localStorage.setItem("data", JSON.stringify(OrdersCart));
});
let html_order_summary = () => {
  get_data_from_products().then((products) => {
    orderSummary.innerHTML = OrdersCart.map((x) => {
      let { id, quantity, color, size } = x;
      let search = products.find((order) => order.id === id);
      return `<div class="order border-b px-4 py-2 border-b-border flex justify-between">
                                    <div class="info flex items-center space-x-4">
                                        <img src="${
                                          search.image[0]
                                        }" width="100" alt="">
                                        <div class="flex flex-col text-normal-size">
                                            <p class="name capitalize">${
                                              search.name
                                            }</p>
                                            <div class="flex gap-2">
                                              <span class="color text-text capitalize">${color}</span>
                                              <span class="size capitalize text-text">${size}</span>
                                            </div>
                                            <div class="flex gap-2">
                                            <span class="size capitalize text-text">$${
                                              search.price > 100
                                                ? search.price - 0.3
                                                : search.price
                                            }</span>
                                              <span class="color text-text capitalize">${quantity}x</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="subtotal text-large-size mt-2">${
                                      quantity * search.price
                                    }$</div>
                                </div>`;
    }).join("");
  });
};
let Total_pric = () => {
  let sub_total;
  get_data_from_products().then((products) => {
    sub_total = OrdersCart.map((x) => {
      let { id, quantity } = x;
      let search = products.find((order) => order.id === id) || [];
      return (
        quantity * (search.price > 100 ? search.price - 0.3 : search.price)
      );
    }).reduce((y, z) => y + z, 0);
    subtotal.innerHTML = `$${sub_total}`;
  });
};
let total_shipping = () => {
  let shippnig = 1;
  let totalShipping = OrdersCart.map((x) => x.quantity * shippnig).reduce(
    (a, c) => a + c,
    0
  );
  document.querySelector("#shipping-cost").innerHTML = `$${totalShipping}`;
  return totalShipping;
};
let total_cost = () => {
  get_data_from_products().then((products) => {
    let sub_total = OrdersCart.map((x) => {
      let { id, quantity } = x;
      let search = products.find((order) => order.id === id) || [];
      return (
        quantity * (search.price > 100 ? search.price - 0.3 : search.price)
      );
    }).reduce((y, z) => y + z, 0);
    document.querySelector("#total-cost").innerHTML = `$${
      total_shipping() + sub_total
    }`;
  });
};
let choose_delivery_method_1 = (element) => {
  document
    .querySelector(`.method-2`)
    .classList.replace("border-first", "border-border");
  document.querySelector(`.method-2 .true-icon`).classList.add("hidden");
  document
    .querySelector(`.${element}`)
    .classList.replace("border-border", "border-first");
  document.querySelector(`.${element} .true-icon`).classList.remove("hidden");
};
let choose_delivery_method_2 = (element) => {
  document
    .querySelector(`.method-1`)
    .classList.replace("border-first", "border-border");
  document.querySelector(`.method-1 .true-icon`).classList.add("hidden");
  document
    .querySelector(`.${element}`)
    .classList.replace("border-border", "border-first");
  document.querySelector(`.${element} .true-icon`).classList.remove("hidden");
};
total_cost();
total_shipping();
Total_pric();
html_order_summary();
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.choose_delivery_method_1 = choose_delivery_method_1;
window.choose_delivery_method_2 = choose_delivery_method_2;
