let products = (p, item_wish) => {
  return ` <div data-product="p-${
    p.id
  }" class="border-[1px] border-border-alt rounded-2xl p-4 flex flex-col space-y-2">
          <a href="/details.html?p=${p.id}">
            <div id="p-img" class="relative rounded-2xl overflow-hidden group">
            <img src="${
              p.image[0]
            }" class="rounded-2xl transform transition-all duration-500 group-hover:scale-110" alt="">
                <div class="lg:space-x-8 space-x-2 max-md:space-x-8 flex items-center justify-center absolute left-[45%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <a href="/details.html?p=${
                  p.id
                }" aria-label="Quick View" class="hover:after:block hover:before:block hover:*:text-white bg-container hover:bg-first rounded-full pt-[11px] pb-2 px-3 relative after:absolute after:hidden before:hidden after:content-[attr(aria-label)] after:p-[.625rem] after:rounded-[.25rem] after:-left-[16px] after:bottom-[112%] after:bg-first after:text-white after:text-tiny-size after:whitespace-nowrap before:absolute before:content-[''] before:-top-[6px] before:border-[.5rem] before:border-transparent before:border-t-first"><i class="fi fi-rr-eye text-xl"></i>
                </a>
                  <button type="button" id="btn-wish-${
                    p.id
                  }" onclick="add_to_wishList(${p.id})"  ${
    item_wish === p.id ? 'aria-label="Added"' : 'aria-label="Add To Wislist"'
  }  class="hover:after:block hover:before:block hover:*:text-white bg-container hover:bg-first rounded-full pt-[11px] pb-2 px-3 relative after:absolute after:hidden before:hidden after:content-[attr(aria-label)] after:w-[90px] after:p-[.625rem] after:rounded-[.25rem] after:-left-[50%] after:bottom-[112%] after:bg-first after:text-white after:text-tiny-size after:whitespace-nowrap before:absolute before:content-[''] before:-top-[6px] before:border-[.5rem] before:border-transparent before:border-t-first"><i class="fi fi-rs-heart text-xl"></i>
    </button>
                </div>
            </div>
          </a>
          <div class="info flex flex-col gap-1 relative">
            <span class="ml-1 text-text-light first-letter:capitalize text-smaller-size">clothing</span>
            <p class="capitalize text-large-size font-600 tracking-wide">${
              p.name
            }</p>
            <span class="block">
              <i class="fi fi-rs-star text-yellow-300 text-small-size"></i>
              <i class="fi fi-rs-star text-yellow-300 text-small-size"></i>
              <i class="fi fi-rs-star text-yellow-300 text-small-size"></i>
              <i class="fi fi-rs-star text-yellow-300 text-small-size"></i>
              <i class="fi fi-rs-star text-yellow-300 text-small-size"></i>
            </span>
            <div class="">
              <p class="text-first font-600  flex gap-3">${
                p.price > 100
                  ? `${p.price - 0.3} <del class="text-text">$${p.price}</del>`
                  : `$${p.price}`
              }</p>
            </div>
            <button type="submit"
            value="${p.id}"
            onclick="add_to_cart(${p.id})"
              class="absolute right-0 bottom-2 cursor-pointer bg-first-alt w-fit px-3 py-2 rounded-full ml-auto">
              <i class="fi fi-rs-shopping-bag-add text-text h-1"></i>
            </button>
          </div>
        </div>`;
};
export default products;
