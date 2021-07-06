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
            prop="createdAt"
            label="Created At">
        </el-table-column>
        <el-table-column label="Action" fixed="right" width="220">
            <template slot-scope="scope">
                <el-button
                    :type="scope.row.deletedAt == null ? '' : 'danger'"
                    icon="el-icon-remove-outline"
                    @click="switchDeleteTeacher(scope.row.ID, scope.row.deletedAt)"
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
            ...mapState('teacher', ['teacherDetail']),
        },
        methods: {
            switchDeleteTeacher(id, deletedAt) {
                if(deletedAt == null) {
                    this.deleteTeacher(id);
                } else {
                    this.restoreTeacher(id);
                }
            },
            async deleteTeacher(id) {
                await this.$store.dispatch('teacher/delete', id);
                const index = findIndex(this.dataTable, { ID: id });
                this.dataTable.splice(index, 1, { ...index, ...this.teacherDetail });
            },
            async restoreTeacher(id) {
                await this.$store.dispatch('teacher/restore', id);
                const index = findIndex(this.dataTable, { ID: id });
                this.dataTable.splice(index, 1, { ...index, ...this.teacherDetail });
            },
            changeValue(id) {
                this.$emit('updateTeacher', id);
            }
        }
    }
</script>