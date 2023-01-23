const { render, screen } = require('@testing-library/react');
import { BrowserRouter } from 'react-router-dom';
import Cabecalho from './index';

test.skip('Deve renderizar o nome do usuário logado', async () => {
  render(<Cabecalho />, { wrapper: BrowserRouter });
  const nomeUsuario = await screen.findByText('Neilton Seguins');
  expect(nomeUsuario).toBeInTheDocument();
});
