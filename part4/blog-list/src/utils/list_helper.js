// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
};
const _ = require("lodash");

const totalLikes = (blogs) => {
    return blogs.reduce((prev, cur) => prev + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined;

    return blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur);
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined;
    const blogsGroupedByAuthors = _(blogs).groupBy("author");
    const authorsMappedToBlogCount = blogsGroupedByAuthors.map((authorBlogs, author) => { return { author: author, blogs: authorBlogs.length}; });
    return authorsMappedToBlogCount.reduce((prev, cur) =>  prev.blogs > cur.blogs ? prev : cur);
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined;
    const blogsGroupedByAuthors = _(blogs).groupBy("author");
    const authorsMappedToTotalLikeCount = blogsGroupedByAuthors.map((authorBlogs, author) => { return { author: author, likes: totalLikes(authorBlogs)}; });
    return authorsMappedToTotalLikeCount.reduce((prev, cur ) => prev.likes > cur.likes ? prev : cur);
};




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};