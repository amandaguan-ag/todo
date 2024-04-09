import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712639648105 implements MigrationInterface {
    name = 'Migrations1712639648105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "priority" character varying NOT NULL DEFAULT 'Medium', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_tags_tag" ("taskId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_28bdc8d6452f65a8ae3f4c2ab25" PRIMARY KEY ("taskId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_374509e2164bd1126522f424f6" ON "task_tags_tag" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e31820cdb45be62449b4f69c8" ON "task_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_374509e2164bd1126522f424f6f" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c"`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_374509e2164bd1126522f424f6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e31820cdb45be62449b4f69c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_374509e2164bd1126522f424f6"`);
        await queryRunner.query(`DROP TABLE "task_tags_tag"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
