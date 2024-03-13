<template>
  <div class="box"> 
    <p class="subtitle is-6">Step 3</p>
    <p class="title is-4">Match schema with data</p>
    <p class="content">
      In this section you can check and adjust the mapping from ShapeProperties to CSV-Columns. Similar name labels will automatically be matched.
  </p>
      <div v-for="(shape, index) in ApplicationProfile.getNodeShapes()" :key="shape.nodeId.value" class="content">
        <hr>
        <div class="columns">
        <div class="column is-half">
          <legend><h5 class="title is-5">{{ index +1 }}. {{ shape.label.value }}</h5><p class="subtitle is-6 is-italic">{{ shape.nodeId.value }}</p></legend>
        </div>
        <div class="column is-half">
          <div class="select is-dark">
            <select @change="handleCsvSelection($event, shape)">
              <option v-if="mapping[shape.nodeId.value]?.[0]?.dataFile" :value="mapping[shape.nodeId.value][0].dataFile" selected>
                {{ mapping[shape.nodeId.value][0].dataFile }}
              </option>
              <option v-for="name in dataInput.getFileNames()" :key="name" :value="name">
                {{ name }}
              </option>
            </select>
          </div>
        </div>
      </div>
        <shape-table 
          :shape="shape"
          :headers="getCurrentHeaders(shape)"
          :mapping="mapping"
          @update-mapping="handleColumnSelection"
        />
      </div>
    </div>
</template>

<script>
import ShapeTable from './ShapeTable.vue';
import { ApplicationProfile } from '../NodeShape'
import { Mapping } from '../mapping'
import { InputData } from '@/inputdata';

export default {
  components: { 
    'shape-table': ShapeTable,
  },

  props: {
    ttlfiles: Array,
    dataInput: InputData,
  },

  emits: [
    'pass-ttl'
  ],

  data() {
    return {
      ApplicationProfile: new ApplicationProfile(),
      mapping: new Mapping(),
    };
  },

  watch: {
    ttlfiles: {
      async handler() {
        if (this.ttlfiles.length > 0) {
          try {
              await this.ApplicationProfile.addNodeShapes(this.ttlfiles[0]);
          } catch (error) {
              console.error('Error in initializeTtlInput:', error);
          }
        }
        this.initializeMapping()
      }
    },

    dataInput: {
      async handler() {
          try {
            const firstFile = this.dataInput.getFileNames()[0]
            this.ApplicationProfile.nodeShapes.forEach(shape => {
              shape.getProperties().forEach(property => {
                this.checkAndAddMapping(firstFile, shape, property)
              });
            });
          } catch (error) {
            console.error('Error in initializeDataInput:', error);
          }
      }
    },
  },

  methods: {
  checkAndAddMapping(file, shape, property) {
    const index = this.dataInput.data[file].getDataHeaders().indexOf(property.name.value)
    if( index !== -1) {
      this.mapping.addMapping(shape.nodeId.value, property.path.value, file, this.dataInput.getHeaders(file)[index]);
    } else {
      this.mapping.addMapping(shape.nodeId.value, property.path.value, file, null);
    }
  },
  initializeMapping() {
      this.ApplicationProfile.nodeShapes.forEach(shape => {
        shape.getProperties().forEach(property => {
          this.mapping.addMapping(shape.nodeId.value, property.path.value, null, null);
        });
      });
    },

  handleColumnSelection({ nodeId, property, header }) {
    const file = this.mapping.getMappingFile(nodeId)
    this.mapping.addMapping(nodeId, property, file, header)
    this.$emit('pass-ttl', {applicationProfile: this.ApplicationProfile, dataInput: this.dataInput, mapping: this.mapping});
  },

  handleCsvSelection(event, shape) {
      const selectedFileName = event.target.value;
      shape.getProperties().forEach(prop => {
        this.checkAndAddMapping(selectedFileName, shape, prop)
      });
    },

  getCurrentHeaders(shape) {
    let headers = [];
    if (this.dataInput.getFileCount() !== 0) {
      headers = this.dataInput.getHeaders(this.mapping.getMappingFile(shape.nodeId.value))
    }
    return headers;
    }, 
  }
}
</script>

<style>  
</style>
  