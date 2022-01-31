const {Given, When, Then} = require("cucumber");
const openUrl = require("../support/action/openUrl");
const waitForSelector = require("../support/action/waitForSelector");
const checkUrlContains = require("../support/check/checkUrlContains");
const checkElementExists = require("../support/check/checkElementExists");
const assert = require('assert').strict;

Given("that User goes to Videos Site Project's HomePage", async function () {
    await openUrl.call(this, "http://localhost:8080/")
});


When("page is loaded", async function () {
    await waitForSelector.call(this, "#app")
});
Then("User can see some of videos' title like", async function (arr) {
    const selector = ".relative-container"

    for (let [videoName] of arr.rawTable) {
        const title = await this.page.$$eval(
            selector,
            async (items, videoName) => {
                const relatedVideo = items
                    .find(item => item.querySelector(".video-title").textContent === videoName)
                return !!relatedVideo
            },
            videoName
        )
        assert.strictEqual(title, true, `Expected "${selector}" to title see`);
    }
});

Given("that User is on Video Site Project's HomePage", async function () {
    await openUrl.call(this, "http://localhost:8080/")
});

When("User clicks {string} video", async function (title) {
    const selector = ".relative-container"
    await this.page.$$eval(
        selector,
        async (items, title) => {
            const relatedVideo = items.find(item => item.querySelector(".video-title").textContent === title)
            const videoBtn = relatedVideo.querySelector(".video-container")
            await videoBtn.click()
        },
        title
    )
});
Then("User should see watch url correctly", async function () {
    await checkUrlContains.call(this, false, "watch?id=2")
});
When("User hovers {string} video", async function (title) {
    const selector = ".relative-container"

    const index = await this.page.$$eval(selector, async (items, title) => {
        return items.findIndex(item => item.querySelector(".video-title").textContent === title)
    }, title)

    const selectVideo = await this.page.$$(selector)
    await selectVideo[index].hover()
});
Then("User should see hovered image", async function () {
    const selector = ".video-hover"
    await checkElementExists.call(this,selector)
});
