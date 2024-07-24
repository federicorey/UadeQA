import { test } from '@playwright/test';
import {hacerClick,completarTexto,sacarScreenshot,
    crearNameAleatorio,crearMailAleatorio,crearPasswordAleatoria,
    existeTexto,
    obtenerTexto,
    agregarTask,
    obtenerElementos,
    select} from '../../../utils/funciones'

// V004 -- se agrega métodos para sacar screenshot luego de un error

test('RegistroYLogin', async ({ page }, testInfo) => {
    const nombre = await crearNameAleatorio();
    const correo = await crearMailAleatorio();
    const password = await crearPasswordAleatoria();
    console.log(correo);
    console.log(password);
    const states = ['New','In Process','Canceled','Finished'];
    try {
        //registro
        await page.goto('http://localhost:5173/register');
        await page.waitForURL('http://localhost:5173/register');
        await completarTexto(page,'div.labelMail input[name="name"]', nombre); 
        await completarTexto(page,'div.labelMail input[name="correo"]', correo);
        await completarTexto(page,'div.inputPassword input[name="password"]',  password);
        await completarTexto(page,'div.inputPassword input[name="reingresePassword"]', password);
        await hacerClick(page,'button.btn');
        const errorSelector = 'div.error';
        const isErrorVisible = await page.isVisible(errorSelector);
        if (isErrorVisible) {
            throw new Error('Error de registro: Por favor, ingresa tu correo electrónico.');
        }
        
        //Olvidar contraseña
        await page.goto('http://localhost:5173/change-password'); 
        await page.waitForURL('http://localhost:5173/change-password');
        await completarTexto(page,'input.form-control', correo);
        await hacerClick(page,'button[class="btn btn-dark"]');
        //await obtenerTexto(page,'div[class="modal-dialog modal-dialog-centered"] div.modal-body'); //no se obtiene texto
        await hacerClick(page,'button[class="btn-close"]');

        //login

        await completarTexto(page,'div.labelMail input', correo);
        await completarTexto(page,'div.inputPassword input', password);
        await hacerClick(page,'button[type="submit"]');

        //task Manager
        // crear task
        await agregarTask(page,"Crear Repositorio","Fede","11-01-2024");
        await agregarTask(page,"Iniciar Sprint","Fran","24-06-2024");
        await agregarTask(page,"Reportar bugs","Julian","24-06-2024");
        await agregarTask(page,"Crear reporte","Julian","24-06-2024");
        //cambiar estados
        for (let j=0; j<4;j++){
            for (let i = 1; i < 5; i++) { // i es cantidad de tasks, j es cant de status
                await select(page,`//tbody/tr[position()=${i}]/td/select`,states[j]) //falta que se pueda editar
            }
        }
        //editar task
        await hacerClick(page,'//button[text()="Edit"]');
        await completarTexto(page,'div.edit-container input','editado');
        await hacerClick(page,'//button[text()="Save"]');
        // eliminar tasks
        for (let k=0; k<4;k++){
            await hacerClick(page,'//button[text()="Delete"]');
        }
        //cerrar sesion

        await hacerClick(page,'i[class="fas fa-sign-out-alt"]');
        await page.goto('http://localhost:5173');
        await page.waitForTimeout(2000);



    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     } 
  })
