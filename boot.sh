#!/bin/bash
export NODE_ENV=production
npx sequelize db:migrate
npm start