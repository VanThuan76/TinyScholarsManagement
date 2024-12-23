import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '@/components/layout/authLayout';
import LayoutClient from '@/components/layout/client';
import ErrorPage from '@/pages/errors/errorPage';
import LayoutAdmin from '@/components/layout';
import NotFoundPage from '@/pages/errors/notfoundPage';
import { webRoutes } from '@/routes/web';
import loadable from '@loadable/component';
import ProgressBar from '@/components/loader/progressBar';
import RequireAuth from '@/routes/requireAuth';
import HomePage from '@/pages/client/home';
import RegisterPage from '@/pages/auth/registerPage';
import LoginPage from '@/pages/auth/loginPage';
import CampusesPage from '@/pages/client/campuses';
import ProfilePage from '@/pages/client/profile';
import AboutPage from '@/pages/client/about';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const DashboardPage = loadable(() => import('@/pages/admin/dashboardPage'), {
    fallback: fallbackElement,
});
const UserListPage = loadable(() => import('@/pages/admin/users/userListPage'), {
    fallback: fallbackElement,
});
const ChildrenListPage = loadable(() => import('@/pages/admin/children/childrenListPage'), {
    fallback: fallbackElement,
});
const CampusesListPage = loadable(() => import('@/pages/admin/campuses/campusesListPage'), {
    fallback: fallbackElement,
});
const RoomsListPage = loadable(() => import('@/pages/admin/rooms/roomsListPage'), {
    fallback: fallbackElement,
});
const BookingsListPage = loadable(() => import('@/pages/admin/bookings/bookingsListPage'), {
    fallback: fallbackElement,
});
const SignsListPage = loadable(() => import('@/pages/admin/signs/signsListPage'), {
    fallback: fallbackElement,
});


export const browserRouter = createBrowserRouter([
    {
        element: <LayoutClient />,
        errorElement: errorElement,
        children: [
            {
                path: webRoutes.home,
                element: <HomePage />,
            },
            {
                path: webRoutes.about,
                element: <AboutPage />,
            },
            {
                path: webRoutes.campuses_client,
                element: <CampusesPage />,
            },
            {
                path: webRoutes.profile,
                element: <ProfilePage />,
            },
        ],
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
            {
                path: webRoutes.register,
                element: <RegisterPage />,
            },
        ],
    },

    // protected routes
    {
        element: (
            <RequireAuth>
                <LayoutAdmin />
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
