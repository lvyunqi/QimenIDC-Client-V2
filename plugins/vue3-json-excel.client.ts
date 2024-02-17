import vue3JsonExcel from 'vue3-json-excel';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vue3JsonExcel);
});
