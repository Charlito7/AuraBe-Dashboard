<template>
  <div class="form-group w-xxl-5">
    <label class="d-block fs-14 text-black mb-2">Add Multiple Images</label>
    <div class="card upload-gallery border-0 rounded-1 p-xxl-30 p-4">
      <div class="file-upload text-center position-relative mb-20">
        <img src="../../../assets/img/icons/upload-files.svg" alt="Image" />
        <span class="d-block text-optional fs-14 mt-30">
          Drag & Drop Multiple Images here or
          <span class="text_secondary fw-semibold position-relative">
            Add Image <!-- Changed this from "Select" to "Add Image" -->
          </span>
        </span>
        <input
          ref="fileInput"
          type="file"
          class="d-block w-100 shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
          @change="handleFileChange"
          multiple
        />
      </div>

      <!-- Wrapper for displaying images inline -->
      <div v-if="imagePreviews.length > 0" class="image-gallery">
        <!-- Loop through image previews -->
        <div v-for="(image, index) in imagePreviews" :key="index" class="image-container border">
          <img :src="image" alt="Selected Image" />
          <!-- Trash icon at the top-right corner -->
          <div class="delete-icon" @click="removeImage(index)">
            <i class="fa fa-trash"></i> <!-- Font Awesome trash icon -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddImages',
  setup() {
    const imagePreviews = ref<string[]>([]);

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        // Append new images to the existing array
        Array.from(input.files).forEach((file) => {
          imagePreviews.value.push(URL.createObjectURL(file));
        });
      }
    };

    const removeImage = (index: number) => {
      imagePreviews.value.splice(index, 1);
    };

    return {
      imagePreviews,
      handleFileChange,
      removeImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.upload-gallery {
  .file-upload {
    padding: 40px 20px;
    border: 1.5px dashed #a8acb2;
    text-align: center;
    border-radius: 4px;
    input {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}

.image-gallery {
  display: flex;
  flex-wrap: wrap; /* Allows images to wrap if they don't fit in one line */
  gap: 10px; /* Adds space between images */
}

.image-container {
  position: relative;
  width: 60px;

  img {
    width: 100%; /* Ensures image fits inside the container */
    display: block;
  }

  /* Delete icon styling */
  .delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 18px; /* Adjust size as needed */
    color: red;
    background-color: white;
    border-radius: 50%;
    padding: 4px;
    transform: translate(50%, -50%);
  }
}

@media only screen and (min-width: 1400px) {
  .upload-gallery {
    .file-upload {
      padding: 40px 75px 35px;
    }
  }
}
</style>
