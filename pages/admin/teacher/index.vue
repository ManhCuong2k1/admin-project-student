<template>
    <div class="flex">
        <SideBar class="w-1/12"/>
        <div class="w-11/12 px-8">
            <div class="pt-10">
                <el-form class="demo-form-inline flex">
                    <el-form-item label="">
                        <el-input  placeholder="Search"></el-input>
                    </el-form-item>
                    <el-form-item class="pl-4">
                        <el-button type="primary">Search</el-button>
                        <el-button type="" @click="create()">Create</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <TableTeacher :table-data="teachers"/>
        </div>
        <div v-if="isActive" class="fixed z-50 bg-white p-10 shadow-2xl	rounded-lg top-40 left h-80">
            <span class="el-icon-close top-4 right-4 absolute cursor-pointer" @click="create()"></span>
            <PopupCreate @submitForm="createForm" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableTeacher from '~/components/admin/teachers/Table.vue';
import PopupCreate from '~/components/admin/teachers/Form.vue';
export default {
    components: {
        SideBar,
        TableTeacher,
        PopupCreate
    },
    async asyncData({ store }) {
        await store.dispatch('teacher/fetch');
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        ...mapState('teacher', ['teachers']),
    },
    methods: {
        create() {
            this.isActive = !this.isActive;
        },
        async createForm(form) {
            try {
                await this.$store.dispatch('teacher/create', form);
                this.$router.go('/admin/teacher');
                this.isActive = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>