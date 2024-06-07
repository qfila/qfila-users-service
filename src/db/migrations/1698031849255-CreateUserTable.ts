import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1698031849255 implements MigrationInterface {
  name = 'CreateUserTable1698031849255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" uuid NOT NULL,
        "username" varchar(500) NOT NULL,
        "email" varchar(500) NOT NULL,
        "password_hash" varchar(500) NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75ed" UNIQUE ("username"),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e2" UNIQUE ("email"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
