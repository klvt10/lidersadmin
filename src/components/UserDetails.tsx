import React from 'react';

import { Container, ContainerMobile } from '@/styles/pages/component/UserDetails';

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

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <>
    <Container>
      <img
        className="userThumbnail"
        src={!user.thumbnailUrl ? '/no-image.png': user.thumbnailUrl}
        alt="Thumbnail"
      />
      <ul>
        <li><strong>Nome:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Documento:</strong> {user.document}</li>
        <li><strong>Administrador:</strong> {user.isAdmin ? 'Sim' : 'Não'}</li>
        <li><strong>Data Cadastro:</strong> {user.createdAtFormatted || user.createdAt}</li>
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
    </Container>
    <ContainerMobile>
      <div className="first-list">
        <img
          className="userThumbnail"
          src={!user.thumbnailUrl ? '/no-image.png': user.thumbnailUrl}
          alt="Thumbnail"
        />
        <ul>
          <li><strong>Nome:</strong> {user.name}</li>
          <li><strong>Dt. Cadastro:</strong> {user.createdAtFormatted || user.createdAt}</li>
          <li><strong>Login:</strong> {user.login}</li>
          <li><strong>Administrador:</strong> {user.isAdmin ? 'Sim' : 'Não'}</li>
        </ul>
      </div>        
      <ul className="second-list">
        <li><strong>Documento:</strong> {user.document}</li>
        <li><strong>Telefone:</strong> {user.areaCode} {user.phoneNumber}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Gênero:</strong> {user.gender}</li>
        <li><strong>Social Id:</strong> {user.clientId}</li>
        <li><strong>Provedor:</strong> {user.provider}</li>
        <li><strong>Tipo:</strong> {user.userType}</li>
        <li><strong>Dispositivo:</strong> {user.deviceType}</li>
      </ul>
    </ContainerMobile>
    </>
  );
}
