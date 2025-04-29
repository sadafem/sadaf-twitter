import { TweetList } from '@/components/tweets/TweetList'

export function HomePage() {
  return (
    <div className="flex-1 p-8 bg-white dark:bg-gray-900">
      <main>
        <TweetList />
      </main>
    </div>
  )
} 