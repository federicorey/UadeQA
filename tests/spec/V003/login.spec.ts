import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto,sacarScreenshot} from '../../../utils/funciones'

// V003 -- se agrega métodos para sacar screenshot luego de un error

test('LoginV3', async ({ page }, testInfo) => {

    try {
        await page.goto('http://localhost:5173'); 
        await page.waitForURL('http://localhost:5173');
        await completarTexto(page,'div.labelMail input', config.user);
        await completarTexto(page,'div.inputPassword input', config.password);
        await hacerClick(page,'button[type="submit"]');
    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     } 
  })

test.use({ headless: false });
