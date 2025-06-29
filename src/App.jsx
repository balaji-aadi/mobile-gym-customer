import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SessionsPage from './pages/SessionsPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import SessionDetailPage from './pages/SessionDetailPage.jsx';
import MySessionPage from './pages/MySessionPage.jsx';
import PaymentsPage from './pages/PaymentsPage.jsx';
import MySessionDetail from './pages/MySessionDetail.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import ProtectedRoute, { PublicRoute } from './Middleware/ProtectedRoute.jsx';
import Layout from './Layout/Layout.jsx';
import { Toaster } from 'react-hot-toast';
import { LoaderProvider } from './loader/LoaderContext';

const router = createBrowserRouter([
  {
    path: 'signup',
    element: <PublicRoute><RegisterPage /></PublicRoute>,
  },
  {
    path: 'login',
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'profile', element: <ProtectedRoute> <ProfilePage /></ProtectedRoute> },
      // { path: 'sessions', element: <ProtectedRoute> <SessionsPage />  </ProtectedRoute> },
      { path: 'my-sessions', element: <ProtectedRoute> <MySessionPage /> </ProtectedRoute> },
      { path: 'my-session/:id', element: <ProtectedRoute> <MySessionDetail /> </ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute> <PaymentPage /> </ProtectedRoute> },
      { path: 'subscriptions', element: <ProtectedRoute> <SubscriptionsPage /> </ProtectedRoute> },
      { path: 'payments', element: <ProtectedRoute> <PaymentsPage />  </ProtectedRoute> },
      { path: 'history', element: <ProtectedRoute> <HistoryPage /> </ProtectedRoute> },
      { path: 'chat', element: <ProtectedRoute> <ChatPage /></ProtectedRoute> },
      { path: 'sessions/:id', element: <ProtectedRoute><SessionDetailPage /></ProtectedRoute> },
      { path: 'locations', element: <ProtectedRoute><LocationPage /></ProtectedRoute> },
    ],
  },
]);

function App() {
  return <>
    <Toaster
      containerStyle={{
        top: "4rem",
        zIndex: "9999999999999",
      }}
    />

    <LoaderProvider>
      <RouterProvider router={router} />
    </LoaderProvider>
  </>;
}

export default App;
