import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto} from '../../../utils/funciones'

// V002

test('LoginV2', async ({ page }) => {

    try {
        await page.goto('http://localhost:5173');
        await page.waitForURL('http://localhost:5173');
        await completarTexto(page,'div.labelMail input', config.user);
        await completarTexto(page,'div.inputPassword input', config.password);
        await hacerClick(page,'button[type="submit"]');
    } catch (error) {
        console.error(error);
        throw error;
    }
});
