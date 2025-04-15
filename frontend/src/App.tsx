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
import NavBar from "./components/navbar/NavBar.tsx";
import {theme} from "./theme/theme.ts";
import Footer from "./components/Footer.tsx";
import Notifications from "./pages/Notifications.tsx";
import SignUp from "./pages/SignUp.tsx";
import {Provider} from "react-redux";
import store from "./redux/store.ts";
import Alerts from "./pages/Alerts.tsx";
import NotFound from "./pages/404.tsx";
import SignIn from "./pages/SignIn.tsx";
import Crypto from "./pages/Crypto.tsx";

function App() {

    return (
        <Provider store={store}>
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
                                <Route path="/sign-in" element={<SignIn />} />
                                <Route path="/alerts" element={<Alerts />} />
                                <Route path="/crypto/:id" element={<Crypto />} />

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <Footer />
                        </div>
                    </Router>
                </ThemeProvider>
            </ApolloProvider>
        </Provider>
    )
}

export default App
