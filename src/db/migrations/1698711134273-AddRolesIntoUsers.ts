import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesIntoUsers1698711134273 implements MigrationInterface {
  name = 'AddRolesIntoUsers1698711134273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE user_role AS ENUM ('USER', 'MANAGER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" user_role NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE user_role`);
  }
}
