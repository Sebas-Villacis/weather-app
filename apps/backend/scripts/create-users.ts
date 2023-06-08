#!/bin/bash
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();
const NUMBER_OF_USERS = 5;
// Setting the same password to all users since it is only for testing purposes
const USER_PASSWORD = 'superSecret';
const SALT_OR_ROUNDS = 10;
async function createUsers() {
  const data = [];
  const hash = await bcrypt.hash(USER_PASSWORD, SALT_OR_ROUNDS);
  for (let index = 0; index < NUMBER_OF_USERS; index++) {
    const user = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      hash: hash,
    };
    data.push(user);
  }

  await prismaClient.user.createMany({ data, skipDuplicates: true });
}

createUsers()
  .then(() => {
    console.info(`Users created successfully`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(`An error ocurred while creating the users:`, error.message);
    process.exit(1);
  });
