## Overview

### Requirements

- Nodejs v12.13.x
- NPM 7.1x.x
- postgres

### Build

- Develop installation

```
1. Download repository.
2. Run command npm install on project root.
3. Run command docker-compose up (or up -d for detached).
4. make request on 5000.
5. Postgres binding port: 5432
```

- Install dependencies

  ```
  npm install
  ```

- Run locally

  ```
  npm run dev
  ```

- Build in container

  ```
  docker build -t backend_challenge -f Dockerfile .
  ```

### Documentation

https://web.postman.co/workspace/My-Workspace~40b74f5c-21d0-4c6d-851c-6fd1306eb984/documentation/8141743-25e679ac-176b-4a98-a75f-3c552f933c61

### Contributors

- John Manyoma
