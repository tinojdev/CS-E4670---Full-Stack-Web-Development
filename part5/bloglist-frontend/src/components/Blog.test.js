import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
    title: "Things i dont know",
    author: "Jeff",
    url: "google.com",
    likes:3,
    user: {
        username:"superadmin", 
        name:"Matti Meikäläinen",
    },
};

const mockHandler = jest.fn();

describe("<Blog />", () => {
    beforeEach(() => {

        render(<Blog blog={blog} addLikeToBlog={mockHandler} removeBlog={() => {}} />);

    });
    test("renders title and author by default", () => {
    
        const element = screen.getByText(`${blog.title}, ${blog.author}`);
        expect(element).toBeDefined();
    });

    test("does not render url or likes by default", () => {
    
        const likesElement = screen.queryByText(`Likes: ${blog.likes}`);
        const urlElement = screen.queryByText(`Url: ${blog.url}`);
        expect(likesElement).not.toBeInTheDocument();
        expect(urlElement).not.toBeInTheDocument();
    }
    );

    test("renders url and likes when 'show' button has been clicked", async () => {
        const user = userEvent.setup();

        const buttonElement = screen.getByText("Show");
        await user.click(buttonElement);

        const likesElement = screen.getByText(`Likes: ${blog.likes}`);
        const urlElement = screen.getByText(`Url: ${blog.url}`);
        
        expect(likesElement).toBeInTheDocument();
        expect(urlElement).toBeInTheDocument();
    });

    test("event handler for like is called twice when button is clicked twice", async () => {
        const user = userEvent.setup();
        
        const showButtonElement = screen.getByText("Show");
        await user.click(showButtonElement);
        const likeButtonElement = screen.getByText("Like");

        await user.click(likeButtonElement);
        await user.click(likeButtonElement);


        expect(mockHandler.mock.calls).toHaveLength(2);

    });
});