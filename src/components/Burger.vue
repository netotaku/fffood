<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

</script>

<template>

  <a
    class="nav__button nav__button--burger"
    href="#"
    @click.prevent="toggle"
  >
    <i v-if="!isOpen" class="fa-solid fa-burger"></i>
    <i v-else class="fa-solid fa-xmark"></i>    
  </a>

  <Teleport to="#js-overlay">
    <nav v-if="isOpen" class="overlay" @click.self="toggle">
      <ul>
        <slot />
      </ul>
    </nav>
  </Teleport>
</template>


