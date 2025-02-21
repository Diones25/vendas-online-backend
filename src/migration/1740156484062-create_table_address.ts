import { JoinTable, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAddress1740156484062 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'city_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'complement',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'number',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'cep',
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

    await queryRunner.createForeignKeys('address', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user', // Nome da tabela 'user'
        onDelete: 'CASCADE', // Opcional: Define o que acontece ao excluir um usuário (CASCADE, SET NULL, RESTRICT, etc.)
      }),
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city', // Nome da tabela 'city'
        onDelete: 'CASCADE', // Opcional: Define o que acontece ao excluir uma cidade (CASCADE, SET NULL, RESTRICT, etc.)
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remova as chaves estrangeiras antes de remover a tabela
    const table = await queryRunner.getTable('address');
    if (table) {
      const foreignKey_user_id = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
      const foreignKey_city_id = table.foreignKeys.find(fk => fk.columnNames.indexOf('city_id') !== -1);

      if (foreignKey_user_id) {
        await queryRunner.dropForeignKey('address', foreignKey_user_id);
      }
      if (foreignKey_city_id) {
        await queryRunner.dropForeignKey('address', foreignKey_city_id);
      }
    }

    await queryRunner.dropTable('address');
  }

}
