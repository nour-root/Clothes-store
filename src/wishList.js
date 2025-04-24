import { get_data_from_products } from "./Get_Data";

//
let field_form = document.querySelector("form");
let WishList = JSON.parse(localStorage.getItem("data-wishList")) || [];
let OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
let table_wishList = document.querySelector("#table-wishList table tbody");
const cart = document.querySelector(".num-orders");

//
field_form.addEventListener("focusin", () => {
  field_form.querySelector("img").classList.replace("scale-80", "scale-100");
});
field_form.addEventListener("focusout", () => {
  field_form.querySelector("img").classList.replace("scale-100", "scale-80");
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
};
Total_Orders();
let display_wishList = () => {
  get_data_from_products().then((data) => {
    table_wishList.innerHTML = WishList.map((p) => {
      let search = data.find((x) => x.id === p.id);
      return `<tr>
                        <td class="flex justify-center items-center p-4">
                        <img src="${
                          search.image[0]
                        }" class="rounded-full" width="90" alt="">
                        </td>
                        <td class="p-4">${search.name}</td>
                        <td class="p-4">$${
                          search.price > 100 ? search.price - 0.3 : search.price
                        }</td>
                        <td class="p-4"><button type="button" onclick="add_to_cart(${
                          search.id
                        })"
                        class="bg-first text-white w-fit py-2 px-3 rounded-xl cursor-pointer border transition-all duration-200 border-first hover:bg-white/1 hover:text-first">Add
                        to Cart</button>
                        </td>
                        <td class="p-4">
                        <button type="button" onclick="delet(${
                          search.id
                        })" class="cursor-pointer">
                        <i class="fi fi-rs-trash text-xl text-red-500"></i>
                        </button>
                        </td>
                </tr>`;
    }).join("");
  });
};
let add_to_cart = (id) => {
  get_data_from_products().then((product) => {
    let search = product.find((x) => x.id == id);
    let item = OrdersCart.find((x) => x.id === id);
    if (!item) {
      OrdersCart.push({
        id: id,
        quantity: 1,
        color: search.color[0].split("-").splice(0, 1).join(""),
        size: search.size[0],
      });
    }
    localStorage.setItem("data", JSON.stringify(OrdersCart));
    Total_Orders();
  });
};
let delet = (id) => {
  WishList = WishList.filter((x) => x.id !== id);
  localStorage.setItem("data-wishList", JSON.stringify(WishList));
  display_wishList();
};
let get_value = (search_id) => {
  let search_value = document.querySelector(`#${search_id}`).value;
  get_data_from_products().then((product) => {
    let regEx = new RegExp(search_value, "gi");
    table_wishList.innerHTML = product
      .filter((p) => p.name.match(regEx))
      .map((p) => {
        let item = WishList.findIndex((x) => x.id === p.id);
        if (item === -1 && p === undefined) return;
        if (item) {
          return `<tr>
                        <td class="flex justify-center items-center p-4">
                        <img src="${
                          p.image[0]
                        }" class="rounded-full" width="90" alt="">
                        </td>
                        <td class="p-4">${p.name}</td>
                        <td class="p-4">$${
                          p.price > 100 ? p.price - 0.3 : p.price
                        }</td>
                        <td class="p-4"><button type="button" onclick="add_to_cart(${
                          p.id
                        })"
                        class="bg-first text-white w-fit py-2 px-3 rounded-xl cursor-pointer border transition-all duration-200 border-first hover:bg-white/1 hover:text-first">Add
                        to Cart</button>
                        </td>
                        <td class="p-4">
                        <button type="button" onclick="delet(${
                          p.id
                        })" class="cursor-pointer">
                        <i class="fi fi-rs-trash text-xl text-red-500"></i>
                        </button>
                        </td>
                </tr>`;
        }
      })
      .join("");
  });
};
display_wishList();
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.add_to_cart = add_to_cart;
window.delet = delet;
window.get_value = get_value;
