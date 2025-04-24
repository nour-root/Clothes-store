let slide = (s) => {
  return `  <a href="/shop.html?category=${s.name}" class="embla__slide flex flex-wrap py-4 space-y-4 pr-4 border border-border-alt rounded-xl">
              <div id="img-category" class="w-full basis-[220px]"><img src="${s.image}"
                  class="rounded-xl" alt="">
              </div>
              <p class="text-text font-600 w-full text-center first-letter:capitalize">${s.name}</p>
            </a>`;
};
export default slide;
