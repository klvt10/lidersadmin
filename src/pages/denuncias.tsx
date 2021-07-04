import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { List } from "react-content-loader";

import { Api } from "@/services/Api";
import Header from "@/components/Header";
import {
  Container,
  Search,
  Reports,
  ReportsMobile,
} from "@/styles/pages/Reports";
import { useIsMobile } from "@/utils/IsMobile";

interface Denuncia {
  id: string;
  thumbnail: string;
  motivo: string;
  usuario: string;
  createdAt: string;
  resolvido: boolean;
  reportType: string;
  createdAtFormatted: string;
}

interface DenunciasResponse {
  data: Denuncia[];
  count: number;
  totalPages: number;
  perPage: number;
  page: number;
  total: number;
}

export default function Home() {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [reports, setReports] = useState<Denuncia[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const isMobile = useIsMobile();

  const filteredReports = useMemo(
    () =>
      reports.filter(
        (u) =>
          search.length === 0 ||
          u.motivo.toLowerCase().includes(search.toLowerCase()) ||
          u.reportType.toLowerCase().includes(search.toLowerCase()) ||
          u.createdAtFormatted.toLowerCase().includes(search.toLowerCase()) ||
          u.usuario.toLowerCase().includes(search.toLowerCase())
      ),
    [reports]
  );

  const handlePageChange = useCallback(async ({ selected }) => {
    setLoading(true);
    const response = await Api.get<DenunciasResponse>("Reports", {
      params: {
        perPage,
        page: selected + 1,
      },
    });

    setCount(response.data.count);
    setPage(selected + 1);
    setTotal(response.data.total);
    setReports(
      response.data.data.map((report) => ({
        ...report,
        createdAtFormatted: format(parseISO(report.createdAt), "dd/MM/yyyy"),
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    Api.get<DenunciasResponse>("Reports", {
      params: {
        perPage,
        page,
      },
    }).then((response) => {
      setCount(response.data.count);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      setReports(
        response.data.data.map((user) => ({
          ...user,
          createdAtFormatted: format(parseISO(user.createdAt), "dd/MM/yyyy"),
        }))
      );
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Search>
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="buttonMobile" type="button">
            <img src="/search.svg" alt="Botão de pesquisar" />
          </button>
        </Search>
        <Reports>
          <li>
            <span className="thumb">Thumb</span>
            <span className="type">Tipo</span>
            <span className="reason">Motivo</span>
            <span className="user">Usuário</span>
            <span className="date">Cadastro</span>
            <span className="resolved">Resolvido</span>
            <span className="edit">Editar</span>
          </li>
          {loading ? (
            <List uniqueKey="load-list" />
          ) : (
            filteredReports.map((report, idx) => (
              <li key={idx.toString()}>
                <span className="thumb">
                  {report.thumbnail && (
                    <img
                      src={
                        !report.thumbnail ? "/no-image.png" : report.thumbnail
                      }
                      alt="photo"
                    />
                  )}
                </span>
                <span className="type">{report.reportType}</span>
                <span className="reason">{report.motivo}</span>
                <span className="user">{report.usuario}</span>
                <span className="date">{report.createdAtFormatted}</span>
                <span className="resolved">
                  {report.resolvido ? "Sim" : "Não"}
                </span>
                <span className="edit">
                  <a
                    href={`/${
                      report.reportType === "user"
                        ? "denunciaUsuario"
                        : "denunciaPost"
                    }/${report.id}`}
                  >
                    <img src="/visibility-user.svg" alt="editar" />
                  </a>
                </span>
              </li>
            ))
          )}
        </Reports>
        <ReportsMobile>
          {loading ? (
            <List uniqueKey="load-list1" />
          ) : (
            filteredReports.map((report, idx) => (
              <div className="post" key={idx.toString()}>
                <div className="reports-description">
                  <ul>
                    <li>
                      <img
                        src={
                          !report.thumbnail ? "/no-image.png" : report.thumbnail
                        }
                        alt="photo"
                      />
                    </li>
                    <li>{report.createdAtFormatted}</li>
                  </ul>
                  <ul className="last-ul">
                    <li>
                      <strong>Motivo: </strong>
                      {report.motivo}
                    </li>
                    <li>
                      <strong>Usuário: </strong>
                      {report.usuario}
                    </li>
                    <li>
                      <strong>Resolvido: </strong>
                      {report.resolvido ? "Sim" : "Não"}
                    </li>
                  </ul>
                </div>
                <div className="icon">
                  <a
                    href={`/${
                      report.reportType === "user"
                        ? "denunciaUsuario"
                        : "denunciaPost"
                    }/${report.id}`}
                  >
                    <img src="/visibility-user.svg" alt="visualizar denúncia" />
                  </a>
                </div>
              </div>
            ))
          )}
        </ReportsMobile>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          disableInitialCallback
          breakClassName="break-me"
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={isMobile ? 3 : 8}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="pagination-active"
        />
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
