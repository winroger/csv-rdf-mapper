<template>
  <div>
    <h4 class="title is-4">Step 1: Upload Shapegraph</h4>
        <div class="content">
          <p>To get started, you need a Shapegraph as turtle file (.ttl). You can upload your own or use the one we provide for testing.</p>
        </div>
        <div class="columns">
          <div class="column is-half">
          <div class="file is-dark content">
            <label for="fileInput" class="file-label">
              <input type="file" id="fileInput" class="file-input" ref="fileInput" @change="processTtl"/>
              <span class="file-cta">
                <span class="file-label">
                  Upload TTL-file
                </span>
              </span>
            </label>
          </div>
        <div class="file">
          <div class="button file-cta is-light" @click="processTestTtl()">Load example shapegraph</div>
        </div>
      </div>
        <div class="column is-half">

          <p class="code has-text-weight-medium"> {{ files.length }} files uploaded</p>
          <li v-for="(file, index) in files" :key="index" class="code has-text-weight-normal">{{ file.name }}</li>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    processTtl() {
      const fileInput = this.$refs.fileInput;
      this.files = Array.from(fileInput.files);
      this.$emit('file-uploaded', this.files);
    },
    processTestTtl() {
    const testFilePath = `${process.env.BASE_URL}example/shapegraph.ttl`;

    fetch(testFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const file = new File([blob], 'shapegraph.ttl');
            this.files = [file];
            this.$emit('file-uploaded', this.files);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

  }
}
</script>

<style scoped>
</style>
