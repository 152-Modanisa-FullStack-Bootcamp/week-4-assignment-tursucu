import {shallowMount} from "@vue/test-utils";
import VideoItem from "@/components/VideoItem";

describe('VideoItem.vue', () => {

    describe('exists check', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallowMount(VideoItem, {
                propsData: {
                    isFavorite: false,
                    video: {}
                }
            })
        })

        it('should component check', () => {
            expect(wrapper.exists()).toBeTruthy()
        });

        it('should render video cover image', () => {
            const coverImage = wrapper.find('[data-test="coverImage"]')
            expect(coverImage.exists()).toBeTruthy();
        });

        it('should render video hover image', async () => {
            const mouseControl = wrapper.find('.relative-container')

            await mouseControl.trigger('mouseover')
            const hoverImageTrue = wrapper.find('[data-test="hoverImage"]')
            expect(hoverImageTrue.exists()).toBeTruthy()

            await mouseControl.trigger('mouseleave')
            const hoverImageFalse = wrapper.find('[data-test="hoverImage"]')
            expect(hoverImageFalse.exists()).toBeFalsy()
        })

        it('should render video owner image', () => {
            const ownerImage = wrapper.find('[data-test="ownerImage"]')
            expect(ownerImage.exists()).toBeTruthy()
        })

        it('should render video title', function () {
            const title = wrapper.find('.video-title')
            expect(title.exists()).toBeTruthy()
        });

        it('should render video owner name', () => {
            const ownerName = wrapper.find('.video-owner')
            expect(ownerName.exists()).toBeTruthy()
        })

        it('should render video view count', () => {
            const viewCount = wrapper.find('[data-test="count"]')
            expect(viewCount.exists()).toBeTruthy()
        });

        it('should render video publish date in month', () => {
            const date = wrapper.find('[data-test="date"]')
            expect(date.exists()).toBeTruthy()
        });
    })

    it.each`
         caseName | initialFavoriteVideoValue | expectedClassName
          ${'when video selected as favorite'} | ${true} | ${"favorite-button-active"}
          ${'when video selected as favorite'} | ${false} | ${undefined}
    `('returns $expectedStyle when $caseName with $initialFavoriteVideoValue',
        ({caseName, initialFavoriteVideoValue, expectedClassName}) => {
            const localThis = {
                favoriteVideo: initialFavoriteVideoValue
            }
            const style = VideoItem.computed.favoriteBtnStyle.call(localThis)
            expect(style).toStrictEqual(expectedClassName)
        });

    it("check addOrRemoveFavorite functionality", () => {
        const video = {
            "id": 1,
            "coverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
            "description": "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications.",
            "hoverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
            "ownerImage": "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
            "ownerName": "freeCodeCamp.org",
            "publishDateInMonth": 4,
            "title": "Vue.js Course for Beginners [2021 Tutorial]",
            "videoAddress": "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
            "viewCount": 254
        }

        let dispatch = jest.fn()

        const localThis = {
            video,
            favoriteVideo: false,
            $store: {
                dispatch
            }
        }

        VideoItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteVideo).toBeTruthy()
        expect(dispatch).toHaveBeenCalledWith('addOrRemoveFavoriteAction', {video: localThis.video, isFavorite: true})

        VideoItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteVideo).toBeFalsy()
        expect(dispatch).toHaveBeenCalledWith('addOrRemoveFavoriteAction', {
            video: localThis.video,
            isFavorite: false
        })

        VideoItem.methods.favoriteToggle.call(localThis)
        expect(localThis.favoriteVideo).toBeTruthy()
        expect(dispatch).toHaveBeenCalledWith('addOrRemoveFavoriteAction', {video: localThis.video, isFavorite: true})
    })

    it('displays title ', () => {
        const wrapper = shallowMount(VideoItem, {
            propsData: {
                video: {
                    id: 1,
                    videoAddress: "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
                    coverImage: "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
                    hoverImage: "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
                    title: "Vue.js Course for Beginners [2021 Tutorial]",
                    viewCount: 254,
                    publishDateInMonth: 4,
                    ownerImage: "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
                    ownerName: "freeCodeCamp.org",
                    description: "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications."
                }
            }
        })
        expect(wrapper.find('.video-title').text()).toContain('Vue.js Course for Beginners [2021 Tutorial]')

    });

})
