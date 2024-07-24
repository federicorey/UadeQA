import { Page, Frame } from 'playwright';
import { TestInfo } from 'playwright/test';


export function timestamp(): string {
    const date = new Date();
    // Formatear la fecha actual en el formato deseado (yyyy-mm-dd)
    const fecha_formateada = date.toLocaleDateString('en-CA'); // Formato 'yyyy-mm-dd'
    // Formatear la hora actual en el formato deseado (HHMMSS)
    const hora_formateada = date.toTimeString().split(' ')[0].replace(/:/g, '');
    return hora_formateada;
  }
export async function hacerClick(page: Page | Frame, selector: string, timeout: number = 15000): Promise<void> {
    try {
        // Esperar a que el selector esté disponible en la página
        await page.waitForSelector(selector, { timeout });
        await page.click(selector);
    } catch (error) {
        // Añadir más detalles al error antes de lanzarlo
        console.error(error);
        throw new Error(`Error al querer hacer click en '${selector}': ${error.message}`);
    }
}

export async function select(page:Page|Frame,selector:string,value) {
    await page.selectOption(selector,value)
}

export async function completarTexto(page: Page | Frame, selector: string, texto: string, timeout: number = 15000): Promise<void> {
    try {
        // Esperar a que el selector esté disponible en la página
        await page.waitForSelector(selector, { timeout });
        await page.fill(selector,texto);
    } catch (error) {
        // Añadir más detalles al error antes de lanzarlo
        console.error(error);
        throw new Error(`Error al querer hacer click en '${selector}': ${error.message}`);
    }
}

export async function sacarScreenshot(page: Page, testInfo: TestInfo) {
    try {
        const screenshotPath = `reports/error-${testInfo.title}-${timestamp()}.png`;
        return await page.screenshot({ path: screenshotPath });
    } catch (screenshotError) {
        console.error('Error al tomar la captura de pantalla:', screenshotError);
    }
}

// Credenciales aleatorias
export async function crearNameAleatorio(){
    return `${timestamp()}`
}
export async function crearMailAleatorio():Promise<string>{
    return `${timestamp()}@gmail.com`
}
export async function crearPasswordAleatoria():Promise<string>{
    return `Tp${timestamp()}!`
}
export async function agregarTask(page:Page|Frame, descripcion:string = timestamp(),assigned:string,fecha?:string){
    await hacerClick(page,'//button[text()="Create New Task"]');
    await completarTexto(page,'input[name="description"]',descripcion);
    await completarTexto(page,'input[name="assigned"]',assigned);
    if (fecha != undefined){
        const [day, month, year] = fecha.split('-');
        await hacerClick(page,'input[name="dueDate"]');
        await page.type('input[name="dueDate"]',year);
        await page.press('input[name="dueDate"]','Shift+Tab');
        await page.type('input[name="dueDate"]',month);
        await page.press('input[name="dueDate"]','Shift+Tab');
        await page.press('input[name="dueDate"]','Shift+Tab');
        await page.type('input[name="dueDate"]',day);
    await hacerClick(page,'//button[text()="Add Task"]');
    }
}

export async function obtenerElementos(page:Page|Frame,selector:string) {
    const elementos = page.locator(selector).elementHandles();
    return elementos
}

export async function obtenerTexto(page: Page | Frame, selector: string): Promise<string> {
    try {
        // Esperar a que el selector esté disponible en la página
        await page.waitForSelector(selector, { timeout: 15000 });

        let value: string | undefined | null;

        try {
            value = await page.innerText(selector);
            if (value) {
                return value;
            }
        } catch (error) {
            // Ignorar el error y continuar con el siguiente intento
        }

        try {
            value = await page.inputValue(selector);
            if (value) {
                return value;
            }
        } catch (error) {
            // Ignorar el error y continuar con el siguiente intento
        }

        try {
            value = await page.textContent(selector);
            if (value) {
                return value;
            }
        } catch (error) {
            // Ignorar el error y continuar con el siguiente intento
        }

        try {
            value = await page.getAttribute(selector, 'value');
            if (value) {
                return value;
            }
        } catch (error) {
            // Ignorar el error y continuar con el siguiente intento
        }

        try {
            value = await page.evaluate(selector => {
                const element = document.querySelector(selector);
                return element ? element.textContent : null;
            }, selector);
            if (value) {
                return value;
            }
        } catch (error) {
            // Ignorar el error y continuar con el siguiente intento
        }

        // Si ninguna de las opciones anteriores funcionó, lanzar un error
        throw new Error(`No se pudo obtener el texto del selector '${selector}' con ninguno de los métodos disponibles.`);
    } catch (error) {
        // Añadir más detalles al error antes de lanzarlo
        console.error(error);
        throw new Error(`Error obteniendo el texto del selector '${selector}': ${error.message}`);
    }
}


export async function existeTexto(page:Page,etiqueta:string,texto:string){
    try {
        //page.waitForURL('http://localhost:5173/task-manager');
        const element = await page.$(`//${etiqueta}[contains(text(), "${texto}")]`);
        
        // Si el elemento existe, devuelve true
        return element !== null;
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        console.error(`Error buscando el texto "${texto}" en la etiqueta "${etiqueta}":`, error);
        return false;
    }
}
