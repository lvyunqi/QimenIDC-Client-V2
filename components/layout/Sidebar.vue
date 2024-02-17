<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav class="drop-shadow-md sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300">
            <div class="h-full bg-white dark:bg-[#0e1726]">
                <div class="flex items-center justify-between px-4 py-3">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="" />
                        <span class="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">QimenIDC</span>
                    </NuxtLink>
                    <a
                        href="javascript:;"
                        class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                        @click="store.toggleSidebar()"
                    >
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <client-only>
                    <perfect-scrollbar
                        :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }"
                        class="relative h-[calc(100vh-80px)]"
                    >
                        <ul class="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li class="nav-item">
                                <NuxtLink to="/" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-dashboard class="shrink-0 group-hover:!text-primary" />
                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {{ $t('dashboard') }}
                                        </span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('Instance Management') }}</span>
                            </h2>

                            <li class="nav-item">
                                <ul>
                                    <li class="nav-item">
                                        <NuxtLink to="/apps/chat" class="group" @click="toggleMobileMenu">
                                            <div class="flex items-center">
                                                <icon-menu-datatables class="shrink-0 group-hover:!text-primary" />

                                                <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Instance List')
                                                }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/apps/mailbox" class="group" @click="toggleMobileMenu">
                                            <div class="flex items-center">
                                                <icon-menu-documentation class="shrink-0 group-hover:!text-primary" />

                                                <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Template list')
                                                }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    
                                </ul>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('Image Management') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <NuxtLink to="/charts" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-cloud class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            Cloud-Images
                                        </span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <li class="menu nav-item">
                                <NuxtLink to="/widgets" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-iso class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            ISO
                                        </span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('IP management') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <NuxtLink to="/tables" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-contacts class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('IPV4 Pool List')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('Area Management') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <NuxtLink to="/tables" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-map class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('Regions')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('Node Management') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <NuxtLink to="/tables" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-node class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('Node List')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <li class="menu nav-item">
                                <NuxtLink to="/node/vnc" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-vnc class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('VNC controller')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <icon-minus class="hidden h-5 w-4 flex-none" />
                                <span>{{ $t('System settings') }}</span>
                            </h2>

                            <li class="menu nav-item">
                                <NuxtLink to="/system/account" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-users class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('account management')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <li class="menu nav-item">
                                <NuxtLink to="/system/setting" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-setting class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('system configuration')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>

                            <li class="menu nav-item">
                                <NuxtLink to="/system/api" class="nav-link group" @click="toggleMobileMenu">
                                    <div class="flex items-center">
                                        <icon-menu-widgets class="shrink-0 group-hover:!text-primary" />

                                        <span class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('API management')
                                        }}</span>
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </perfect-scrollbar>
                </client-only>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';

    import { useAppStore } from '@/stores/index';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    const store = useAppStore();
    const activeDropdown: any = ref('');
    const subActive: any = ref('');

    onMounted(() => {
        setTimeout(() => {
            const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');

            if (selector) {
                selector.classList.add('active');
                const ul: any = selector.closest('ul.sub-menu');
                if (ul) {
                    let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];

                    if (ele.length) {
                        ele = ele[0];
                        setTimeout(() => {
                            ele.click();
                        });
                    }
                }
            }
        });
    });

    const toggleMobileMenu = () => {
        if (window.innerWidth < 1024) {
            store.toggleSidebar();
        }
    };
</script>
