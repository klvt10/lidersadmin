import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { Api } from "@/services/Api";
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Container, HeadSection, UserDetails, OthersReports, ButtonsSection } from "@/styles/pages/DenunciaUsuario";

interface Report {
  id: string;
  reason: string;
  userId: string;
  reportedUserId: string;
}

interface ReportedUser {
  id: string;
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

interface Reports {
  id: string;
  reason: string;
}

type User = ReportedUser;


export default function DenunciaUsuario () {
  const { query } = useRouter();

  const [report, setReport] = useState<Report>();
  const [reports, setReports] = useState<Reports[]>([]);
  const [reportedUser, setReportedUser] = useState<ReportedUser>();
  const [user, setUser] = useState<User>();

  function handleGoToUser() {
    Router.push(`/usuario/${user.id}`)
  }
  
  function handleGoToReportedUser() {
    Router.push(`/usuario/${reportedUser.id}`)
  }
  
  useEffect(() => {
    const { id } = query;

    async function loadReport() {
      try {
        const { data } = await Api.get<Report>(`UserReport/${id}`)
        setReport(data);
      } catch (error) {
        //
      }
    }
    
    if(id) {
      loadReport();
    }    
  }, [query]);

  useEffect(() => {

    async function loadReportedUser() {
      const { reportedUserId } = report;

      try {
        const { data } = await Api.get<ReportedUser>(`Users/${reportedUserId}`)

        setReportedUser({
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
        });
      }catch (error) {
        //
      }
    }

    async function loadReports() {
      try {
        const { data } = await Api.get<Reports[]>(`Users/${report.reportedUserId}/Reports`);
        
        setReports(data.filter((item) => item.id !== report.id));
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    if (report) {
      loadReports();
      loadReportedUser();
    }
  }, [report]);

  useEffect(() => {

    async function loadUser() {
      const { userId } = report;

      try {
        const { data } = await Api.get<ReportedUser>(`Users/${userId}`)

        setUser({
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
        });
      }catch (error) {
        //
      }
    }
    if (report) {
      loadUser();
    }
  }, [report]);
 
  return (
    <>
      <Header />
      <Container>
        <Card title="Denúncia">
          {!report ? <label>Carregando...</label> : (
            <HeadSection>              
              <span>{report.reason}</span>
            </HeadSection>
          )}
          {!reportedUser ? <label>Carregando...</label> : (
            <UserDetails>
              <img src={!reportedUser.thumbnailUrl ? '/no-image.png': reportedUser.thumbnailUrl} alt="" />
              <ul>
                <li><strong>Nome:</strong> {reportedUser.name}</li>
                <li><strong>Email:</strong> {reportedUser.email}</li>
                <li><strong>Documento:</strong> {reportedUser.document}</li>
                <li><strong>Administrador:</strong> {reportedUser.isAdmin}</li>
                <li><strong>Data Cadastro:</strong> {reportedUser.createdAt}</li>
                <li><strong>Telefone:</strong> {reportedUser.areaCode} {reportedUser.phoneNumber}</li>
              </ul>        
              <ul>
                <li><strong>Social Id:</strong> {reportedUser.clientId}</li>
                <li><strong>Provedor:</strong> {reportedUser.provider}</li>
                <li><strong>Gênero:</strong> {reportedUser.gender}</li>
                <li><strong>Login:</strong> {reportedUser.login}</li>
                <li><strong>Tipo:</strong> {reportedUser.userType}</li>
                <li><strong>Dispositivo:</strong> {reportedUser.deviceType}</li>
              </ul>
            </UserDetails>
          )}
            <OthersReports>
              <span>Outras Denúncias ao Usuário</span>
              {reports.length === 0 && <p>Sem denúncias</p>}
              {reports.map((item) => (
                <p key={item.id}>{item.reason}</p>
              ))}
            </OthersReports>
            <ButtonsSection>
            {!reportedUser ? <label>...</label> : (
              <Button 
                title='Visualizar Usuário' 
                urlImg='/visibility-user.svg'
                onClick={handleGoToReportedUser}
              />
            )}
              <Button 
                title='Remover Usuário' 
                urlImg='/delete.svg'
                color='#E23A3A'
              />
              <Button 
                title='Desbloquear Usuário' 
                urlImg='/unblock-user.svg'
              />
              <Button 
                title='Bloquear Usuário' 
                urlImg='/block-user.svg'
              />
            </ButtonsSection>
        </Card>
        <Card title='Usuário Denunciador'>
          {!user ? <label>Carregando...</label> : (
            <UserDetails>
            <img src={!user.thumbnailUrl ? '/no-image.png': user.thumbnailUrl} alt="" />
            <ul>
                <li><strong>Nome:</strong> {user.name}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Documento:</strong> {user.document}</li>
                <li><strong>Administrador:</strong> {user.isAdmin}</li>
                <li><strong>Data Cadastro:</strong> {user.createdAt}</li>
                <li><strong>Telefone:</strong> {user.areaCode} {user.phoneNumber}</li>
              </ul>        
              <ul>
                <li><strong>Social Id:</strong> {user.clientId}</li>
                <li><strong>Provedor:</strong> {user.provider}</li>
                <li><strong>Gênero:</strong> {user.gender}</li>
                <li><strong>Login:</strong> {user.login}</li>
                <li><strong>Tipo:</strong> {user.userType}</li>
                <li><strong>Dispositivo:</strong> {user.deviceType}</li>
              </ul>
            </UserDetails>
          )}
            <ButtonsSection>
            {!user ? <label>...</label> : (
              <Button 
                title='Visualizar Usuário' 
                urlImg='/visibility-user.svg'
                onClick={handleGoToUser}
              />
            )}
            </ButtonsSection>
        </Card>
      </Container>
    </>
  )
}