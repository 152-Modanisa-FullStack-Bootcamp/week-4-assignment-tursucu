import {shallowMount} from "@vue/test-utils";
import HomePage from "@/views/HomePage";
import Header from "@/views/Header";
import VideoList from "@/components/VideoList";

describe("HomePage exist check", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(HomePage)
    })

    it('should homepage component exists', function () {
        expect(wrapper.exists()).toBeTruthy()
    });

    it("header exists", () => {
        const header = wrapper.findComponent(Header)
        expect(header.exists()).toBeTruthy()
    })

    it("video list exists", () => {
        const productList = wrapper.findComponent(VideoList)
        expect(productList.exists()).toBeTruthy()
    })
})
