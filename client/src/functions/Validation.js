export function validateDate(value) {
    return /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value)
}

export function validate() {
    console.log(date.value)
    if (position.value && company.value && status.value && validateDate(date.value)) {
        validated.value = true
    } else {
        validated.value = false
    }
}

export function submit() {
    // If submit, clear out all input vars
    if (validated.value || validate()) {
        const data = {
            'position': position.value,
            'company': company.value,
            'status': status.value,
            'date': date.value
        }

        cancel() // Clear out input vars

        // Send POST to server here
    }
}

export function cancel() {
    newStatusModal.value = false // Close the modal

    position.value = ''
    company.value = ''
    status.value = ''
    date.value = formatDate
}