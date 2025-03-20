import './App.css'
import { ThemeProvider } from 'styled-components';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import {ApolloProvider} from "@apollo/client";
import client from "./apollo/apollo-client.ts";
import Dashboard from "./pages/Dashboard.tsx";
import NavBar from "./components/NavBar.tsx";
import {theme} from "./theme/theme.ts";
import Footer from "./components/Footer.tsx";
import Notifications from "./pages/Notifications.tsx";
import SignUp from "./pages/SignUp.tsx";

function App() {

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <div>
                        <NavBar />
                        <Routes>
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default App
