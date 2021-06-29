<template>
    <el-table
    :data="tableData" class="w-full">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            width="380">
        </el-table-column>
        <el-table-column
            prop="createdAt"
            label="Created At">
        </el-table-column>
        <el-table-column label="Action" fixed="right" width="220">
            <template slot-scope="scope">
                <el-button
                    :type="scope.row.deletedAt == null ? '' : 'danger'"
                    icon="el-icon-remove-outline"
                    @click="switchDeleteClass(scope.row.ID, scope.row.deletedAt)"
                />
                <div class="inline-block">
                    <router-link :to="`/admin/book/${scope.row.id}/edit`">
                        <el-button icon="el-icon-edit" />
                    </router-link>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        props: {
            tableData: {
                type: Array,
                require: true,
            },
        },
        computed: {
            ...mapState('class', ['class']),
        },
        methods: {
            switchDeleteClass(id, deletedAt) {
                if(deletedAt == null) {
                    this.deleteClass(id);
                } else {
                    this.restoreClass(id);
                }
            },
            async deleteClass(id) {
                await this.$store.dispatch('class/delete', id);
                // console.log(this.class);
                // const newItem = this.class;
                // const index = findIndex(this.tableData, { id });
                // this.tableData.splice(index, 1, { ...index, ...newItem });
            },
            async restoreClass(id) {
                await this.$store.dispatch('class/restore', id);
            }
        }
    }
</script>