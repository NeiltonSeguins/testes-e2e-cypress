import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from 'routes';
import Home from './index';

describe('Componente <Home />', () => {
  test('Deve permitir adicionar uma nova transação em Extrato', async () => {
    const rota = '/home';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Home />
      </MemoryRouter>
    );

    const campoValor = await screen.findByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');
    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '50');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemDeExtrato = screen.getAllByRole('listitem');
    expect(itemDeExtrato).toHaveLength(1);
    expect(novaTransacao).toContainElement(itemDeExtrato[0]);
  });

  test('Deve navegar até a página correspondente ao link clicado', async () => {
    const rota = '/home';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const linkPaginaCartoes = screen.getByText('Cartões');
    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);

    const tituloPaginaCartoes = await screen.findByText('Meus cartões');
    expect(tituloPaginaCartoes).toBeInTheDocument();
  });
});
