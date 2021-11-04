#!/bin/bash
export NODE_ENV=development
npx sequelize db:migrate
npm start