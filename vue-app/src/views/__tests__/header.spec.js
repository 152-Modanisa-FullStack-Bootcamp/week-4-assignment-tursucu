import {createLocalVue, RouterLinkStub, shallowMount} from "@vue/test-utils";
import Header from "@/views/Header";
import VueRouter from "vue-router";

function config() {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()

    return {
        localVue,
        router,
    }
}

describe('Header.vue', () => {
    it('should component exists', () => {
        const wrapper = shallowMount(Header, config())
        expect(wrapper.exists()).toBeTruthy()
    });

    it('should link render correctly', () => {
        let componentConfig = config()
        componentConfig.stubs = {
            'router-link': RouterLinkStub
        }
        const wrapper = shallowMount(Header, componentConfig)
        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.props().to).toEqual({"name": "Favorite", "params": {"userId": "bootcamp"}})
        expect(link.attributes().class).toEqual("favorite-button")
        expect(link.text()).toContain("Favorites")
    });
})
