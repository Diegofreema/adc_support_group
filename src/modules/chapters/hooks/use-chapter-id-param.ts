import { useParams } from '@tanstack/react-router'

/** The chapter id from /chapters/$chapterId. */
export function useChapterIdParam(): string {
  return useParams({ from: '/_app/chapters/$chapterId' }).chapterId
}
