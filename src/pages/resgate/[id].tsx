import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { Api } from '@/services/Api';
import Header from '@/components/Header';

import Card from '@/components/Card';
import { UserDetails } from '@/components/UserDetails';
import FinanceCard from '@/components/FinanceCard';

import {
  Container,
  TransferDetailContainer,
  FinanceSection,
  Rescues,
} from '@/styles/pages/Tranfer';

interface User {
  thumbnailUrl: string;
  name: string;
  email: string;
  document: string;
  isAdmin: boolean;
  createdAt: string;
  areaCode: number;
  phoneNumber: number;
  clientId: string;
  provider: string;
  gender: string;
  login: string;
  userType: string;
  deviceType: string;
  createdAtFormatted: string;
}

interface TransferDetail {
  id: string;
  requestDate: string;
  transferDate: string;
  notes: string;
  status: string;
  value: number;
  userId: string;  

  requestDateFormatted: string;
  transferDateFormatted: string;
  valueFormatted: string;
}

interface UserFinance {
  id: string;
  payments: number;
  transfersWaiting: number;
  transfersDone: number;
  balance: number;

  paymentsFormatted: string;
  transfersWaitingFormatted: string;
  transfersDoneFormatted: string;
  balanceFormatted: string;
}

interface Transfer {
  username: string;
  createdAt: string;
  value: number;
  status: string;
  transferDate: string;
  notes: string;
  createdAtFormatted: string;
  transferDateFormatted: string;
  valueFormatted: string;
}

export default function User() {
  const { query } = useRouter();

  const [user, setUser] = useState<User>();
  const [transfer, setTransfer] = useState<TransferDetail>();
  const [userFinance, setUserFinance] = useState<UserFinance>();
  const [lastTransfers, setLastTransfers] = useState<Transfer[]>();

  useEffect(() => {
    const { id } = query;
   
    async function loadTransfer() {
      try {
        const { data } = await Api.get<TransferDetail>(`Transfers/${id}`)

        setTransfer({
          ...data,
          requestDateFormatted: data.requestDate ? format(parseISO(data.requestDate), 'dd/MM/y', { locale: ptBR }) : '',
          transferDateFormatted: data.transferDate ? format(parseISO(data.transferDate), 'dd/MM/y', { locale: ptBR }) : '',
          valueFormatted: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.value || 0),
        });
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    loadTransfer();
  }, [query]);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await Api.get<User>(`Users/${transfer.userId}`)

        setUser({
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
        });
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }
    
    async function loadFinance() {
      try {
        const { data } = await Api.get<UserFinance>(`Users/${transfer.userId}/Finance`)

        setUserFinance({
          ...data,
          balanceFormatted: new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(data.balance),
          paymentsFormatted: new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(data.payments),
          transfersDoneFormatted: new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(data.transfersDone),
          transfersWaitingFormatted: new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(data.transfersWaiting),
        });
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    async function loadlastTransfers() {
      try {
        const { data } = await Api.get<Transfer[]>(`Users/${transfer.userId}/LastTransfers`, {
          params: {
            perPage: 50,
          },
        });

        setLastTransfers(data.map(item => ({
          ...item,
          createdAtFormatted: item.createdAt ? format(parseISO(item.createdAt), 'dd/MM/y', { locale: ptBR }) : '',
          transferDateFormatted: item.transferDate ? format(parseISO(item.transferDate), 'dd/MM/y', { locale: ptBR }) : '',
          valueFormatted: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value || 0),
        })));
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    if (transfer) {
      loadUser();
      loadFinance();
      loadlastTransfers();
    }
  }, [transfer]);

  return(
    <>
      <Header />
      <Container>
        {!transfer ? <p>Carregando...</p> : (
          <>
            <Card title='Usuário'>
              {user ? <UserDetails user={user} /> : <p>Carregando...</p>}
            </Card>
            <Card title='Solicitação'>
              {transfer ? (
                <TransferDetailContainer>
                  <ul>
                    <li><strong>Data Requisição:</strong> {transfer.requestDateFormatted}</li>
                    <li><strong>Data Transferência:</strong> {transfer.transferDateFormatted}</li>
                    <li><strong>Notas:</strong> {transfer.notes}</li>
                  </ul>        
                  <ul>
                    <li><strong>Status:</strong> {transfer.status === 'T' ? 
                    'Transferido' : transfer.status === 'W' ? 'Aguardando' : 
                    transfer.status
                  }</li>
                    <li><strong>Valor:</strong> {transfer.valueFormatted}</li>
                  </ul>
                </TransferDetailContainer>
              ) : <p>Carregando...</p>}
            </Card>
            <Card title='Resumo financeiro'>
              {userFinance ? (
                <FinanceSection>
                  <FinanceCard
                    value={userFinance.paymentsFormatted}
                    text='Pagamentos'
                  />
                  <FinanceCard
                    value={userFinance.transfersWaitingFormatted}
                    text='Aguardando'
                  />
                  <FinanceCard
                    value={userFinance.transfersDoneFormatted}
                    text='Transferido'
                  />
                  <FinanceCard
                    value={userFinance.balanceFormatted}
                    text='Saldo'
                  />
                </FinanceSection>
              ) : <p>Carregando...</p>}
            </Card>
            <Card title='Últimas transferências'>
              {lastTransfers ? (
                <>
                  {lastTransfers.length === 0 ? (
                    <p>Nenhum registro encontrado.</p>
                  ) : (
                    <Rescues>
                      <li>
                        <span className="request">Data da requisição</span>
                        <span className="value">Valor</span>
                        <span className="status">Status</span>
                        <span className="transfer">Data da transferência</span>
                        <span className="notes">Notas</span>
                      </li>
                      {lastTransfers.map((rescue, idx) => (
                        <li key={idx.toString()}>
                          <span className="request">{rescue.createdAtFormatted}</span>
                          <span className="value">{rescue.valueFormatted}</span>
                          <span className="status">
                            {rescue.status === 'T' ? 
                              'Transferido' : rescue.status === 'W' ? 'Aguardando' : 
                              rescue.status
                            }
                          </span>
                          <span className="transfer">{rescue.transferDateFormatted}</span>
                          <span className="notes">{rescue.notes}</span>
                        </li>
                      ))}
                    </Rescues>
                  )}
                </>
              ) : <p>Carregando...</p>}
            </Card>
          </>
        )}
      </Container>
    </>
  )
}