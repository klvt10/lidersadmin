import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import { Api } from "@/services/Api";
import { UserDetails } from '@/components/UserDetails';
import Header from "@/components/Header";
import Card from "@/components/Card";

import ActionContainer from "@/components/ActionContainer";


import { Container, PostDetails, Comments, Icons, Reports, Buttons } from "@/styles/pages/DenunciaPost"
import Button from "@/components/Button";

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

  useEffect(() => {
    const { id } = query;
   
    async function loadReport() {
      try {
        const { data } = await Api.get<ReportDetail>(`PostReport/${id}`)

        setReport({
          ...data,
          });
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    loadReport();
  }, [query]);

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
        const { data } = await Api.get<Comment[]>(`Posts/${report.post_Id}/Comments`);

        setComments(data);
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    async function loadReports() {
      try {
        const { data } = await Api.get<Reports[]>(`Posts/${report.post_Id}/Reports`);

        setReports(data.filter((item) => item.id !== report.id));
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }

    async function loadReportedPost() {
      try {
        const { data } = await Api.get<ReportedPost>(`Posts/${report.post_Id}`)

        console.log(data)
        setReportedPost( {
          ...data,
          createdAtFormatted: data.createdAt ? format(parseISO(data.createdAt), 'dd/MM/y', { locale: ptBR }) : '',
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

  return (
    <>
      <Header />
      <Container>
        <Card title="Post">
          {!report ? <p>Carregando...</p> : (
            <label className="report">{report.reason}</label>
          )}
          <PostDetails>
          {!reportedPost ? <p>Carregando...</p> : (            
            <div>
              <img src={!reportedPost.thumbnailUrl ? '/no-image.png': reportedPost.thumbnailUrl} alt="" />
                <ul>
                  <li><strong>Data Postagem: </strong> {reportedPost.createdAtFormatted}</li>
                  <li><strong>Usuário: </strong>{reportedPost.user}</li>
                  <li><strong>Descrição: </strong>{reportedPost.description}</li>
                </ul>
            </div>
          )}
          {!reportedPost ? <p>Carregando...</p> : ( 
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
          )}
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
            />
            <Button 
              title='Desbloquear Post'
              urlImg='/unblock-user.svg'
            />
            <Button 
              title='Bloquear Post'
              urlImg='/block-user.svg'
            />
          </Buttons>
        </Card>
        <Card title='Usuário Denunciador'>
          {user ? <UserDetails user={user} /> : <p>Carregando...</p>}
        </Card>
      </Container>
    </>
  )
}