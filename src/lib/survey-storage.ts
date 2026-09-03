export interface DatingSurveyResponse {
  age: string
  gender: string
  lookingFor: string
  relationshipGoal: string
  personality: string[]
  interests: string[]
  lifestyle: string
  values: string[]
  dealbreakers: string[]
  selfDescription: string
  timestamp: string
}

export function getMyDatingProfile(): DatingSurveyResponse | null {
  if (typeof window === "undefined") return null

  const data = localStorage.getItem("my-dating-profile")
  return data ? JSON.parse(data) : null
}

export function getAllDatingResponses(): DatingSurveyResponse[] {
  if (typeof window === "undefined") return []

  const data = localStorage.getItem("all-dating-responses")
  return data ? JSON.parse(data) : []
}

export function clearAllDatingResponses(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("all-dating-responses")
  localStorage.removeItem("my-dating-profile")
}
