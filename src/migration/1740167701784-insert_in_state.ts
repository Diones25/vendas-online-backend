import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInState1740167701784 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO state (name, uf) VALUES
      ('Acre', 'AC'),
      ('Alagoas', 'AL'),
      ('Amapá', 'AP'),
      ('Amazonas', 'AM'),
      ('Bahia', 'BA'),
      ('Ceará', 'CE'),
      ('Distrito Federal', 'DF'),
      ('Espírito Santo', 'ES'),
      ('Goiás', 'GO'),
      ('Maranhão', 'MA'),
      ('Mato Grosso', 'MT'),
      ('Mato Grosso do Sul', 'MS'),
      ('Minas Gerais', 'MG'),
      ('Pará', 'PA'),
      ('Paraíba', 'PB'),
      ('Paraná', 'PR'),
      ('Pernambuco', 'PE'),
      ('Piauí', 'PI'),
      ('Rio de Janeiro', 'RJ'),
      ('Rio Grande do Norte', 'RN'),
      ('Rio Grande do Sul', 'RS'),
      ('Rondônia', 'RO'),
      ('Roraima', 'RR'),
      ('Santa Catarina', 'SC'),
      ('São Paulo', 'SP'),
      ('Sergipe', 'SE'),
      ('Tocantins', 'TO');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM state WHERE uf IN (
        'AC', 'AL', 'AP', 'AM',
        'BA', 'CE', 'DF', 'ES',
        'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR',
        'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
      );
    `);
  }

}
