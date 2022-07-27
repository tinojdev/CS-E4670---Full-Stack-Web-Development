import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
    test("Form calls addBlog with correct details", async () => {
        const dummyBlog =  {
            title: "Crime and Punishment",
            author: "Fjodor Dostojevsky",
            url: "google.com",
        };
        const mockHandler = jest.fn();
        render(<BlogForm addBlog={mockHandler}/>);
        const titleInput = screen.getByPlaceholderText("Title");
        const authorInput = screen.getByPlaceholderText("Author");
        const urlInput = screen.getByPlaceholderText("Url");
        await userEvent.type(titleInput, dummyBlog.title);
        await userEvent.type(authorInput, dummyBlog.author);
        await userEvent.type(urlInput, dummyBlog.url);
        await userEvent.click(screen.getByText("Save"));

        expect(mockHandler.mock.calls[0][0]).toEqual(dummyBlog);

    });
});