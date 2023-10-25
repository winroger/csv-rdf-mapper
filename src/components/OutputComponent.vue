<template>
  <div class="ttl-output">
    <h3>RDF-Graph</h3>
    <!-- You can add more UI elements here (like a title) if you want -->
    <pre>{{ rdfGraph }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    rdfGraph: {
      type: String,
      default: 'Placeholder'
    }
  }
  // You can add methods, computed properties, etc., if needed
};
</script>

<style scoped>
.ttl-output {
    background-color: #0e0e0e; /* light-grey background */
    color: #b4b4b4; /* black text */
    padding: 10px; /* added some padding for aesthetics */
    border-radius: 5px; /* optional: to give a slight roundness to the edges */
    font-size: 0.7em;
    margin: 24px 0px 24px 0px;
}
</style>
