<template>
  <div class="container-fluid ps-md-0">
    <div class="row g-0">
      <div class="d-none d-md-flex col-md-4 bg-image"></div>
      <div class="col-md-8">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <div class="p-4 p-sm-5">
                  <div class="d-sm-flex align-items-center">
                    <div class="flex-grow-1 ms-sm-3 text-center text-sm-start">
                      <div class="fs-3 mb-2 fw-bold">{{ title }}</div>
                      <div class="fs-6">Movie Application</div>
                    </div>
                  </div>

                  <hr class="my-4" />

                  <form class="row" @submit.prevent="onSubmit">
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input
                          v-model="form.email"
                          type="email"
                          name="email"
                          class="form-control bg-light"
                          id="fieldEmail"
                          placeholder="Registered Email Address..."
                          autocomplete="off"
                          required
                        />
                        <label for="fieldEmail">
                          <i class="fa-fw fa fa-at"></i> Email or Username *
                        </label>
                      </div>
                      <div class="form-floating">
                        <input
                          type="password"
                          v-model="form.password"
                          name="password"
                          class="form-control bg-light"
                          id="fieldPassword"
                          placeholder="Password..."
                          autocomplete="off"
                          required
                        />
                        <label for="fieldPassword">
                          <i class="fa-fw fa fa-key"></i> Password *
                        </label>
                      </div>
                    </div>

                    <div class="col-12 mt-5">
                      <button class="btn btn-red w-100 mb-3" type="submit">
                        {{ labelBtn }}
                      </button>

                      <!-- <a href="ap/dashboard.php" class="btn btn-red w-100 mb-3" title="User Login">
                        <i class="fa-fw fa fa-sign-in-alt"></i> Login
                      </a>-->
                      <!-- <a
                        class="text-decoration-none link-red"
                        href="password-forget.php"
                        title="Forget Your Password"
                      >Forget Your password?</a>-->
                      <router-link
                        :to="linkTo"
                        class="text-decoration-none link-red"
                        >{{ labelLinkTo }}</router-link
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  props: {
    title: String,
    labelBtn: String,
    linkTo: String,
    labelLinkTo: String,
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit: function () {
      this.$emit("btnSubmit", this.form);
    },
  },
};
</script>

<style>
@import "~@/assets/style/main.scss";
</style>

<style scoped>
.eye-icon {
  right: 15px;
  top: 33px;
  z-index: 2;
}
.ico-input {
  position: absolute;
  z-index: 1;
  left: 13px;
  top: 8px;
}

.title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  color: #333333;
}
.login {
  min-height: 100vh;
}

.bg-image {
  background-image: url(/img/bg/login.png);
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}

@media (max-width: 575px) {
}
@media (min-width: 576px) {
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
@media (min-width: 1441px) {
  .bg-login {
    height: 100vh;
  }
}
</style>
