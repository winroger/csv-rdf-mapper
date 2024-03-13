<template>
  <div class="box">
    <p class="subtitle is-6">Step 2</p>
    <p class="title is-4">Upload data</p>
    <div class="content">
      <p>To get started, you need a Table as comma-separated values file (.csv). You can upload your own or use the one we provide for testing.</p>
    </div>
    <div class="columns">
      <div class="column is-half">
        <div class="file is-dark content">
          <label for="csvInput" class="file-label">
            <input type="file" id="csvInput" class="file-input" ref="csvInput" multiple name="resume2" @change="createCsvInput"/>
            <span class="file-cta">
              <span class="file-label">
                Upload CSV-file
              </span>
            </span>
          </label>
        </div>

        <div class="file">
          <button class="button file-cta is-light" @click="processTestCsv">Load example tables</button>
        </div>
      </div>
      <div class="column is-half">
        <p class="code has-text-weight-medium">{{ dataInput.getFileCount() }} files uploaded</p>
        <ul>
          <li v-for="(value, key) in dataInput.data" :key="key">{{ value.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
import { InputData } from '@/inputdata';

export default {
  data() {
    return {
      dataInput: new InputData(),
    };
  },
  methods: {
    async createCsvInput() {
      const fileInput = Array.from(this.$refs.csvInput.files);
      try {
        for (const file of fileInput) {
          await this.dataInput.addCsv(file);
        }
      } catch (error) {
        console.error('Error in creating CSV input:', error);
      }
      this.$emit('csv-uploaded', this.dataInput);
    },
    async processTestCsv() {
      const testFilesPath = [`${process.env.BASE_URL}example/buildings.csv`, `${process.env.BASE_URL}example/stakeholders.csv`];

      for (const testFilePath of testFilesPath) {
        try {
          const response = await fetch(testFilePath);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const blob = await response.blob();
          const file = new File([blob], testFilePath.split('/').pop(), { type: 'text/csv' });

          try {
            await this.dataInput.addCsv(file);
          } catch (error) {
            console.error('Error in initializing data input with CSV:', error);
          }
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
      this.$emit('csv-uploaded', this.dataInput);
    }
  }
};
</script>

<style scoped>
</style>
