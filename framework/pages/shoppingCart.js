const filterField = '#filter_keyword';
const searchButton = '.button-in-search';
const nameProduct = '.fixed > .prdocutname';
const addToCartButton =".fa-cart-plus";
const name = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a";
const unitPrice = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[4]";

const ShoppingCart = {

    searchProduct: async (page, productName) => {
        await page.click(filterField);
        await page.fill(filterField, productName);
        await page.click(searchButton);
  },
    getProductNameInShoppingCart: async (page)=> {
        const shampooName = await page.textContent(nameProduct);
        return shampooName;
        },
    addToCart: async  (page) => {
        await page.click(addToCartButton);
    },
    getProductNameInCart: async (page)=> {
        const nameText = await page.textContent(name);
        return nameText;
        },

    getProductPriceInCart: async (page)=> {
        const unitPriceText = await page.textContent(unitPrice);
        return unitPriceText;
        },

};

export default ShoppingCart;
