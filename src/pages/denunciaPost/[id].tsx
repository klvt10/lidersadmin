import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { List } from 'react-content-loader'
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { Api } from "@/services/Api";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ActionContainer from "@/components/ActionContainer";
import LoadingComponent from "@/components/LoadingComponent";
import { UserDetails } from '@/components/UserDetails';
import { ConfirmationModal } from '@/components/ConfirmationModal';

import { 
  Container, 
  PostDetails, 
  Comments, 
  Icons, 
  Reports, 
  Buttons 
} from "@/styles/pages/DenunciaPost"

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

interface ReportDetail {
  id: string;
  reason: string;
  userId: string;
  post_Id: string;
}

interface ReportedPost {
  id: string;
  thumbnailUrl: string;
  user: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  blocked: boolean;
  
  createdAtFormatted: string;
}

interface Comment {
  id: string;
  description: string;
}

interface Reports {
  id: string;
  reason: string;
}


export default function DenunciaPost () {
  const { query } = useRouter();

  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [reports, setReports] = useState<Reports[]>([]);
  const [reportedPost, setReportedPost] = useState<ReportedPost>();
  const [report, setReport] = useState<ReportDetail>();
  const [openedModal, setOpenedModal] = useState<
    'delete' | 'block' | 'unblock' | 'deleteComment' | null
  >(null);


  async function loadReport() {
    const { id } = query;

    try {
      const { data } = await Api.get<ReportDetail>(`PostReport/${id}`)
      console.log(data)
      setReport(data);
    } catch (error) {
      // alert('Erro ao executar. Tente novamente.');
    }
  }

  useEffect(() => {
    if (query?.id) {
      loadReport()
    }
  }, [query])

  useEffect(() => { 
  
    async function loadUser() {
        try {
          const { data } = await Api.get<User>(`Users/${report.userId}`)
          
          setUser({
            ...data,
            createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
          });
        } catch (error) {
          // alert('Erro ao executar. Tente novamente.');
        }
      }
    
    async function loadComments() {
      try {
        const { data } = await Api.get<Comment[]>(`Posts/${report.userId}/Comments`);

        setComments(data);
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    async function loadReports() {
      try {
        const { data } = await Api.get<Reports[]>(`Posts/${report.userId}/Reports`);

        setReports(data.filter((item) => item.id !== report.id));
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    async function loadReportedPost() {
      try {
        const { data } = await Api.get<ReportedPost>(`Posts/${report.post_Id}`)
        
        setReportedPost( {
          ...data,
          createdAtFormatted: format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }),
        });
      }catch (error) {
        //
      }
    }

    if (report) {
      loadUser();
      loadComments();
      loadReports();
      loadReportedPost();
    }
  }, [report]);

  async function handleRemovePost() {
    try {
      const { post_Id } = report;

      await Api.delete(`Posts/${post_Id}/Remove`);

      Router.push('/posts');
    } catch (e) {
      alert('Falha ao remover o post. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleBlockPost() {
    try {
      const { post_Id } = report;

      await Api.get(`Posts/${post_Id}/Block`);
      loadReport();
    } catch (e) {
      alert('Falha ao bloquear o post. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleUnblockPost() {
    try {
      const { post_Id } = report;

      await Api.get(`Posts/${post_Id}/Unblock`);
      loadReport();
    } catch (e) {
      alert('Falha ao desbloquear o usuário. Tente novamente mais tarde.')
    } finally {
      setOpenedModal(null);
    }
  }

  return (
    <>
      <ConfirmationModal
        isOpen={openedModal === 'delete'}
        message="Tem certeza que deseja remover esse post?"
        title="Remover post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleRemovePost}
      />
      <ConfirmationModal
        isOpen={openedModal === 'block'}
        message="Tem certeza que deseja bloquear esse post?"
        title="Bloquear post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleBlockPost}
      />
      <ConfirmationModal
        isOpen={openedModal === 'unblock'}
        message="Tem certeza que deseja desbloquear esse post?"
        title="Desbloquear post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleUnblockPost}
      />
      <Header />
        <Container>
        {!reportedPost ? <List /> : (
        <>
          <Card title="Post">
            <label className="report">{report.reason}</label>
            <PostDetails>       
              <div>
                <img src={!reportedPost.thumbnailUrl ? '/no-image.png': reportedPost.thumbnailUrl} alt="" />
                  <ul>
                    <li><strong>Data Postagem: </strong> {reportedPost.createdAtFormatted}</li>
                    <li><strong>Usuário: </strong>{reportedPost.user}</li>
                    <li><strong>Descrição: </strong>{reportedPost.description}</li>
                  </ul>
              </div>
              <Icons>
                <ActionContainer 
                  urlImg='/likes.svg'
                  text={reportedPost.likesCount === 1  
                    ? `${reportedPost.likesCount} Curtida` 
                    : `${reportedPost.likesCount} Curtidas`
                  }
                />
                <ActionContainer 
                  urlImg='/comments.svg'
                  text={reportedPost.commentsCount === 1  
                    ? `${reportedPost.commentsCount} Comentário` 
                    : `${reportedPost.commentsCount} Comentários`
                  }
                />
              </Icons>
            </PostDetails>
            <Comments>
              <span>Comentários</span>
                {comments.length === 0 && <p>Sem comentários.</p>}
                {comments.map((comment) => (
                  <div>
                    <p>{comment.description}</p>
                    <a href="">
                      <img src="/delete.svg" alt="Excluir comentário" />
                    </a>
                  </div>
                ))}            
            </Comments>
            <Reports>
              <span>Outras Denúncias ao Post</span>
              {reports.length === 0 && <p>Sem outras denúncias.</p>}
              {reports.map((report) => (
                <p>{report.reason}</p>
              ))}
            </Reports>
            <Buttons>
              <Button 
                title='Remover Post'
                urlImg='/delete.svg'
                color='#E23A3A'
                onClick={() => setOpenedModal('delete')}
              />
              {reportedPost.blocked ? (
                <Button 
                  urlImg='/check.svg'
                  title='Desbloquear Post'
                  onClick={() => setOpenedModal('unblock')}
                />
              ) : (
                <Button 
                  urlImg='/block.svg'
                  title='Bloquear Post'
                  onClick={() => setOpenedModal('block')}
                />
              )}
            </Buttons>
          </Card>
          <Card title='Usuário Denunciador'>
            {user ? <UserDetails user={user} /> : <LoadingComponent />}
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
