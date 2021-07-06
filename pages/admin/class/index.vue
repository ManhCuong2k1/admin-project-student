<template>
    <div class="flex">
        <SideBar class="w-1/12"/>
        <div class="w-11/12 px-8">
            <div class="pt-10">
                <el-form class="demo-form-inline flex">
                    <el-form-item label="">
                        <el-input  
                            v-model="tableFilter.searchKey"
                            placeholder="Search"
                            class="input-with-select mr-5"
                            clearable></el-input>
                    </el-form-item>
                    <el-form-item class="pl-4">
                        <el-button type="primary" @click="updateSearch()">Search</el-button>
                        <el-button type="" @click="create()">Create</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <TableClass :table-data="classes" @updateClass="updateValue"/>
        </div>
        <div v-if="isActive" class="fixed z-50 bg-white p-10 shadow-2xl	rounded-lg top-40 left h-80">
            <span class="el-icon-close top-4 right-4 absolute cursor-pointer" @click="close()"></span>
            <PopupCreate @submitForm="createForm" :class-data="classDetail"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { cleanObject } from '~/utils/object';
import SideBar from '~/components/sidebar/SideBar.vue';
import TableClass from '~/components/admin/classes/Table.vue';
import PopupCreate from '~/components/admin/classes/Form.vue';
export default {
    components: {
        SideBar,
        TableClass,
        PopupCreate
    },
    async asyncData({ store, query }) {
        const initFilter = {
            searchKey: null,
        };
        const filter = { ...initFilter, ...query };
        const clean = cleanObject(filter);
        await store.dispatch('class/fetch');
        await store.dispatch('class/search', clean);
        return {
            tableFilter: filter,
        };
    },
    watchQuery: true,
    data() {
        return {
            isActive: false,
        }
    },
    computed: {
        ...mapState('class', ['classes', 'classDetail']),
    },  
    methods: {
        async fetchData() {
            const filter = cleanObject({ ...this.$route.query, ...this.tableFilter });
            await this.$store.dispatch('class/search', filter);
            this.$router.push({ query: filter });
            console.log(this.classes);
        },
        create() {
            this.isActive = true;
        },
        close() {
            this.isActive = false;
            this.$router.go('/admin/class');
        },

        async createForm(form) {
            try {
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
        },
        async updateSearch() {
            this.fetchData();
        },
    }
}
</script>

<style>
    .left {
        left: 40%;
    }
</style>