# Welcome to Money Map

This repo provides a tool for modeling out your financial trajectory, based on your savings, assets, debts, income, expenses, and plans for the future. It accounts for taxes, rules around retirement and 529 saving accounts, and uncertainty around investment returns.

The deployed version of the tool can be found at [mymoneymap.io](https://mymoneymap.io/).

This is very much a work-in-progress, so bear with me! I made it originally to model out my own financial situation (renter, live in NYC, married with 2 kids), and some of the capabilities for people in different situations are less developed.


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

### TODO:

- IMPROVE THIS README
- Add validation for required fields
- Add HSA accounts
- Let recurring income, expenses, transfers, etc. increase over time, rather than assume they grow at the rate of inflation
- Incorporate 401k/IRA minimum required withdrawals
- Enable users to compare multiple simulations
- Enable users to see the details of the simulation (each expense, income, etc.)
- Enable users to save their simulations
- Sankey diagram showing how money flows from income to expenses and savings
