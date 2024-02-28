<template>
    <div class="header">
      <h1>
        <slot></slot>
      </h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  <style scoped>
  .header {
      display: block;
      width: 100%;
      text-align: center;
      color: #FFF;
      background-color: var(--brand-color);
      padding: 10px 6px;
  }
  
  .header h1 {
      margin: 0;
      font-size: 20px;
  }
  </style>
  