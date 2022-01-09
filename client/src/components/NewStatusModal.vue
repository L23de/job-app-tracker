<script setup>
import { ref } from 'vue'

// Represents the state for showing the modal to add a new status
const newStatusModal = ref(false)

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

function validateDate(value) {
    return /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value)
}

function validate() {
    console.log(date.value)
    if (position.value && company.value && status.value && validateDate(date.value)) {
        validated.value = true
    } else {
        validated.value = false
    }
}

function submit() {
    // If submit, clear out all input vars
    if (validated.value || validate()) {
        const data = {
            'position': position.value,
            'company': company.value,
            'status': status.value,
            'date': date.value
        }

        cancel() // Clear out input vars

        // Send API call to server here
    }
}

function cancel() {
    newStatusModal.value = false // Close the modal

    position.value = ''
    company.value = ''
    status.value = ''
    date.value = formatDate
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

            <q-card-section class="modal-prompts" @keyup.enter="submit" @keyup.esc="cancel">
                <q-input dense v-model="position" label="Position" autofocus @blur="validate" class="modal-question" />

                <q-input dense v-model="company" label="Company" @blur="validate" class="modal-question" />

                <q-input dense v-model="status" label="Status" @blur="validate" class="modal-question" />

                <!-- Date picker checks date in mm/dd/yyyy format -->
                <!-- Validate functions being called multiple times might not be efficient, but it will do for now -->
                <q-input 
                    mask="##/##/####" 
                    placeholder="mm/dd/yyyy"
                    @update:model-value="validate"
                    :rules="[validateDate]" lazy-rules
                    error-message="Date should be in the form of 'mm/dd/yyyy'"
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
                <q-btn flat label="Cancel" @click="cancel" />
                <q-btn flat id="modal-submit" label="Add Status" :disable="!validated" @click="submit" />
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