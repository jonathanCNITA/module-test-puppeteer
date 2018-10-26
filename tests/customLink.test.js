const timeout = 15000

// test d'un raccourcisseur d'URL Custom
describe("custom", () => {
  
    // parcours client Custom URL
    test('custompublic', async () => {
        let shortCustomName = String(Date.now());
        await page.goto('http://polr.campus-grenoble.fr')
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( 'a' ) )
                .filter( el => el.textContent === 'Link Options' )[0].click();
        });
        await page.screenshot({path: './tests/img/custom1.png'});
        await page.type( '.form-control.custom-url-field', shortCustomName)

        await page.screenshot({path: './tests/img/custom2.png'});
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( 'a' ) )
                .filter( el => el.textContent === 'Check Availability' )[0].click();
        });
        await page.screenshot({path: './tests/img/custom3.png'});
        
        await page.type(".form-control.long-link-input", 'http://reactivex.io/documentation/observable.html');
        await page.screenshot({path: './tests/img/custom4.png'});

        await page.evaluate( () => {
            document.querySelector( '#shorten' ).click();
        });
        await page.waitForSelector("#short_url")
        await page.screenshot({path: './tests/img/custom5.png'});
        const html = await page.$eval('body', e => e.innerHTML)
        expect(html).toContain("http://polr.campus-grenoble.fr/" + shortCustomName)
        
    }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
