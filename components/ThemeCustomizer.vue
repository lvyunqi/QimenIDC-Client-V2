<template>
    <div>
        <div
            class="fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]"
            :class="{ '!block': showCustomizer }"
            @click="showCustomizer = false"
        ></div>

        <nav
            class="fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[400px] rtl:-left-[400px] dark:bg-[#0e1726]"
            :class="{ 'ltr:!right-0 rtl:!left-0': showCustomizer }"
        >
            <a
                href="javascript:;"
                class="absolute bottom-0 top-0 my-auto flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white ltr:-left-12 ltr:rounded-bl-full ltr:rounded-tl-full rtl:-right-12 rtl:rounded-br-full rtl:rounded-tr-full"
                @click="showCustomizer = !showCustomizer"
            >
                <icon-settings class="h-5 w-5 animate-[spin_3s_linear_infinite]" />
            </a>
            <client-only>
                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="relative h-full overflow-x-hidden ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3"
                >
                    <div>
                        <div class="relative pb-5 text-center">
                            <a
                                href="javascript:;"
                                class="absolute top-0 opacity-30 hover:opacity-100 ltr:right-0 rtl:left-0 dark:text-white"
                                @click="showCustomizer = false"
                            >
                                <icon-x class="h-5 w-5" />
                            </a>
                            <h4 class="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                            <p class="text-white-dark">Set preferences that will be cookied for your live preview demonstration.</p>
                        </div>
                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Color Scheme</h5>
                            <p class="text-xs text-white-dark">Overall light or dark presentation.</p>
                            <div class="mt-3 grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.theme === 'light' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleTheme('light')"
                                >
                                    <icon-sun class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />

                                    Light
                                </button>
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleTheme('dark')"
                                >
                                    <icon-moon class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />

                                    Dark
                                </button>
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.theme === 'system' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleTheme('system')"
                                >
                                    <icon-laptop class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />

                                    System
                                </button>
                            </div>
                        </div>

                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Navigation Position</h5>
                            <p class="text-xs text-white-dark">Select the primary navigation paradigm for your app.</p>
                            <div class="mt-3 grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.menu === 'horizontal' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleMenu('horizontal')"
                                >
                                    Horizontal
                                </button>
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.menu === 'vertical' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleMenu('vertical')"
                                >
                                    Vertical
                                </button>
                                <button
                                    type="button"
                                    class="btn"
                                    :class="[store.menu === 'collapsible-vertical' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleMenu('collapsible-vertical')"
                                >
                                    Collapsible
                                </button>
                            </div>
                            <div class="mt-5 text-primary">
                                <label class="mb-0 inline-flex">
                                    <input v-model="store.semidark" type="checkbox" class="form-checkbox" @change="store.toggleSemidark(store.semidark)" />
                                    <span>Semi Dark (Sidebar & Header)</span>
                                </label>
                            </div>
                        </div>
                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Layout Style</h5>
                            <p class="text-xs text-white-dark">Select the primary layout style for your app.</p>
                            <div class="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    class="btn flex-auto"
                                    :class="[store.layout === 'boxed-layout' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleLayout('boxed-layout')"
                                >
                                    Box
                                </button>
                                <button
                                    type="button"
                                    class="btn flex-auto"
                                    :class="[store.layout === 'full' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleLayout('full')"
                                >
                                    Full
                                </button>
                            </div>
                        </div>
                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Direction</h5>
                            <p class="text-xs text-white-dark">Select the direction for your app.</p>
                            <div class="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    class="btn flex-auto"
                                    :class="[store.rtlClass === 'ltr' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleRTL('ltr')"
                                >
                                    LTR
                                </button>
                                <button
                                    type="button"
                                    class="btn flex-auto"
                                    :class="[store.rtlClass === 'rtl' ? 'btn-primary' : 'btn-outline-primary']"
                                    @click="store.toggleRTL('rtl')"
                                >
                                    RTL
                                </button>
                            </div>
                        </div>

                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Navbar Type</h5>
                            <p class="text-xs text-white-dark">Sticky or Floating.</p>
                            <div class="mt-3 flex items-center gap-3 text-primary">
                                <label class="mb-0 inline-flex">
                                    <input
                                        :checked="store.navbar === 'navbar-sticky'"
                                        type="radio"
                                        value="navbar-sticky"
                                        class="form-radio"
                                        @change="store.toggleNavbar('navbar-sticky')"
                                    />
                                    <span>Sticky</span>
                                </label>
                                <label class="mb-0 inline-flex">
                                    <input
                                        :checked="store.navbar === 'navbar-floating'"
                                        type="radio"
                                        value="navbar-floating"
                                        class="form-radio"
                                        @change="store.toggleNavbar('navbar-floating')"
                                    />
                                    <span>Floating</span>
                                </label>
                                <label class="mb-0 inline-flex">
                                    <input
                                        :checked="store.navbar === 'navbar-static'"
                                        type="radio"
                                        value="navbar-static"
                                        class="form-radio"
                                        @change="store.toggleNavbar('navbar-static')"
                                    />
                                    <span>Static</span>
                                </label>
                            </div>
                        </div>

                        <div class="mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
                            <h5 class="mb-1 text-base leading-none dark:text-white">Router Transition</h5>
                            <p class="text-xs text-white-dark">Animation of main content.</p>
                            <div class="mt-3">
                                <select v-model="store.animation" class="form-select border-primary text-primary" @change="store.toggleAnimation()">
                                    <option value="">None</option>
                                    <option value="animate__fadeIn">Fade</option>
                                    <option value="animate__fadeInDown">Fade Down</option>
                                    <option value="animate__fadeInUp">Fade Up</option>
                                    <option value="animate__fadeInLeft">Fade Left</option>
                                    <option value="animate__fadeInRight">Fade Right</option>
                                    <option value="animate__slideInDown">Slide Down</option>
                                    <option value="animate__slideInLeft">Slide Left</option>
                                    <option value="animate__slideInRight">Slide Right</option>
                                    <option value="animate__zoomIn">Zoom In</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </perfect-scrollbar>
            </client-only>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    const showCustomizer = ref(false);
</script>
