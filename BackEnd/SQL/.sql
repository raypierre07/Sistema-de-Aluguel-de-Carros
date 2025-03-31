use Sistema_de_Aluguel;

create table Usuario(
    id int primary key,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255)
);

create table Cliente(
    id int primary key,
    rg VARCHAR(255),
    cpf VARCHAR(14),
    endereco VARCHAR(255),
    profissao VARCHAR(255),
    foreign key(id) references Usuario(id)
);

create table Agente(
    id int primary key,
    nome VARCHAR(255),
    cnpj BIGINT,
    tipo ENUM('Empresa', 'Banco')

);

create table cliente_rendimentos(
    id_cliente int,
    rendimento double,
    primary key (id_cliente, rendimento),
    foreign key(id_cliente) references Cliente(id)
);

create table Carro(
    matricula int primary key,
    ano date,
    marca varchar(255),
    modelo varchar(255),
    placa varchar(8)
);

create table pedido_aluguel(
    id int primary key,
    cliente_id int,
    carro_matricula int,
    data_inicio date,
    data_fim date,
    status ENUM('Aberto', 'Em analise', 'Concluido', 'Cancelado'),
    foreign key (carro_matricula) references Carro(matricula),
    foreign key (cliente_id) references Cliente(id)
);