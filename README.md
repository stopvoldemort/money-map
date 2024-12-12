# Welcome to Money Map

This repo provides a tool for modeling out your financial trajectory, based on your savings, assets, debts, income, expenses, and plans for the future. It accounts for taxes, rules around retirement and 529 saving accounts, and uncertainty around investment returns.

The deployed version of the tool can be found [here](https://frontend-service-755168858752.us-central1.run.app/).

This is very much a work-in-progress, so there are lots of quirks and limitations. Bear with me! I made it originally to model out my own financial situation (renter, live in NYC, married with 2 kids), and some of the capabilities for people in different situations are less developed.


## DEVELOPMENT:

- Building a React/Flask app that makes this all much easier to use.
  To run the app locally:
  `docker compose up backend --build`
  `docker compose up frontend --build`

  If you've made changes to package.json, you need to first run `docker compose down frontend -v`, then `docker compose up frontend --build` in order to delete the existing frontend volume.

## DEPLOYMENT:

#### Frontend

- Set a tag: `export TAG=v0.0.1`
- Build the frontend image: `docker build -t us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG --build-arg ENV=production --build-arg GIT_VERSION=$(git rev-parse --short HEAD) ./frontend`
- Push the frontend image: `docker push us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG`
- Deploy the frontend image: `gcloud run deploy frontend-service --image us-central1-docker.pkg.dev/money-map-441715/frontend/frontend:$TAG --platform managed --region us-central1 --allow-unauthenticated --set-env-vars NODE_ENV=production`

#### Backend

- Set a tag: `export TAG=v0.0.1`
- Build the backend image: `docker build -t us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG --build-arg ENV=production ./backend`
- Push the backend image: `docker push us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG`
- Deploy the backend image: `gcloud run deploy backend-service --image us-central1-docker.pkg.dev/money-map-441715/backend/backend:$TAG --platform managed --region us-central1 --allow-unauthenticated`

### TODO:

- IMPROVE THIS README
- Edit income tax brackets
- Assets can be sold
- Maybe stop caching form values in local storage
- Add HSA accounts
- Users can set their local and state tax brackets, rather than always using NY/NYC's
- Let Income, Expense, and maybe other classes grow over time (i.e., have a AAGR)
- Incorporate 401k/IRA required withdrawals
