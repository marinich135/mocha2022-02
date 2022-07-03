import chai from "chai";
//import playwright from "playwright";
import {run,stop} from "../lib/browsers.js";
const assert = chai.assert;

describe ("UI тесты для магазина", () => {
    let page;
    beforeEach( async () => {
        page = await run('https://automationteststore.com/index.php?rt=account/login');
    });
    afterEach(async() => {
        await stop();
    });

    it ("Авторизовать демо пользователя", async () => {
        await page.click('#loginFrm_loginname');
        await page.fill ('#loginFrm_loginname', 'TestDemo1');
        await page.click('#loginFrm_password');
        await page.fill ('#loginFrm_password', 'test02072022');
        await page.locator('button', { hasText: 'Login' }).click();
        const profileNameField ='.dropdown > .menu_account > .menu_text';
       // await page.waitForSelector(profileNameField);
        const profileNameText = await page.textContent('profileNameField');
        assert.strictEqual(profileNameText,'Welcome back Test', 'Имя пользователя не равно Тест');
    });
    it ("Поиск продукта", async () => {
        await page.click('#loginFrm_loginname');
        await page.fill ('#loginFrm_loginname', 'TestDemo1');
        await page.click('#loginFrm_password');
        await page.fill ('#loginFrm_password', 'test02072022');
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "shampoo");
        await page.click(".button-in-search");
        const shampooName = '.fixed > .prdocutname';
        const shampooNameText = await page.textContent(shampooName);
        assert.strictEqual(shampooNameText, 'Curls to straight Shampoo', 'Название шампуня не совпадает с искомым');
    });
    it('Добавление товара в корзину', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "TestDemo1");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "test02072022");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "New French With Ease");
        await page.click(".button-in-search");
        await page.click(".fa-cart-plus");
        await page.waitForSelector('.maintext > .fa-shopping-cart');
        const name = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a";
        const unitPrice = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[4]";
        const nameText = await page.textContent(name);
        const unitPriceText = await page.textContent(unitPrice);
        assert.strictEqual(nameText, 'New French With Ease (1 book + 1 mp3 CD)', 'В корзине неверный товар');
        assert.strictEqual(unitPriceText, '$85.00', 'В корзине товар с другой ценой');
    });
    it('Удаление товара из корзины', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "TestDemo1");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "test02072022");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "New French With Ease");
        await page.click(".button-in-search");
        await page.click(".fa-cart-plus");
        await page.waitForSelector('.maintext > .fa-shopping-cart');
        await page.waitForSelector("//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a");
        await page.click("//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[7]//a");
        const empty = '.contentpanel';
        const emptyText = await page.textContent(empty);
        assert.include(emptyText, 'Your shopping cart is empty!', 'В корзине остался товар!');
    });
    it('Изменение валюты товаров ', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "TestDemo1");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "test02072022");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click('.block_6 > .language > .hover > .dropdown-toggle');
        await page.click("//ul[@class='dropdown-menu currency']//li[1]//a");
        const currency = '.block_6 > .language > .hover > .dropdown-toggle';
        const currencyText = await page.textContent(currency);
        assert.strictEqual(currencyText, '€ Euro', 'Валюта покупок не изменилась');
    });

});
