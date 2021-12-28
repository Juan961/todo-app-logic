DROP SCHEMA IF EXISTS TODO;

CREATE SCHEMA TODO;

USE TODO;

CREATE TABLE USER (
  id_user INT AUTO_INCREMENT NOT NULL,
  name_user VARCHAR(50) NOT NULL,
  email_user VARCHAR(50) NOT NULL UNIQUE,
  password_user TEXT NOT NULL,

  PRIMARY KEY (id_user)
);

CREATE TABLE TASK (
  id_task INT AUTO_INCREMENT NOT NULL,
  title_task VARCHAR(25) NOT NULL,
  desc_task TEXT NOT NULL,
  color_task CHAR(7) NOT NULL,
  done_task BOOLEAN NOT NULL,
  date_task DATE NOT NULL,

  id_task_user INT NOT NULL,

  PRIMARY KEY (id_task),
  FOREIGN KEY(id_task_user) REFERENCES user(id_user)
);

INSERT INTO USER(name_user, email_user, password_user) VALUES ("Juan", "juan@gmail.com", "12345");

INSERT INTO TASK(title_task, desc_task, color_task, done_task, date_task, id_task_user) VALUES ("Tarea 1", "Descripcion", "#ff5e5e", false, "2008-11-11", 1);
INSERT INTO TASK(title_task, desc_task, color_task, done_task, date_task, id_task_user) VALUES ("Tarea 2", "Descripcion", "#ff5e5e", false, "2008-11-11", 1);

UPDATE TASK SET done_task = true WHERE id_task = 1 AND id_task_user = 1;

SELECT * FROM USER;
SELECT * FROM TASK;