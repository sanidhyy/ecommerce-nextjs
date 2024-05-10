<a name="readme-top"></a>

# A Next.js 14 E-Commerce App and Admin Dashboard/CMS

![A Next.js 14 E-Commerce App and Admin Dashboard/CMS](/.github/images/img_main.png "A Next.js 14 E-Commerce App and Admin Dashboard/CMS")

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/ecommerce-nextjs?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/blob/main/LICENSE "GitHub license")
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/commits/main "Maintenance")
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/ecommerce-nextjs?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/branches "GitHub branches")
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/ecommerce-nextjs?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/commits "Github commits")
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://e-commerce-nextjs-store.vercel.app/ "Vercel status")
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/ecommerce-nextjs?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/issues "GitHub issues")
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/ecommerce-nextjs?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/ecommerce-nextjs/pulls "GitHub pull requests")

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

```bash
ecommerce-nextjs/
  |- ecommerce-admin/
    |-- actions/
    |-- app/
        |--- (auth)/routes/
            |---- sign-in/
            |---- sign-up/
        |--- (dashboard)/[storeId]/(routes)/
            |---- billboards/
            |---- categories/
            |---- colors/
            |---- orders/
            |---- products/
            |---- settings/
            |---- sizes/
        |--- api/
            |---- [storeId]/
                |----- billboards/
                |----- categories/
                |----- checkout/
                |----- colors/
                |----- products/
                |----- sizes/
            |---- stores/[storeId]/
            |---- webhook/
        |--- favicon.ico
        |--- globals.css
    |-- components/
        |--- modals/
        |--- ui/
    |-- constants/
    |-- hooks/
    |-- lib/
    |-- prisma/
    |-- providers/
    |-- public/
        |--- icons/
        |--- site.webmanifest/
    |-- .env.local
    |-- .env.example
    |-- components.json
    |-- middleware.ts
    |-- next.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- tailwind.config.ts
    |-- tsconfig.json
  |- ecommerce-store/
    |-- actions/
    |-- app/
        |--- (routes)/
            |---- cart/
            |---- category/[categoryId]/
            |---- product/[productId]/
        |--- favicon.ico
        |--- globals.css
    |-- components/
        |--- gallery/
        |--- ui/
    |-- constants/
    |-- hooks/
    |-- lib/
    |-- providers/
    |-- public/
        |--- icons/
        |--- site.webmanifest/
    |-- .env.local
    |-- .env.example
    |-- next.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- tailwind.config.ts
    |-- tsconfig.json
    |-- types.ts
```

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env.local` file in both `ecommerce-admin/` and `ecommerce-store/` folder.
4. Contents of `ecommerce-admin/.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_API_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_FRONTEND_STORE_URL=http://localhost:3001

DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="xxxxxxxxxx"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="xxxxxxxxxxx"
```

5. Contents of `ecommerce-store/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/<your-api-key>
NEXT_PUBLIC_BILLBOARD_ID=<your-billboard-id>
```

6. **Clerk Keys**:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are provided by Clerk. You need to sign up for an account on Clerk (https://www.clerk.dev/), log in, and access these keys in your account settings.

![Copy Clerk Secret and Publishable Key](/.github/images/step_clerk.png "Copy Clerk Secret and Publishable Key")

7. **Stripe Secret Key**:
   - `STRIPE_API_KEY` is provided by Stripe in order to setup online payments. You need to sign up for an account on Stripe (https://stripe.com/), log in, and access these keys in your account dashboard.

![Copy Stripe Secret Key](/.github/images/step_stripe.png "Copy Stripe Secret Key")

8. **Stripe Webhook Secret**:

   - `STRIPE_WEBHOOK_SECRET` is required for handling Stripe webhooks securely. Follow these steps to obtain the webhook secret:
     - Sign in to your Stripe account (https://dashboard.stripe.com/).
     - In the Dashboard, go to "Developers" > "Webhooks".
     - Click the "Add endpoint" button.
     - Set up the endpoint details and select `checkout.session.completed` event.
     - After saving, you'll see the webhook signing secret. Copy this value to use as `STRIPE_WEBHOOK_SECRET`.

9. **URLs for Clerk**:

   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, and `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` are endpoints or URLs related to your Clerk setup. You can configure these in your Clerk dashboard.

10. **Prisma Database URL**:

- `DATABASE_URL` is the connection URL for your Aiven MySQL database. You will need to create a Aiven account (https://aiven.io/) or use an existing one. Obtain the connection URL from your Aiven dashboard.

![Copy Aiven MySQL Database Auth URL](/.github/images/step_aiven.png "Copy Aiven MySQL Database Auth URL")

11. **Cloudinary Keys**:

    - **Cloud Name**:
      The `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is associated with your Cloudinary account. To find your Cloud Name: - Log in to your Cloudinary account. - Navigate to the [Dashboard](https://cloudinary.com/console). - You will find your Cloud Name displayed on the Dashboard.

    - **Upload Preset**:
      The `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is used for unsigned uploads. To create an unsigned upload preset: - In your Cloudinary Dashboard, go to the [Settings](https://cloudinary.com/console/settings/upload). - Scroll down to the "Upload presets" section. - Click the "Add upload preset" button. - Configure the preset settings as needed (e.g., folder, tags). - Click the "Save" button. - Your new upload preset will be listed on the Upload Presets page. Copy the name of the preset.

12. **Public API URL**:
    - `NEXT_PUBLIC_API_URL` are endpoints or URLs related to your Admin APIs. You can configure/copy this from your Admin Dashboard Settings Panel.

13. **Active Billboard Id**:
	- `NEXT_PUBLIC_BILLBOARD_ID` is the id of billboard which you want to display on home page. You can copy this either from dashboard/billboards page or directly from database by running `npm run prisma:studio`

14. Install required packages using `npm install --legacy-peer-deps` or `yarn install --legacy-peer-deps`.
15. Run both admin and store separately on ports 3000 and 3001 respectively.

### :books: Additional Resources

- Clerk Documentation: https://www.clerk.dev/docs/
- Stripe Documentation: https://stripe.com/docs/
- Aiven Documentation: https://docs.aiven.io/
- Cloudinary Documentation: https://cloudinary.com/documentation
- Prisma Documentation: https://www.prisma.io/docs

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots:

### E-Commerce Store

![View Product Categories](/.github/images/img_store1.png "View Product Categories")

![View Product Info](/.github/images/img_store2.png "View Product Info")

![View Shopping Cart](/.github/images/img_store3.png "View Shopping Cart")

### E-Commerce Admin

![Create Store](/.github/images/img_admin1.png "Create Store")

![View Categories](/.github/images/img_admin2.png "View Categories")

![Create Product](/.github/images/img_admin3.png "Create Product")

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Vercel](https://skillicons.dev/icons?i=vercel "Vercel")](https://vercel.app/ "Vercel") [![Prisma](https://skillicons.dev/icons?i=prisma "Prisma")](https://prisma.io/ "Prisma")

## :wrench: Stats

### E-Commerce Store

[![Stats for E-Commerce Store](/.github/images/stats-store.svg "Stats for E-Commerce Store")](https://pagespeed-insights-svg.glitch.me/?url=https://e-commerce-nextjs-store.vercel.app/ "Stats for E-Commerce Store")

### E-Commerce Admin

[![Stats for E-Commerce Admin](/.github/images/stats-admin.svg "Stats for E-Commerce Admin")](https://pagespeed-insights-svg.glitch.me/?url=https://e-commerce-nextjs-admin.vercel.app/ "Stats for E-Commerce Admin")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and libraries that are used in My Portfolio

- Thanks to CodeWithAntonio: https://codewithantonio.com/
- [Clerk](https://clerk.com/ "Clerk")
- [ShadCN UI](https://shadcn.com/ "ShadCN UI")
- [CLSX](https://www.npmjs.com/package/clsx "CLSX")
- [Cloudinary](https://cloudinary.com/ "Cloudinary")
- [Date FNS](https://date-fns.org/ "Date FNS")
- [Stripe](https://stripe.com/ "Stripe")
- [Recharts](https://recharts.org/ "Recharts")
- [ZOD](https://zod.dev/ "ZOD")
- [React Hot Toast](https://react-hot-toast.com/ "React Hot Toast")
- [Lucide Icons](https://lucide.dev/ "Lucide Icons")
- [Prettier](https://prettier.io/ "Prettier")
- [ESLint](https://eslint.org/ "ESLint")
- [Next PWA](https://github.com/shadowwalker/next-pwa#readme "Next PWA")

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fmedical-chat-app "Tweet")
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCNAz_hUVBG2ZUN8TVm0bmYw "Subscribe my Channel")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/ecommerce-nextjs&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/ecommerce-nextjs&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/ecommerce-nextjs&type=Timeline" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/ecommerce-nextjs&type=Timeline" />
  </picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
