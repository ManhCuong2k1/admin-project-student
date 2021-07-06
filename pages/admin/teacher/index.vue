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
            <TableTeacher :table-data="teachers" @updateTeacher="updateValue"/>
        </div>
        <div v-if="isActive" class="fixed z-50 bg-white p-10 shadow-2xl	rounded-lg top-40 left h-80">
            <span class="el-icon-close top-4 right-4 absolute cursor-pointer" @click="close()"></span>
            <PopupCreate @submitForm="createForm" :teacher-data="teacherDetail"/>
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
        ...mapState('teacher', ['teachers', 'teacherDetail']),
    },
    methods: {
        create() {
            this.isActive = true;
        },
        close() {
            this.isActive = false;
            this.$router.go('/admin/teacher');
        },
        async createForm(form) {
            try {
                if(this.teacherDetail == null) {
                    await this.$store.dispatch('teacher/create', form);
                } else {
                    await this.$store.dispatch('teacher/update', {id: this.teacherDetail.ID, data: form});
                }
                this.$router.go('/admin/teacher');
                this.isActive = false;
            } catch (error) {
                console.log(error);
            }
        },
        async updateValue(id) {
            await this.$store.dispatch('teacher/getDetail', id);
            this.isActive = true;
        }
    }
}
</script>