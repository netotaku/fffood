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
    <i v-if="!isOpen" class="fa-solid fa-bars"></i>
    <i v-else class="fa-solid fa-xmark"></i>    
  </a>

  <Teleport to="#js-overlay">
    <nav v-if="isOpen" class="overlay" @click.self="toggle">
      <div class="overlay__inner">
        <ul>
          <slot />
        </ul>
        <p>
          <a href="tel:07771535355">07771 535 355</a><br>
          <a href="mailto:desk@fffood.agency">desk@fffood.agency</a><br>
          <a href="/cookies-and-privacy">Privacy and Cookies</a>
        </p>
      </div>
    </nav>    
  </Teleport>

</template>


