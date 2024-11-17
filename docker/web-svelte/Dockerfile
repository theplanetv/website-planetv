FROM oven/bun:latest

WORKDIR /web-svelte

# Download packages
COPY web-svelte/package.json web-svelte/bun.lockb ./
RUN bun install

# Copy source
COPY web-svelte ./

# Build the Svelte app
RUN bun run build

ENTRYPOINT ["bun", "run", "dev"]
