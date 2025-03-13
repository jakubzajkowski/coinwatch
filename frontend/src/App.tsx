import './App.css'
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import {ApolloProvider} from "@apollo/client";
import client from "./apollo-client.ts";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#030310',
            },
            secondary: {
                main: '#ff29c2',
            },
            background: {
                default: '#f4f6f8',
            },
            text: {
                primary: '#e329ff',
                secondary: '#ffffff',
            },
        },
        typography: {
            fontFamily: '"Roboto", sans-serif',
        },
    });

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <div>
                        <Button variant="contained">Hello</Button>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Users</Link>
                                </li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default App
