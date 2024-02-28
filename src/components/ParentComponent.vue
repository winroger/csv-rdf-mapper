<template>
    <div class="content">
        <h3>1. Upload SHACL shapes and CSV Files</h3>
        <div class="upload-container">
            <upload-ttl-form @file-uploaded="handleTtlUploaded"></upload-ttl-form>
            <upload-csv-form @file-uploaded="handleCsvUploaded"></upload-csv-form>
        </div>
      <form-generator 
        :ttlInput="ttlInput" 
        :csvInput="csvInput"
        @generate-ttl="handleTtlGeneration"
      ></form-generator>
      <ttl-output :mappingData="mappingData" class="content"></ttl-output>
    </div>
  </template>
  
  <script>
  import FormGenerator from '@/components/FormGenerator.vue';
  import UploadTtlComponent from '@/components/UploadTtlComponent.vue';
  import UploadCsvComponent from '@/components/UploadCsvComponent.vue';
  import OutputComponent from '@/components/OutputComponent.vue';

  
  export default {
    components: {
      'form-generator': FormGenerator,
      'upload-ttl-form': UploadTtlComponent,
      'upload-csv-form': UploadCsvComponent,
      'ttl-output': OutputComponent
    },
    data() {
      return {
        ttlInput: {"Example Shape 1": {"Example Property": "Example Value"}},
        csvInput: {"Example CSV": {headers: ["Example Column"]}},
        mappingData: {},
      };
    },
    methods: {
      handleTtlUploaded(ttlData) {
        this.ttlInput = ttlData;
      },
      handleCsvUploaded(csvData) {
        this.csvInput = csvData;
      },
      handleTtlGeneration(mappingData) {
        this.mappingData = mappingData;
      }
    },
  };
  </script>
  
  
  <style>  

h4 {
  margin-top: 0px;
}

.upload-container {
display: flex;
flex-direction: row;
align-items: flex-start;
gap: 16px;
}

.upload-field {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex-grow: 1;
  margin: auto;
}

.file-input {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}

.btn {
  align-items: center;
}

.uploaded-files {
  list-style-type: none;
  align-items: start;
  padding: 0;
  margin: 10px 0;
}

.uploaded-files li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 4px;
  color: #787878
}

  </style>