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
    <q-card class="card">
        <div class="card-left">
            <p class="status-position">{{ position }}</p>
            <p class="status-company">{{ company }}</p>
        </div>

        <div class="card-right">
            <q-chip class="status-curr-status" size="1rem">{{ statuses[statuses.length - 1] }}</q-chip>
            <p class="status-last-date">Last Updated: {{ dates[dates.length - 1] }}</p>
        </div>
    </q-card>
</template>

<style lang="scss">
$statusFontLarge: 2rem;
$statusFontSmall: 1rem;

.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;

    p {
        margin: 0;
    }

    .card-left {
        text-align: left;

        .status-position {
            font-size: $statusFontLarge;
        }

        .status-company {
            font-size: $statusFontSmall;
        }
    }

    .card-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;

        .status-curr-status {
            align-self: flex-end;
            margin-top: $statusFontLarge / 4;
            padding-block: $statusFontLarge / 4;
        }

        .status-last-date {
            font-style: italic;
        }
    }

    
}
</style>