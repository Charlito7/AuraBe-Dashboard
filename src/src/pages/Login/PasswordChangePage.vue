<template>
  <div class="password-change-layout">
    <MainHeader />
    
    <main class="password-change-main">
      <div class="password-change-card">
        <div class="card-header">
          <h2>Changer le mot de passe</h2>
        </div>
        
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="currentPassword">Mot de passe actuel</label>
              <div class="input-with-icon">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="form-control"
                  id="currentPassword"
                  v-model="currentPassword"
                  required
                  :disabled="isLoading"
                />
                <span class="password-toggle" @click="showCurrentPassword = !showCurrentPassword">
                  <i :class="showCurrentPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="newPassword">Nouveau mot de passe</label>
              <div class="input-with-icon">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  class="form-control"
                  id="newPassword"
                  v-model="newPassword"
                  required
                  minlength="8"
                  :disabled="isLoading"
                />
                <span class="password-toggle" @click="showNewPassword = !showNewPassword">
                  <i :class="showNewPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </span>
              </div>
              <small class="form-text text-muted">Minimum 8 caractères</small>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirmer le nouveau mot de passe</label>
              <div class="input-with-icon">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                  minlength="8"
                  :disabled="isLoading"
                />
                <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                  <i :class="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </span>
              </div>
              <small v-if="passwordMismatch" class="text-danger">
                <i class="fas fa-exclamation-circle"></i> Les nouveaux mots de passe ne correspondent pas
              </small>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
              <span v-if="!isLoading">Mettre à jour le mot de passe</span>
              <span v-else>
                <i class="fas fa-spinner fa-spin"></i> Traitement en cours...
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
    
    <!-- Modal pour les messages -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ modalMessage }}</p>
        </div>
        <div class="modal-footer">
          <button 
            v-if="isSuccess" 
            class="btn btn-success" 
            @click="redirectToLogin"
          >
            Se reconnecter
          </button>
          <button 
            v-else 
            class="btn btn-primary" 
            @click="closeModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    
    <MainFooter class="password-change-footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import api from "@/services/api";

export default defineComponent({
  name: "PasswordChangePage",
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const router = useRouter();
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const showModal = ref(false);
    const isSuccess = ref(false);
    const modalTitle = ref("");
    const modalMessage = ref("");
    const showCurrentPassword = ref(false);
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);

    const passwordMismatch = computed(() => {
      return newPassword.value !== confirmPassword.value && confirmPassword.value !== "";
    });

    const openModal = (success: boolean) => {
      isSuccess.value = success;
      if (success) {
        modalTitle.value = "Succès";
        modalMessage.value = "Votre mot de passe a été modifié avec succès, veuillez vous reconnecter";
      } else {
        modalTitle.value = "Échec";
        modalMessage.value = "Tentative échouée, veuillez réessayer ou contacter votre administrateur";
      }
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const redirectToLogin = () => {
      router.push("/login");
    };

    const handleSubmit = async () => {
      if (newPassword.value !== confirmPassword.value) {
        return;
      }

      isLoading.value = true;

      try {
        const model = {
          oldPassword: currentPassword.value,
          newPassword: newPassword.value
        };
        const response = await api.post<boolean>(process.env.VUE_APP_PASSWORD_CHANGE, model);
        
        if (response.data) {
          openModal(true);
        } else {
          openModal(false);
        }
      } catch (error) {
        console.error("Erreur lors du changement de mot de passe:", error);
        openModal(false);
      } finally {
        isLoading.value = false;
      }

      // Réinitialisation du formulaire
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      handleSubmit,
      showModal,
      isSuccess,
      modalTitle,
      modalMessage,
      closeModal,
      redirectToLogin,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      passwordMismatch,
      isLoading
    };
  },
});
</script>
<style lang="scss" scoped>
.password-change-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.password-change-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 1rem 2rem; /* 7rem top pour compenser le header fixe */
  overflow-y: auto;
}

.password-change-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  
  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    text-align: center;
    
    h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }
  }
  
  .card-body {
    padding: 1.5rem;
    
    .form-group {
      margin-bottom: 1.25rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #555;
      }
      
      .input-with-icon {
        position: relative;
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;
          padding-right: 2.5rem;
          
          &:focus {
            border-color: #4a90e2;
            outline: none;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
          }
        }
        
        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6c757d;
          
          &:hover {
            color: #495057;
          }
        }
      }
      
      .form-text {
        font-size: 0.85rem;
        color: #6c757d;
      }
      
      .text-danger {
        color: #dc3545;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        margin-top: 0.25rem;
        
        i {
          margin-right: 0.25rem;
        }
      }
    }
    
    .btn-block {
      padding: 0.75rem;
      font-size: 1rem;
      margin-top: 1rem;
      background-color: #B18164;
      border: none;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: darken(#B18164, 10%);
      }
    }
  }
}

.password-change-footer {
  flex-shrink: 0;
}

/* Styles pour le modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    
    h3 {
      margin: 0;
      color: #333;
    }
  }
  
  .modal-body {
    padding: 1.5rem;
    
    p {
      margin: 0;
      color: #555;
    }
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      
      &.btn-success {
        background-color: #28a745;
        color: white;
        border: none;
        
        &:hover {
          background-color: darken(#28a745, 10%);
        }
      }
      
      &.btn-primary {
        background-color: #007bff;
        color: white;
        border: none;
        
        &:hover {
          background-color: darken(#007bff, 10%);
        }
      }
    }
  }
}

@media (max-height: 700px) {
  .password-change-main {
    align-items: flex-start;
    padding-top: 7rem;
  }
}

@media (max-width: 576px) {
  .password-change-main {
    padding: 6rem 0.5rem 1rem;
  }
  
  .password-change-card {
    margin: 0.5rem;
    
    .card-header, .card-body {
      padding: 1rem;
    }
  }
}

.btn-block {
  position: relative;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.fa-spinner {
  margin-right: 8px;
}
</style>