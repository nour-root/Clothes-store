import EmblaCarousel from "embla-carousel";
import { addPrevNextBtnsClickHandlers } from "./components/EmblaCarouselArrowButton";
import {
  get_data_from_category,
  get_data_from_products,
  get_data_from_showcase,
} from "./Get_Data";
import slide from "./components/silde";
import products from "./components/products";
import new_arrival from "./components/new_arrival";
import showcase_item from "./components/showcase";

let showcase_content = document.getElementById("showcase");
const btn_products = document.getElementById("products-content");
const OrdersCart = JSON.parse(localStorage.getItem("data")) || [];
const WishList = JSON.parse(localStorage.getItem("data-wishList")) || [];
const cart = document.querySelector(".num-orders");
const Wishcart = document.querySelector(".num-whish-order");
//
const emblaNode = document.querySelector(".embla");
const embla_container = document.querySelector(".embla__container");
const prevBtnNode = emblaNode.querySelector(".embla__button--prev");
const nextBtnNode = emblaNode.querySelector(".embla__button--next");
const products_container = document.getElementById("products");
const swiper_wapper = document.querySelector(".swiper-wrapper");
//
ScrollReveal().reveal("#image-home", {
  delay: 200,
  distance: "20px",
  origin: "right",
  duration: 800,
  easing: "ease-in-out",
});
ScrollReveal().reveal("#subtitle", {
  delay: 200,
  distance: "20px",
  origin: "left",
  duration: 800,
  easing: "ease-in-out",
});
ScrollReveal().reveal(".deal-1", {
  delay: 1000,
  origin: "left",
  distance: "20px",
  duration: 1000,
  easing: "ease-in-out",
});
ScrollReveal().reveal(".deal-2", {
  delay: 1000,
  origin: "right",
  distance: "20px",
  duration: 1000,
  easing: "ease-in-out",
});

let display_products = (item) => {
  swiper_wapper.innerHTML = item
    .map((x) => {
      let itemWish = WishList.find((c) => c.id === x.id);
      return new_arrival(x, itemWish === undefined ? -1 : itemWish.id);
    })
    .join("");
  const swiper = new Swiper(".swiper", {
    spaceBetween: 24,
    hashNavigation: {
      watchState: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      1000: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
    },
  });
};
get_data_from_category().then((data) => {
  embla_container.innerHTML = data.map((s) => slide(s)).join("");
});
get_data_from_products().then((data) => {
  const featureProducts = data.filter((product) =>
    product.typ_p.includes("feature")
  );
  display_products(featureProducts);
  products_container.innerHTML = featureProducts
    .map((x) => {
      let itemWish = WishList.find((c) => c.id === x.id);
      return products(x, itemWish === undefined ? -1 : itemWish.id);
    })
    .join("");

  btn_products.querySelector("form").addEventListener("click", (e) => {
    let value = e.target.value;
    Object.values(btn_products.querySelector("form").children).forEach((b) => {
      b.classList.remove("Active-btn");
    });
    Object.values(btn_products.querySelector("form").children).filter((x) => {
      if (x.value === value) {
        x.classList.add("Active-btn");
      }
    });
    products_container.innerHTML = data
      .filter((x) => x.typ_p.includes(`${value}`))
      .map((i) => {
        let itemWish = WishList.find((c) => c.id === i.id);
        return products(i, itemWish === undefined ? -1 : itemWish.id);
      })
      .join("");
  });
});
get_data_from_showcase().then((data) => {
  let items = Object.entries(data);
  showcase_content.innerHTML = items
    .map((x) => {
      let [h, details] = x;
      return showcase_item(h, details);
    })
    .join("");
});

let Total_Orders = () => {
  cart.innerHTML = OrdersCart.map((x) => x.quantity).reduce((a, c) => a + c, 0);
  Wishcart.innerHTML = WishList.length;
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
let add_to_wishList = (id) => {
  let item = WishList.findIndex((x) => x.id === id);
  if (item === -1) {
    WishList.push({
      id: id,
    });
    document.getElementById(`btn-wish-${id}`).ariaLabel = "Added";
    document.getElementById(`btn-wish-new-${id}`).ariaLabel = "Added";
  } else {
    WishList.splice(item, 1);
    document.getElementById(`btn-wish-${id}`).ariaLabel = "Add To Wislist";
    document.getElementById(`btn-wish-new-${id}`).ariaLabel = "Add To Wislist";
  }
  localStorage.setItem("data-wishList", JSON.stringify(WishList));
  Total_Orders();
};
Total_Orders();

const options = { loop: false };
const emblaApi = EmblaCarousel(emblaNode, options);
const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtnNode,
  nextBtnNode
);
emblaApi.on("destroy", removePrevNextBtnsClickHandlers);

let show_modal = (id) => {
  document.body.classList.add("overflow-y-hidden");
  id.classList.replace("left-250", "left-0");
};
let hid_modal = (id) => {
  document.body.classList.remove("overflow-y-hidden");
  id.classList.replace("left-0", "left-250");
};
window.show_modal = show_modal;
window.hid_modal = hid_modal;
window.add_to_cart = add_to_cart;
window.add_to_wishList = add_to_wishList;
