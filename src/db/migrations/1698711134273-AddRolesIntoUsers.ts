import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesIntoUsers1698711134273 implements MigrationInterface {
  name = 'AddRolesIntoUsers1698711134273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'MANAGER') NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
