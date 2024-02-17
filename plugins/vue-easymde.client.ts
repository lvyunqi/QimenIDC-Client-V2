import VueEasymde from 'vue3-easymde';
import 'easymde/dist/easymde.min.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueEasymde);
});
