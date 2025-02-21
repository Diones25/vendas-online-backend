import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableCity1740156463622 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'city',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'state_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        }
      ]
    }));

    // Adicionando a chave estrangeira
    await queryRunner.createForeignKey('city', new TableForeignKey({
      columnNames: ['state_id'],
      referencedColumnNames: ['id'], // Supondo que a tabela referenciada é a tabela 'state' com a coluna 'id'
      referencedTableName: 'state', // Nome da tabela referenciada
      onDelete: 'CASCADE', // Comportamento em caso de exclusão
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira
    const table = await queryRunner.getTable('city');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('state_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('city', foreignKey);
      }
    }

    await queryRunner.dropTable('city');
  }

}
