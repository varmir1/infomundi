# InfoMundi - Mapa Interactivo de Países

## Funcionamiento de este proyecto

### 1. Inicio de la Interacción
- **Acción del Usuario**: El usuario hace clic en cualquier punto del mapa mundial
- **Captura de Datos**: El sistema registra las coordenadas geográficas (latitud y longitud) del punto seleccionado

### 2. Procesamiento de Datos
1. **Conversión de Coordenadas a País**:
   - El sistema utiliza `getCountryFromCoordinates` para determinar qué país corresponde a las coordenadas seleccionadas
   - Esta función hace una llamada a la API de geocodificación para obtener el nombre del país

2. **Obtención de Información Detallada**:
   - Una vez identificado el país, `getCountryInfo` realiza llamadas a múltiples APIs:
     - API de información básica del país (bandera, capital, región, etc.)
     - API de datos demográficos (población, estadísticas, etc.)
   - Los datos se combinan en un único objeto de información

3. **Almacenamiento de Datos**:
   - La información obtenida se guarda en el estado de la aplicación usando React Hooks
   - Se actualizan los estados de carga y error según corresponda

### 3. Visualización de la Información
1. **Componente CountryInfo**:
   - Recibe los datos procesados a través de props
   - Muestra la información básica del país:
     - Bandera
     - Nombre
     - Capital
     - Población
     - Región y subregión

2. **Interacción con Datos Demográficos**:
   - El usuario puede hacer clic en el botón "Show population details"
   - Al activarse, se muestran datos históricos de población:
     - Evolución anual de la población
     - Cambios demográficos
     - Estadísticas detalladas

3. **Control de Estados**:
   - `showPopulationDetails`: Controla la visibilidad de los datos demográficos
   - `loading`: Indica cuando se están cargando datos
   - `error`: Maneja y muestra mensajes de error cuando sea necesario

### Ejemplo de Flujo Completo
1. Usuario hace clic en España en el mapa
2. Sistema captura las coordenadas (40.4168, -3.7038)
3. `getCountryFromCoordinates` identifica "Spain"
4. `getCountryInfo` obtiene:
   ```json
   {
     "country": {
       "name": { "common": "Spain" },
       "capital": "Madrid",
       "population": 47351567,
       "region": "Europe"
     },
     "population": {
       "historical_population": [
         {
           "year": 2024,
           "population": 47910526,
           "yearly_change": -1053
         }
       ]
     }
   }
   ```
5. Los datos se muestran en el panel de información
6. El usuario puede explorar los detalles demográficos haciendo clic en el botón correspondiente

Este flujo de datos permite una experiencia interactiva y detallada para explorar información de países alrededor del mundo.

## Instalación y Ejecución

### Requisitos Previos
- Node.js (versión 14 o superior)
- NPM (Node Package Manager)

### Pasos para Iniciar el Proyecto

1. **Clonar el Repositorio**
   ```bash
   git clone git@github.com:varmir1/infomundi.git
   cd infomundi
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```
   Este comando instalará todas las dependencias necesarias:
   - React
   - React-Leaflet
   - TypeScript
   - Otras dependencias del proyecto

3. **Iniciar el Servidor de Desarrollo**
   ```bash
   npm start
   ```
   - La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`
   - El servidor de desarrollo incluye:
     - Recarga automática al hacer cambios
     - Mensajes de error en la consola
     - Optimizaciones para desarrollo

4. **Construir para Producción**
   ```bash
   npm run build
   ```
   - Genera una versión optimizada en la carpeta `build`
   - Lista para desplegar en cualquier servidor web
