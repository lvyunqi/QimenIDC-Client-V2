<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
          <NuxtLink to="/" class="hover:text-gray-500/70 dark:hover:text-white-dark/70">
            <icon-home class="shrink-0 group-hover:!text-primary" />
          </NuxtLink>
        </li>
        <li class="before:mr-2 before:content-['/'] rtl:before:ml-2">
            <span>{{ $t('System settings') }}</span>
        </li>
        <li class="before:mr-2 before:content-['/'] rtl:before:ml-2">
            <span>{{$t('system configuration')}}</span>
        </li>
    </ul>

    <div class="panel mt-6 pb-2">
      <!-- <div class="mb-5 flex items-center justify-between">
          <h5 class="text-lg font-semibold dark:text-white-light">{{$t('system configuration')}}</h5>
      </div> -->
      <form class="mb-5 space-y-5">
          <div>
              <label for="iconLeft">{{$t('Token')}}</label>
              <div class="flex">
                  <!-- <input id="iconLeft" type="text" placeholder="Notification" class="form-input ltr:rounded-r-none rtl:rounded-l-none" /> -->
                  <input id="token" type="text" v-model="token" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                  <button type="button" @click="copy(token)" class="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none w-24">
                        <icon-copy class="text-white-blue" />
                        {{$t('copy')}}
                  </button>
              </div>
              <div class="!mt-2">
                  <span class="text-white-dark text-[11px] inline-block">{{$t('*It is not recommended to be too simple.')}}</span>
              </div>
          </div>
          <div>
              <label for="iconRight">{{$t('Global default Linux system disk size')}}</label>
              <div class="flex">
                  <input id="linuxSystemDiskSize" type="text" v-model="linuxSystemDiskSize" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                  <div
                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                  >
                    GB
                  </div>
              </div>
          </div>
          <div>
              <label for="iconRight">{{$t('Global default Windows system disk size')}}</label>
              <div class="flex">
                  <input id="winSystemDiskSize" type="text" v-model="winSystemDiskSize" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                  <div
                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                  >
                    GB
                  </div>
              </div>
          </div>
          <div>
              <label for="iconRight">{{$t('I/O limitations within the system')}}</label>
              <div class="flex">
                  <input id="bwlimit" type="text" v-model="bwlimit" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                  <div
                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                  >
                    KB/s
                  </div>
              </div>
          </div>
          <div>
              <label for="iconRight">{{$t('VNC failure timeout')}}</label>
              <div class="flex">
                  <input id="vncTime" type="text" v-model="vncTime" class="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                  <div
                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                  >
                    min
                  </div>
              </div>
          </div>
          <button type="button" @click="submit" class="btn btn-primary !mt-6">{{$t('Submit')}}</button>
        </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref,onMounted } from 'vue';
  import Swal from 'sweetalert2';

  const { t } = useI18n();
  const { setting } = useApi();
  let clipboard: any = ref();

  const token = ref('');
  const linuxSystemDiskSize = ref('');
  const winSystemDiskSize = ref('');
  const bwlimit = ref('');
  const vncTime = ref('');

  useHead({ title: t('System settings') });

  onMounted(async () => {
    const vueClipboard3 = await import('vue-clipboard3');
    let { toClipboard } = vueClipboard3.default();
    clipboard = toClipboard;
    await getSystemConfig();
  });

  const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
  };

  const copy = async (msg: Text) => {
    if (msg) {
      await clipboard(msg);
      showMessage(t('Copied successfully.'));
    }
  };

  // 获取系统配置
  const getSystemConfig = async () => {
    const res = await setting.getSettingList();
    token.value = res.data.token;
    linuxSystemDiskSize.value = res.data.linuxSystemDiskSize;
    winSystemDiskSize.value = res.data.winSystemDiskSize;
    bwlimit.value = res.data.bwlimit;
    vncTime.value = res.data.vncTime;
  };

  // 提交更新系统配置
  const submitSystemConfig = async () => {
    const res = await setting.updateSetting({
      id: 1,
      token: token.value,
      linuxSystemDiskSize: linuxSystemDiskSize.value,
      winSystemDiskSize: winSystemDiskSize.value,
      bwlimit: bwlimit.value,
      vncTime: vncTime.value,
    });
    if (res){
      showMessage(t('Modified successfully.'));
      await getSystemConfig();
    }
  };

  // 提交
  const submit = async () => {
    Swal.fire({
      title: t('Are you sure?'),
      text: t('You are about to modify the system configuration!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes, modify it!'),
      cancelButtonText: t('No, keep it'),
    }).then((result) => {
      if (result.isConfirmed) {
        submitSystemConfig();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(t('Cancelled'), t('Your system configuration is safe :)'), 'error');
      }
    });
  };
</script>
