<script setup>
const props = defineProps({
    position: String,
    company: String,
    statuses: Array,
    dates: Array,
    // Should contain a position, company, status strings and dates array
})

</script>

<template>
    <q-card id="elementId">
        <p id="status-position">{{ position }}</p>
        <p id="status-company">{{ company }}</p>
        <p id="status-last-status">{{ statuses[statuses.length - 1] }}</p>
        <p id="status-last-date">{{ dates[dates.length - 1] }}</p>
    </q-card>
</template>

<style>

</style>