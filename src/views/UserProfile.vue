<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h2 class="user-profile__username">@{{ state.user.username }}</h2>
      <div class="user-profile__admin-badge" v-if="state.user.isAdmin">Admin</div>
      <div class="user-profile__follower-count">
        <strong>Followers: </strong> {{ state.followers }}
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>

    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="twoot in state.user.twoots"
        :key="twoot.id"
        :username="state.user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { users } from "../assets/users";
import TwootItem from "../components/TwootItem";
import CreateTwootPanel from "../components/CreateTwootPanel";

export default {
  name: "UserProfile",
  components: {
    TwootItem,
    CreateTwootPanel,
  },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0]
    });

    function addTwoot(text) {
      state.user.twoots.unshift({
        id: state.user.twoots.length + 1,
        content: text,
      });
    }

    return {
      state,
      addTwoot,
      userId,
    };
  },

  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(id);
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  mounted() {
    this.followUser();
  },
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log("watch");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 50px;
  padding: 0 50px;

  .user-profile__user-panel {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #dfe3e8;

    .user-profile__admin-badge {
      background: purple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 4px 10px;
      font-weight: bold;
    }

    .user-profile__create-twoot {
      padding-top: 20px;
      display: flex;
      flex-direction: column;

      &.--exceeded {
        color: red;
        border-color: red;
      }
    }
  }

  .user-profile__twoots-wrapper {
    display: grid;
    gap: 10px;
  }
}
</style>