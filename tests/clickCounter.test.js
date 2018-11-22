const timeout = 30000

/**
 * run only this test
 * npm test --runTestByPath clickCounter.test.js
 * 
 */

// test du compteur URL
describe("click counter", () => {
    let clickValue;
    test('click counter', async () => {
        await page.goto('http://localhost:8000');
        await page.waitForSelector('.navbar.navbar-default.navbar-fixed-top');
        await page.$eval( '.dropdown-toggle', el => el.click());
        await page.screenshot({path: './tests/img/clickTest/0.png'});
        await page.type("form[action='login'] input[name='username']", 'blob');
        await page.type("form[action='login'] input[name='password']", '123456');
        await page.screenshot({path: './tests/img/clickTest/1.png'});
        await page.$eval( "input[name='login']", el => el.click());
        await page.waitForSelector('.login-name');
        await page.screenshot({path: './tests/img/clickTest/2.png'});
        await page.goto('http://localhost:8000/admin');
        await page.screenshot({path: './tests/img/clickTest/3.png'});
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '.nav-pills li a'))
                .filter( el => el.textContent === 'Links' )[0].click();
        });
        
        await page.screenshot({path: './tests/img/clickTest/4.png'});
        let click = await page.$eval('.odd td:nth-child(3)', e => e.innerHTML)
        let clickValueExpected = parseInt(click) + 1;
        await page2.goto('http://localhost:8000/0');
        await page2.screenshot({path: './tests/img/clickTest/5.png'});
        await page.reload();
        await page.screenshot({path: './tests/img/clickTest/6.png'});
        const click2 = await page.$eval('.odd td:nth-child(3)', e => e.innerHTML)
        expect(click2).toContain(String(clickValueExpected));        
    }, timeout)


    beforeAll(async () => {
        page = await global.__BROWSER__.newPage()
        page2 = await global.__BROWSER__.newPage()
    }, timeout)

})
