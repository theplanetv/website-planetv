FROM node:23-alpine3.20

WORKDIR /web-next

COPY web-next/package.json web-next/package-lock.json ./
RUN npm install

COPY web-next/public ./public
COPY web-next/src ./src
COPY web-next/eslint.config.mjs web-next/next.config.ts web-next/postcss.config.cjs web-next/tsconfig.json ./

ENTRYPOINT [ "npm", "run", "dev" ]