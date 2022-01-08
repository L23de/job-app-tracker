<script setup>
import StatusItem from './StatusItem.vue'

const statusList = [
    {
        'position': 'Pos1',
        'company': 'Company1',
        'statuses': [
            'Applied'
        ],
        'dates': [
            'Date1'
        ]
    },
    {
        'position': 'Pos2',
        'company': 'Company2',
        'statuses': [
            'Interviewed'
        ],
        'dates': [
            'Date2'
        ]
    },
]
</script>

<template>
    <div id="statusList">
        <div v-for="statusItem in statusList" :key="statusItem">
            <StatusItem v-bind="statusItem" index=1 />
        </div>
    </div>
</template>

<style>

</style>