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
            <span>{{$t('account management')}}</span>
        </li>
    </ul>

    <div class="panel mt-6 pb-2">
      <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 class="text-lg font-semibold dark:text-white-light">{{ $t('List of administrator accounts') }}</h5>
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
              <th>{{$t('Username')}}</th>
              <th>{{$t('name')}}</th>
              <th>{{$t('phone')}}</th>
              <th>{{$t('email')}}</th>
              <th>{{$t('Action')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>{{ row.id }}</td>
              <td>{{ row.username }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.phone }}</td>
              <td>{{ row.email }}</td>
              <td>
                <div class="flex items-center justify-center space-x-2">
                  <button type="button" class="btn btn-outline-primary w-24"  @click="edit(row.uuid)">
                    <icon-pencil class="h-6 w-6" />
                    <span class="align-middle">{{$t('edit')}}</span>
                  </button>
                  <button type="button" class="btn btn-outline-danger w-24" @click="deleteAdmin(row.id)">
                    <icon-trash class="h-6 w-6" />
                    <span class="align-middle">{{$t('delete')}}</span>
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
            <select class="form-select w-20" v-model="pageSize" @change="getUserList">
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
                        <label for="Username">{{$t('Username')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-user class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Username" v-model="editUsername" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Name">{{$t('name')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-user class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Name" v-model="editName" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Email">{{$t('Email')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-at />
                            </span>
                            <input type="email" placeholder="Email" v-model="editEmail" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Phone">{{$t('phone')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-phone class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Phone" v-model="editPhone" class="form-input
                            ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Password">{{$t('Password')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-lock class="w-5 h-5" />
                            </span>
                            <input type="password" placeholder="Password" v-model="editPassword" class="form-input ltr:pl-10 rtl:pr-10" />
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
                        <label for="Username">{{$t('Username')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-user class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Username" v-model="increaseUsername" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Name">{{$t('name')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-user class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Name" v-model="increaseName" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Email">{{$t('Email')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-at />
                            </span>
                            <input type="email" placeholder="Email" v-model="increaseEmail" class="form-input ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Phone">{{$t('phone')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-phone class="w-5 h-5" />
                            </span>
                            <input type="text" placeholder="Phone" v-model="increasePhone" class="form-input
                            ltr:pl-10 rtl:pr-10" />
                        </div>
                        <label for="Password">{{$t('Password')}}</label>
                        <div class="relative mb-4">
                            <span
                                class="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark"
                            >
                                <icon-lock class="w-5 h-5" />
                            </span>
                            <input type="password" placeholder="Password" v-model="increasePassword" class="form-input ltr:pl-10 rtl:pr-10" />
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
  import { ref,onMounted } from 'vue';
  import Swal from 'sweetalert2';
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
  
  const { t } = useI18n();
  useHead({ title: t('account management') });
  
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

  const editId = ref('');
  const editUsername = ref('');
  const editName = ref('');
  const editPhone = ref('');
  const editEmail = ref('');
  const editPassword = ref('');

  const increaseUsername = ref('');
  const increaseName = ref('');
  const increasePhone = ref('');
  const increaseEmail = ref('');
  const increasePassword = ref('');


  const { account } = useApi();

  

  onMounted(async () => {
    nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
    const vueClipboard3 = await import('vue-clipboard3');
    let { toClipboard } = vueClipboard3.default();
    clipboard = toClipboard;
    await getUserList();
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

  // 获取用户列表
  const getUserList = async () => {
    const res = await account.getAdminList(currentPage.value,pageSize.value); 
    currentPage.value = res.data.current;
    pageSize.value = res.data.size;
    total.value = res.data.total;
    totalPage.value = res.data.pages;
    rows.value = res.data.records;
  };

  const edit = async (uuid: string) => {
    editMod.value = true;
    const res = await account.getUserInfoByUuid(uuid);
    editId.value = res.data.id;
    editUsername.value = res.data.username;
    editName.value = res.data.name;
    editPhone.value = res.data.phone;
    editEmail.value = res.data.email;
  };

  const editDo = async () => {
    const res = await account.updateAdmin({
      id: editId.value,
      username: editUsername.value,
      name: editName.value,
      phone: editPhone.value,
      email: editEmail.value,
      password: editPassword.value,
    });
    if (res) {
      showMessage(t('Modified successfully.'));
      editMod.value = false;
      getUserList();
    } else {
      showMessage(res.message, 'error');
    }
  };

  const increase = () => {
    increaseMod.value = true;
  };

  const increaseDo = async () => {
    const res = await account.addAdmin({
      username: increaseUsername.value,
      name: increaseName.value,
      phone: increasePhone.value,
      email: increaseEmail.value,
      password: increasePassword.value,
    });
    if (res) {
      showMessage(t('Added successfully.'));
      increaseMod.value = false;
      getUserList();
    } else {
      showMessage(res.message, 'error');
    }
  };


  // 删除超管账号
  const deleteAdmin = async (id: number) => {
    Swal.fire({
      title: t('Are you sure?'),
      text: t('You will not be able to recover this account!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t('No, keep it'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdminUser(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(t('Cancelled'), t('Your account is safe :)'), 'error');
      }
    });
  };

  const deleteAdminUser = async (id: number) => {
    const res = await account.deleteAdmin(id);
    if (res) {
      showMessage(t('Deleted successfully.'));
      getUserList();
    } else {
      showMessage(res.message, 'error');
    }
  };

  // 前一页
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      getUserList();
    }
  };

  // 后一页
  const nextPage = () => {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
      getUserList();
    }
  };

  // 第一页
  const firstPage = () => {
    currentPage.value = 1;
    getUserList();
  };

  // 最后一页
  const lastPage = () => {
    currentPage.value = totalPage.value;
    getUserList();
  };
</script>
