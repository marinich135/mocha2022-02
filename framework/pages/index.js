import MainPage from "./mainPage.js";
import WishList from "./wishList.js";
import ShoppingCart from "./shoppingCart.js";

const app = () => ({
    Main:()=> ({...MainPage}),
    WishList:()=>({...WishList}),
    ShoppingCart:()=> ({...ShoppingCart}),
});

export default app;
