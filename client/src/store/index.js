import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
    statusList: [
    {
        'position': 'Pos1',
        'company': 'Company1',
        'statuses': [1],
        'dates': [
            'Date1',
            'Date2'
        ]
    },
    {
        'position': 'Pos2',
        'company': 'Company2',
        'statuses': [4],
        'dates': [
            'Date3',
            'Date4'
        ]
    }],
    addNew: false
}

export default createStore({
    state, getters, actions, mutations
})