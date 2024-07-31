import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router/router.js'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import Column from 'primevue/column'
import Select from 'primevue/select'
import Button from "primevue/button";
import Message from "primevue/message";
import AutoComplete from 'primevue/autocomplete';
import { createPinia } from "pinia";
import 'primeicons/primeicons.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Image', Image);
app.component('Select', Select);
app.component('InputNumber', InputNumber);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('AutoComplete', AutoComplete);
app.component('Message', Message);

app.mount('#app');
