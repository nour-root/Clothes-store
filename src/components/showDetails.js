let showDetails = (product, quantity, wishItem) => {
  return `<div id="img-item" class="col-span-2 grid gap-4 grid-rows-1">
                <img class="row-span-1" src="${product.image[0]}" alt="">
                <div class="flex w-1/2 space-x-4 row-start-2 row-end-2">
                    <img src="${product.image[1]}" width="150" alt="">
                    <img src="${product.image[0]}" width="150" alt="">
                </div>
            </div>
            <div id="info" class="col-span-2 flex flex-col space-y-8">
                <h2 class="text-h2-size capitalize">${product.name}</h2>
                <p class="capitalize">brands: <span class="text-first capitalize">${
                  product.brand
                }</span>
                </p>
                <div class="flex items-center space-x-4 border-b border-t border-border pt-2 pb-2">
                    <span class="text-text text-large-size">Price:</span>
                    <p class="text-first text-h2-size">${
                      product.price > 100 ? product.price - 0.3 : product.price
                    }$</p>
                </div>
                <p class="text-text">${product.description}</p>
                <ul class="space-y-1 capitalize">
                    <li class="flex items-center text-text space-x-4"><i class="fi-rs-crown mt-1 text-text"></i><span>
                            1 Year
                            al jazeera
                            brand
                            warranty
                        </span>
                    </li>
                    <li class="flex items-center text-text space-x-4"><i class="fi-rs-refresh mt-1 text-text"></i><span>
                            30 day return policy
                        </span>
                    </li>
                    <li class="flex items-center text-text space-x-4"><i
                            class="fi-rs-credit-card mt-1 text-text"></i><span> cash on delivery available
                        </span>
                    </li>
                </ul>
                <div id="colors" class="flex items-center space-x-3 mb-8"><span
                        class="capitalize font-600 text-text text-xl">color</span>
                    <ul class="flex items-center space-x-4">
                        ${product.color
                          .map(
                            (x, i) =>
                              `<li data-color="${x}" id="index-c-${i}" onclick="get_color(${i},${
                                product.id
                              })" class="w-10 h-10 ${
                                i === 0 ? "color-option" : ""
                              } cursor-pointer bg-${x} border-2 border-border rounded-full"></li>`
                          )
                          .join("")}              
                    </ul>   
                </div>
                <div id="sizes" class="flex items-center space-x-3"><span
                        class="capitalize font-600 text-text text-xl">sizes</span>
                    <ul class="flex items-end space-x-4 uppercase">
                        ${product.size
                          .map(
                            (
                              x,
                              i
                            ) => `<li data-size="${x}" id="index-s-${i}" onclick="get_size(${i},${
                              product.id
                            })"
                            class="w-10 h-10 px-7 border border-border text-small-size cursor-pointer ${
                              i === 0 ? "active-option" : ""
                            } border-border text-text flex items-center justify-center">
                        ${x}
                        </li>`
                          )
                          .join("")}
                    </ul>
                </div>
                <div class="mt-3">
                    <form action="" class="flex items-center space-x-6">
                        <input type="number" min="1"
                            class="w-22 h-14 outline-0 border border-border p-2 pl-4 rounded-xl" value="${quantity}" name=""
                            id="prod-${product.id}">
                        <button type="button" onclick="getItem(${
                          product.id
                        },'color-option','active-option')" id="${
    product.id
  }" class="bg-first cursor-pointer text-white px-4 py-4  transition-all duration-200 border border-first rounded-xl hover:bg-white hover:text-first">Add to
                            cart</button>
                        <button type="button" id="btn-wish-det-${
                          product.id
                        }" onclick="add_to_wishLis(${
    product.id
  })" class="border border-border cursor-pointer rounded-xl">
                        <i class="fi fi-rs-heart p-4 ${
                          wishItem.id === product.id ? "text-red-500" : ""
                        } text-xl flex items-center"></i>
                        </button>
                    </form>
                </div>
            </div>`;
};
export default showDetails;
