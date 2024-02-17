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
            <span>{{$t('API management')}}</span>
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
                      <th>{{$t('AppId')}}</th>
                      <th>{{$t('AppKey')}}</th>
                      <th>{{$t('Status')}}</th>
                      <th>{{$t('Info')}}</th>
                      <th>{{$t('CreateTime')}}</th>
                      <th>{{$t('Action')}}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="row in rows" :key="row.id">
                      <td>{{ row.id }}</td>
                      <td>{{ row.appid }}</td>
                      <td>
                        <div class="flex items-center">
                          <span>{{ row.appkey }}</span>
                          <button @click="copy(row.appkey)" class="ml-2 focus:outline-none">
                            <!-- 一键复制图标 -->
                            <icon-copy class="ltr:mr-2 rtl:ml-2" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div class="flex flex-wrap items-center gap-3 whitespace-no-wrap overflow-hidden text-center">
                          <!-- 状态0为激活 -->
                          <span v-if="row.status === 0" class="badge font-medium bg-green-100 text-green-500 text-xs px-2 py-1 w-14 rounded"><span class="p-1 rounded-full bg-green-500 inline-block mr-1"></span>{{ $t('Activated') }}</span>
                          <!-- 状态1为禁用 -->
                          <span v-else class="badge font-medium bg-red-100 text-red-500 text-xs px-2 py-1 w-14 rounded"><span class="p-1 rounded-full bg-red-500 inline-block mr-1"></span>{{ $t('Disabled') }}</span>
                        </div>
                        
                      </td>
                      <td>{{ row.info }}</td>
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
                            <button type="button" @click="deleteApiData(row.id)" class="btn btn-sm btn-outline-danger">
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
                <select class="form-select w-20" v-model="pageSize" @change="getApiList">
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
</template>

<script lang="ts" setup>
  import { ref,onMounted } from 'vue';
  import dayjs from 'dayjs';
  import Swal from 'sweetalert2';

  const { t } = useI18n();

  useHead({ title: t('API management') });

  let clipboard: any = ref();

  onMounted(async () => {
    nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
    const vueClipboard3 = await import('vue-clipboard3');
    let { toClipboard } = vueClipboard3.default();
    clipboard = toClipboard;
    getApiList();
  });

  const copy = async (msg: Text) => {
    if (msg) {
      await clipboard(msg);
      showMessage(t('Copied successfully.'));
    }
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

  const rows = ref([]) || [];

  // 当前页
  let currentPage = ref(1);
  // 每页显示条数
  let pageSize = ref(10);
  // 总条数
  let total = ref(0);
  // 总页数
  let totalPage = ref(1);

  const { apiList } = useApi();

  // 获取API列表
  const getApiList = async () => {
    const res = await apiList.getApiList(currentPage.value,pageSize.value); 
    currentPage.value = res.data.current;
    pageSize.value = res.data.size;
    total.value = res.data.total;
    totalPage.value = res.data.pages;

    res.data.records.forEach((item: any) => {
      item.createDate = dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss');
    });
    rows.value = res.data.records;
  };
  
  // 调用暂停接口
  const pauseApi = async (id:number) => {
    const data = await apiList.pauseApi(id);
    if (data) {
      showMessage(t('Disabled successfully.'));
      // 更新列表
      await getApiList();
    }
    
  };

  // 调用启用接口
  const startApi = async (id:number) => {
    const data = await apiList.startApi(id);
    if (data) {
      showMessage(t('Enabled successfully.'));
      // 更新列表
      await getApiList();
    }
  };

  // 删除API
  const deleteApi = async (id:number) => {
    const data = await apiList.deleteApi(id);
    if (data) {
      showMessage(t('Deleted successfully.'));
      // 更新列表
      await getApiList();
    }
  };

  // 增加api
  const addApi = async (body:any) => {
    const data = await apiList.addApi(body);
    if (data) {
      showMessage(t('Added successfully.'));
      // 更新列表
      getApiList();
    }
  };

  // 前一页
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      getApiList();
    }
  };

  // 后一页
  const nextPage = () => {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
      getApiList();
    }
  };

  // 第一页
  const firstPage = () => {
    currentPage.value = 1;
    getApiList();
  };

  // 最后一页
  const lastPage = () => {
    currentPage.value = totalPage.value;
    getApiList();
  };

  // 更改API状态
  const checkStatus = async (id:number,status:number) => {
    if (status === 0) {
      pauseApi(id);
    } else {
      startApi(id);
    }
    // 更新列表
    //getApiList();
  };

  // 删除API
  const deleteApiData = async (id:number) => {
    Swal.fire({
      title: t('Are you sure?'),
      text: t('You will not be able to recover this API!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t('No, keep it'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(t('Cancelled'), t('Your API is safe :)'), 'error');
      }
    });
  };

  // 增加API
  const increase = async () => {
    Swal.fire({
      title: t('Add API'),
      input: 'text',
      inputPlaceholder: t('Please enter the API information'),
      inputAttributes: {
        'aria-label': t('Type your message here'),
      },
      showCancelButton: true,
      confirmButtonText: t('Add'),
      cancelButtonText: t('Cancel'),
      showLoaderOnConfirm: true,
      preConfirm: (info) => {
        if (!info) {
          Swal.showValidationMessage(t('Please enter the API information'));
        }
        addApi({ info });
      },
    });
  };

</script>
