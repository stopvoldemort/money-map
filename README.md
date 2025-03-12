# Welcome to Money Map

This repo provides a tool for modeling out your financial trajectory, based on your savings, assets, debts, income, expenses, and plans for the future. It accounts for taxes, rules around retirement and 529 saving accounts, and uncertainty around investment returns.

The deployed version of the tool can be found at [mymoneymap.io](https://mymoneymap.io/).

Project your net worth:
<img width="1172" alt="Screenshot 2025-03-12 at 9 46 20 AM" src="https://github.com/user-attachments/assets/8dbf5ffd-b9f8-4a84-bf7c-850c8e8a83cc" />

Visualize your cash flow:
<img width="1167" alt="Screenshot 2025-03-12 at 9 45 52 AM" src="https://github.com/user-attachments/assets/7d2f1bb1-6787-4532-bfb4-10f059e78469" />

Compare scenarios:
<img width="1192" alt="Screenshot 2025-03-12 at 9 45 18 AM" src="https://github.com/user-attachments/assets/156f5d7e-fef7-48b2-aad8-8094ba7b438a" />



## DEVELOPMENT:

To run the app locally with Docker:
`docker compose up backend --build`
`docker compose up frontend --build`

If you've made changes to package.json, you need to first run `docker compose down frontend -v`, then `docker compose up frontend --build` in order to delete the existing frontend volume.

## DEPLOYMENT:

To deploy the app to GCP:
- Load environment variables: `source .env`

#### Frontend

- Set a tag: `export TAG=v0.0.1`
- Build the frontend image: `docker build -t $GCP_REGION-docker.pkg.dev/$PROJECT_ID/frontend/frontend:$TAG --build-arg ENV=production --build-arg GIT_VERSION=$(git rev-parse --short HEAD) ./frontend`
- Push the frontend image: `docker push $GCP_REGION-docker.pkg.dev/$PROJECT_ID/frontend/frontend:$TAG`
- Deploy the frontend image: `gcloud run deploy frontend-service --image $GCP_REGION-docker.pkg.dev/$PROJECT_ID/frontend/frontend:$TAG --platform managed --region $GCP_REGION --allow-unauthenticated --set-env-vars NODE_ENV=production`

#### Backend

- Set a tag: `export TAG=v0.0.1`
- Build the backend image: `docker build -t $GCP_REGION-docker.pkg.dev/$PROJECT_ID/backend/backend:$TAG --build-arg ENV=production ./backend`
- Push the backend image: `docker push $GCP_REGION-docker.pkg.dev/$PROJECT_ID/backend/backend:$TAG`
- Deploy the backend image: `gcloud run deploy backend-service --image $GCP_REGION-docker.pkg.dev/$PROJECT_ID/backend/backend:$TAG --platform managed --region $GCP_REGION --allow-unauthenticated`

- Add validation for required fields
- Add HSA accounts
- Let recurring income, expenses, transfers, etc. increase over time, rather than assume they grow at the rate of inflation
- Incorporate 401k/IRA minimum required withdrawals
- Enable users to save their simulations
