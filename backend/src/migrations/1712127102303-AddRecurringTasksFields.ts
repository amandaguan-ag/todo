import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecurringTasksFields1712127102303 implements MigrationInterface {
    name = 'AddRecurringTasksFields1712127102303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "recurringInterval" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "nextOccurrenceDate" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "nextOccurrenceDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "recurringInterval"`);
    }

}
