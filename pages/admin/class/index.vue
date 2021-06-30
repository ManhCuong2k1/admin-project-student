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
            <TableClass :table-data="classes" @updateClass="updateValue"/>
        </div>
        <div v-if="isActive" class="fixed z-50 bg-white p-10 shadow-2xl	rounded-lg top-40 left h-80">
            <span class="el-icon-close top-4 right-4 absolute cursor-pointer" @click="create()"></span>
            <PopupCreate @submitForm="createForm" :class-data="classDetail"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableClass from '~/components/admin/classes/Table.vue';
import PopupCreate from '~/components/admin/classes/Form.vue'
export default {
    components: {
        SideBar,
        TableClass,
        PopupCreate
    },
    async asyncData({ store }) {
        await store.dispatch('class/fetch');
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        ...mapState('class', ['classes', 'classDetail']),
    },
    methods: {
        create() {
            this.isActive = !this.isActive;
        },
        async createForm(form) {
            try {
                console.log(this.classDetail);
                if(this.classDetail == null) {
                    await this.$store.dispatch('class/create', form);
                } else {
                    await this.$store.dispatch('class/update', {id: this.classDetail.ID, data: form});
                }
                this.$router.go('/admin/class');    
                this.isActive = false;
            } catch (error) {
                console.log(error);
            }
        },
        async updateValue(id) {
            await this.$store.dispatch('class/getDetail', id);
            this.isActive = true;
        }
    }
}
</script>

<style>
    .left {
        left: 40%;
    }
</style>