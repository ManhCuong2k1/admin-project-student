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
                <!-- <el-button
                    :type="scope.row.deleted_at == null ? '' : 'danger'"
                    icon="el-icon-remove-outline"
                    @click="switchDeleteBook(scope.row.id, scope.row.deleted_at)"
                /> -->
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
    export default {
        props: {
            tableData: {
                type: Array,
                require: true,
            },
        },
    }
</script>