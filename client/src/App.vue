<script setup>
import { ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import StatusList from './components/StatusList.vue'
import NewStatusModal from './components/NewStatusModal.vue'

const selectedTerm = ref('')
const selectOptions = [
  'Summer 2021'
]
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-accent-light">
    <AppHeader />

    <q-page-container>
      <q-page>
        <!-- Div used to isolate component from CSS selector -->
        <!-- <div id="termSelect" class="container">
          <q-select borderless v-model="selectedTerm" :options="selectOptions" label="Term"/>
        </div> -->

        <StatusList />
      </q-page>

      <NewStatusModal />
    </q-page-container>
    

    <q-footer>

    </q-footer>
  </q-layout>
</template>

<style lang="scss">
.q-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#termSelect {
  margin-top: 1rem;
}
</style>
