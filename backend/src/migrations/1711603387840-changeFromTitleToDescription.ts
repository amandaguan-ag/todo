import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFromTitleToDescription1711603387840 implements MigrationInterface {
    name = 'ChangeFromTitleToDescription1711603387840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "title" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "description" TO "title"`);
    }

}
