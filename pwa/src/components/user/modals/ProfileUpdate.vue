<template>
  <b-modal id="user.Update" scrollable centered size="lg" hide-footer>
      <div class="card p-3">
          <div class="card-header text-dark ">
              <h5><b>Update your profile</b></h5>
          </div>
          <div class="card-body">
            <div :class="`alert pt-1 pb-1 alert-${messageClass}`" v-if="message !== ''">
              {{ message }}
            </div>
            <form @submit.prevent='handleUserUpdate'>
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="first_name">First Name</label>
                  <div>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="first_name"
                        v-model="form.first_name"
                      />
                  </div>
                </div>

                <div class="col-12 mb-3">
                  <label for="last_name">Last Name</label>
                  <div>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="last_name"
                        v-model="form.last_name"
                      />
                  </div>
                </div>

                <div class="col-12 mb-3">
                  <label for="phone">Phone</label>
                  <div>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="phone"
                        v-model="form.phone"
                      />
                  </div>
                </div>


                <div class="col-12 mb-3">
                  <label for="email">Email</label>
                  <div>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="email"
                        v-model="form.email"
                      />
                  </div>
                </div>

                <div class="col-md-12 mb-3">
                    <div class="text-right float-right">
                        <button type="submit" class="w-100 btn btn-md btn-primary">
                          <b-icon v-if="submitting" icon="arrow-clockwise" animation="spin"></b-icon>
                          <b-icon v-else icon="pencil-square"></b-icon>
                          Update
                        </button>
                    </div>
                  </div>
              </div>
            </form>
          </div>
      </div>
    </b-modal>
</template>


<script>
import { updateProfile } from '../../../services/user'
import { mapGetters } from 'vuex'

export default {
  name: 'UserUpdateProfileModal',
  computed: {
    ...mapGetters({
      user: "getUserProfile"
    })
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
      },
      message: "",
      messageClass: "",
      submitting: false
    }
  },
  watch: {
    user(newData) {
      this.form = newData
    }
  },
  methods: {
    async handleUserUpdate() {
      this.submitting = true
      this.message = ""
      if (!this.form.first_name) {
        this.message = "First name is required"
      }
      if (!this.form.first_name) {
        this.message = "Last name is required"
      }
      if (!this.form.email) {
        this.message = "Email is required"
      }
      if (!this.form.phone) {
        this.message = "Phone is required"
      }
      
      if ( this.message == "") {
        this.message = "Sending data..."
        this.messageClass = 'info'
        const { status, data } = await updateProfile(this.form, this.user.username)
        if ( status == 200 ) {
          console.log(data)
          this.$store.dispatch("fetchUser", this.user.username)
          this.message = "Profile has been updated successfully"
          this.messageClass = 'success'
          this.message = ""
          this.$bvModal.hide("user.Update")
        } else {
          this.messageClass = 'danger'
          this.message = "Permission denied"
        }
      } else {
        this.messageClass = "warning"
      }
      this.submitting = false
    }
  },
  mounted() {
    this.form = this.user
  }
}
</script>