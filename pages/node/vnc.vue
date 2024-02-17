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
  </div>
</template>

<script lang="ts" setup>

</script>