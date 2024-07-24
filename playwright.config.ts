import { defineConfig } from '@playwright/test';
//import { testPlanFilter } from "allure-playwright/dist/testplan";


export default defineConfig({
    testDir: './tests', // Asegúrate de que esta ruta coincide con la carpeta donde tienes tus tests
    use: {
        browserName: 'chromium',
        //headless: false,
        launchOptions: {
          args: [
            '--start-maximized',          // Iniciar en pantalla completa
            /*'--window-position=-1920,-1080',  // Colocar la ventana en el segundo monitor (a la izquierda)
            '--window-size=1920,1080',    // Ajustar el tamaño de la ventana a la resolución del monitor*/
          ],
        },
        //viewport: { width: 1920, height: 1080 },
        /*video: {
            mode: 'on',  // Grabación de video activada
            size: { width: 1920, height: 1080 },  // Tamaño del video
          },*/
      },
    //grep: testPlanFilter(),
    //reporter: [["line"], ["allure-playwright"]],
    reporter: [['html', { open: 'never' }]], // Añade esta línea para generar reportes HTML
    
});
