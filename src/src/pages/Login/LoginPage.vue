<template>
  <div class="login-wrapper d-flex flex-wrap overflow-hidden">
    <div class="login-bg"></div>
    <div class="login-form-wrap">
      <div class="login-form">
        <router-link
          to="/"
          class="logo"
          style="display: block; text-align: center; color: #B18164; text-transform: uppercase; font-weight: bold; font-size: 24px; text-decoration: none;"
        >
          AURABÊ
        </router-link>
        <form @submit.prevent="handleSubmit">
          <div class="form-group mb-15">
            <label class="d-block fs-14 text-black mb-2">
              Email/Phone Number
            </label>
            <input 
              type="email" 
              id="username" 
              v-model="username"
              class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-title" 
              placeholder="adminKODE@gmail.com"
              :disabled="isLoading"
            />
          </div>
          <div class="form-group mb-20 position-relative">
            <label class="d-block fs-14 text-black mb-2">Password</label>
            <div class="input-with-icon">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="Enter Password"
                class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black"
                :disabled="isLoading"
              />
              <span class="password-toggle" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
              </span>
            </div>
          </div>
          
          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="alert alert-danger mb-3">
            <i class="fas fa-exclamation-circle me-2"></i>{{ errorMessage }}
          </div>
          
          <button 
            type="submit" 
            class="btn login-btn w-100 d-block"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> Connexion en cours...
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  result: {
    token: string;
    refreshToken: string;
    isNewPasswordRequired: boolean;
    firstName: string;
    lastName: string;
    initial: string;
    email: string;
    userRoles: string[] | string;
  };
}

export default {
  name: "LoginPage",
  setup() {
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      if (!username.value || !password.value) {
        errorMessage.value = "Veuillez remplir tous les champs";
        return;
      }

      isLoading.value = true;
      errorMessage.value = '';

      try {
        const model = {
          UserName: username.value,
          Password: password.value
        };

        const response = await api.post<LoginResponse>(process.env.VUE_APP_LOGIN, model);
        if (response.data.result.isNewPasswordRequired) {
          router.push(process.env.VUE_APP_PASSWORD_CHANGE_PAGE);
          return;
        }

  
        if (response.status === 200) {
          const user = {
            firstName: response.data.result.firstName,
            lastName: response.data.result.lastName,
            initial: response.data.result.initial,
            email: response.data.result.email,
            roles: Array.isArray(response.data.result.userRoles)
              ? response.data.result.userRoles.join("/")
              : ""
          };

          localStorage.setItem('user', JSON.stringify(user));
          const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl);
        }
      } catch (error: any) {
        console.error("Login error:", error);
        if (error.response) {
          errorMessage.value = error.response.data.message || "Identifiants incorrects";
        } else if (error.request) {
          errorMessage.value = "Le serveur ne répond pas. Veuillez réessayer plus tard.";
        } else {
          errorMessage.value = "Une erreur s'est produite. Veuillez réessayer.";
        }
      } finally {
        isLoading.value = false;
      }
    };

    return { 
      username, 
      password, 
      showPassword,
      isLoading,
      errorMessage,
      handleSubmit 
    };
  }
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  .login-bg {
    background-image: url(../../assets/img/aurabe_cosmetics.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
    width: 50%;
  }

  .login-form-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    background-color: var(--whiteColor);
    padding: 0 50px;

    .logo {
      display: block;
      margin-bottom: 20px;
      border-bottom: 1px solid #eef3fa;
      padding-bottom: 25px;
    }

    .login-form {
      border: 1px solid var(--ashColor);
      padding: 25px;
    }

    h5 {
      font-weight: 500;
      border-bottom: 1px solid #eef3fa;
      text-align: center;
      padding-bottom: 20px;
      margin: 0 0 20px;
    }
  }

  .login-credential-item {
    border-bottom: 1px solid #eef3fa;
  }
}

.form-group {
  .input-with-icon {
    position: relative;
    
    .password-toggle {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #6c757d;
      
      &:hover {
        color: #495057;
      }
    }
  }
}

.login-btn {
  background-color: #B18164;
  color: #fff;
  font-weight: bold;
  border: none;
  height: 55px;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover:not(:disabled) {
    background-color: darken(#B18164, 5%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(177, 129, 100, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.fa-spinner {
  margin-right: 8px;
}

@media only screen and (max-width: 991px) {
  .login-wrapper {
    padding: 50px 0;

    .login-bg {
      display: none;
    }

    .login-form-wrap {
      width: 100%;
      height: 100%;
      padding: 0 12px;

      .login-form {
        padding: 20px 10px;
      }
    }
  }
}

@media only screen and (min-width: 992px) {
  .login-wrapper {
    height: 100vh;

    .login-bg {
      height: 100vh;
    }
  }
}

@media only screen and (min-width: 1920px) {
  .login-wrapper {
    .login-bg {
      width: 61%;
    }

    .login-form-wrap {
      width: 39%;
      padding: 0 100px;

      .logo {
        margin-bottom: 30px;
        padding-bottom: 45px;
      }

      .login-form {
        padding: 25px 35px;
      }

      h5 {
        padding-bottom: 20px;
        margin: 0 0 20px;
      }
    }
  }
}
.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.fa-exclamation-circle {
  margin-right: 8px;
}
</style>