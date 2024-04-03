import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmailField1712128782081 implements MigrationInterface {
    name = 'AddUserEmailField1712128782081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "userEmail" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userEmail"`);
    }

}
