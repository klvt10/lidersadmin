import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { List } from 'react-content-loader'
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { Api } from '@/services/Api';

import Header from '@/components/Header';
import Button from '@/components/Button'
import ActionContainer from '@/components/ActionContainer'
import Card from '@/components/Card';
import FinanceCard from '@/components/FinanceCard'
import { UserDetails } from '@/components/UserDetails';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import LoadingComponent from "@/components/LoadingComponent";

import { 
  Container, 
  ActionDetails, 
  UserReports, 
  FinanceSection 
} from '@/styles/pages/User'

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
  blocked: boolean;
}

interface UserActions {
  id: string;
  reportsCount: number;
  usersHiddenCount: number;
  likesCount: number;
  commentsCount: number;
  clientCount: number;
  teamsCount: number;
  transfersCount: number;
}

type UserResults = Pick<UserActions, 
    'id' | 'reportsCount' | 'usersHiddenCount' | 'likesCount' | 'commentsCount'>;

interface UserFinance {
  id: string;
  payments: number;
  transfersWaiting: number;
  transfersDone: number;
  balance: number;  
}

interface UserReport {
  id: string;
  reason: string;
  createdAt: string;
}

export default function User() {
  const { query } = useRouter();

  const [user, setUser] = useState<User>();
  const [userActions, setUserActions] = useState<UserActions>();
  const [userResults, setUserResults] = useState<UserResults>();
  const [userFinance, setUserFinance] = useState<UserFinance>();
  const [userReport, setUserReport] = useState<UserReport[]>([]);
  const [openedModal, setOpenedModal] = useState<
    'delete' | 'block' | 'unblock' | null
  >(null);

  async function loadUser() {
    const { id } = query;

      try {
        const { data } = await Api.get<User>(`Users/${id}`)

        setUser({
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
        });
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
  }

  useEffect(() => {
    const { id } = query;

    async function loadActionsUser() {
      try {
        const { data } = await Api.get<UserActions>(`Users/${id}/Actions`)

        setUserActions(data);
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }
    
    async function loadResultsUser() {
      try {
        const { data } = await Api.get<UserResults>(`Users/${id}/Results`)

        setUserResults(data);
      } catch (error) {
        //
      }
    }

    async function loadUserFinance() {
      try {
        const { data } = await Api.get<UserFinance>(`Users/${id}/Finance`)

        setUserFinance(data);
      } catch (error) {

      }
    }

    async function loadUserReports() {
      try {
        const { data } = await Api.get<UserReport[]>(`Users/${id}/Reports`);

        setUserReport(data);
      } catch (error) {
        //
      }
    }

    if (query) {
    loadUser();
    loadActionsUser();
    loadResultsUser();
    loadUserFinance();
    loadUserReports();
  } 
  }, [query]);

  async function handleRemoveUser() {
    try {
      const { id } = query;

      await Api.delete(`Users/${id}/Remove`);

      Router.push('/usuarios');
    } catch (e) {
      alert('Falha ao remover o usuário. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleBlockUser() {
    try {
      const { id } = query;

      await Api.get(`Users/${id}/Block`);

      loadUser();
    } catch (e) {
      alert('Falha ao bloquear o usuário. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleUnblockUser() {
    try {
      const { id } = query;

      await Api.get(`Users/${id}/Unblock`);

      loadUser();
    } catch (e) {
      alert('Falha ao desbloquear o usuário. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  return(
    <>
      <ConfirmationModal
        isOpen={openedModal === 'delete'}
        message="Tem certeza que deseja remover esse usuário?"
        title="Remover usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleRemoveUser}
      />
      <ConfirmationModal
        isOpen={openedModal === 'block'}
        message="Tem certeza que deseja bloquear esse usuário?"
        title="Bloquear usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleBlockUser}
      />
      <ConfirmationModal
        isOpen={openedModal === 'unblock'}
        message="Tem certeza que deseja desbloquear esse usuário?"
        title="Desbloquear usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleUnblockUser}
      />
      <Header />
        <Container>
        {!user ? <List /> : (
          <>
          <div>
            <Button 
              title='Remover Usuário' 
              urlImg='/delete.svg' 
              color='#E23A3A'
              onClick={() => setOpenedModal('delete')}
            />
            {user.blocked ? (
              <Button 
                title='Desbloquear Usuário' 
                urlImg='/unblock-user.svg'
                onClick={() => setOpenedModal('unblock')}
              />
            ) : (
              <Button 
                title='Bloquear Usuário' 
                urlImg='/block-user.svg'
                onClick={() => setOpenedModal('block')}
              />
            )}
          </div>
          <Card title='Ações do Usuário'>
            {user ? <UserDetails user={user} /> : <LoadingComponent />}
          </Card>
          <Card title='Ações do Usuário'>
            {!userActions ? <LoadingComponent /> : (
              <ActionDetails>
                  <ActionContainer 
                    urlImg='/report-users.svg'
                    text={userActions.reportsCount === 1  
                      ? `${userActions.reportsCount} Usuário reportado` 
                      : `${userActions.reportsCount} Usuários reportados`
                    }
                  />
                  <ActionContainer 
                    urlImg='/hidden-users.svg'
                    text={userActions.usersHiddenCount === 1  
                      ? `${userActions.usersHiddenCount} Usuário oculto` 
                      : `${userActions.usersHiddenCount} Usuários ocultos`
                    }
                  />
                  <ActionContainer 
                    urlImg='/likes.svg'
                    text={userActions.likesCount === 1  
                      ? `${userActions.likesCount} Curtida` 
                      : `${userActions.likesCount} Curtidas`
                    }
                  />
                  <ActionContainer 
                    urlImg='/comments.svg'
                    text={userActions.commentsCount === 1  
                      ? `${userActions.commentsCount} Comentário` 
                      : `${userActions.commentsCount} Comentários`
                    }
                  />
                  <ActionContainer 
                    urlImg='/partners.svg'
                    text={userActions.clientCount === 1  
                      ? `${userActions.clientCount} Parceiro` 
                      : `${userActions.clientCount} Parceiros`
                    }
                  />
                  <ActionContainer 
                    urlImg='/teams.svg'
                    text={userActions.teamsCount === 1  
                      ? `${userActions.teamsCount} Equipe` 
                      : `${userActions.teamsCount} Equipes`
                    }
                  />
                  <ActionContainer 
                    urlImg='/cashback.svg'
                    text={userActions.transfersCount === 1  
                      ? `${userActions.transfersCount} Transferência` 
                      : `${userActions.transfersCount} Transferências`
                    }
                  />
              </ActionDetails>
            )}
          </Card>
          <Card title='Resultados do Usuário'>
            {!userResults ? <LoadingComponent /> : (
              <ActionDetails>
                <ActionContainer 
                  urlImg='/reports.svg'
                  text={userResults.reportsCount === 1  
                    ? `${userResults.reportsCount} Report` 
                    : `${userResults.reportsCount} Reports`
                  }
                  color='#E23A3A'
                />
                <ActionContainer 
                  urlImg='/hidden-red.svg'
                  text={userResults.usersHiddenCount === 1  
                    ? `${userResults.usersHiddenCount} Usuário ocultou` 
                    : `${userResults.usersHiddenCount} Usuários ocultaram`
                  }
                  color='#E23A3A'
                />
                <ActionContainer 
                  urlImg='/likes.svg'
                  text={userResults.likesCount === 1  
                    ? `${userResults.likesCount} Curtida em posts` 
                    : `${userResults.likesCount} Curtidas em posts`
                  }
                />
                <ActionContainer 
                  urlImg='/comments.svg'
                  text={userResults.commentsCount === 1  
                    ? `${userResults.commentsCount} Comentário em posts` 
                    : `${userResults.commentsCount} Comentários em posts`
                  }
                />
              </ActionDetails>
            )}
          </Card>
          <Card title='Financeiro'>
            {!userFinance ? <LoadingComponent /> : (
              <FinanceSection>
                <FinanceCard
                  value={new Intl.NumberFormat('pt-BR', 
                    { style: 'decimal', minimumFractionDigits: 2 })
                    .format(userFinance.payments)
                  }
                  text='Pagamentos'
                />
                <FinanceCard
                  value={new Intl.NumberFormat('pt-BR', 
                    { style: 'decimal', minimumFractionDigits: 2 })
                    .format(userFinance.transfersWaiting)
                  }
                  text='Aguardando'
                />
                <FinanceCard
                  value={new Intl.NumberFormat('pt-BR', 
                    { style: 'decimal', minimumFractionDigits: 2 })
                    .format(userFinance.transfersDone)
                  }
                  text='Transferido'
                />
                <FinanceCard
                  value={new Intl.NumberFormat('pt-BR', 
                    { style: 'decimal', minimumFractionDigits: 2 })
                    .format(userFinance.balance)
                  }
                  text='Saldo'
                />
              </FinanceSection>
            )}
          </Card>
          <Card title='Denúncias ao Usuário'>
          {!userReport ? <LoadingComponent /> : (
            <div>
              {userReport.length === 0 && <p>Sem denúncias.</p>}
              {userReport.map((report) => (
                <UserReports>
                  <p>{report.reason}</p>
                </UserReports>
              ))}
            </div>
          )}           
          </Card>
          </>
        )}
        </Container>
     
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['lidersclubadmin.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
