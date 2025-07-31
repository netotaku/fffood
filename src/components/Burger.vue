<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

console.log("burger")

</script>

<template>

  <a
    class="nav__button nav__button--burger"
    href="#"
    @click.prevent="toggle"
  >
    <i class="fa-solid fa-burger"></i>
  </a>

  <Teleport to="#js-overlay">
    <nav v-if="isOpen" class="overlay" @click.self="toggle">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </Teleport>
</template>


