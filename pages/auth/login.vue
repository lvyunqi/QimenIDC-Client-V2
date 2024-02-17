<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0"
            >
                <div
                    class="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
                >
                    <div
                        class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"
                    ></div>
                    <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                        <NuxtLink to="/" class="ms-10 block w-48 lg:w-72">
                            <img src="/assets/images/auth/logo-white.svg" alt="Logo" class="w-full" />
                        </NuxtLink>
                        <div class="mt-24 hidden w-full max-w-[430px] lg:block">
                            <img src="/assets/images/auth/login.svg" alt="Cover Image" class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div class="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                        <NuxtLink to="/" class="block w-8 lg:hidden">
                            <img src="/assets/images/logo.svg" alt="Logo" class="mx-auto w-10" />
                        </NuxtLink>
                        <div class="dropdown ms-auto w-max">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                                    <button
                                        type="button"
                                        class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    >
                                        <div>
                                            <img :src="currentFlag" alt="image" class="h-5 w-5 rounded-full object-cover" />
                                        </div>
                                        <div class="text-base font-bold uppercase">{{ store.locale }}</div>
                                        <span class="shrink-0">
                                            <icon-caret-down />
                                        </span>
                                    </button>
                                    <template #content="{ close }">
                                        <ul
                                            class="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90"
                                        >
                                            <template v-for="item in store.languageList" :key="item.code">
                                                <li>
                                                    <button
                                                        type="button"
                                                        class="w-full hover:text-primary"
                                                        :class="{ 'bg-primary/10 text-primary': store.locale === item.code }"
                                                        @click="changeLanguage(item), close()"
                                                    >
                                                        <img
                                                            class="h-5 w-5 rounded-full object-cover"
                                                            :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                            alt=""
                                                        />
                                                        <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                                    </button>
                                                </li>
                                            </template>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div>
                    </div>
                    <div class="w-full max-w-[440px] lg:mt-16">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{{ $t('Sign in') }}</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">{{ $t('Enter your username and password to login') }}</p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="router.push('/')">
                            <div>
                                <label for="username">{{ $t('Username') }}</label>
                                <div class="relative text-white-dark">
                                    <input id="username" type="username" placeholder="Enter Username" class="form-input ps-10 placeholder:text-white-dark" required />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-user :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="Password">{{$t('Password')}}</label>
                                <div class="relative text-white-dark">
                                    <input id="Password" type="password" placeholder="Enter Password" class="form-input ps-10 placeholder:text-white-dark" required />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="Remember" class="flex cursor-pointer items-center">
                                    <input id="Remember" type="checkbox" class="form-checkbox bg-white dark:bg-black" />
                                    <span class="text-white-dark">{{$t('Remember password')}}</span>
                                </label>
                            </div>
                            <button type="submit" @click="onlogin" class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                {{ $t('Sign in') }}
                            </button>
                        </form>
                    </div>
                    <p class="absolute bottom-6 w-full text-center dark:text-white">© {{ new Date().getFullYear() }}.QimenIDC - {{$t('Wuhan Jizhi Network Technology Co., Ltd.')}} All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
    import { computed,onMounted } from 'vue';
    import appSetting from '@/app-setting';
    import { useAppStore } from '@/stores/index';
    import { useRouter } from 'vue-router';
    import { useMyTokenStore } from '@/stores/token';
    import Swal from 'sweetalert2';

    const { t,setLocale } = useI18n();
    useHead({ title: t('Sign in') });
    const router = useRouter();
    const userToken = useMyTokenStore();
    definePageMeta({
        layout: 'auth-layout',
    });
    const rememberPassword  = ref(0);
    const store = useAppStore();

    onMounted(async () => {
        fillPage();
    });

    // multi language
    const changeLanguage = (item: any) => {
        appSetting.toggleLanguage(item, setLocale);
    };
    const currentFlag = computed(() => {
        return `/assets/images/flags/${store.locale?.toUpperCase()}.svg`;
    });

    // 页面填充
    const fillPage = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('Password') as HTMLInputElement;
        const remember = document.getElementById('Remember') as HTMLInputElement;

        if (localStorage.getItem('RememberTimestamp')) {
            // 获取当前时间戳
            const timestamp = new Date().getTime();
            // 获取记住密码的时间戳
            const RememberTimestamp = localStorage.getItem('RememberTimestamp');
            // 计算时间差
            const timeDifference = timestamp - parseInt(RememberTimestamp as string);
            // 判断时间差是否大于7天604800000
            if (timeDifference > 604800000) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('remember');
                localStorage.removeItem('RememberTimestamp');
                return;
            }
        }

        if (localStorage.getItem('username')) {
            username.value = localStorage.getItem('username') as string;
        }
        if (localStorage.getItem('password')) {
            password.value = localStorage.getItem('password') as string;
        }
        if (localStorage.getItem('remember')) {
            remember.checked = true;
        }
    };

    // 预加载音效
    //const audioUrls = ['/assets/sounds/notice.mp3']

    // login
    const onlogin = () => {
        const { loginApi } = useApi();
        // 获取表单数据
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('Password') as HTMLInputElement;
        // 记住密码
        const remember = document.getElementById('Remember') as HTMLInputElement;
        // 判断remember是否选中
        if (remember.checked) {
            rememberPassword.value = 1;
        } else {
            rememberPassword.value = 0;
        }
        // 判断表单数据是否为空
        if (username.value === '' || password.value === '') {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            toast.fire({
                icon: 'error',
                title: t('Username and password cannot be empty!'),
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            return;
        }
        // 发送请求
        loginApi.loginDo({ username: username.value, password: password.value}).then((res) => {
            if (res.code === 20000) {
                // 播放音效
                const audio = new Audio('/assets/sounds/notice.mp3');
                audio.preload = 'auto'; // 预加载音频
                audio.play();
                // 登录成功
                const toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
                toast.fire({
                    icon: 'success',
                    title: t('Signed in successfully!'),
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
                // 判断是否记住密码，如果记住密码则存储到localStorage 7天，否则清除localStorage
                if (rememberPassword.value === 1) {
                    localStorage.setItem('username', username.value);
                    localStorage.setItem('password', password.value);
                    localStorage.setItem('remember', rememberPassword.value.toString());
                    // 获取当前时间戳
                    const timestamp = new Date().getTime();
                    // 判断是否已经存储过时间戳
                    if (!localStorage.getItem('RememberTimestamp')) {
                        // 存储到localStorage
                        localStorage.setItem('RememberTimestamp', timestamp.toString());
                    }
                    
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('remember');
                    localStorage.removeItem('RememberTimestamp');
                }
                // 存储token
                userToken.setToken(res.data);
                // 跳转到首页
                navigateTo('/');
            }else {
                // 登录失败
                const toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
                toast.fire({
                    icon: 'error',
                    title: t('Login failed'),
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            }
        });

    };
</script>
