<template>
  <section class="section">

    <div class="columns">

      <div class="column is-half">
        <upload-ttl-form @ttl-uploaded="handleTtlUploaded"></upload-ttl-form>
      </div>

      <div class="column is-half">
        <upload-csv-form @csv-uploaded="handleDataUploaded"></upload-csv-form>
      </div>

    </div>

 </section>

  <section class="section has-background-light">
        <form-generator 
          :ttlfiles="ttlFiles"
          :dataInput="dataInput"
          @pass-ttl="handleTtlGeneration"
        ></form-generator>
      </section>
      <section class="section">
        <ttl-output 
          :mapping="mapping"
          :applicationProfile="applicationProfile"
          :dataInput="dataInput"
        ></ttl-output>
      </section>

  </template>
  
  <script>
  import UploadTtlComponent from '@/components/UploadTtlComponent.vue';
  import UploadCsvComponent from '@/components/UploadCsvComponent.vue';
  import FormGenerator from '@/components/FormGenerator.vue';
  import OutputComponent from '@/components/OutputComponent.vue';
  import { ApplicationProfile } from '@/NodeShape';
  import { Mapping } from '@/mapping';
  import { InputData } from '@/inputdata';
  
  export default {
    components: {
      'upload-ttl-form': UploadTtlComponent,
      'upload-csv-form': UploadCsvComponent,
      'form-generator': FormGenerator,
      'ttl-output': OutputComponent
    },
    data() {
      return {
        ttlFiles: [],
        dataFiles: [],
        mapping: new Mapping,
        applicationProfile: new ApplicationProfile,
        dataInput: new InputData,

      };
    },
    methods: {
      handleTtlUploaded(files) { 
        this.ttlFiles = files;
      },
      handleDataUploaded(dataInput) { 
        this.dataInput = dataInput; 
      },
      handleTtlGeneration({applicationProfile, dataInput, mapping}) {
        this.applicationProfile = applicationProfile;
        this.dataInput = dataInput;
        this.mapping = mapping;
      }
    },
  };
  </script>
  <style>  
  </style>