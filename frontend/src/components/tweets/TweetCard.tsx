import { useState, useEffect } from 'react'
import { Tweet } from '@/types/tweet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { tweetService } from '@/services/tweet'
import { useAuth } from '@/context/AuthContext'

interface TweetCardProps {
  tweet: Tweet
  onUpdate: (updatedTweet: Tweet) => void
  onDelete: (id: string) => void
}

export function TweetCard({ tweet, onUpdate, onDelete }: TweetCardProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(tweet.content)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // More detailed debugging
    console.log('Tweet Card Debug:', {
      currentUser: {
        id: user?.id,
        type: typeof user?.id,
        raw: user
      },
      tweet: {
        userId: tweet.userId,
        type: typeof tweet.userId,
        raw: tweet
      },
      comparison: {
        direct: user?.id === tweet.userId,
        toString: user?.id?.toString() === tweet.userId?.toString(),
        currentUserId: user?.id?.toString(),
        tweetUserId: tweet.userId?.toString()
      }
    })
  }, [user, tweet])

  // Ensure both IDs are strings and trim any whitespace
  const currentUserId = user?.id?.toString()?.trim()
  const tweetUserId = tweet.userId?.toString()?.trim()
  const canEdit = currentUserId && tweetUserId && currentUserId === tweetUserId

  const handleUpdate = async () => {
    if (content.length > 140) {
      setError('Tweet cannot exceed 140 characters')
      return
    }

    if (content === tweet.content) {
      setIsEditing(false)
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const updatedTweet = await tweetService.updateTweet(tweet.id, { content })
      onUpdate(updatedTweet)
      setIsEditing(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to update tweet')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this tweet?')) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await tweetService.deleteTweet(tweet.id)
      onDelete(tweet.id)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to delete tweet')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setContent(tweet.content)
    setError('')
    setIsEditing(false)
  }

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-bold text-gray-900 dark:text-white">{tweet.username}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
            {new Date(tweet.createdAt).toLocaleDateString()}
          </span>
        </div>
        {canEdit && (
          <div className="space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="bg-twitter-blue hover:bg-twitter-blue/90 text-white"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={140}
            className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
            placeholder="What's happening?"
            autoFocus
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {content.length}/140 characters
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleUpdate}
                disabled={isLoading || content.length === 0 || content === tweet.content}
                className="bg-twitter-blue hover:bg-twitter-blue/90 text-white"
              >
                {isLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{tweet.content}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      
      {/* Debug info
      <div className="mt-2 text-xs text-gray-500">
        Can Edit: {canEdit ? 'Yes' : 'No'} | Current User ID: {currentUserId} | Tweet User ID: {tweetUserId}
      </div> */}
    </div>
  )
} 