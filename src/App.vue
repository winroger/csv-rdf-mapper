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
/*
:root {
    --brand-color: #008877;
}

body {
  font-family: sans-serif;
  font-size: 16px;
  display: block;
  margin: 0;
}

.app {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  margin: 0;
  color: #333; 
  height: 100vh;
}

a:visited { color: inherit; }

.main {
  width: 100%;
  max-width: 1200px;
  background-color: #fff; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
  padding: 16px;
}

.content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
    padding: 16px 16px;
    margin: 0px 32px;
    transition: 0.3s opacity, 0.3s visibility;
    flex-grow: 1;
    max-width: 1200px;
    width: 100%;

}

.content p:first-child { margin-top: 0; }
.content p { margin-top: 40px; line-height: 1.3em; font-size: 20px; color: #444; }


.w-100 { width: 100%; }
.h-100 { height: 100%; }


.btn {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      gap: 10px;
      padding: 12px;
      color: #888;
      border-radius: 6px;
      border-width: 2px;
      border-color: #888;
      border-style: solid;
      font-size: 1rem;
      transition: all 0.2s ease-out;
  }

.btn:hover {
      cursor: pointer;
      background-color: #ededed;
      color: var(--brand-color);
  }

.btn-main{
      display: flex;
      background-color: var(--brand-color);
      color: #ededed;
      flex-direction: column;
      white-space: nowrap;
      gap: 10px;
      padding: 12px;
      text-decoration: none;
      border-radius: 6px;
      border: 0;
      outline: none;
      font-size: 1rem;
      transition: all 0.2s ease-out;
      text-align: center;
  }

.btn-main:hover {
      cursor: pointer;
      color: #FFF;
      background-color:#006d60;
  }*/
</style>
