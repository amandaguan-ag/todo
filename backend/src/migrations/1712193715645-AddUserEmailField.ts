import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmailField1712193715645 implements MigrationInterface {
    name = 'AddUserEmailField1712193715645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "recurringInterval"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "nextOccurrenceDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" date`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "nextOccurrenceDate" date`);
        await queryRunner.query(`ALTER TABLE "task" ADD "recurringInterval" character varying`);
    }

}
