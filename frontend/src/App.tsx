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
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Button color="" variant="contained">Hello</Button>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
