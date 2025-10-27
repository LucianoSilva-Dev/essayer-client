// incita/src/app/layout.tsx
import './globals.css';
import './swiper-hover.css'
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/./contexts/auth-context';
import { ProfileProvider } from '@/./contexts/profile-context';
import { AdminProvider } from '@/./contexts/admin-context';
import { RepertorioProvider } from '@/./contexts/repertorio-context';
import { CitacaoProvider } from '@/./contexts/citacao-context';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // Para os pontinhos de navegação
import 'swiper/css/navigation'; // Para as setas de navegação (opcional)
import { HeaderWrapper } from '@/components/header-wrapper';
import { Sidebar } from '@/components/sidebar/sidebar';
import { MainWrapper } from '@/components/main-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Incita',
  description: 'Sua plataforma de repertórios para redação',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ProfileProvider>
            <AdminProvider>
              <RepertorioProvider>
                <CitacaoProvider>
                  <ToastContainer />
                  <HeaderWrapper />
                  <Sidebar />
                  <MainWrapper>
                    {children}
                  </MainWrapper>
                </CitacaoProvider>
              </RepertorioProvider>
            </AdminProvider>
          </ProfileProvider>
        </AuthProvider>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </body>
    </html>
  );
}
