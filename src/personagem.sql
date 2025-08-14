create table
    if NOT EXISTS personagem (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        tipo varchar(20) NOT NULL,
        raca VARCHAR(50) NOT NULL,
        arma varchar(50) NOT NULL,
        status varchar(50) NOT NULL
    );