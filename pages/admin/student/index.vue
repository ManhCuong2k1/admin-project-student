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
            <TableStudent :table-data="students" @updateStudent="updateValue"/>
        </div>
        <div v-if="isActive" class="fixed z-50 bg-white p-10 shadow-2xl	rounded-lg top-40 left h-80">
            <span class="el-icon-close top-4 right-4 absolute cursor-pointer" @click="create()"></span>
            <PopupCreate @submitForm="createForm" :data-class="classes"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableStudent from '~/components/admin/students/Table.vue';
import PopupCreate from '~/components/admin/students/Form.vue';
export default {
    components: {
        SideBar,
        TableStudent,
        PopupCreate
    },
    async asyncData({ store }) {
        await store.dispatch('student/fetch');
        await store.dispatch('class/fetch');
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        ...mapState('student', ['students']),
        ...mapState('class', ['classes']),
    },
    methods: {
        create() {
            this.isActive = !this.isActive;
        },
        async createForm(form) {
            try {
                await this.$store.dispatch('student/create', form);
                console.log(form);
                this.$router.go('/admin/student');
                this.isActive = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>