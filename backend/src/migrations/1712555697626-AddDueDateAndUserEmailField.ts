import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDueDateAndUserEmailField1712555697626
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "task"
            ADD "dueDate" DATE,
            ADD "userEmail" character varying;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "task"
            DROP COLUMN "dueDate",
            DROP COLUMN "userEmail";
        `);
  }
}
