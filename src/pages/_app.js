import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserProvider } from "../context/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
      <Footer /> {/* Footer added here */}
    </UserProvider>
  );
}
