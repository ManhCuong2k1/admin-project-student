<template>
    <div class="flex">
        <SideBar class="w-1/12"/>
        <div class="w-11/12 px-8">
            <TableStudent :table-data="students"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableStudent from '~/components/admin/students/Table.vue';
export default {
    components: {
        SideBar,
        TableStudent
    },
    async asyncData({ store }) {
        await store.dispatch('student/fetch');
    },
    computed: {
        ...mapState('student', ['students']),
    }
}
</script>