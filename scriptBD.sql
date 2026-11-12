create table usuarios(
id_usuario serial primary key,
nome_usuario varchar(400) not null unique,
senha varchar(400)
);
create table clientes(
id_cliente serial primary key,
nome_cliente varchar(400),
cpf varchar(200)
);
create table servico(
id_servico serial primary key,
nome_servico varchar(400),
valor decimal(10,2)
);
create table agendamento(
id_agendamento serial primary key,
data_agendamento timestamp,
servico_id int references servico(id_servico),
cliente_id int references clientes(id_cliente)
);
insert into usuarios(nome_usuario, senha) values 
('Rodrigo', md5('12345678')),
('Bruno', md5('12345678')),
('Miguel', md5('12345678'));
insert into clientes(nome_cliente, cpf) values 
('teste', md5('123456789')),
('teste1', md5('1234')),
('teste2', md5('56789'));
insert into servico(nome_servico, valor)values
('Cabelo', 10),
('Barba', 20),
('sobrancelha', 10);
insert into agendamento(data_agendamento, servico_id, cliente_id)values
(now(), 1, 3),
('20-11-2026 8:00', 2, 2),
('28-11-2026 8:00', 3, 1);
select * from servico;
 select * from clientes as  c inner join agendamento as a on a.cliente_id = c.id_cliente;
select * from clientes as c inner join agendamento as a on a.cliente_id = c.id_cliente
        WHERE c.nome_cliente ILIKE '%2%';

select * from clientes as  c full outer join servico as a on a.id_servico = c.id_cliente