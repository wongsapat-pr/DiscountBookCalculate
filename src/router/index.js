import {
    createWebHistory,
    createRouter
} from "vue-router";
import CreateComponent from "@/components/CreateComponent.vue";
import EditComponent from "@/components/EditComponent.vue";
import ListComponent from "@/components/ListComponent.vue";
import DiscountCalComponent from "@/components/DiscountCalComponent.vue"

const routes = [{
        path: "/",
        name: "cart",
        component: DiscountCalComponent,
    },
    {
        path: "/add",
        name: "home",
        component: CreateComponent,
    },
    {
        path: "/view",
        name: "view",
        component: ListComponent,
    },
    {
        path: "/edit/:id",
        name: "edit",
        component: EditComponent,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;