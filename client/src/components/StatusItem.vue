<script setup>
import { validate, validateDate, submit, cancel } from '../functions/Validation'
import { ref } from 'vue'

const props = defineProps({
    position: String,
    company: String,
    statuses: Array,
    dates: Array,
    index: Number,
    // Should contain a position and company String and status and dates array, along with index number
})

const statusOpts = [
    {'label': 'Applied', 'color': 'grey-4', 'index': 0},
    {'label': 'Screening Interview', 'color': 'yellow-4', 'index': 1},
    {'label': 'Behavioral Interview', 'color': 'purple-11', 'index': 2},
    {'label': 'Technical Interview', 'color': 'amber-4', 'index': 3},
    {'label': 'Finished Interviews', 'color': 'blue-5', 'index': 4},
    {'label': 'Offer Received', 'color': 'green-13', 'index': 5},
    {'label': 'Rejected', 'color': 'red-5', 'index': 6},
]

// let validated = ref(false)
let date = ref('')
let editMode = ref(false)
</script>

<template>
    <q-card class="card">
        <!-- Display left -->
        <div v-show="!editMode" :id="'card-left-'+index" class="card-left">
            <p class="status-company display">{{ company }}</p>
            <p class="status-position display">{{ position }}</p>
        </div>

        <!-- Edit left -->
        <div v-show="editMode" :id="'card-left-edit-'+index" class="card-left">
            <q-input v-show="editMode" v-model="company" dense placeholder="Company" autofocus class="status-company input" />
            <q-input v-show="editMode" v-model="position" dense placeholder="Position" class="status-position input" />
        </div>

        <div :id="'card-split-'+index" class="card-split">
        </div>

        <!-- Display right -->
        <div v-show="!editMode" :id="'card-right-'+index" class="card-right">
            <q-chip :ripple="false" class="status-curr-status display" :color="statusOpts[statuses[statuses.length - 1]]['color']" size="1rem">{{ statusOpts[statuses[statuses.length - 1]]['label'] }}</q-chip>
            <q-btn @click="editMode = !editMode" unelevated label="Edit" class="status-submit input" />
            <!-- <p class="status-last-date">Last Updated: {{ dates[dates.length - 1] }}</p> -->
        </div>
        
        <!-- Edit right -->
        <div v-show="editMode" :id="'card-right-edit-'+index" class="card-right">
            <q-chip :ripple="false" class="status-curr-status input" :color="statusOpts[statuses[statuses.length - 1]]['color']" size="1rem">
                {{ statusOpts[statuses[statuses.length - 1]]['label'] }}
                <q-select borderless hide-selected option-value='index' emit-value v-model="statuses[statuses.length-1]" :options="statusOpts" />
            </q-chip>
            <div>
                <q-btn @click="editMode = !editMode" unelevated label="Cancel" class="status-submit input" />
                <q-btn @click="editMode = !editMode" unelevated color="amber" label="Submit" class="status-submit input" />
            </div>
        </div>

        <!-- <div :id="'card-right-'+index+'-input'" class="card-right">
            <q-input 
                    mask="##/##/####" 
                    placeholder="mm/dd/yyyy"
                    @update:model-value="validate"
                    :rules="[validateDate]" lazy-rules
                    error-message="Date should be in the form of 'mm/dd/yyyy'"
                    :input-class="date-input"
                    dense v-model="date" prefix="Last Updated: " class="status-last-date input">

                    <template v-slot:append>
                        <q-icon name="ion-calendar" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date" today-btn mask="MM/DD/YYYY"/>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
        </div> -->
    </q-card>
</template>

<style lang="scss">
$statusFontLarge: 2rem;
$statusFontSmall: 1rem;

.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: center;
    padding: 1rem 1.3rem;

    p {
        margin: 0;
    }

    .card-left {
        flex: 2;
        text-align: left;

        
        .status-company {
            font-size: $statusFontSmall;
            opacity: 0.7;
            margin-bottom: 0.5rem;

            input {
                padding-block: 0;
            }
        }

        .status-position {
            font-size: $statusFontLarge;

            input {
                padding-block: 0.5rem;
            }
        }
    }

    .card-split {
        flex: 1;
    }

    .card-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        text-align: right;

        .status-curr-status {
            align-self: flex-end;
            margin-top: $statusFontLarge / 4;
            padding-block: $statusFontLarge / 4;
        }

        .status-last-date {
            font-style: italic;

            input { 
                padding-block: 0;
            }
        }
    }

    #date-input {
        display: flex;
        flex: 3;
        flex-shrink: 1;
    }

    .edit {

    }
}
</style>