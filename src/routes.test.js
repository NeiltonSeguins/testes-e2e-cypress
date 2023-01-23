import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AppRoutes from './routes';
import Cartoes from './componentes/Cartoes';

describe('Rotas', () => {
  test('Deve renderizar a rota principal', () => {
    render(<Home />, { wrapper: BrowserRouter });
    const boasVindas = screen.getByText('Bem vindo de volta!');
    expect(boasVindas).toBeInTheDocument();
  });

  test('Deve renderizar a rota Cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  test('Deve renderizar a localização da rota atual', () => {
    const rota = '/home/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Home />
      </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('local');
    expect(localizacaoAtual).toHaveTextContent(rota);
  });

  test('Deve renderizar a página 404', () => {
    const rota = '/extrato';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const paginaErro = screen.getByTestId('pagina-404');
    expect(paginaErro).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});
