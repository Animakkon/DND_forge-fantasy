import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router/router.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import AutoComplete from 'primevue/autocomplete';
import Button from "primevue/button";
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Message from "primevue/message";
import Panel from "primevue/panel";
import Select from 'primevue/select'
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import 'primeicons/primeicons.css';

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('AutoComplete', AutoComplete);
app.component('Button', Button);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Image', Image);
app.component('Message', Message);
app.component('Panel', Panel);
app.component('Select', Select);

app.mount('#app');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('src/utils/service-workers/service-worker.ts')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('SW reg error: ', error)
        })
}
