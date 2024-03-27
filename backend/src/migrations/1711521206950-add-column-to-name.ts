import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToName1711521206950 implements MigrationInterface {
    name = 'AddColumnToName1711521206950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "priority" character varying NOT NULL DEFAULT 'Medium'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
    }

}
