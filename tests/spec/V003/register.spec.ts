import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto,sacarScreenshot} from '../../../utils/funciones'

// V003 -- se agrega métodos para sacar screenshot luego de un error

test('RegistroV3', async ({ page }, testInfo) => {
    try {
        await page.goto('http://localhost:5173/register'); 
        await page.waitForURL('http://localhost:5173/register');
        await completarTexto(page,'div.labelMail input[name="name"]', config.user); //falta un id para cada uno porque tienen el mismo xpath
        await completarTexto(page,'div.labelMail input[name="correo"]', config.mail);
        await completarTexto(page,'div.inputPassword input[name="password"]', config.password);
        await completarTexto(page,'div.inputPassword input[name="reingresePassword"]', config.password);
        await hacerClick(page,'button.btn');
        const errorSelector = 'div.error';
        const isErrorVisible = await page.isVisible(errorSelector);
        if (isErrorVisible) {
            throw new Error('Error de registro: Por favor, ingresa tu correo electrónico.');
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
