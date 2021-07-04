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
  Rescues,
  RescuesMobile,
  Select,
} from "@/styles/pages/Rescues";
import { useIsMobile } from "@/utils/IsMobile";

interface Resgate {
  id: string;
  username: string;
  createdAt: string;
  value: number;
  valueFormatted: string;
  status: string;
  transferDate: string;
  transferDateFormatted: string;
  notes: string;
  createdAtFormatted: string;
}

interface ResgatesResponse {
  data: Resgate[];
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
  const [rescues, setRescues] = useState<Resgate[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const isMobile = useIsMobile();

  const [status, setStatus] = useState("");

  const handlePageChange = useCallback(async ({ selected }) => {
    setLoading(true);

    const response = await Api.get<ResgatesResponse>("Transfers", {
      params: {
        perPage,
        page: selected + 1,
      },
    });

    setCount(response.data.count);
    setPage(selected + 1);
    setTotal(response.data.total);
    setRescues(
      response.data.data.map((transfer) => ({
        ...transfer,
        valueFormatted: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(transfer.value),
        transferDateFormatted: transfer.transferDate
          ? format(parseISO(transfer.transferDate), "dd/MM/yyyy")
          : "",
        createdAtFormatted: format(parseISO(transfer.createdAt), "dd/MM/yyyy"),
      }))
    );
    setLoading(false);
  }, []);

  function load() {
    Api.get<ResgatesResponse>("Transfers", {
      params: {
        perPage,
        page,
        status,
        search,
      },
    }).then((response) => {
      setCount(response.data.count);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      setRescues(
        response.data.data.map((transfer) => ({
          ...transfer,
          transferDateFormatted: transfer.transferDate
            ? format(parseISO(transfer.transferDate), "dd/MM/yyyy")
            : "",
          createdAtFormatted: format(
            parseISO(transfer.createdAt),
            "dd/MM/yyyy"
          ),
        }))
      );
      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    load();
  }, [status]);

  return (
    <>
      <Header />
      <Container>
        <Search>
          <Select>
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option value="">Todos</option>
              <option value="T">Transferido</option>
              <option value="W">Aguardando</option>
            </select>
          </Select>
          <div>
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button className="buttonMobile" type="button" onClick={load}>
              <img src="/search.svg" alt="Botão de pesquisar" />
            </button>
          </div>
        </Search>
        <Rescues>
          <li>
            <span className="user">Usuário</span>
            <span className="request">Data da requisição</span>
            <span className="value">Valor</span>
            <span className="status">Status</span>
            <span className="transfer">Data da transferência</span>
            <span className="notes">Notas</span>
            <span className="edit">Editar</span>
          </li>
          {loading ? (
            <List uniqueKey="load-list" />
          ) : (
            rescues.map((rescue, idx) => (
              <li key={idx.toString()}>
                <span className="user">{rescue.username}</span>
                <span className="request">{rescue.createdAtFormatted}</span>
                <span className="value">{rescue.value}</span>
                <span className="status">
                  {rescue.status === "T"
                    ? "Transferido"
                    : rescue.status === "W"
                    ? "Aguardando"
                    : rescue.status}
                </span>
                <span className="transfer">{rescue.transferDateFormatted}</span>
                <span className="notes">{rescue.notes}</span>
                <span className="edit">
                  <a href={`/resgate/${rescue.id}`}>
                    <img src="/visibility-user.svg" alt="Visualizar" />
                  </a>
                </span>
              </li>
            ))
          )}
        </Rescues>
        <RescuesMobile>
          {loading ? (
            <List />
          ) : (
            rescues.map((rescue, idx) => (
              <div className="rescue" key={rescue.id}>
                <ul>
                  <li>
                    <strong>Usuário: </strong>
                    {rescue.username}
                  </li>
                  <li>
                    <strong>Data Transf.: </strong>
                    {rescue.transferDateFormatted}
                  </li>
                  <li>
                    <strong>Valor: </strong>
                    {rescue.value}
                  </li>
                  <li>
                    <strong>Status: </strong>
                    {rescue.status === "T"
                      ? "Transferido"
                      : rescue.status === "W"
                      ? "Aguardando"
                      : rescue.status}
                  </li>
                  <li>
                    <strong>Notas: </strong>
                    {rescue.notes}
                  </li>
                </ul>
                <ul className="last-ul">
                  <li>{rescue.createdAtFormatted}</li>
                  <li>
                    <a href={`/resgate/${rescue.id}`}>
                      <img
                        src="/visibility-user.svg"
                        alt="visualizar resgate"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            ))
          )}
        </RescuesMobile>
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
