import { test } from '@playwright/test';
import {hacerClick,completarTexto,sacarScreenshot,
    crearNameAleatorio,crearMailAleatorio,crearPasswordAleatoria,
    existeTexto} from '../../../utils/funciones'

// V004 -- se agrega métodos para sacar screenshot luego de un error

test('RegistroYLogin', async ({ page }, testInfo) => {
    const nombre = crearNameAleatorio();
    const correo = crearMailAleatorio();
    const password = crearPasswordAleatoria();
    try {
        await page.goto('http://localhost:5173/register');
        await page.waitForURL('http://localhost:5173/register');
        await completarTexto(page,'div.labelMail input[name="name"]',await nombre); 
        await completarTexto(page,'div.labelMail input[name="correo"]',await correo);
        await completarTexto(page,'div.inputPassword input[name="password"]', await password);
        await completarTexto(page,'div.inputPassword input[name="reingresePassword"]',await password);
        await hacerClick(page,'button.btn');
        const errorSelector = 'div.error';
        const isErrorVisible = await page.isVisible(errorSelector);
        if (isErrorVisible) {
            throw new Error('Error de registro: Por favor, ingresa tu correo electrónico.');
        }
        await page.goto('http://localhost:5173');
        await page.waitForURL('http://localhost:5173');
        await completarTexto(page,'div.labelMail input', await correo);
        await completarTexto(page,'div.inputPassword input', await password);
        await hacerClick(page,'button[type="submit"]');
        await hacerClick(page,'button[class="btn btn-primary"]'); // ingresar
        //if (!await existeTexto(page,'h1','Task Manager'))
        //    throw new Error('Error de Login: No se ha podido iniciar sesión');
    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     } 
  })
