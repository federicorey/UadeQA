import { test } from '@playwright/test';
import {hacerClick,completarTexto, sacarScreenshot} from '../../../utils/funciones'

// V003 -- se agrega métodos para sacar screenshot luego de un error

test('errores', async ({ page }, testInfo) => {
    const errores = [2,3]
    try {
        await page.goto('http://localhost:5173'); 
        await page.waitForURL('http://localhost:5173');
        await hacerClick(page,'button[type="submit"]');
        //await page.waitForSelector('div.error');
        const erroresLogin = await page.$$('div.error');
        await page.goto('http://localhost:5173/register'); 
        await page.waitForURL('http://localhost:5173/register');
        await hacerClick(page,'button.btn');
        const erroresRegister = await page.$$('div.error');
        //await hacerClick(page,'button.btn'); 
        // Verifica la cantidad de elementos encontrados
        if (erroresLogin.length !== errores[0]) {
            throw new Error(`Se encontraron ${erroresLogin.length} elementos con el selector 'div.error', se esperaban ${errores[0]}.`);
        }
        if (erroresRegister.length !== errores[1]) {
            throw new Error(`Se encontraron ${erroresRegister.length} elementos con el selector 'div.error', se esperaban ${errores[1]}.`);
        }
    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     } 
  })
