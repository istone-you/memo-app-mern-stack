import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/Auth';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import AppLayout from './components/layout/App';
import Home from './components/pages/Home';
import Memo from './components/pages/Memo';

function App() {

  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
            <Route path="memo/:memoid" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
