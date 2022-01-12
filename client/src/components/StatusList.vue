<script setup>
import { useStore } from 'vuex'
import StatusItem from './StatusItem.vue'

const store = useStore()
const statusList = store.state.statusList
</script>

<template>
    <div id="spacer"></div>
    <div id="statusList" class="container">
        <div :id="'status-card-'+index" v-for="(statusItem, index) in statusList" :key="statusItem" class="status-card">
            <StatusItem v-bind="statusItem" :index="index" />
        </div>
    </div>
</template>

<style lang="scss">
$gap-distance: 1.5rem;

#spacer {
    display: flex;
    height: $gap-distance;
}

#statusList {
    display: flex;
    flex-direction: column;
    gap: $gap-distance;
}

.status-card {
    // margin-block: 1rem;
}
</style>