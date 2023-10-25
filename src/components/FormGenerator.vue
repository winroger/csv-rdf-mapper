<template>
    <div v-if="ttlInput && typeof ttlInput === 'object'">
      <h3>2. Match Shape properties with CSV-Columns</h3>
      <!-- Create a separate section for each shapeURL -->
      <div v-for="(innerValue, shapeURL) in ttlInput" :key="shapeURL" class="shapefield">
        <legend>{{ shapeURL }}</legend>
        <div>
          Choose CSV: 
          <select @change="onCsvSelect($event, shapeURL)">
            <option v-for="(_, fileName) in csvInput" :key="fileName" :value="fileName">
              {{ fileName }}
            </option>
          </select>
        </div>
        <!-- Table for each shapeURL's dictionary -->
        <table class="w-100">
          <thead>
            <tr>
              <th>RDF Property</th>
              <th>CSV Column</th>
            </tr>
          </thead>
          <tbody> 
            <!-- Iterate over PathURL pair-->
            <tr v-for="(_, PathURL) in innerValue" :key="PathURL">
              <td class="code">{{ PathURL }}</td>
              <td style="width: 30%;">
                <select v-model="PathColumnMapping[shapeURL][PathURL]" class="w-100">
                  <option value="" disabled selected>Select column</option>
                  <option v-for="header in (ShapeColumnList[shapeURL] || [])" :key="header" :value="header">
                    {{ header }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['ttlInput', 'csvInput'],
    data() {
      return {
        ShapeColumnList: {},
        PathColumnMapping: {},
        ShapeCsvMapping: {},
      };
    },
    watch: {
    ttlInput: {
      immediate: true,
      handler() {
        this.initializePathColumnMapping();
      },
    },
    csvInput: {
        immediate: true,
        handler() {
            this.initializeCsvSelection()
        }
    }
  },
    methods: {
    initializePathColumnMapping() {
      const newMapping = {};
      for (const shapeURL in this.ttlInput) {
        newMapping[shapeURL] = {};
        for (const PathURL in this.ttlInput[shapeURL]) {
          newMapping[shapeURL][PathURL] = '';
        }
      }
      this.PathColumnMapping = newMapping;
    },
    initializeCsvSelection() {
      const firstCsvFile = Object.keys(this.csvInput)[0];
      for (const shapeURL in this.ttlInput) {
        this.onCsvSelect({ target: { value: firstCsvFile } }, shapeURL);
      }
    },
    onCsvSelect(event, shapeURL) {
        const selectedFileName = event.target.value;
        this.ShapeCsvMapping[shapeURL] = selectedFileName;
        if (this.csvInput[selectedFileName]) {
          this.ShapeColumnList[shapeURL] = this.csvInput[selectedFileName].headers;
        }
        const mappingData = {
          PathColumnMapping: this.PathColumnMapping,
          ShapeCsvMapping: this.ShapeCsvMapping,
        };
        this.$emit('generate-ttl', mappingData);
      },
    },
};
  </script>
  
  <style scoped>

table, tr, th, td {
    border-collapse: collapse;
    border: 1px solid;
    border-color: #cfcfcf;
}

table {
    margin: 24px 0px 0px 0px;
}

td, th {
    padding: 4px;
}
.shapefield {
    border: 2px solid;
    border-color: #008877;
    margin-bottom: 24px;
    padding: 24px 16px 16px 16px;
    border-style: groove;
    position: relative;
}

legend {
    position: absolute;
    top: -9px;
    background-color: #fff;
}  
</style>
  