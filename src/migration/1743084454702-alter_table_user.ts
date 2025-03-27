import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1743084454702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.user ADD UNIQUE(email);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('');
    }

}
