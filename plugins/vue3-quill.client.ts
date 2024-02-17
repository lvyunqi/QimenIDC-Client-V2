import { quillEditor } from 'vue3-quill';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('quillEditor', quillEditor);
});
