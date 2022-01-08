<script setup>
</script>

<template>
    <!-- Button will always be bottom-right in alignment with the rest of the content -->
    <q-page-sticky position="bottom-right" class="fab-container">
        <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
</template>

<style lang="scss">
.fab-container {  
    margin-right: max((100% - var(--width-percent)) / 2, (100vw - var(--width-units)) / 2);
    margin-bottom: 2rem;
}
</style>