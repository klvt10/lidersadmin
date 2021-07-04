import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { List } from "react-content-loader";
import { format, parseISO } from "date-fns";

import { Api } from "@/services/Api";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ActionContainer from "@/components/ActionContainer";
import Card from "@/components/Card";
import LoadingComponent from "@/components/LoadingComponent";
import { ConfirmationModal } from "@/components/ConfirmationModal";

import {
  Container,
  Reports,
  PostDetails,
  Comments,
  Icons,
} from "@/styles/pages/Post";

interface Post {
  id: string;
  thumbnailUrl: string;
  createdAt: string;
  user: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  createdAtFormatted: string;
  blocked: boolean;
}

interface Comment {
  id: string;
  description: string;
}

interface Report {
  id: string;
  reason: string;
}

export default function Post() {
  const { query } = useRouter();

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [idToRemove, setIdToRemove] = useState<string>();
  const [reports, setReports] = useState<Report[]>([]);
  const [openedModal, setOpenedModal] = useState<
    "delete" | "block" | "unblock" | "deleteComment" | null
  >(null);

  async function loadPost() {
    const { id } = query;

    try {
      const { data } = await Api.get<Post>(`Posts/${id}`);

      setPost({
        ...data,
        createdAtFormatted: format(parseISO(data.createdAt), "dd/MM/yyyy"),
      });
    } catch (error) {
      // alert('Erro ao executar. Tente novamente.');
    }
  }

  async function loadComments() {
    const { id } = query;

    try {
      const { data } = await Api.get<Comment[]>(`Posts/${id}/Comments`);

      setComments(data);
    } catch (error) {
      // alert('Erro ao executar. Tente novamente.');
    }
  }

  useEffect(() => {
    const { id } = query;

    async function loadReports() {
      try {
        const { data } = await Api.get<Report[]>(`Posts/${id}/Reports`);

        setReports(data);
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }
    }
    if (id) {
      loadPost();
      loadComments();
      loadReports();
    }
  }, [query]);

  async function handleRemovePost() {
    try {
      const { id } = query;

      await Api.delete(`Posts/${id}/Remove`);

      Router.push("/posts");
    } catch (e) {
      alert("Falha ao remover o post. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleBlockPost() {
    try {
      const { id } = query;

      await Api.get(`Posts/${id}/Block`);
      loadPost();
    } catch (e) {
      alert("Falha ao bloquear o post. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleUnblockPost() {
    try {
      const { id } = query;

      await Api.get(`Posts/${id}/Unblock`);
      loadPost();
    } catch (e) {
      alert("Falha ao desbloquear o usuário. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  async function handleRemoveComment() {
    try {
      if (!idToRemove) {
        return;
      }

      await Api.delete(`Posts/${idToRemove}/RemoveComment`);

      setComments((state) => state.filter((item) => item.id !== idToRemove));
    } catch (e) {
      alert("Falha ao remover o comentário. Tente novamente mais tarde.");
    } finally {
      setOpenedModal(null);
    }
  }

  return (
    <>
      <ConfirmationModal
        isOpen={openedModal === "delete"}
        message="Tem certeza que deseja remover esse post?"
        title="Remover post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleRemovePost}
      />
      <ConfirmationModal
        isOpen={openedModal === "block"}
        message="Tem certeza que deseja bloquear esse post?"
        title="Bloquear post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleBlockPost}
      />
      <ConfirmationModal
        isOpen={openedModal === "unblock"}
        message="Tem certeza que deseja desbloquear esse post?"
        title="Desbloquear post"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleUnblockPost}
      />
      <ConfirmationModal
        isOpen={openedModal === "deleteComment"}
        message="Tem certeza que deseja excluir esse comentário?"
        title="Excluir comentário"
        onClose={() => setOpenedModal(null)}
        onConfirm={handleRemoveComment}
      />
      <Header />
      <Container>
        {!post ? (
          <List uniqueKey="load-list" />
        ) : (
          <>
            <div className="sectionButtons">
              <Button
                urlImg="/delete.svg"
                title="Remover Post"
                color="#E23A3A"
                onClick={() => setOpenedModal("delete")}
              />
              {post.blocked ? (
                <Button
                  urlImg="/check.svg"
                  title="Desbloquear Post"
                  onClick={() => setOpenedModal("unblock")}
                />
              ) : (
                <Button
                  urlImg="/block.svg"
                  title="Bloquear Post"
                  onClick={() => setOpenedModal("block")}
                />
              )}
            </div>
            <Card title="Post">
              <PostDetails>
                <div>
                  <img
                    className="avatar"
                    src={
                      !post.thumbnailUrl ? "/no-image.png" : post.thumbnailUrl
                    }
                    alt=""
                  />
                  <ul>
                    <li>
                      <strong>Data Postagem: </strong>
                      {post.createdAtFormatted}
                    </li>
                    <li>
                      <strong>Usuário: </strong>
                      {post.user}
                    </li>
                    <li>
                      <strong>Descrição: </strong>
                      {post.description}
                    </li>
                  </ul>
                </div>
                <Icons>
                  <ActionContainer
                    urlImg="/likes.svg"
                    text={
                      post.likesCount === 1
                        ? `${post.likesCount} Curtida`
                        : `${post.likesCount} Curtidas`
                    }
                  />
                  <ActionContainer
                    urlImg="/comments.svg"
                    text={
                      post.commentsCount === 1
                        ? `${post.commentsCount} Comentário`
                        : `${post.commentsCount} Comentários`
                    }
                  />
                </Icons>
              </PostDetails>
            </Card>
            <Card title="Comentários">
              {!comments ? (
                <LoadingComponent />
              ) : (
                <div>
                  {comments.length === 0 && <p>Sem comentários.</p>}
                  {comments.map((comment) => (
                    <Comments key={comment.id}>
                      <span>{comment.description}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenedModal("deleteComment");
                          setIdToRemove(comment.id);
                        }}
                      >
                        <img src="/delete.svg" alt="Excluir comentário" />
                      </button>
                    </Comments>
                  ))}
                </div>
              )}
            </Card>
            <Card title="Denúncias">
              {!reports ? (
                <LoadingComponent />
              ) : (
                <div>
                  {reports.length === 0 && <p>Sem denúncias.</p>}
                  {reports.map((report) => (
                    <Reports key={report.id}>
                      <li>{report.reason}</li>
                    </Reports>
                  ))}
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
