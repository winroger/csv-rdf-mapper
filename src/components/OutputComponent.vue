<template>
  <h3>3. Generate and Display RDF-Graph</h3>
  <button class="btn" @click="generateTTL">Generate RDF-Graph</button>
  <div class="ttl-output">
    <h3>RDF-Graph</h3>
    <pre>{{ rdfGraph }}</pre>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['mappingData', 'class'],
    data() {
        return {
          rdfGraph: "no graph generated",
        }
    },
    methods: {
      async generateTTL() {
            try {
              const dataToSend = this.mappingData;
              const response = await axios.post('http://127.0.0.1:5000/generate-ttl', dataToSend);
              this.rdfGraph = response.data;
            } catch (error) {
              console.error('There was an error sending the mappingData:', error);
            }
          },
    }
  }
</script>

<style scoped>
.ttl-output {
    background-color: #0e0e0e;
    color: #b4b4b4;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.7em;
    margin: 24px 0px 24px 0px;
}
</style>
