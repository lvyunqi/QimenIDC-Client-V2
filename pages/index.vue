<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">{{ $t('dashboard') }}</a>
            </li>
            <!-- <li class="before:mr-2 before:content-['/'] rtl:before:ml-2">
                <span>Analytics</span>
            </li> -->
        </ul>
        <div class="pt-5">
            <div class="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div class="panel h-full sm:col-span-2 lg:col-span-1">
                    <!-- statistics -->
                    <div class="mb-5 flex items-center justify-between dark:text-white-light">
                        <h5 class="text-lg font-semibold">Statistics</h5>
                        <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Last Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Last Month</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div>
                    </div>
                    <div class="grid gap-8 overflow-hidden text-sm font-bold text-[#515365] sm:grid-cols-2">
                        <div>
                            <div>
                                <div>Total Visits</div>
                                <div class="text-lg text-[#f8538d]">423,964</div>
                            </div>
                            <client-only>
                                <apexchart height="58" :options="totalVisit" :series="totalVisitSeries" class="overflow-hidden">
                                    <!-- loader -->
                                    <div class="grid min-h-[58px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                        <span
                                            class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                        ></span>
                                    </div>
                                </apexchart>
                            </client-only>
                        </div>

                        <div>
                            <div>
                                <div>Paid Visits</div>
                                <div class="text-lg text-[#f8538d]">7,929</div>
                            </div>
                            <client-only>
                                <apexchart height="58" :options="paidVisit" :series="paidVisitSeries" class="overflow-hidden">
                                    <!-- loader -->
                                    <div class="grid min-h-[58px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                        <span
                                            class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                        ></span>
                                    </div>
                                </apexchart>
                            </client-only>
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div class="mb-5 flex items-center justify-between dark:text-white-light">
                        <h5 class="text-lg font-semibold">Expenses</h5>
                        <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Last Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Last Month</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div>
                    </div>
                    <div class="my-10 text-3xl font-bold text-[#e95f2b]">
                        <span class="ltr:mr-2 rtl:ml-2">$ 45,141</span>
                        <span class="text-sm text-black ltr:mr-1 rtl:ml-1 dark:text-white-light">this week </span>
                        <icon-trending-up class="inline text-success" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                            <div
                                class="relative h-full w-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#805dca] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                style="width: 65%"
                            ></div>
                        </div>
                        <span class="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                    </div>
                </div>

                <div
                    class="panel grid h-full grid-cols-1 content-between overflow-hidden before:absolute before:-right-44 before:bottom-0 before:top-0 before:m-auto before:h-96 before:w-96 before:rounded-full before:bg-[#1937cc]"
                    style="background: linear-gradient(0deg, #00c6fb -227%, #005bea) !important"
                >
                    <div class="z-[7] mb-16 flex items-start justify-between text-white-light">
                        <h5 class="text-lg font-semibold">Total Balance</h5>

                        <div class="relative whitespace-nowrap text-xl">
                            $ 41,741.42
                            <span class="mt-1 table rounded bg-[#4361ee] p-1 text-xs text-[#d3d3d3] ltr:ml-auto rtl:mr-auto">+ 2453</span>
                        </div>
                    </div>
                    <div class="z-10 flex items-center justify-between">
                        <div class="flex items-center justify-between">
                            <a
                                href="javascript:;"
                                class="place-content-center rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc] ltr:mr-2 rtl:ml-2"
                            >
                                <icon-plus />
                            </a>
                            <a href="javascript:;" class="grid place-content-center rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc]">
                                <icon-credit-card />
                            </a>
                        </div>
                        <a href="javascript:;" class="z-10 rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#4361ee]"> Upgrade </a>
                    </div>
                </div>
            </div>

            <div class="mb-6 grid gap-6 lg:grid-cols-3">
                <div class="panel h-full p-0 lg:col-span-2">
                    <div class="mb-5 flex items-start justify-between border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b] dark:text-white-light">
                        <h5 class="text-lg font-semibold">{{$t('Virtual Machine Data')}}</h5>
                        <!-- <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">View</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Update</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Download</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div> -->
                    </div>

                    <client-only>
                        <apexchart height="360" :options="uniqueVisitor" :series="uniqueVisitorSeries" class="overflow-hidden">
                            <!-- loader -->
                            <div class="grid min-h-[360px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                <span
                                    class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                ></span>
                            </div>
                        </apexchart>
                    </client-only>
                </div>

                <div class="panel h-full">
                    <div class="-mx-5 mb-5 flex items-start justify-between border-b border-[#e0e6ed] p-5 pt-0 dark:border-[#1b2e4b] dark:text-white-light">
                        <h5 class="text-lg font-semibold">{{$t('System log')}}</h5>
                        <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">View All</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Mark as Read</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div>
                    </div>
                    <client-only>
                        <perfect-scrollbar
                            :options="{
                                swipeEasing: true,
                            }"
                            class="relative h-[360px] ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3"
                        >
                            <div class="space-y-7">
                                <div class="flex">
                                    <div
                                        class="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2"
                                    >
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white shadow shadow-secondary">
                                            <icon-plus class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">
                                            New project created : <a href="javascript:;" class="text-success">[VRISTO Admin Template]</a>
                                        </h5>
                                        <p class="text-xs text-white-dark">27 Feb, 2020</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div
                                        class="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2"
                                    >
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white shadow-success">
                                            <icon-mail class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">
                                            Mail sent to <a href="javascript:;" class="text-white-dark">HR</a> and
                                            <a href="javascript:;" class="text-white-dark">Admin</a>
                                        </h5>
                                        <p class="text-xs text-white-dark">28 Feb, 2020</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div
                                        class="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2"
                                    >
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                                            <icon-checks class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">Server Logs Updated</h5>
                                        <p class="text-xs text-white-dark">27 Feb, 2020</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div
                                        class="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2"
                                    >
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-danger text-white">
                                            <icon-checks class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">
                                            Task Completed : <a href="javascript:;" class="text-success">[Backup Files EOD]</a>
                                        </h5>
                                        <p class="text-xs text-white-dark">01 Mar, 2020</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div
                                        class="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2"
                                    >
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-white">
                                            <icon-file class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">Documents Submitted from <a href="javascript:;">Sara</a></h5>
                                        <p class="text-xs text-white-dark">10 Mar, 2020</p>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="shrink-0 ltr:mr-2 rtl:ml-2">
                                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white">
                                            <icon-server class="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 class="font-semibold dark:text-white-light">Server rebooted successfully</h5>
                                        <p class="text-xs text-white-dark">06 Apr, 2020</p>
                                    </div>
                                </div>
                            </div>
                        </perfect-scrollbar>
                    </client-only>
                </div>
            </div>

            <div class="mb-6 grid gap-6 sm:grid-cols-3 xl:grid-cols-5">
                <div class="panel h-full sm:col-span-3 xl:col-span-2">
                    <div class="mb-5 flex items-start justify-between">
                        <h5 class="text-lg font-semibold dark:text-white-light">Visitors by Browser</h5>
                    </div>
                    <div class="flex flex-col space-y-5">
                        <div class="flex items-center">
                            <div class="h-9 w-9">
                                <div
                                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light"
                                >
                                    <icon-chrome class="h-5 w-5" />
                                </div>
                            </div>
                            <div class="w-full flex-initial px-3">
                                <div class="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                    <h6>Chrome</h6>
                                    <p class="text-xs ltr:ml-auto rtl:mr-auto">65%</p>
                                </div>
                                <div>
                                    <div class="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            class="relative h-full w-full rounded-full bg-gradient-to-r from-[#009ffd] to-[#2a2a72] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                            style="width: 65%"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="h-9 w-9">
                                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                    <icon-safari class="h-5 w-5" />
                                </div>
                            </div>
                            <div class="w-full flex-initial px-3">
                                <div class="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                    <h6>Safari</h6>
                                    <p class="text-xs ltr:ml-auto rtl:mr-auto">40%</p>
                                </div>
                                <div>
                                    <div class="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            class="relative h-full w-full rounded-full bg-gradient-to-r from-[#a71d31] to-[#3f0d12] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                            style="width: 40%"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="h-9 w-9">
                                <div
                                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning dark:bg-warning dark:text-white-light"
                                >
                                    <icon-globe class="h-5 w-5" />
                                </div>
                            </div>
                            <div class="w-full flex-initial px-3">
                                <div class="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                    <h6>Others</h6>
                                    <p class="text-xs ltr:ml-auto rtl:mr-auto">25%</p>
                                </div>
                                <div>
                                    <div class="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            class="relative h-full w-full rounded-full bg-gradient-to-r from-[#fe5f75] to-[#fc9842] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                            style="width: 25%"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel h-full p-0 overflow-hidden">
                    <div class="flex p-5">
                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light"
                        >
                            <icon-users-group class="h-5 w-5" />
                        </div>
                        <div class="font-semibold ltr:ml-3 rtl:mr-3">
                            <p class="text-xl dark:text-white-light">31.6K</p>
                            <h5 class="text-xs text-[#506690]">Followers</h5>
                        </div>
                    </div>
                    <div class="h-40">
                        <client-only>
                            <apexchart height="160" :options="followers" :series="followersSeries" class="absolute bottom-0 w-full overflow-hidden">
                                <!-- loader -->
                                <div class="grid min-h-[160px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                    ></span>
                                </div>
                            </apexchart>
                        </client-only>
                    </div>
                </div>

                <div class="panel h-full p-0 overflow-hidden">
                    <div class="flex p-5">
                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light"
                        >
                            <icon-link class="h-5 w-5" />
                        </div>
                        <div class="font-semibold ltr:ml-3 rtl:mr-3">
                            <p class="text-xl dark:text-white-light">1,900</p>
                            <h5 class="text-xs text-[#506690]">Referral</h5>
                        </div>
                    </div>
                    <div class="h-40">
                        <client-only>
                            <apexchart height="160" :options="referral" :series="referralSeries" class="absolute bottom-0 w-full overflow-hidden">
                                <!-- loader -->
                                <div class="grid min-h-[160px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                    ></span>
                                </div>
                            </apexchart>
                        </client-only>
                    </div>
                </div>

                <div class="panel h-full p-0 overflow-hidden">
                    <div class="flex p-5">
                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success dark:bg-success dark:text-white-light"
                        >
                            <icon-chat-dots class="h-5 w-5" />
                        </div>
                        <div class="font-semibold ltr:ml-3 rtl:mr-3">
                            <p class="text-xl dark:text-white-light">18.2%</p>
                            <h5 class="text-xs text-[#506690]">Engagement</h5>
                        </div>
                    </div>
                    <div class="h-40">
                        <client-only>
                            <apexchart height="160" :options="engagement" :series="engagementSeries" class="absolute bottom-0 w-full overflow-hidden">
                                <!-- loader -->
                                <div class="grid min-h-[160px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"
                                    ></span>
                                </div>
                            </apexchart>
                        </client-only>
                    </div>
                </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div class="panel h-full">
                    <div class="-m-5 mb-5 flex items-start border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b]">
                        <div class="shrink-0 rounded-full ring-2 ring-white-light ltr:mr-4 rtl:ml-4 dark:ring-dark">
                            <img src="/assets/images/profile-1.jpeg" alt="" class="h-10 w-10 rounded-full object-cover" />
                        </div>
                        <div class="font-semibold">
                            <h6>Jimmy Turner</h6>
                            <p class="mt-1 text-xs text-white-dark">Monday, Nov 18</p>
                        </div>
                    </div>
                    <div>
                        <div class="pb-8 text-white-dark">
                            "Duis aute irure dolor" in reprehenderit in voluptate velit esse cillum "dolore eu fugiat" nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident.
                        </div>
                        <div class="absolute bottom-0 -mx-5 flex w-full items-center justify-between p-5">
                            <div class="flex items-center">
                                <icon-thumb-up class="relative -top-0.5 inline h-5 w-5 text-info ltr:mr-1.5 rtl:ml-1.5" />
                                <span class="dark:text-info">551 Likes</span>
                            </div>
                            <a
                                href="javascript:;"
                                class="flex items-center rounded-md bg-success/30 px-1.5 py-1 text-xs text-success hover:shadow-[0_10px_20px_-10px] hover:shadow-success"
                                >Read More
                                <icon-carets-down class="h-4 w-4 -rotate-90 ltr:ml-1.5 rtl:mr-1.5 rtl:rotate-90" />
                            </a>
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div class="-m-5 mb-5 flex items-center justify-between border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b]">
                        <div class="flex">
                            <div class="media-aside align-self-start">
                                <div class="shrink-0 rounded-full ring-2 ring-white-light ltr:mr-4 rtl:ml-4 dark:ring-dark">
                                    <img src="/assets/images/g-8.png" alt="" class="h-10 w-10 rounded-full object-cover" />
                                </div>
                            </div>
                            <div class="font-semibold">
                                <h6>Dev Summit - New York</h6>
                                <p class="mt-1 text-xs text-white-dark">Bronx, NY</p>
                            </div>
                        </div>
                    </div>
                    <div class="pb-8 text-center font-semibold">
                        <div class="mb-4 text-primary">4 Members Going</div>
                        <div class="flex items-center justify-center gap-3 pb-8">
                            <img
                                class="h-10 w-10 overflow-hidden rounded-lg object-cover ring-2 ring-white-light dark:ring-dark"
                                src="/assets/images/profile-1.jpeg"
                                alt=""
                            />
                            <img
                                class="h-10 w-10 overflow-hidden rounded-lg object-cover ring-2 ring-white-light dark:ring-dark"
                                src="/assets/images/profile-2.jpeg"
                                alt=""
                            />
                            <img
                                class="h-10 w-10 overflow-hidden rounded-lg object-cover ring-2 ring-white-light dark:ring-dark"
                                src="/assets/images/profile-3.jpeg"
                                alt=""
                            />
                            <img
                                class="h-10 w-10 overflow-hidden rounded-lg object-cover ring-2 ring-white-light dark:ring-dark"
                                src="/assets/images/profile-4.jpeg"
                                alt=""
                            />
                        </div>

                        <div class="absolute bottom-0 -mx-5 flex w-full items-center justify-between p-5">
                            <a href="javascript:;" class="btn btn-secondary btn-lg w-full border-0 bg-gradient-to-r from-[#3d38e1] to-[#1e9afe]"
                                >View Details</a
                            >
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div class="-m-5 mb-5 flex items-center justify-between border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b]">
                        <a href="javascript:;" class="flex font-semibold">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-white ltr:mr-4 rtl:ml-4">
                                <span>FD</span>
                            </div>
                            <div>
                                <h6>Figma Design</h6>
                                <p class="mt-1 text-xs text-white-dark">Design Reset</p>
                            </div>
                        </a>
                        <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">View Project</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Edit Project</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Mark as Done</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div>
                    </div>
                    <div class="group">
                        <div class="mb-5">
                            <div class="text-white-dark">
                                Doloribus nisi vel suscipit modi, optio ex repudiandae voluptatibus officiis commodi. Nesciunt quas aut neque incidunt!
                            </div>
                        </div>
                        <div class="mb-2 flex items-center justify-between font-semibold">
                            <div class="flex items-center">
                                <icon-square-check class="h-4 w-4 text-success" />

                                <div class="text-xs ltr:ml-2 rtl:mr-2">5 Tasks</div>
                            </div>
                            <p class="text-primary">65%</p>
                        </div>
                        <div class="mb-5 h-2.5 rounded-full bg-dark-light p-0.5 dark:bg-dark-light/10">
                            <div class="h-full rounded-full bg-gradient-to-r from-[#1e9afe] to-[#60dfcd]" style="width: 65%"></div>
                        </div>
                        <div class="flex items-end justify-between">
                            <div class="flex items-center rounded-full bg-danger/20 px-2 py-1 text-xs font-semibold text-danger">
                                <icon-clock class="h-3 w-3 ltr:mr-1 rtl:ml-1" />

                                3 Days Left
                            </div>
                            <div class="flex items-center justify-center group-hover:-space-x-2 rtl:space-x-reverse rtl:group-hover:space-x-reverse">
                                <span
                                    class="flex h-9 w-9 items-center justify-center rounded-full bg-[#bfc9d4] font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-dark"
                                    >+6</span
                                >
                                <img
                                    class="h-9 w-9 rounded-full border-2 border-white object-cover transition-all duration-300 dark:border-dark"
                                    src="/assets/images/profile-6.jpeg"
                                    alt=""
                                />
                                <img
                                    class="h-9 w-9 rounded-full border-2 border-white object-cover transition-all duration-300 dark:border-dark"
                                    src="/assets/images/profile-7.jpeg"
                                    alt=""
                                />
                                <img
                                    class="h-9 w-9 rounded-full border-2 border-white object-cover transition-all duration-300 dark:border-dark"
                                    src="/assets/images/profile-8.jpeg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    useHead({ title: 'Dashboard' });

    onMounted(() => {
        nextTick(() => {
            window.dispatchEvent(new Event('resize'));
        });
    });

    // statistics
    const totalVisit = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        return {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
        };
    });

    const totalVisitSeries = ref([
        {
            data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25],
        },
    ]);

    //paid visit
    const paidVisit = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        return {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
        };
    });

    const paidVisitSeries = ref([
        {
            data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69],
        },
    ]);

    // unique visitors
    const uniqueVisitor = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        const isRtl = store.rtlClass === 'rtl' ? true : false;
        return {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#00ab55', '#ffbb44', '#e7515a'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 10,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                y: {
                    formatter: (val: any) => {
                        return val;
                    },
                },
            },
        };
    });

    const uniqueVisitorSeries = ref([
        {
            name: '开机',
            data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
        },
        {
            name: '关机',
            data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
        },
        {
            name: '到期',
            data: [15, 20, 25, 22, 19, 25, 18, 20, 22, 15, 20, 25],
        },
    ]);

    // followers
    const followers = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        return {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },
            option: { fill: null },

            if(isDark: boolean) {
                option: {
                    fill: {
                        type: 'gradient';
                        gradient: {
                            type: 'vertical';
                            shadeIntensity: 1;
                            inverseColors: !1;
                            opacityFrom: 0.3;
                            opacityTo: 0.05;
                            stops: [100, 100];
                        }
                    }
                }
            },
        };
    });

    const followersSeries = ref([
        {
            data: [38, 60, 38, 52, 36, 40, 28],
        },
    ]);

    // referral
    const referral = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        return {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },

            if(isDark: boolean) {
                option: {
                    fill: {
                        type: 'gradient';
                        gradient: {
                            type: 'vertical';
                            shadeIntensity: 1;
                            inverseColors: !1;
                            opacityFrom: 0.3;
                            opacityTo: 0.05;
                            stops: [100, 100];
                        }
                    }
                }
            },
        };
    });

    const referralSeries = ref([
        {
            data: [60, 28, 52, 38, 40, 36, 38],
        },
    ]);

    // engagement
    const engagement = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        return {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#1abc9c'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: (val: any) => {
                            return '';
                        },
                    },
                },
            },

            if(isDark: boolean) {
                option: {
                    fill: {
                        type: 'gradient';
                        gradient: {
                            type: 'vertical';
                            shadeIntensity: 1;
                            inverseColors: !1;
                            opacityFrom: 0.3;
                            opacityTo: 0.05;
                            stops: [100, 100];
                        }
                    }
                }
            },
        };
    });

    const engagementSeries = ref([
        {
            name: 'Sales',
            data: [28, 50, 36, 60, 38, 52, 38],
        },
    ]);
</script>
