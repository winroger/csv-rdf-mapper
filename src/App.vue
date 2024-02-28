<template>
  <div class="app" id="app">
    <header-bar></header-bar>
    <content-section></content-section>
    <footer-section></footer-section>
  </div>
</template>


<script>
import ParentComponent from '@/components/ParentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    'content-section': ParentComponent,
    'header-bar': HeaderComponent, 
    'footer-section': FooterComponent,
  }
};
</script>

<style>
</style>
