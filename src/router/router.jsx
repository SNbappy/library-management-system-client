import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddBook from "../pages/AddBook/AddBook";
import AllBooks from "../pages/AllBooks/AllBooks";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import CategoryBooksPage from "../pages/CategoryBooksPage/CategoryBooksPage";
import BookDetailsPage from "../pages/BookDetailsPage/BookDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <NotFoundPage></NotFoundPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'add-book',
                element: <AddBook></AddBook>
            },
            {
                path: 'all-books',
                element: <AllBooks></AllBooks>
            },
            {
                path: 'update-book/:id',
                element: <UpdateBook></UpdateBook>
            },
            {
                path: 'borrowed-books',
                element: <BorrowedBooks></BorrowedBooks>
            },
            {
                path: 'books/category/:category',
                element: <CategoryBooksPage></CategoryBooksPage>
            },
            {
                path: 'book/:id',
                element: <BookDetailsPage/>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
]);

export default router;
