import Vue from "vue";
import Router from "vue-router";
import PollForm from "../components/PollForm";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "PollForm",
      component: PollForm
    }
  ]
});

export default router;
