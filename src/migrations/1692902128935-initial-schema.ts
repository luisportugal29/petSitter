import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1692902128935 implements MigrationInterface {
    name = 'InitialSchema1692902128935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "stateId" integer)`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "rating" integer NOT NULL, "sitterId" integer)`);
        await queryRunner.query(`CREATE TABLE "sitter" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "birthDate" date NOT NULL, "photoUrl" varchar, "cityId" integer)`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "address" varchar NOT NULL, "phoneNumber" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "sitter_pets_pet" ("sitterId" integer NOT NULL, "petId" integer NOT NULL, PRIMARY KEY ("sitterId", "petId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41fb6f51ce1c8ad6223bfae802" ON "sitter_pets_pet" ("sitterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37b2b60fbd36077d56f9c1a905" ON "sitter_pets_pet" ("petId") `);
        await queryRunner.query(`CREATE TABLE "temporary_city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "stateId" integer, CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_city"("id", "name", "stateId") SELECT "id", "name", "stateId" FROM "city"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`ALTER TABLE "temporary_city" RENAME TO "city"`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "rating" integer NOT NULL, "sitterId" integer, CONSTRAINT "FK_7d50511b10ec255db40790b59a4" FOREIGN KEY ("sitterId") REFERENCES "sitter" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "comment", "rating", "sitterId") SELECT "id", "comment", "rating", "sitterId" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
        await queryRunner.query(`CREATE TABLE "temporary_sitter" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "birthDate" date NOT NULL, "photoUrl" varchar, "cityId" integer, CONSTRAINT "FK_d49c1eafbca7a5401a66ae2f070" FOREIGN KEY ("cityId") REFERENCES "city" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sitter"("id", "name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") SELECT "id", "name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId" FROM "sitter"`);
        await queryRunner.query(`DROP TABLE "sitter"`);
        await queryRunner.query(`ALTER TABLE "temporary_sitter" RENAME TO "sitter"`);
        await queryRunner.query(`DROP INDEX "IDX_41fb6f51ce1c8ad6223bfae802"`);
        await queryRunner.query(`DROP INDEX "IDX_37b2b60fbd36077d56f9c1a905"`);
        await queryRunner.query(`CREATE TABLE "temporary_sitter_pets_pet" ("sitterId" integer NOT NULL, "petId" integer NOT NULL, CONSTRAINT "FK_41fb6f51ce1c8ad6223bfae8025" FOREIGN KEY ("sitterId") REFERENCES "sitter" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_37b2b60fbd36077d56f9c1a9054" FOREIGN KEY ("petId") REFERENCES "pet" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("sitterId", "petId"))`);
        await queryRunner.query(`INSERT INTO "temporary_sitter_pets_pet"("sitterId", "petId") SELECT "sitterId", "petId" FROM "sitter_pets_pet"`);
        await queryRunner.query(`DROP TABLE "sitter_pets_pet"`);
        await queryRunner.query(`ALTER TABLE "temporary_sitter_pets_pet" RENAME TO "sitter_pets_pet"`);
        await queryRunner.query(`CREATE INDEX "IDX_41fb6f51ce1c8ad6223bfae802" ON "sitter_pets_pet" ("sitterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37b2b60fbd36077d56f9c1a905" ON "sitter_pets_pet" ("petId") `);

        await queryRunner.query(`INSERT INTO "user" ("email", "password", "name", "lastName", "address", "phoneNumber") VALUES ('buddy@gmail.com', '1168926e27d3f466.0ed68225a78c60b1276a0788a1d696f3c42d2b512e6e608ffe7500cda06abfaf', 'Buddy', 'Buddy', 'Dirección', '123456789')`);
        await queryRunner.query(`INSERT INTO "state" ("name") VALUES ('California')`);
        await queryRunner.query(`INSERT INTO "state" ("name") VALUES ('Florida')`);
    
        // Inserción de registros en la tabla "pet"
        await queryRunner.query(`INSERT INTO "pet" ("name") VALUES ('Cat')`);
        await queryRunner.query(`INSERT INTO "pet" ("name") VALUES ('Dog')`);
        await queryRunner.query(`INSERT INTO "pet" ("name") VALUES ('Rabbit')`);
    
        // Inserción de registros en la tabla "city"
        await queryRunner.query(`INSERT INTO "city" ("name", "stateId") VALUES ('Los Angeles', 1)`);
        await queryRunner.query(`INSERT INTO "city" ("name", "stateId") VALUES ('San Diego', 1)`);
        await queryRunner.query(`INSERT INTO "city" ("name", "stateId") VALUES ('Miami', 2)`);
    
        // Inserción de registros en la tabla "sitter"
        await queryRunner.query(`INSERT INTO "sitter" ("name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") VALUES ('Sergio', 'Perez', 'checo@example.com', '123456789', '2000-01-01', 'https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/perez.jpg.img.1920.medium.jpg/1677069773437.jpg', 1)`);
        await queryRunner.query(`INSERT INTO "sitter" ("name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") VALUES ('Max', 'Verstappen', 'verstappen@example.com', '987654321', '1995-05-10', 'https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.1920.medium.jpg/1677069646195.jpg', 1)`);
        await queryRunner.query(`INSERT INTO "sitter" ("name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") VALUES ('Charles', 'Leclerc', 'leclerc@example.com', '123456789', '2000-01-01', 'https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/leclerc.jpg.img.1920.medium.jpg/1677069223130.jpg', 3)`);
        await queryRunner.query(`INSERT INTO "sitter" ("name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") VALUES ('Chris', 'Bumsted', 'cbum@example.com', '123456789', '2000-01-01', 'https://i.redd.it/lz8atlg4w2b21.png', 3)`);
        // Inserción de relaciones entre "sitter" y "pet" en la tabla de asociación "sitter_pets_pet"
        await queryRunner.query(`INSERT INTO "sitter_pets_pet" ("sitterId", "petId") VALUES (1, 1)`);
        await queryRunner.query(`INSERT INTO "sitter_pets_pet" ("sitterId", "petId") VALUES (1, 2)`);
        await queryRunner.query(`INSERT INTO "sitter_pets_pet" ("sitterId", "petId") VALUES (2, 1)`);
        await queryRunner.query(`INSERT INTO "sitter_pets_pet" ("sitterId", "petId") VALUES (3, 2)`);
        await queryRunner.query(`INSERT INTO "sitter_pets_pet" ("sitterId", "petId") VALUES (3, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_37b2b60fbd36077d56f9c1a905"`);
        await queryRunner.query(`DROP INDEX "IDX_41fb6f51ce1c8ad6223bfae802"`);
        await queryRunner.query(`ALTER TABLE "sitter_pets_pet" RENAME TO "temporary_sitter_pets_pet"`);
        await queryRunner.query(`CREATE TABLE "sitter_pets_pet" ("sitterId" integer NOT NULL, "petId" integer NOT NULL, PRIMARY KEY ("sitterId", "petId"))`);
        await queryRunner.query(`INSERT INTO "sitter_pets_pet"("sitterId", "petId") SELECT "sitterId", "petId" FROM "temporary_sitter_pets_pet"`);
        await queryRunner.query(`DROP TABLE "temporary_sitter_pets_pet"`);
        await queryRunner.query(`CREATE INDEX "IDX_37b2b60fbd36077d56f9c1a905" ON "sitter_pets_pet" ("petId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41fb6f51ce1c8ad6223bfae802" ON "sitter_pets_pet" ("sitterId") `);
        await queryRunner.query(`ALTER TABLE "sitter" RENAME TO "temporary_sitter"`);
        await queryRunner.query(`CREATE TABLE "sitter" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "birthDate" date NOT NULL, "photoUrl" varchar, "cityId" integer)`);
        await queryRunner.query(`INSERT INTO "sitter"("id", "name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId") SELECT "id", "name", "lastName", "email", "phoneNumber", "birthDate", "photoUrl", "cityId" FROM "temporary_sitter"`);
        await queryRunner.query(`DROP TABLE "temporary_sitter"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "comment" varchar NOT NULL, "rating" integer NOT NULL, "sitterId" integer)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "comment", "rating", "sitterId") SELECT "id", "comment", "rating", "sitterId" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`ALTER TABLE "city" RENAME TO "temporary_city"`);
        await queryRunner.query(`CREATE TABLE "city" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "stateId" integer)`);
        await queryRunner.query(`INSERT INTO "city"("id", "name", "stateId") SELECT "id", "name", "stateId" FROM "temporary_city"`);
        await queryRunner.query(`DROP TABLE "temporary_city"`);
        await queryRunner.query(`DROP INDEX "IDX_37b2b60fbd36077d56f9c1a905"`);
        await queryRunner.query(`DROP INDEX "IDX_41fb6f51ce1c8ad6223bfae802"`);
        await queryRunner.query(`DROP TABLE "sitter_pets_pet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "sitter"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
