import AppToolbar from './components/AppToolbar/AppToolbar';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Messages from './features/messages/Messages';

function App() {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth={"xl"}>
          <Routes>
            <Route path="/" element={<Messages />}/>
            <Route path="*" element={<Typography variant="h1">Not found!</Typography>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
