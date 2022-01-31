import {actions, mutations, state} from "@/store";

describe('mutation tests', () => {
    it('should add favorite video successfully', () => {
        const data = {
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
        mutations.SET_FAVORITES(state, data)
        expect(state.favorites).toHaveLength(1)
    })
    describe('should remove favorite video', () => {
        const data = {
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

        it('when favorite product is empty', () => {
            mutations.DELETE_FAVORITES(state, data)
            expect(state.favorites).toHaveLength(0)
        })
        it('when favorite video has some videos', () => {
            state.favorites.push({ id: 1 }, { id: 2 }, { id: 3 })
            mutations.DELETE_FAVORITES(state, data)
            expect(state.favorites).toHaveLength(2)
        })
    })
})

describe('actions tests', () => {
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
    it('when a video selected as favorite', () => {
        let context = {
            commit: jest.fn()
        }
        let payload = {
            video,
            isFavorite: true
        }
        actions.addOrRemoveFavoriteAction(context, payload)
        expect(context.commit).toHaveBeenCalled()
        expect(context.commit).toHaveBeenCalledWith('SET_FAVORITES', video)
    })
    it('when a video removed from favorite', () => {
        let context = {
            commit: jest.fn()
        }
        let payload = {
            video,
            isFavorite: false
        }
        actions.addOrRemoveFavoriteAction(context, payload)
        expect(context.commit).toHaveBeenCalled()
        expect(context.commit).toHaveBeenCalledWith('DELETE_FAVORITES', video)
    })
})
