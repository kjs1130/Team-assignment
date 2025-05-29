# EmotiType - AI-Powered Personality & Mood Companion

EmotiType is an emotionally intelligent, AI-powered web platform that helps users explore their personality traits and current emotional states in a fun, supportive, and reflective way.

## Features

- **Smart Emotional Pulse Check**: A fast, adaptive check-in tool using 5–10 questions to quickly assess the user's current emotional state
- **Mood-Responsive Activity Coach**: Personalized, evidence-informed activity suggestions that align with the user's current emotion
- **Dynamic AI Personality Profiler**: An adaptive personality test powered by AI that generates and adjusts questions in real-time
- **MBTI Alignment Analyzer**: A reflective tool that compares the user's current self-perception with their historical MBTI results
- **Emotional Journey Dashboard**: An intuitive dashboard for tracking mood trends and personality insights over time

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Animations**: Framer Motion
- **Charts**: Chart.js, React-Chartjs-2
- **AI Integration**: OpenAI GPT-4 API (planned)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kjs1130/Team-assignment.git
   cd emotitype
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
emotitype/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── personality/       # Personality test page
│   ├── mood/             # Mood check page
│   └── dashboard/        # Dashboard page
├── public/                # Static assets
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
