async function get_data_from_category() {
  const respons = await fetch("/data.json");
  const category = await respons.json();
  const categories = category.categories;
  return categories;
}
async function get_data_from_products() {
  const respons = await fetch("/data.json");
  const product = await respons.json();
  const products = product.products;
  return products;
}
async function get_data_from_showcase() {
  const respons = await fetch("/data.json");
  const shc = await respons.json();
  const showcase = shc.showcase;
  return showcase;
}
export {
  get_data_from_category,
  get_data_from_products,
  get_data_from_showcase,
};
