<template>
  <div class="loader">
    <div class="loader-overlay"></div>
    <div class="loader-container">
      <div class="loader-item">
        <div v-for="n in 8" :key="n"></div>
      </div>
    </div>
  </div>
</template>

<script src="./Loader.js" />
<style src="./Loader.scss" lang="scss" scoped />
