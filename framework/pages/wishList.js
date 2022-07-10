const filterField = '#filter_keyword';
const searchButton = '.button-in-search';
const addToWishListButton = '.fa-plus-square';
const dropDownMenu = '#customernav > #customer_menu_top > .dropdown > .top > .menu_text';
const wishListCard = '.ct_padding_right > .nav-dash > li > a > .fa-star';
const nameWish = "//div[@class='container-fluid wishlist product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a";
const unitModelWish = "//div[@class='container-fluid wishlist product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[3]";
const removeButton = '.fa-trash-o';
const empty ='.contentpanel';

const WishList = {
    addToWishList: async (page, productName) => {
        await page.click(filterField);
        await page.fill(filterField, productName);
        await page.click(searchButton);
        await page.click(addToWishListButton);
    },
    goToWishListPage: async  (page) => {
        await page.click(dropDownMenu);
        await page.click(wishListCard);
    },
    getProductNameInWishList: async (page)=> {
        const nameWishText = await page.textContent(nameWish);
        return nameWishText;},

    getProductModelInWishList: async (page) => {
        const unitModelWishText = await page.textContent(unitModelWish);
        return unitModelWishText;
    },
   removeProduct: async (page) => {
        await page.click(removeButton);
   },
   getEmptyWishList: async (page) => {
        const emptyText = await page.textContent(empty);
        return emptyText;
   },
};
export default WishList;
