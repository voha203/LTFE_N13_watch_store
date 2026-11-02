import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
            <Header />
            <main style={{ flex: '1 0 auto', backgroundColor: '#f9fafb' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};