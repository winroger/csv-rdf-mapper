<template>
    <table class="table is-fullwidth" style="background-color: rgba(255, 255, 255, 0);">
      <thead>
        <tr>
          <th>Property</th>
          <th>Column to match</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in shape.getProperties()" :key="property">
          <td class="code has-text-weight-medium">{{ property.name }} <br><path class="has-text-weight-normal is-italic"> {{ property.path.value }} </path></td>
          <td style="width: 50%;">
            <div :class="{'select': true, 'is-dark': true, 'is-success': mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn, 'is-danger': !mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn}">
              <select class="w-100" @change="emitUpdate(shape.nodeId.value, property.path.value, $event)">
                  <option v-if="mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn" value="" selected>
                      {{ mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn }}
                  </option>
                  <option v-else value="" disabled selected>Not selected</option>
                  <option v-for="header in filteredHeaders(shape, property)" :key="header" :value="header">
                      {{ header }}
                  </option>
              </select>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>

import { Mapping } from '../mapping';
import { NodeShape } from '../NodeShape';

  export default {
    props: {
      shape: NodeShape,
      headers: Array,
      mapping: Mapping,
    },
    data() {
      return {
      };
    },
    computed: {
    filteredHeaders() {
        return (shape, property) => {
            let excludedHeader = "";
            if (this.mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn) {
                excludedHeader = this.mapping['mapping'][shape.nodeId.value]?.[property.path.value]?.dataColumn;
            } else {
                excludedHeader = null;
            }
            return this.headers.filter(header => header !== excludedHeader);
        };
    }
},
    methods: {
      emitUpdate(nodeId, property, header) {
        this.$emit('update-mapping', {nodeId: nodeId, property: property, header: header.target.value});
      },
    }
  };
  </script>
  <style scoped>
  </style>