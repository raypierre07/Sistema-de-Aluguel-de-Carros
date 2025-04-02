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


CREATE TABLE pedido_aluguel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    carro_matricula INT,
    data_inicio DATE,
    data_fim DATE,
    status ENUM('Aberto', 'Em analise', 'Concluido', 'Cancelado'),
    FOREIGN KEY (carro_matricula) REFERENCES Carro(matricula),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id)
);

INSERT INTO carro (matricula, ano, marca, modelo, placa)
VALUES (1, '2023-01-01', 'Toyota', 'Corolla', 'ABC-1234');