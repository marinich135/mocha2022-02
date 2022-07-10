const loginField = '#loginFrm_loginname';
const passwordField = '#loginFrm_password';
const loginButton = '.col-sm-6 > .loginbox > #loginFrm > fieldset > .btn';
const profileNameField ='#customernav > #customer_menu_top > .dropdown > .top > .menu_text';


const MainPage ={
    signUp: async (page, username, password) => {
        await page.click(loginField);
        await page.fill (loginField, username);
        await page.click(passwordField);
        await page.fill (passwordField, password);
        await page.click(loginButton);
    },
    getAccountGreetingText: async (page) => {
        const profileNameText = await page.textContent('profileNameField');
        return profileNameText;
    },

};

export default MainPage;
