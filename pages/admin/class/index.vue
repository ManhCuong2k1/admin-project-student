<template>
    <div class="flex">
        <SideBar class="w-1/12"/>
        <div class="w-11/12 px-8">
            <TableClass :table-data="classes"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableClass from '~/components/admin/classes/Table.vue';
export default {
    components: {
        SideBar,
        TableClass
    },
    async asyncData({ store }) {
        await store.dispatch('class/fetch');
    },
    computed: {
        ...mapState('class', ['classes']),
    }
}
</script>