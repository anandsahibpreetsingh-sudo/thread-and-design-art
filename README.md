# Thread and Design Art storefront

A product-showcase site for the Etsy shop. Visitors browse here and buy on Etsy (Etsy handles payment).

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy (Vercel)
1. Create a GitHub repo and push this folder.
2. On vercel.com choose "Add New > Project", import the repo, click Deploy (no settings needed).
3. Project > Settings > Domains: add your own domain.

## Edit products
Open `data/products.js`. Each product has an Etsy listing id, title, size and images.
To add photos, copy them into `public/images/` and list the file names in `images: [...]`.
Products with no images show a "Photos on Etsy" tile.
