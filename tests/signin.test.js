const timeout = 25000

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page
    const numTest = '32';
    const name = `Blob${numTest}`;
    const mail = `blob${numTest}@test.com`

    // parcours client sign in
    test('sign in', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        await page.screenshot({path: './tests/img/shortenA-0.png'})

        await page.waitForSelector("form")
        await page.type("input.form-control.form-field", name);
        await page.screenshot({path: './tests/img/shortenA-1.png'})
      
        await page.type("[name='password'].form-control.form-field", '123456');
        await page.screenshot({path: './tests/img/shortenA-2.png'})
        
        await page.type("[name='email']", mail);
        await page.screenshot({path: './tests/img/shortenA-3.png'})
        
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( 'input' ) )
                .filter( el => el.defaultValue === 'Register' )[0].click();
        });
        await page.screenshot({path: './tests/img/shortenA-4.png'})
        await page.waitForSelector("[action='login']")
        await page.screenshot({path: './tests/img/shortenA-5.png'})
        //-- login form     
        await page.waitForSelector("form")
        await page.evaluate( () => {
            document.querySelectorAll( 'input' )[4].value = 'Blob32';
        });
        await page.screenshot({path: './tests/img/shortenA-6.png'})
        await page.evaluate( () => {
            document.querySelectorAll( 'input' )[5].value = '123456';
        });
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( 'input' ) )
                .filter( el => el.defaultValue === 'Login' )[0].click();
        });
        await page.screenshot({path: './tests/img/shortenA-7.png'})
        await page.waitForSelector(".dropdown-toggle.login-name")
        await page.screenshot({path: './tests/img/shortenA-8.png'})
        //-- final test
        const html = await page.$eval('body', e => e.innerHTML)
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/logged.png'});
        expect(html).toContain(name)
    }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
