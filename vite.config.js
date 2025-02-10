import { defineConfig } from 'vite';
import reactPlugin from  '@vitejs/plugin-react';

// OBJETO DE CONFIGURACIÓN DE PLUGINS Y MAS.
const CONFIG_REACT_PLUGIN = {
    plugins:[reactPlugin()] 
}

export default defineConfig(CONFIG_REACT_PLUGIN);