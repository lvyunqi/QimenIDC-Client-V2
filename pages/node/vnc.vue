<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
          <NuxtLink to="/" class="hover:text-gray-500/70 dark:hover:text-white-dark/70">
            <icon-home class="shrink-0 group-hover:!text-primary" />
          </NuxtLink>
        </li>
        <li class="before:mr-2 before:content-['/'] rtl:before:ml-2">
            <span>{{ $t('Node Management') }}</span>
        </li>
        <li class="before:mr-2 before:content-['/'] rtl:before:ml-2">
            <span>{{$t('VNC controller')}}</span>
        </li>
    </ul>
    <div class="panel mt-6 pb-0">
      <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 class="text-lg font-semibold dark:text-white-light">{{ $t('API management') }}</h5>
          <div class="ltr:ml-auto rtl:mr-auto">
            <button type="button" @click="increase" class="btn btn-outline-info">
              <icon-checks class="h-6 w-6" />
              <span class="align-middle">{{$t('increase')}}</span>
            </button>
          </div>
      </div>
      <div class="table-responsive">
          <table class="table-auto">
              <thead>
                  <tr>
                      <th>{{$t('ID')}}</th>
                      <th>{{$t('name')}}</th>
                      <th>{{$t('host')}}</th>
                      <th>{{$t('port')}}</th>
                      <th>{{$t('domain')}}</th>
                      <th>{{$t('Status')}}</th>
                      <th>{{$t('CreateTime')}}</th>
                      <th>{{$t('Action')}}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="row in rows" :key="row.id">
                      <td>{{ row.id }}</td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.host }}</td>
                      <td>{{ row.port }}</td>
                      <td>{{ row.domain }}</td>
                      <td>
                        <div class="flex flex-wrap items-center gap-3 whitespace-no-wrap overflow-hidden text-center">
                          <!-- 状态0为激活 -->
                          <span v-if="row.status === 0" class="badge font-medium bg-green-100 text-green-500 text-xs px-2 py-1 w-14 rounded"><span class="p-1 rounded-full bg-green-500 inline-block mr-1"></span>{{ $t('Activated') }}</span>
                          <!-- 状态1为禁用 -->
                          <span v-else class="badge font-medium bg-red-100 text-red-500 text-xs px-2 py-1 w-14 rounded"><span class="p-1 rounded-full bg-red-500 inline-block mr-1"></span>{{ $t('Disabled') }}</span>
                        </div>
                        
                      </td>
                      <td>{{ row.createDate }}</td>
                      <td>
                          <div class="flex items-center justify-center space-x-2">
                            <button type="button" @click="checkStatus(row.id,row.status)" class="btn btn-sm" :class="{
                                'btn-outline-warning': row.status === 0,
                                'btn-outline-success': row.status === 1
                            }">
                                <icon-minus-circle v-if="row.status === 0" class="h-5 w-5" />
                                <icon-play-circle v-else class="h-5 w-5" />
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary"  @click="edit(row.id)">
                              <icon-pencil class="h-5 w-5" />
                            </button>
                            <button type="button" @click="deleteVncData(row.id)" class="btn btn-sm btn-outline-danger">
                                <icon-trash class="h-5 w-5" />
                            </button>
                          </div>
                      </td>
                  </tr>

                  <tr v-if="rows.length === 0">
                      <td :colspan="7" class="text-center">{{ $t('No data available in table') }}</td>
                  </tr>
              </tbody>
          </table>
          <div class="mb-2 flex flex-col gap-5 md:flex-row md:items-center">

              <div class="flex items-center">
                <span class="mr-2">{{ $t('Show') }}</span>
                <select class="form-select w-20" v-model="pageSize" @change="getVncList">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <span class="ml-2">{{ $t('entries') }}</span>
                
              </div>
              <div class="ltr:ml-auto rtl:mr-auto">
                <ul class="m-auto mb-4 inline-flex items-center space-x-1 rtl:space-x-reverse">
                    <li>
                        <button
                            type="button"
                            class="flex justify-center rounded-full bg-white-light p-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                            @click="firstPage"
                            :disabled="currentPage === 1"
                            :class="{ 'cursor-not-allowed': currentPage === 1 }"
                        >
                          <icon-carets-down class="rotate-90 rtl:-rotate-90" />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="flex justify-center rounded-full bg-white-light p-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                            @click="prevPage"
                            :disabled="currentPage === 1"
                            :class="{ 'cursor-not-allowed': currentPage === 1 }"
                        >
                            <icon-caret-down class="w-5 h-5 rotate-90 rtl:-rotate-90" />
                        </button>
                    </li>
                    <li v-if="currentPage > 1">
                        <button
                            type="button"
                            @click="prevPage"
                            class="flex justify-center rounded-full bg-white-light px-3.5 py-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                        >
                            {{ currentPage - 1 }}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="flex justify-center rounded-full bg-primary px-3.5 py-2 font-semibold text-white transition dark:bg-primary dark:text-white-light"
                        >
                            {{ currentPage }}
                        </button>
                    </li>
                    <li v-if="currentPage < totalPage">
                        <button
                            type="button"
                            @click="nextPage"
                            class="flex justify-center rounded-full bg-white-light px-3.5 py-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                        >
                            {{ currentPage + 1 }}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="flex justify-center rounded-full bg-white-light p-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                            @click="nextPage"
                            :disabled="currentPage === totalPage"
                            :class="{ 'cursor-not-allowed': currentPage === totalPage }"
                        >
                            <icon-caret-down class="w-5 h-5 -rotate-90 rtl:rotate-90" />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="flex justify-center rounded-full bg-white-light p-2 font-semibold text-dark transition hover:bg-primary hover:text-white dark:bg-[#191e3a] dark:text-white-light dark:hover:bg-primary"
                            @click="lastPage"
                            :disabled="currentPage === totalPage"
                            :class="{ 'cursor-not-allowed': currentPage === totalPage }"
                        >
                            <icon-carets-down class="-rotate-90 rtl:rotate-90" />
                        </button>
                    </li>
                </ul>
              </div>
          </div>
      </div>
    </div>
  </div>
  <!-- 编辑 -->
  <div>
    <client-only>
      <TransitionRoot appear :show="editMod" as="template">
        <Dialog as="div" @close="editMod = false" class="relative z-[51]">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-[black]/60" />
          </TransitionChild>
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-start justify-center px-4 py-8">
              <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                    class="panel w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark"
                >
                  <button
                      type="button"
                      class="absolute top-7 text-white-dark outline-none hover:text-dark ltr:right-9 rtl:left-9"
                      @click="editMod = false"
                  >
                      <icon-x class="w-5 h-5" />
                  </button>
                  <div class="py-5 text-lg font-semibold ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{{$t('edit')}}</div>
                  <div class="p-5">
                    <form>
                        <label for="Name">{{$t('name')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-award class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Name" v-model="editName" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="host">{{$t('host')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-airplay class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="host" v-model="editHost" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="port">{{$t('port')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-at />
                            </span>
                            <input type="number" placeholder="port" v-model="editPort" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="domain">{{$t('domain')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-globe class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="domain" v-model="editDomain" class="form-input
                            ltr:pl-10 rtl:pr-10" />
                        </div>
                        <button type="button" @click="editDo" class="btn btn-primary w-full">{{$t('Submit')}}</button>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </client-only>
  </div>
  <!-- 新增 -->
  <div>
    <client-only>
      <TransitionRoot appear :show="increaseMod" as="template">
        <Dialog as="div" @close="increaseMod = false" class="relative z-[51]">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-[black]/60" />
          </TransitionChild>
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-start justify-center px-4 py-8">
              <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                    class="panel w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark"
                >
                  <button
                      type="button"
                      class="absolute top-7 text-white-dark outline-none hover:text-dark ltr:right-9 rtl:left-9"
                      @click="increaseMod = false"
                  >
                      <icon-x class="w-5 h-5" />
                  </button>
                  <div class="py-5 text-lg font-semibold ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{{$t('increase')}}</div>
                  <div class="p-5">
                    <form>
                        <label for="Name">{{$t('name')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-award class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Name" v-model="increaseName" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="host">{{$t('host')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-airplay class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="host" v-model="increaseHost" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="port">{{$t('port')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-at />
                            </span>
                            <input type="number" placeholder="port" v-model="increasePort" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="domain">{{$t('domain')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-globe class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="domain" v-model="increaseDomain" class="form-input
                            ltr:pl-10 rtl:pr-10" />
                        </div>
                        <button type="button" @click="increaseDo" class="btn btn-primary w-full">{{$t('Submit')}}</button>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { ref,onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
  
  const { t } = useI18n();
  useHead({ title: t('VNC controller') });
  
  let clipboard: any = ref();
  const editMod = ref(false);
  const increaseMod = ref(false);


  const rows = ref([]) || [];

  // 当前页
  let currentPage = ref(1);
  // 每页显示条数
  let pageSize = ref(10);
  // 总条数
  let total = ref(0);
  // 总页数
  let totalPage = ref(1);

  const editId = ref(0);
  const editName = ref('');
  const editHost = ref('');
  const editPort = ref('');
  const editDomain = ref('');

  const increaseName = ref('');
  const increaseHost = ref('');
  const increasePort = ref('');
  const increaseDomain = ref('');
  const increaseStatus = ref(0);


  const { vncList } = useApi();

  onMounted(async () => {
    nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
    const vueClipboard3 = await import('vue-clipboard3');
    let { toClipboard } = vueClipboard3.default();
    clipboard = toClipboard;
    await getVncList();
  });

  const increase = () => {
    increaseMod.value = true;
  };

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

  // 获取vnc列表
  const getVncList = async () => {
    const res = await vncList.getVncList(currentPage.value,pageSize.value)
    currentPage.value = res.data.current;
    pageSize.value = res.data.size;
    total.value = res.data.total;
    totalPage.value = res.data.pages;
    res.data.records.forEach((item: any) => {
      item.createDate = dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss');
    });
    rows.value = res.data.records;
  };

  // 删除Vnc接口
  const deleteVnc = async (id:number) => {
    const data = await vncList.deleteVnc(id);
    if (data) {
      showMessage(t('Deleted successfully.'));
      // 更新列表
      await getVncList();
    }
  };

  // 删除Vnc
  const deleteVncData = async (id:number) => {
    Swal.fire({
      title: t('Are you sure?'),
      text: t('You will not be able to recover this VNC!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t('No, keep it'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVnc(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(t('Cancelled'), t('Your VNC is safe :)'), 'error');
      }
    });
  }

  const increaseDo = async () =>{
    const res = await vncList.addVnc({
      name: increaseName.value,
      host: increaseHost.value,
      port: increasePort.value,
      domain: increaseDomain.value,
      status: increaseStatus.value
    });
    if (res) {
      showMessage(t('Added successfully.'));
      increaseMod.value = false;
      // 更新列表
      await getVncList();
    } else {
      showMessage(res.message, 'error');
    }
  }

  const edit = (id:number) => {
    editMod.value = true;
    const data = rows.value.find((item: any) => item.id === id);
    editId.value = data.id;
    editName.value = data.name;
    editHost.value = data.host;
    editPort.value = data.port;
    editDomain.value = data.domain;
  }

  const editDo = async () => {
    const res = await vncList.updateVnc({
      id: editId.value,
      name: editName.value,
      host: editHost.value,
      port: editPort.value,
      domain: editDomain.value
    });
    if (res) {
      showMessage(t('Modified successfully.'));
      editMod.value = false;
      // 更新列表
      await getVncList();
    } else {
      showMessage(res.message, 'error');
    }
  }

  // 激活
  const startVnc = async (id:number) => {
    const res = await vncList.updateVnc({
      id,
      status: 0
    });
    if (res) {
      showMessage(t('Activated successfully.'));
      // 更新列表
      await getVncList();
    } else {
      showMessage(res.message, 'error');
    }
  }

  // 禁用
  const stopVnc = async (id:number) => {
    const res = await vncList.updateVnc({
      id,
      status: 1
    });
    if (res) {
      showMessage(t('Disabled successfully.'));
      // 更新列表
      await getVncList();
    } else {
      showMessage(res.message, 'error');
    }
  }

  // 检查状态
  const checkStatus = async (id:number,status:number) => {
    if (status === 0) {
      await stopVnc(id);
    } else {
      await startVnc(id);
    }
  };


  // 前一页
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      getVncList();
    }
  };

  // 后一页
  const nextPage = () => {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
      getVncList();
    }
  };

  // 第一页
  const firstPage = () => {
    currentPage.value = 1;
    getVncList();
  };

  // 最后一页
  const lastPage = () => {
    currentPage.value = totalPage.value;
    getVncList();
  };

</script>