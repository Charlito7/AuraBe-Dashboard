<template>
  <div class="profile-dropdown">
    <button
      class="dropdown-toggle text-start text-black-emphasis d-flex align-items-center p-0 position-relative bg-transparent border-0 transition lh-1"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
    <div class="user-avatar">{{ userInitial }}</div>
      <span class="md-none">
        <span class="d-block fw-bold text-title">{{ userFullName }}</span>
        <span class="text-paragraph fs-14">{{ userRoles }}</span>
      </span>
    </button>
    <div class="dropdown-menu top-1 shadow-none border-0">
      <ul class="list-style">
        <li class="fs-14 d-block transition">
          <router-link to="/my-profile" class="d-block">
            My Profile
          </router-link>
        </li>
        <li class="fs-14 d-block transition">
          <router-link to="/system-settings" class="d-block">
            Settings
          </router-link>
        </li>
        <li class="fs-14 d-block transition">
          <a class="nav-link" @click="handleLogout">
            <img src="@/assets/img/icons/logout-red.png" alt="Logout" />
            <span class="nav-text d-block fs-14 fw-light"> Logout </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import api from '@/services/api';

export default defineComponent({
  name: "ProfileDropdown",
  methods: {
    async handleLogout() {
      try {
        const response = await api.post(`/logout`)

        if (response) {
          this.$router.push("/login");
        } else {
          console.log("Logout failed")
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
  setup() {
    const userFullName = ref(""); // Default name
    const userRoles = ref(""); // Default role
    const userInitial = ref(""); 

    onMounted(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          const userObject = JSON.parse(storedUser);
          userFullName.value = userObject.firstName + " " + userObject.lastName || "";
          userInitial.value = userObject.initial;
          userRoles.value = userObject.roles || ""; // Fallback to Admin if not found
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    });

    return {
      userFullName,
      userRoles,
      userInitial
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-dropdown {
  img {
    border-radius: 5px;
    margin-right: 10px;
  }
  .dropdown-toggle {
    &:after {
      display: none;
    }
  }
  span {
    &:nth-child(1) {
      margin-bottom: 5px;
    }
    &:nth-child(2) {
      color: #8a939b;
    }
  }
  .dropdown-menu {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15) !important;
    padding: 14px 20px;
    top: 20px !important;
    ul {
      li {
        margin-bottom: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        a {
          &:hover {
            color: var(--secondaryColor);
            padding-left: 5px;
          }
        }
      }
    }
  }
}
.user-avatar {
  width: 40px; /* Adjust size */
  height: 40px;
  background-color: var(--secondaryColor); /* Or any color */
  color: var(--whiteColor);
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-transform: uppercase;
}

</style>