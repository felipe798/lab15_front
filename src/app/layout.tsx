import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FarmaCool - Sistema de Farmacia Completo',
  description: 'Sistema completo de farmacia con medicamentos, médicos y recetas',
  keywords: ['farmacia', 'medicamentos', 'médicos', 'recetas', 'sistema', 'gestión'],
  authors: [{ name: 'FarmaCool Team' }],
  creator: 'FarmaCool',
  publisher: 'FarmaCool',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  colorScheme: 'light',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        
        {/* SEO Meta Tags */}
        <meta name="application-name" content="FarmaCool" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FarmaCool" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FarmaCool - Sistema de Farmacia" />
        <meta property="og:description" content="Sistema completo de farmacia con medicamentos, médicos y recetas" />
        <meta property="og:site_name" content="FarmaCool" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FarmaCool - Sistema de Farmacia" />
        <meta name="twitter:description" content="Sistema completo de farmacia con medicamentos, médicos y recetas" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      
      <body className={inter.className}>
        {/* Navbar fija */}
        <Navbar />
        
        {/* Contenido principal */}
        <div className="page-bg">
          <div className="container">
            <main role="main">
              {children}
            </main>
          </div>
        </div>
        
        {/* Sistema de notificaciones */}
        <Toaster 
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Configuración por defecto
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '15px',
              padding: '16px 20px',
              fontSize: '14px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: 'none',
            },
            
            // Configuraciones específicas por tipo
            success: {
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#43e97b',
              },
            },
            
            error: {
              duration: 5000,
              style: {
                background: 'linear-gradient(135deg, #fa709a, #fee140)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#fa709a',
              },
            },
            
            loading: {
              duration: Infinity,
              style: {
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              },
            },
          }}
        />
        
        {/* Scripts adicionales si son necesarios */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Detectar tema del sistema
              if (typeof window !== 'undefined') {
                // Configuraciones adicionales del cliente
                console.log('🚀 FarmaCool iniciado correctamente');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}