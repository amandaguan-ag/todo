import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToName1711226467376 implements MigrationInterface {
    name = 'AddColumnToName1711226467376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "name" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "name" ADD "last_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "name" ADD "name" character varying NOT NULL`);
    }

}
