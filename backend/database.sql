/*DROP TABLE pokemon;
DROP TABLE users;

CREATE TABLE pokemon(
  id,
  nom,
  description,
);

CREATE TABLE users(
  id,
  prenom,
  nom,
  age
);
*/

CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');
