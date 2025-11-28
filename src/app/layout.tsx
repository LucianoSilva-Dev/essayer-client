import './globals.css';
import './swiper-hover.css'
// 1. Importar as novas fontes aqui
import { Inter, Montserrat, Open_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/./contexts/auth-context';
import { ProfileProvider } from '@/./contexts/profile-context';
import { AdminProvider } from '@/./contexts/admin-context';
import { RepertorioProvider } from '@/./contexts/repertorio-context';
import { CitacaoProvider } from '@/./contexts/citacao-context';
import { Suspense } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HeaderWrapper } from '@/components/header-wrapper';
import { Sidebar } from '@/components/sidebar/sidebar';
import { MainWrapper } from '@/components/main-wrapper';
import { AddRepertorioProvider } from '@/contexts/add-repertorio-context';
import { NotificationProvider } from '@/contexts/notification-context';

const inter = Inter({ subsets: ['latin'] });

// 2. Configurar a Montserrat
const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat', // Cria uma variável CSS para o Tailwind usar
});

// 3. Configurar a Open Sans
const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans', // Cria uma variável CSS para o Tailwind usar
});

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
      {/* 4. Adicionar as variáveis das fontes na className do body */}
      <body className={`${inter.className} ${montserrat.variable} ${openSans.variable} font-sans`}>
        <AuthProvider>
          <ProfileProvider>
            <AdminProvider>
              <RepertorioProvider>
                <CitacaoProvider>
                  <AddRepertorioProvider>
                    <NotificationProvider>
                      <ToastContainer />
                      <Suspense fallback={<div>Loading header...</div>}>
                        <HeaderWrapper />
                      </Suspense>
                      <Sidebar />
                      <MainWrapper>
                        {children}
                      </MainWrapper>
                    </NotificationProvider>
                  </AddRepertorioProvider>
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