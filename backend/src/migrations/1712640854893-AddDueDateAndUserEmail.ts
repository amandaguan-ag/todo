import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateAndUserEmail1712640854893 implements MigrationInterface {
    name = 'AddDueDateAndUserEmail1712640854893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userEmail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userEmail"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
    }

}
