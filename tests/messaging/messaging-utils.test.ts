import {
  messagingConversationSchema,
  messagingPostMessageSchema,
} from '@/features/messaging'
import {
  getMessagingPreview,
  normalizeMessagingBody,
  normalizeMessagingUsername,
} from '@lib/supabase/utils'

describe('messaging utils', () => {
  it('normalizes visitor username and body content', () => {
    expect(normalizeMessagingUsername('  pixel   ronan  ')).toBe('pixel ronan')
    expect(normalizeMessagingBody('  hello   world  ')).toBe('hello world')
  })

  it('builds a trimmed preview when content is too long', () => {
    const preview = getMessagingPreview('A'.repeat(120), 20)

    expect(preview).toHaveLength(20)
    expect(preview.endsWith('...')).toBe(true)
  })

  it('accepts valid visitor conversation payloads', () => {
    const result = messagingConversationSchema.safeParse({
      username: 'pixel_ronan',
      message: 'I need a portfolio rebuild.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid usernames and empty messages', () => {
    expect(
      messagingConversationSchema.safeParse({
        username: 'x',
        message: 'Hello',
      }).success
    ).toBe(false)

    expect(
      messagingPostMessageSchema.safeParse({
        message: '   ',
      }).success
    ).toBe(false)
  })
})