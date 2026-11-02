import { chapterActivitiesDb, chaptersDb } from './chapters.mock'
import type { ChapterActivity, ChapterRecord, NewChapterInput } from '../types'
import { newId, notFound, respond } from '@/lib/mock-api'

function findChapter(chapterId: string): ChapterRecord {
  return chaptersDb.find((chapter) => chapter.id === chapterId) ?? notFound('Chapter', chapterId)
}

export async function fetchChapters(groupId: string): Promise<ChapterRecord[]> {
  return respond(chaptersDb.filter((chapter) => chapter.groupId === groupId))
}

export async function fetchChapter(chapterId: string): Promise<ChapterRecord> {
  return respond(findChapter(chapterId))
}

export async function fetchChapterActivities(chapterId: string): Promise<ChapterActivity[]> {
  return respond(chapterActivitiesDb.filter((activity) => activity.chapterId === chapterId))
}

function blankChapter(groupId: string, input: NewChapterInput): ChapterRecord {
  return {
    id: newId('chp'), groupId, name: input.name, level: input.level, state: input.state, lga: input.lga, ward: input.ward,
    coordinatorName: 'Invited coordinator', coordinatorPhone: input.coordinatorPhone, memberCount: 0, memberGrowth: 0,
    activityCount: 0, amountGiven: 0, lgaCount: 0, joinCode: newId('awn'),
  }
}

export async function createChapter(groupId: string, input: NewChapterInput): Promise<ChapterRecord> {
  const chapter = blankChapter(groupId, input)
  chaptersDb.push(chapter)
  return respond(chapter)
}

export async function changeCoordinator(chapterId: string, coordinator: string): Promise<ChapterRecord> {
  if (!coordinator.trim()) throw new Error('Enter the new coordinator')
  const chapter = findChapter(chapterId)
  const isPhone = /\d{6,}/.test(coordinator)
  Object.assign(chapter, isPhone ? { coordinatorPhone: coordinator, coordinatorName: 'Invited coordinator' } : { coordinatorName: coordinator })
  return respond(chapter)
}
