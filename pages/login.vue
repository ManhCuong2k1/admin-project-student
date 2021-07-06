<template>
    <div class="h-screen">
        <div class="w-500 h-700 mx-auto background rounded-xl mt-20">
            <div class="text-center pt-8 text-4xl text-white">
                <h1>Login</h1>
            </div>
            <div class="px-12 py-4">
                <div class="mt-16 h-12 border-bottom">
                    <i class="el-icon-user-solid text-white pr-4 text-2xl"></i>
                    <input placeholder="Username" class="bg-transparent focus:outline-none text-white h-full" />
                </div>
                <div class="mt-8 h-12 border-bottom">
                    <i class="el-icon-lock text-white pr-4 text-2xl"></i>
                    <input placeholder="Password" class="bg-transparent focus:outline-none text-white h-full" />
                </div>
                <div class="mt-6">
                    <input type="checkbox" name="" id="" class="w-6 h-5 mt-2">
                    <span class="text-xs text-white relative -top-1.5">Remember me</span>
                </div>
                <div class="mt-8 text-center">
                    <input type="button" value="Login" class="rounded-3xl px-4 py-3 w-28 cursor-pointer login">
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.background {
    background: -webkit-linear-gradient(top,#7579ff,#b224ef);
}
.w-500 {
    width: 500px;
}
.h-700 {
    height: 700px;
}
.border-bottom {
    border-bottom: 2px solid #b283ff;
}
.login {
    transition: 0.3s ease all;
}
.login:hover {
    color: white;
    background: -webkit-linear-gradient(bottom,#7579ff,#b224ef);
}
</style>