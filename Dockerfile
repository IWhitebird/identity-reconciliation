FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma
RUN npm install --force
COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18-slim
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev --force
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "dist/main"]