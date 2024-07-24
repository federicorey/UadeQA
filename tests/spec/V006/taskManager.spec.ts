import { test } from '@playwright/test';
import config from '../../../config.json';
import {hacerClick,completarTexto,sacarScreenshot, agregarTask, select,obtenerElementos} from '../../../utils/funciones'


// V006

test('TaskManager', async ({ page }, testInfo) => {
    const states = ['New','In Process','Canceled','Finished'];
    try {
        await page.goto('http://localhost:5173');
        await page.waitForURL('http://localhost:5173');
        await completarTexto(page,'div.labelMail input', config.mail);
        await completarTexto(page,'div.inputPassword input', config.password);
        await hacerClick(page,'button[type="submit"]');
        //await hacerClick(page,'button[class="btn btn-primary"]');
        
        // crear task
        await agregarTask(page,"Crear Repositorio","Fede","11-01-2024");
        await agregarTask(page,"Iniciar Sprint","Fran","24-06-2024");
        await agregarTask(page,"Reportar bugs","Julian","24-06-2024");
        await agregarTask(page,"Crear reporte","Julian","24-06-2024");
        //const elementos = obtenerElementos(page,'tbody tr')
        for (let j=0; j<4;j++){
            for (let i = 1; i < 5; i++) { // i es cantidad de tasks, j es cant de status
                await select(page,`//tbody/tr[position()=${i}]/td/select`,states[j]) //falta que se pueda editar
            }
        }
        //editar
        await hacerClick(page,'//button[text()="Edit"]');
        await completarTexto(page,'div.edit-container input','editado');
        await hacerClick(page,'//button[text()="Save"]');
        //eliminar
        for (let k=0; k<4;k++){
            await hacerClick(page,'//button[text()="Delete"]');
        }
        await hacerClick(page,'i[class="fas fa-sign-out-alt"]');
        await page.goto('http://localhost:5173');
        await page.waitForTimeout(2000);

        //await select(page,'tbody tr select','In Process');

        

    } catch (error) {
        console.error(error);
        testInfo.attach("error", {
           body: await sacarScreenshot(page, testInfo),
           contentType: "image/png",
        })
        throw error;
     } 
  })
