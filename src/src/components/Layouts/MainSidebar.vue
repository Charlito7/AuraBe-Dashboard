<template>
  <div
    id="sidebar-wrap"
    class="sidebar-area position-fixed bg_primary transition"
  >
    <div id="sidebar_menu_wrap" class="sidebar-menu-wrap">
      <ul class="sidebar-menu list-style">
        <li class="nav-item" v-if="hasRole(['Seller', 'Admin'])">
          <router-link to="/" class="nav-link">
            <img src="../../assets/img/icons/dashboard.svg" alt="Image" />
            <span class="nav-text d-block fs-14 fw-light"> Dashboard </span>
          </router-link>
        </li>
        <li class="nav-item" v-if="hasRole('Admin')">
          <a href="javascript:void(0)" class="nav-link">
            <img src="../../assets/img/icons/products.svg" alt="Image" />
            <span class="nav-text d-block fs-14"> Products </span>
          </a>
          <ul class="sidebar-secondary-menu list-style bg-white">
            <li class="nav-item">
              <router-link to="/create-product">
                <img src="../../assets/img/icons/create-item.svg" alt="Image" />
                Create Product
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product-list">
                <img src="../../assets/img/icons/item-list.svg" alt="Image" />
                Product List
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Sales -->
        <li class="nav-item" v-if="hasRole('Admin')">
          <a href="javascript:void(0)" class="nav-link">
            <img src="../../assets/img/icons/sale.svg" alt="Image" />
            <span class="nav-text d-block fs-14"> Sales </span>
          </a>
          <ul class="sidebar-secondary-menu bg-white list-style">
            <li class="nav-item">
              <router-link to="/create-sales">
                <img src="../../assets/img/icons/create-item.svg" alt="Image" />
                Create Sale
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sales-list">
                <img src="../../assets/img/icons/item-list.svg" alt="Image" />
                Sales List
              </router-link>
            </li>
          </ul>
        </li>
    
        <li class="nav-item" v-if="hasRole('Seller')">
          <router-link to="/create-sales" class="nav-link">
            <img src="../../assets/img/icons/create-sales.png" alt="Image" />
            <span class="nav-text d-block fs-14 fw-light"> Create Sale </span>
          </router-link>
        </li>
        <li class="nav-item" v-if="hasRole('Seller')">
          <router-link to="/sales-list" class="nav-link">
            <img src="../../assets/img/icons/sales-list.png" alt="Image" />
            <span class="nav-text d-block fs-14 fw-light"> Sales List </span>
          </router-link>
        </li>
        <li class="nav-item" v-if="hasRole(['Seller', 'Admin'])">
          <a class="nav-link" @click="handleLogout">
            <img src="@/assets/img/icons/logout.png" alt="Logout" />
            <span class="nav-text d-block fs-14 fw-light"> Logout </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default defineComponent({
  name: "MainSidebar",
  computed: {
    userRoles(): string[] {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userObject = JSON.parse(storedUser);
          return userObject.roles ? userObject.roles.split("/") : []; // Convert roles to array
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
      return [];
    },
  },
  methods: {
    hasRole(roles: string | string[]): boolean {
      const userRoles = this.userRoles;

      if (Array.isArray(roles)) {
        return roles.some(role => userRoles.includes(role));
      }
      return userRoles.includes(roles);
    },

    hasNotRole(roles: string | string[]): boolean {
      const userRoles = this.userRoles;

      if (Array.isArray(roles)) {
        return roles.every(role => !userRoles.includes(role));
      }
      return !userRoles.includes(roles);
    },

    async handleLogout() {
      const router = useRouter(); // Use the router composable

      try {
        const response = await api.post(process.env.VUE_APP_LOGOUT);

        if (response) {
          this.$router.push(process.env.VUE_APP_LOGIN_PAGE);
        } else {
          console.log("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.sidebar-area {
  top: 100px;
  left: 0;
  height: 100%;
  z-index: 2;
  transition: var(--transition);
  .sidebar-menu-wrap {
    padding: 40px;
    z-index: 2;
    .sidebar-menu {
      position: relative;
      z-index: 2;
      & > .nav-item {
        margin-bottom: 25px;
        display: block;
        &:last-child {
          margin-bottom: 0;
        }
        & > .nav-link {
          position: relative;
          background-color: #2c3a52;
          text-align: center;
          display: inline-block;
          width: 128px;
          height: 100px;
          border-radius: 4px;
          padding: 19px 5px 18px;
          transition: var(--transition);
          z-index: 1;

          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            width: 100%;
            height: 0;
            border-radius: 4px;
            background: var(
              --Purple-Gradient,
              linear-gradient(132deg, #4f46e5 4.27%, #6366f1 100%)
            );
            visibility: hidden;
            opacity: 0;
            transition: var(--transition);
            z-index: -1;
          }
          img {
            display: block;
            margin: 0 auto;
          }
          .nav-text {
            color: #c6c7d3;
            margin-top: 5px;
          }
          &.active {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }
        &.active,
        &:hover {
          & > .nav-link {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }
        &:has(ul.sidebar-secondary-menu li a.active) {
          & > .nav-link {
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
            }
          }
        }
        .sidebar-secondary-menu {
          position: fixed;
          top: 100px;
          left: 208px;
          width: 280px;
          height: calc(100vh - 100px);
          visibility: hidden;
          opacity: 0;
          transition: var(--transition);
          z-index: 0;
          overflow-y: auto;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.06);
          li {
            a {
              font-size: 14px;
              color: var(--primaryColor);
              transition: var(--transition);
              padding: 14px 25px;
              display: block;
              width: 100%;
              img {
                position: relative;
                margin-right: 8px;
                top: -1.5px;
              }
              &.active,
              &:hover {
                background-color: #f3f8ff;
              }
            }
          }
        }
        &:hover {
          .sidebar-secondary-menu {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
}
#sidebar_menu_wrap {
  position: relative;
  z-index: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: var(--primaryColor);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }
  &::-webkit-scrollbar-corner {
    background: #000;
  }
}

@media only screen and (max-width: 575px) {
  .sidebar-area {
    top: 116px;
    .sidebar-menu-wrap {
      padding: 25px 15px;
      .sidebar-menu {
        & > .nav-item {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          & > .nav-link {
            width: 55px;
            height: 55px;
            padding: 14px 5px 12px;
            img {
              max-width: 27px;
            }
            .nav-text {
              display: none !important;
            }
          }
          .sidebar-secondary-menu {
            top: 116px;
            left: 80px;
            width: 250px;
            height: 100vh;
            li {
              a {
                font-size: 14px;
                padding: 14px 20px;
              }
            }
          }
        }
      }
    }
  }
  #sidebar_menu_wrap {
    height: calc(100vh - 116px);
  }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .sidebar-area {
    top: 80px;
    .sidebar-menu-wrap {
      .sidebar-menu {
        & > .nav-item {
          .sidebar-secondary-menu {
            top: 79px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1199px) {
}
</style>