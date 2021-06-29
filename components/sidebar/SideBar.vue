<template>
    <div class="bg-gray-800 h-full h-screen pt-10">
        <div class="text-white pl-5 pb-3">
            <nuxt-link to="/admin/class">
                <i class="el-icon-school"/> Classes
            </nuxt-link>
        </div>
        <div class="text-white pl-5 pb-3">
            <nuxt-link to="/admin/student">
                <i class="el-icon-user"/> Students
            </nuxt-link>
        </div>
        <div class="text-white pl-5 pb-3">
            <nuxt-link to="/admin/teacher">
                <i class="el-icon-s-custom"/> Teachers
            </nuxt-link>
        </div>
    </div>
</template>

<style>
a.nuxt-link-active {
   color: #00c58e;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
</style>