import chai from "chai";
//import playwright from "playwright";
import {run,stop} from "../lib/browsers.js";
import app from "../framework/pages/index.js";
const assert = chai.assert;


describe ("UI тесты для магазина с использованием 'Page object' ", () => {
    let page;
    beforeEach( async () => {
        page = await run('https://automationteststore.com/index.php?rt=account/login');
    });
    afterEach(async() => {
        await stop();
    });

    it ("Авторизовать демо пользователя", async () => {
        await app().Main().signUp(page, 'TestDemo1', 'test02072022');
        const account = await app().Main().getAccountGreetingText(page);
        assert.strictEqual(account, 'Welcome back Test', 'Имя пользователя не равно Тест');

    });
    it ("Добавить товар в Wish list", async () => {
        await app().Main().signUp(page, 'TestDemo1', 'test02072022');
        await app().WishList().addToWishList(page,"Gucci Guilty");
        await app().WishList().goToWishListPage(page);
        await page.waitForSelector('.maintext > .fa-star');
        const wish = await app().WishList().getProductNameInWishList(page);
        assert.strictEqual(wish, 'Gucci Guilty','В виш листе неверный товар');
        const wishModel = await app().WishList().getProductModelInWishList(page);
        assert.strictEqual(wishModel, 'PRF00269','В виш листе товар другой модели');
    });

   it ("Удалить товар из Wish list", async () => {
        await app().Main().signUp(page, 'TestDemo1', 'test02072022');
        await app().WishList().goToWishListPage(page);
        await page.waitForSelector('.maintext > .fa-star');
        await app().WishList().removeProduct(page);
        await app().WishList().goToWishListPage(page);
        const emptyList = await app().WishList().getEmptyWishList(page);
        assert.strictEqual(emptyList, 'Wish list is empty', 'В Wish list остался товар')

    });
   it ("Поиск продукта", async () => {
        await app().Main().signUp(page, 'TestDemo1', 'test02072022');
        await app().ShoppingCart().searchProduct(page,'shampoo');
        const productList = await  app().ShoppingCart().getProductNameInShoppingCart(page);
        assert.strictEqual(productList,'Curls to straight Shampoo', 'Название шампуня не совпадает с искомым' )
    });

    it('Добавление товара в корзину', async () => {
        await app().Main().signUp(page, 'TestDemo1', 'test02072022');
        await app().ShoppingCart().searchProduct(page,'New French With Ease');
        await app().ShoppingCart().addToCart(page);
        await page.waitForSelector('.maintext > .fa-shopping-cart');
        const product = await app().ShoppingCart().getProductNameInCart(page);
        assert.strictEqual(product,'New French With Ease (1 book + 1 mp3 CD)', 'В корзине неверный товар');
        const price = await  app().ShoppingCart().getProductPriceInCart(page);
        assert.strictEqual(price,'$85.00', 'В корзине товар с другой ценой');


    });
});
