<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
  import { useMyTokenStore } from '@/stores/token';
  const userToken = useMyTokenStore();

  userToken.logout();

  // 跳转到/auth/login
  navigateTo('/auth/login');

</script>
