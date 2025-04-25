const showcase_item = (title, item) => {
  return `<div class="space-y-8">
        <div class="space-y-2">
          <h4 class="text-h4-size capitalize">${title}</h4>
          <div
            class="w-full relative rounded-4xl h-1 bg-container before:absolute before:content-[''] before:w-1/5 before:h-full before:bg-first before:rounded-4xl before:left-0 before:top-0">
          </div>
        </div>
        <div class="flex flex-col space-y-8 *:hover:bg-container transition-all duration-200">
          ${Object.values(item)
            .map(
              (
                i
              ) => `<a href="/details.html?p=${i.id}" class="flex justify-start items-center  space-x-4">
              <img src="${i.image[0]}" width="100" alt="">
              <div id="details-showcase" class="space-y-2 overflow-hidden">
                <p class="capitalize text-normal-size-size whitespace-nowrap overflow-hidden text-ellipsis">${i.name}</p>
                <div class="flex space-x-2">
                  <span class="text-first font-600">$${i.price}</span>
                  <del class="text-text-light font-500">$240</del>
                </div>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>`;
};

export default showcase_item;
