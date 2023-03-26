<template>
  <div>
    <AuthForm
      @btnSubmit="handleBtnSubmit"
      title="Login"
      labelBtn="Login"
      linkTo="register"
      labelLinkTo="Register"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AuthForm from "@/components/AuthForm.vue";

export default {
  metaInfo: {
    titleTemplate: "Login",
  },
  components: {
    AuthForm,
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleBtnSubmit: function (form) {
      this.login({
        email: form.email,
        password: form.password,
      })
        .then((res) => {
          if (res.respond.status == "success") {
            this.$swal({
              text: "Login Berhasil",
              icon: "success",
              confirmButtonText: "Ok",
            });
            this.$router.push("/");
          } else {
            this.$swal({
              text: res.respond.response,
              icon: "warning",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((err) => {
          this.$swal({
            text: err.response.data.error,
            icon: "error",
            confirmButtonText: "Ok",
          });
          console.log(err.response.data);
        });
    },
  },
  created() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.$router.push("/");
    }
  },
};
</script>
