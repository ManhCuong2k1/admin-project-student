<template>
    <div class="flex">
        <SideBar class="w-1/12"/>
        <div class="w-11/12 px-8">
            <TableTeacher :table-data="teachers"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableTeacher from '~/components/admin/teachers/Table.vue';
export default {
    components: {
        SideBar,
        TableTeacher
    },
    async asyncData({ store }) {
        await store.dispatch('teacher/fetch');
    },
    computed: {
        ...mapState('teacher', ['teachers']),
    }
}
</script>