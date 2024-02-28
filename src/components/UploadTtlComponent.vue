<template>
  <div class="upload-field">
    <h4>Upload SHACL shapes</h4>
    <input type="file" ref="fileInput" class="file-input" @change="handleFileSelect" />
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
      const file = fileInput.files[0];
      if (file) {
        this.uploadedFiles.push(file);
        this.uploadTtl();
      }
    },
    async uploadTtl() {
      for (const file of this.uploadedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await axios.post('http://127.0.0.1:5000/upload-ttl', formData);
          this.$emit('file-uploaded', response.data);
        } catch (error) {
          console.error('File upload failed:', error);
        }
      }
    }
  }
};
</script>

  
<style scoped>
</style>