import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableState1740167647820 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('state', new TableColumn({
      name: 'uf',
      type: 'varchar',
      length: '2',
      isNullable: false
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('state', 'uf');
  }

}
