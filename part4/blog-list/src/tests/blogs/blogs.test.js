const listHelper = require("../../utils/list_helper");
const dummyBlogs = require("./dummyBlogs");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes" , () => {
    test("of empty list is zero", () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });
    test("of list of one to be the likes of the one", () => {
        expect(listHelper.totalLikes([dummyBlogs[0]])).toBe(dummyBlogs[0].likes);
    });
    test("of a bigger list is calculated right", () => {
        expect(listHelper.totalLikes(dummyBlogs)).toBe(36);
    });
});

describe("favorite blog", () => {
    test("of empty list is undefined", () => {
        expect(listHelper.favoriteBlog([])).toBe(undefined);
    });
    test("of list of one to be the one", () => {
        expect(listHelper.favoriteBlog([dummyBlogs[0]])).toEqual(dummyBlogs[0]);
    });
    test("of a bigger list to be the one with the most likes", () => {
        expect(listHelper.favoriteBlog(dummyBlogs)).toEqual(dummyBlogs[2]);
    });
});


describe("most blogs", () => {
    test("of empty list is undefined", () => {
        expect(listHelper.mostBlogs([])).toBe(undefined);
    });
    test("of a list of one to be the ones author and have one blog", () => {
        expect(listHelper.mostBlogs([dummyBlogs[0]]))
            .toEqual({
                author: dummyBlogs[0].author,
                blogs: 1
            });
    });
    test("of a bigger list to be the one with most posts", () => {
        expect(listHelper.mostBlogs(dummyBlogs))
            .toEqual({
                author: "Robert C. Martin",
                blogs: 3
            });
    });
});

describe("most likes", () => {
    test("of empty list is undefined", () => {
        expect(listHelper.mostLikes([])).toBe(undefined);
    });
    test("of a list of one to be the ones author and have its likes", () => {
        expect(listHelper.mostLikes([dummyBlogs[0]]))
            .toEqual({
                author: dummyBlogs[0].author,
                likes: dummyBlogs[0].likes
            });
    });
    test("of a bigger list to be the one with most likes", () => {
        expect(listHelper.mostLikes(dummyBlogs))
            .toEqual({
                author: "Edsger W. Dijkstra",
                likes: 17
            });
    });
});