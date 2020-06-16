<template>
    <div id="default-layout">
        <navbar :drawer="drawer" @drawer="drawer = !drawer" v-if="$route.path !== '/masuk'" />
        <sidebar :drawer="drawer" @clicked="drawer = !drawer" @drawer="drawer = $event" v-if="$route.path !== '/masuk'" />
        <!--<v-card-title>Default layout</v-card-title>-->
        <router-view />
        <notifications-list />

    </div>
</template>

<script>

import navbar from '@/components/Navbar/Default/Navbar.vue'
import sidebar from '@/components/Navbar/Default/Sidebar.vue'

import NotificationsList from '@/components/NotificationsList'

export default {
    components: {
        navbar,
        sidebar,
        NotificationsList,
    },
    data: () => ({
        drawer: null,
    })
}
</script>

<style>

</style>