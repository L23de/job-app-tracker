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
    {
        'position': 'Pos2',
        'company': 'Company2',
        'statuses': [
            'Interviewed'
        ],
        'dates': [
            'Date2'
        ]
    }
]
</script>

<template>
    <div id="statusList" class="container">
        <div :id="'status-card-'+index" v-for="(statusItem, index) in statusList" :key="statusItem" class="status-card">
            <StatusItem v-bind="statusItem" :index="index" />
        </div>
    </div>
</template>

<style lang="scss">
.status-card {
    margin-block: 1rem;
}
</style>