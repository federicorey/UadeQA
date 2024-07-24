import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto} from '../../../utils/funciones'

// V002

test('RegistroV2', async ({ page }) => {
    try {
        await page.goto('http://localhost:5173/register'); 
        await page.waitForURL('http://localhost:5173/register');
        await completarTexto(page,'input[type="email"]', config.user); //falta un id para cada uno porque tienen el mismo xpath
        await completarTexto(page,'//*[@id="root"]/div/div/div[3]/input', config.mail);
        await completarTexto(page,'//*[@id="root"]/div/div/div[4]/input', config.password);
        await completarTexto(page,'//*[@id="root"]/div/div/div[5]/input', config.password);
        await hacerClick(page,'button.btn');
        const errorSelector = 'div.error';
        const isErrorVisible = await page.isVisible(errorSelector);

        if (isErrorVisible) {
            throw new Error('Error de registro: Por favor, ingresa tu correo electrónico.');
        }
    }catch (error) {
        console.error(error);
        throw error;
    }
});
