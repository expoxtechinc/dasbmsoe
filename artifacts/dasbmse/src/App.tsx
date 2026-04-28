import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { ScrollToTop, WhatsAppButton, LoadingScreen } from "@/components/ScrollUtils";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Activities from "@/pages/Activities";
import Staff from "@/pages/Staff";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center text-center px-4 pb-24 md:pb-0">
      <div>
        <div className="text-7xl sm:text-8xl font-extrabold gold-text mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-gold px-8 py-3 rounded-xl font-semibold inline-block">← Go Home</a>
      </div>
    </div>
  );
}

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Navbar />
        <main className="pb-20 md:pb-0">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/academics" component={Academics} />
            <Route path="/activities" component={Activities} />
            <Route path="/staff" component={Staff} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <MobileNav />
        <ScrollToTop />
        <WhatsAppButton />
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppContent />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
