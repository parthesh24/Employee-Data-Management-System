import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';

export const metadata = {
    title: 'Employee Management',
    description: 'Manage employee data efficiently.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Navbar/>
                    {children}
                    <Footer/>
                </AuthProvider>
            </body>
        </html>
    );
}
