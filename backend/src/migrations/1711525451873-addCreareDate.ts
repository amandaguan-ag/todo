import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreareDate1711525451873 implements MigrationInterface {
    name = 'AddCreareDate1711525451873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdAt"`);
    }

}
