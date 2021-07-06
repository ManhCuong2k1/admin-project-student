<template>
    <el-table
        :data="dataTable" class="w-full">
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
            prop="class.name"
            label="Class"
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
                    @click="switchDeleteStudent(scope.row.ID, scope.row.deletedAt)"
                />
                <div class="inline-block">
                    <el-button icon="el-icon-edit" @click="changeValue(scope.row.ID)"/>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { findIndex } from 'lodash';
    import { mapState } from 'vuex';
    import cloneDeep from 'lodash/cloneDeep';
    export default {
        props: {
            tableData: {
                type: Array,
                require: true,
            },
        },
        data() {
            return {
                dataTable: cloneDeep(this.tableData),
                loadding: false,
            };
        },
        computed: {
            ...mapState('student', ['studentDetail']),
        },
        methods: {
            switchDeleteStudent(id, deletedAt) {
                if(deletedAt == null) {
                    this.deleteStudent(id);
                } else {
                    this.restoreStudent(id);
                }
            },
            async deleteStudent(id) {
                await this.$store.dispatch('student/delete', id);
                const index = findIndex(this.dataTable, { ID: id });
                this.dataTable.splice(index, 1, { ...index, ...this.studentDetail });
            },
            async restoreStudent(id) {
                await this.$store.dispatch('student/restore', id);
                const index = findIndex(this.dataTable, { ID: id });
                this.dataTable.splice(index, 1, { ...index, ...this.studentDetail });
            },
            changeValue(id) {
                this.$emit('updateStudent', id);
            }
        }
    }
</script>