<template>
    <b-skeleton-wrapper :loading="loading">
        <template #loading>
            <b-card>
                <b-skeleton width="40%"></b-skeleton>
                <b-skeleton width="100%"></b-skeleton>
                <b-skeleton width="100%"></b-skeleton>
                <b-skeleton width="100%"></b-skeleton>
                <b-skeleton width="100%"></b-skeleton>
            </b-card>
        </template>
        <div class="card">
            <!--user update modal-->
            <UserUpdateProfileModal />

            <div class="card-header d-flex pt-3" v-if="user">
                <div class="w-75 text-left">
                    <h5>
                        <b>Welcome, {{ user.first_name }}!</b>
                    </h5>
                </div>
                <div class="w-25">
                    <div style="text-align: right!important">
                        <b-icon
                            title="Update profile"
                            @click="handleProfileUpdate" 
                            icon="pencil-square" 
                            aria-hidden="true"
                            class="text-primary profileActionIcon"
                        ></b-icon>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr v-if="user.first_name || user.last_name">
                            <th>Name</th>
                            <td class="text-center">{{ user.first_name }} {{ user.last_name }}</td>
                        </tr>
                        <tr v-if="user.email">
                            <th>Email</th>
                            <td class="text-center">{{ user.email }}</td>
                        </tr>
                        <tr v-if="user.phone">
                            <th>Phone</th>
                            <td class="text-center">{{ user.phone }}</td>
                        </tr>
                    </thead>
                </table>
                <div class="px-1">
                    <a @click="handleLogout" href="#!" class="btn btn-sm btn-primary">
                        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                    </a>
                </div>
            </div>
        </div>
    </b-skeleton-wrapper>
</template>


<script>
import UserUpdateProfileModal from "./modals/ProfileUpdate.vue"
import { mapGetters } from 'vuex'

export default {
    props: ["loading"],
    components: { UserUpdateProfileModal },
    computed: {
        ...mapGetters({
            user: "getUserProfile"
        })
    },
    methods: {
        handleLogout() {
            this.$store.dispatch('logout')
            this.$router.push({ path: "/login?next=/" })
        },
        handleProfileUpdate() {
            this.$bvModal.show('user.Update')
        }
    }
}
</script>

<style scoped>
.profileActionIcon {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>