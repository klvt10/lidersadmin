import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { List } from "react-content-loader";
import { format, parseISO } from "date-fns";

import { Api } from "@/services/Api";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Card from "@/components/Card";
import LoadingComponent from "@/components/LoadingComponent";
import { UserDetails } from "@/components/UserDetails";
import { ConfirmationModal } from "@/components/ConfirmationModal";

import {
  Container,
  HeadSection,
  UserDetail,
  OthersReports,
  ButtonsSection,
} from "@/styles/pages/DenunciaUsuario";

interface User {
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
  blocked: boolean;
}

interface Report {
  id: string;
  reason: string;
  userId: string;
  reportedUserId: string;
}

type ReportedUser = User;

interface Reports {
  id: string;
  reason: string;
}

export default function DenunciaUsuario() {
  const { query } = useRouter();

  const [report, setReport] = useState<Report>();
  const [reports, setReports] = useState<Reports[]>([]);
  const [reportedUser, setReportedUser] = useState<ReportedUser>();
  const [user, setUser] = useState<User>();
  const [openedModal, setOpenedModal] = useState<
    "delete" | "block" | "unblock" | null
  >(null);

  function handleGoToUser() {
    Router.push(`/usuario/${user.id}`);
  }

  function handleGoToReportedUser() {
    Router.push(`/usuario/${reportedUser.id}`);
  }

  async function loadReportedUser() {
    const { reportedUserId } = report;

    try {
      const { data } = await Api.get<ReportedUser>(`Users/${reportedUserId}`);

      setReportedUser({
        ...data,
        createdAtFormatted: format(parseISO(data.createdAt), "dd/MM/yyyy"),
      });
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    const { id } = query;

    async function loadReport() {
      try {
        const { data } = await Api.get<Report>(`Reports/User/${id}`);
        setReport(data);
      } catch (error) {
        //
      }
    }

    if (id) {
      loadReport();
    }
  }, [query]);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await Api.get<ReportedUser>(`Users/${report.userId}`);

        setUser({
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), "dd/MM/yyyy"),
        });
      } catch (error) {
        //
      }
    }

    async function loadReports() {
      try {
        const { data } = await Api.get<Reports[]>(
          `Users/${report.reportedUserId}/Reports`
        );

        setReports(data.filter((item) => item.id !== report.id));
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    if (report) {
      loadUser();
      loadReports();
      loadReportedUser();
    }
  }, [report]);

  async function handleRemoveUser() {
    try {
      const { reportedUserId } = report;

      await Api.delete(`Users/${reportedUserId}/Remove`);

      Router.push("/usuarios");
    } catch (e) {
      alert("Falha ao remover o usuário. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleBlockUser() {
    try {
      const { reportedUserId } = report;

      await Api.get(`Users/${reportedUserId}/Block`);

      loadReportedUser();
    } catch (e) {
      alert("Falha ao bloquear o usuário. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleUnblockUser() {
    try {
      const { reportedUserId } = report;

      await Api.get(`Users/${reportedUserId}/Unblock`);

      loadReportedUser();
    } catch (e) {
      alert("Falha ao desbloquear o usuário. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  return (
    <>
      <ConfirmationModal
        isOpen={openedModal === "delete"}
        message="Tem certeza que deseja remover esse usuário?"
        title="Remover usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleRemoveUser}
      />
      <ConfirmationModal
        isOpen={openedModal === "block"}
        message="Tem certeza que deseja bloquear esse usuário?"
        title="Bloquear usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleBlockUser}
      />
      <ConfirmationModal
        isOpen={openedModal === "unblock"}
        message="Tem certeza que deseja desbloquear esse usuário?"
        title="Desbloquear usuário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleUnblockUser}
      />
      <Header />
      <Container>
        {!report ? (
          <List uniqueKey="load-list" />
        ) : (
          <>
            {!reportedUser ? (
              <LoadingComponent />
            ) : (
              <div className="buttonsMobile">
                <Button
                  title="Remover Usuário"
                  urlImg="/delete.svg"
                  color="#E23A3A"
                  onClick={() => setOpenedModal("delete")}
                />
                {reportedUser.blocked ? (
                  <Button
                    title="Desbloquear Usuário"
                    urlImg="/unblock-user.svg"
                    onClick={() => setOpenedModal("unblock")}
                  />
                ) : (
                  <Button
                    title="Bloquear Usuário"
                    urlImg="/block-user.svg"
                    onClick={() => setOpenedModal("block")}
                  />
                )}
              </div>
            )}
            <Card title="Denúncia">
              <HeadSection>
                <span>{report.reason}</span>
              </HeadSection>
              {!reportedUser ? (
                <LoadingComponent />
              ) : (
                <div>
                  {user ? (
                    <UserDetails user={reportedUser} />
                  ) : (
                    <p>Carregando...</p>
                  )}
                  <OthersReports>
                    <span>Outras Denúncias ao Usuário</span>
                    {reports.length === 0 && (
                      <label>Sem outras denúncias</label>
                    )}
                    {reports.map((item) => (
                      <p key={item.id}>{item.reason}</p>
                    ))}
                  </OthersReports>
                  <div className="view-user-mobile">
                    <button type="button" onClick={handleGoToReportedUser}>
                      <img
                        src="/visibility-user.svg"
                        alt="Visualizar Usuário"
                      />
                      Visualizar Usuário
                    </button>
                  </div>
                  <ButtonsSection>
                    <Button
                      title="Visualizar Usuário"
                      urlImg="/visibility-user.svg"
                      onClick={handleGoToReportedUser}
                    />
                    <Button
                      title="Remover Usuário"
                      urlImg="/delete.svg"
                      color="#E23A3A"
                      onClick={() => setOpenedModal("delete")}
                    />
                    {reportedUser.blocked ? (
                      <Button
                        title="Desbloquear Usuário"
                        urlImg="/unblock-user.svg"
                        onClick={() => setOpenedModal("unblock")}
                      />
                    ) : (
                      <Button
                        title="Bloquear Usuário"
                        urlImg="/block-user.svg"
                        onClick={() => setOpenedModal("block")}
                      />
                    )}
                  </ButtonsSection>
                </div>
              )}
            </Card>
            <Card title="Usuário Denunciador">
              {!user ? (
                <LoadingComponent />
              ) : (
                <div>
                  {user ? <UserDetails user={user} /> : <p>Carregando...</p>}
                  <ButtonsSection>
                    <Button
                      title="Visualizar Usuário"
                      urlImg="/visibility-user.svg"
                      onClick={handleGoToUser}
                    />
                  </ButtonsSection>
                  <div className="view-user-mobile">
                    <button type="button" onClick={handleGoToUser}>
                      <img
                        src="/visibility-user.svg"
                        alt="Visualizar Usuário"
                      />
                      Visualizar Usuário
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["lidersclubadmin.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
