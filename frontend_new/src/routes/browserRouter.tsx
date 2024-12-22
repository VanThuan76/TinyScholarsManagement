import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '@/components/layout/authLayout';
import ErrorPage from '@/pages/errors/errorPage';
import Layout from '@/components/layout';
import Redirect from '@/components/layout/redirect';
import NotFoundPage from '@/pages/errors/notfoundPage';
import { webRoutes } from '@/routes/web';
import loadable from '@loadable/component';
import ProgressBar from '@/components/loader/progressBar';
import RequireAuth from '@/routes/requireAuth';
import LoginPage from '@/pages/auth/loginPage';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const DashboardPage = loadable(() => import('@/pages/dashboardPage'), {
    fallback: fallbackElement,
});
const UserListPage = loadable(() => import('@/pages/users/userListPage'), {
    fallback: fallbackElement,
});
const ChildrenListPage = loadable(() => import('@/pages/children/childrenListPage'), {
    fallback: fallbackElement,
});
const CampusesListPage = loadable(() => import('@/pages/campuses/campusesListPage'), {
    fallback: fallbackElement,
});
const RoomsListPage = loadable(() => import('@/pages/rooms/roomsListPage'), {
    fallback: fallbackElement,
});
const BookingsListPage = loadable(() => import('@/pages/bookings/bookingsListPage'), {
    fallback: fallbackElement,
});
const SignsListPage = loadable(() => import('@/pages/signs/signsListPage'), {
    fallback: fallbackElement,
});


export const browserRouter = createBrowserRouter([
    {
        path: webRoutes.home,
        element: <Redirect />,
        errorElement: errorElement,
    },

    // auth routes
    {
        element: <AuthLayout />,
        errorElement: errorElement,
        children: [
            {
                path: webRoutes.login,
                element: <LoginPage />,
            },
        ],
    },

    // protected routes
    {
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        errorElement: errorElement,
        children: [
            {
                path: webRoutes.dashboard,
                element: <DashboardPage />,
            },
            {
                path: webRoutes.users,
                element: <UserListPage />,
            },
            {
                path: webRoutes.children,
                element: <ChildrenListPage />,
            },
            {
                path: webRoutes.campuses,
                element: <CampusesListPage />,
            },
            {
                path: webRoutes.rooms,
                element: <RoomsListPage />,
            },
            {
                path: webRoutes.bookings,
                element: <BookingsListPage />,
            },
            {
                path: webRoutes.signs,
                element: <SignsListPage />,
            },
        ],
    },

    // 404
    {
        path: '*',
        element: <NotFoundPage />,
        errorElement: errorElement,
    },
]);
