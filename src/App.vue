<template>
  <div class="app" id="app">
    <header-top>CSV-RDF-Mapper</header-top>
    <!-- <menu-side></menu-side>-->
    <input-content></input-content>
  </div>
</template>


<script>
import ParentComponent from '@/components/ParentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components: {
    'input-content': ParentComponent,
    'header-top': HeaderComponent, 
  }
};
</script>

<style>
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
  max-width: 1200px;  /* Set a max-width for desktop screens */
  background-color: #fff;  /* Optional: Adding a background color */
  border-radius: 8px;  /* Optional: Adding border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* Optional: Adding box shadow */
  margin: 16px 0;  /* Optional: Adding some margin */
  padding: 16px;  /* Optional: Adding some padding */
}

.content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
    padding: 16px 16px;
    margin: 0px 32px;
    transition: 0.3s opacity, 0.3s visibility;
    flex-grow: 1;
    max-width: 1200px;  /* Set a max-width for desktop screens */
    width: 100%;

}

.content p:first-child { margin-top: 0; }
.content p { margin-top: 40px; line-height: 1.3em; font-size: 20px; color: #444; }


.w-100 { width: 100%; }
.h-100 { height: 100%; }


.btn {
      /* grid-row: 2 / span 2; */
      display: flex;
      flex-direction: column;
      white-space: nowrap;
      background-color: #ededed;
      gap: 10px;
      padding: 12px;
      text-decoration: none;
      color: #555;
      border-radius: 6px;
      border: 0;
      outline: none;
      font-size: 1rem;
      transition: all 0.2s ease-out;
  }

.btn:hover {
      cursor: pointer;
      color: #FFF;
      background-color: var(--brand-color);
  }
</style>
