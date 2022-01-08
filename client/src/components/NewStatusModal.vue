<script setup>
import { ref } from 'vue'

// Represents the state for showing the modal to add a new status
const newStatusModal = ref(true)

// Formats date to mm/dd/yyyy for modal
// Src: https://www.codegrepper.com/code-examples/javascript/getting+current+date+in+mmddyyyy+format+in+js
var today = new Date()
var mm = String(today.getMonth() + 1).padStart(2, '0')
var dd = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();
var formatDate = `${mm}/${dd}/${yyyy}`

// Input vars
const position = ref('')
const company = ref('')
const status = ref('')
const date = ref(formatDate)


// Handle validation and submission of the modal form
let validated = ref(false)

function validate() {
    if (position.value && company.value && status.value && date.value) {
        validated.value = true
    } else {
        validated.value = false
    }
    console.log(validated)
}

function submit(e) {
    // If submit, clear out all input vars
    if (validate()) {

    }

}
</script>

<template>
    <!-- Button will always be bottom-right in alignment with the rest of the content -->
    <q-page-sticky position="bottom-right" class="fab-container">
        <q-btn fab icon="ion-add" color="primary" @click="newStatusModal = true" />
    </q-page-sticky>

    <!-- Modal to be displayed -->
    <q-dialog v-model="newStatusModal" persistent>
        <q-card class="modal">
            <q-card-section horizontal class="modal-title">
                Add New Status
            </q-card-section>

            <q-card-section class="modal-prompts">
                <q-input dense v-model="position" label="Position" autofocus @keyup.enter="submit" @blur="validate" class="modal-question" />

                <q-input dense v-model="company" label="Company" @keyup.enter="submit" @blur="validate" class="modal-question" />

                <q-input dense v-model="status" label="Status" @keyup.enter="submit" @blur="validate" class="modal-question" />

                <!-- Date picker checks date in mm/dd/yyyy format -->
                <q-input 
                    mask="##/##/####" 
                    placeholder="mm/dd/yyyy" 
                    :rules="[value => /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value)]" lazy-rules
                    @blur="validate" @keyup.enter="submit" 
                    dense v-model="date" label="Date" class="modal-question">

                    <template v-slot:append>
                        <q-icon name="ion-calendar" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="date" today-btn mask="MM/DD/YYYY"/>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-card-section>

            <q-card-actions align="right" class="text-primary modal-buttons">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat id="modal-submit" label="Add Status" :disable="!validated" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style lang="scss">
.fab-container {  
    margin-right: max((100% - var(--width-percent)) / 2, (100vw - var(--width-units)) / 2);
    margin-bottom: 2rem;
}
</style>