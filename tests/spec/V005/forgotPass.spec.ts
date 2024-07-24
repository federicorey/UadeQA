import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto, sacarScreenshot,obtenerTexto} from '../../../utils/funciones'

// V005

test('forgotPassword', async ({ page }, testInfo) => {
    try {
        await page.goto('http://localhost:5173/change-password'); 
        await page.waitForURL('http://localhost:5173/change-password');
        await completarTexto(page,'input.form-control',config.mail);
        await hacerClick(page,'button[class="btn btn-dark"]');
        await obtenerTexto(page,'div[class="modal-dialog modal-dialog-centered"] div.modal-body');
        await hacerClick(page,'button[class="btn btn-primary"]');
    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     }
  })

