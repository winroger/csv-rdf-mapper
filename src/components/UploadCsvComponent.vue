<template>
  <div class="upload-field">
    <h4>Upload CSV</h4>
    <input type="file" ref="fileInput" class="file-input" multiple @change="handleFileSelect" />
    Files:
    <ul class="uploaded-files">
      <li v-if="uploadedFiles.length === 0" value="" disabled selected>No Files Uploaded</li>
      <li v-for="(file, index) in uploadedFiles" :key="index">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      uploadedFiles: [],
    };
  },
  methods: {
    handleFileSelect() {
      const fileInput = this.$refs.fileInput;
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        this.uploadedFiles.push(file);  // Add files to uploadedFiles array
      }
      this.uploadCsv();
    },
    async uploadCsv() {
      const formData = new FormData();
      for (const file of this.uploadedFiles) {
        formData.append('files[]', file);
      }
      try {
        const response = await axios.post('http://127.0.0.1:5000/upload-csv', formData);
        console.log(response.data);
        this.$emit('file-uploaded', response.data);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  }
};
</script>

<style scoped>

</style>