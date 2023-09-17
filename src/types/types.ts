// User
export interface SessionUser {
   email: string
   graduation: string
   id: string
   idea: string
   image: string
   major: string
   name: string
   onboarded: boolean
   phone: string
   role: string
}

// PUT User Body
export interface PutUserBody {
   email?: string
   graduation?: string
   id?: string
   idea?: string
   image?: string
   major?: string
   name?: string
   onboarded?: boolean
   phone?: string
   role?: string
}

// Onboard Context
export interface OnboardContextInterface {
   step: number
   formValues: OnboardContextForm
   updateStep: (page: number) => void
   updateInfo: (newInfo: OnboardContextInfo) => void
   updateMeeting: (newMeeting: OnboardContextMeeting) => void
}

export interface OnboardContextForm {
   info: OnboardContextInfo
   meeting: OnboardContextMeeting
}

export interface OnboardContextInfo {
   name: string
   phone: string
   graduation: string
   major: string
   idea: string
}

export interface OnboardContextMeeting {
   member: OnboardContextMember
   isScheduled: boolean
}

export interface OnboardContextMember {
   name: string
   calendar: string
}
